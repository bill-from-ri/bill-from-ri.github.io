#!/usr/bin/env node
// Fetches the latest Substack posts and writes them to posts.json in the
// shape Content.jsx expects: { title, date, embed }.
//
// Substack's RSS feed sits behind a Cloudflare managed challenge that blocks
// GitHub Actions runners (datacenter IPs). We try sources in order of fidelity:
//   1. Substack archive JSON API — same Cloudflare zone but a different route;
//      sometimes exempt from the bot rule. Gives perfect titles + dates.
//   2. r.jina.ai reader proxy — third-party server-side fetcher with clean
//      egress. Always reachable from CI but loses titles (slugs only); we
//      reconstruct titles from the slug as a best effort.

import { writeFile } from "node:fs/promises";

const PUB = "https://billxia.substack.com";
const ARCHIVE_API = `${PUB}/api/v1/archive?sort=new&offset=0&limit=12`;
const JINA_FEED = `https://r.jina.ai/${PUB}/feed`;
const OUT_PATH = new URL("../posts.json", import.meta.url);
const MAX_POSTS = 3;
const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const formatDate = (raw) => {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

const dumpFailure = async (label, res) => {
  const headers = Object.fromEntries(res.headers);
  console.error(`[${label}] Status: ${res.status} ${res.statusText}`);
  console.error(`[${label}] cf-mitigated=${res.headers.get("cf-mitigated") || "(none)"}  cf-ray=${res.headers.get("cf-ray") || "(none)"}  server=${res.headers.get("server") || "(none)"}`);
  console.error(`[${label}] Headers: ${JSON.stringify(headers, null, 2)}`);
  try {
    const body = await res.text();
    console.error(`[${label}] Body length: ${body.length}`);
    console.error(`[${label}] Body preview (first 1000 chars):\n${body.slice(0, 1000)}`);
  } catch (e) {
    console.error(`[${label}] Could not read body: ${e}`);
  }
};

const fetchWithLog = async (label, url) => {
  try {
    const res = await fetch(url, { headers: { "user-agent": UA, accept: "*/*" } });
    console.log(`[${label}] ${res.status} ${res.statusText} (${res.headers.get("content-type") || "no content-type"})`);
    return res;
  } catch (err) {
    console.error(`[${label}] fetch threw: ${err?.name}: ${err?.message}`);
    if (err?.cause) console.error(`[${label}] cause: ${err.cause}`);
    return null;
  }
};

// --- Source 1: archive JSON API -----------------------------------------

async function fromArchiveApi() {
  const label = "archive-api";
  console.log(`[${label}] GET ${ARCHIVE_API}`);
  const res = await fetchWithLog(label, ARCHIVE_API);
  if (!res) return null;
  if (!res.ok) {
    await dumpFailure(label, res);
    return null;
  }

  let data;
  try {
    data = await res.json();
  } catch (e) {
    console.error(`[${label}] JSON parse failed: ${e}`);
    return null;
  }

  if (!Array.isArray(data)) {
    console.error(`[${label}] Expected array, got ${typeof data}`);
    return null;
  }
  console.log(`[${label}] Got ${data.length} items`);

  const posts = data
    .filter((p) => p?.title && p?.slug && p.slug !== "coming-soon" && p?.post_date)
    .slice(0, MAX_POSTS)
    .map((p) => ({
      title: p.title,
      date: formatDate(p.post_date),
      embed: p.canonical_url || `${PUB}/p/${p.slug}`,
    }));

  if (posts.length === 0) {
    console.error(`[${label}] No usable posts after filtering`);
    return null;
  }
  return posts;
}

// --- Source 2: jina.ai reader proxy -------------------------------------

// Reconstruct a title from a slug. Lossy: punctuation is gone, and Substack
// lowercases stopwords in titles ("Intro to Epidemiology") that we can't
// distinguish from slug words. We lowercase a small set of common stopwords
// for English readability; everything else is title-cased.
const STOPWORDS = new Set(["to", "of", "the", "a", "an", "and", "or", "in", "for", "on", "at", "by", "is", "vs"]);
const titleFromSlug = (slug) =>
  slug
    .split("-")
    .map((w, i) =>
      i > 0 && STOPWORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");

async function fromJinaReader() {
  const label = "jina-reader";
  console.log(`[${label}] GET ${JINA_FEED}`);
  const res = await fetchWithLog(label, JINA_FEED);
  if (!res) return null;
  if (!res.ok) {
    await dumpFailure(label, res);
    return null;
  }

  const text = await res.text();
  console.log(`[${label}] Got ${text.length} bytes`);

  // Each post appears as:
  //   ### [](https://billxia.substack.com/p/<slug>)
  //
  //   [<url>](<url>)
  //
  //   <RFC-822 date>
  const blockRe =
    /###\s+\[\]\((https?:\/\/[^)]+\/p\/([^)]+))\)[\s\S]*?\n\s*([A-Z][a-z]{2},\s*\d{2}\s+[A-Z][a-z]{2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+GMT)/g;
  const matches = [...text.matchAll(blockRe)];
  console.log(`[${label}] Parsed ${matches.length} post blocks`);

  const posts = matches
    .map((m) => ({ embed: m[1], slug: m[2], pubDate: m[3] }))
    .filter((p) => p.slug !== "coming-soon")
    .slice(0, MAX_POSTS)
    .map((p) => ({
      title: titleFromSlug(p.slug),
      date: formatDate(p.pubDate),
      embed: p.embed,
    }));

  if (posts.length === 0) {
    console.error(`[${label}] No usable posts after filtering`);
    console.error(`[${label}] Body preview (first 1000 chars):\n${text.slice(0, 1000)}`);
    return null;
  }
  return posts;
}

// --- Driver -------------------------------------------------------------

const sources = [
  { name: "archive-api", run: fromArchiveApi },
  { name: "jina-reader", run: fromJinaReader },
];

let posts = null;
let usedSource = null;
for (const src of sources) {
  console.log(`--- Trying source: ${src.name} ---`);
  const result = await src.run();
  if (result && result.length > 0) {
    posts = result;
    usedSource = src.name;
    break;
  }
  console.log(`--- Source ${src.name} did not yield posts, continuing ---`);
}

if (!posts) {
  console.error("All sources failed; refusing to overwrite posts.json");
  process.exit(1);
}

await writeFile(OUT_PATH, JSON.stringify(posts, null, 2) + "\n");
console.log(`Wrote ${posts.length} posts to posts.json (via ${usedSource})`);
for (const p of posts) console.log(`  - ${p.date}  ${p.title}`);
