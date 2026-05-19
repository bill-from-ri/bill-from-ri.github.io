#!/usr/bin/env node
// Fetches the Substack RSS feed and writes the latest posts to posts.json
// in the shape Content.jsx expects: { title, date, embed }.

import { writeFile } from "node:fs/promises";

const FEED_URL = "https://billxia.substack.com/feed";
const OUT_PATH = new URL("../posts.json", import.meta.url);
const MAX_POSTS = 3;

const stripCdata = (s) =>
  s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();

const pickTag = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return m ? stripCdata(m[1]) : "";
};

const formatDate = (rfc822) => {
  const d = new Date(rfc822);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

const res = await fetch(FEED_URL, { headers: { "user-agent": "onionLad.github.io refresh-substack" } });
if (!res.ok) {
  console.error(`Feed fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const xml = await res.text();

const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);

const posts = items
  .map((block) => ({
    title: pickTag(block, "title"),
    embed: pickTag(block, "link"),
    pubDate: pickTag(block, "pubDate"),
  }))
  .filter((p) => p.title && p.embed && !/\/p\/coming-soon$/.test(p.embed))
  .slice(0, MAX_POSTS)
  .map((p) => ({ title: p.title, date: formatDate(p.pubDate), embed: p.embed }));

if (posts.length === 0) {
  console.error("No posts parsed from feed; refusing to overwrite posts.json");
  process.exit(1);
}

await writeFile(OUT_PATH, JSON.stringify(posts, null, 2) + "\n");
console.log(`Wrote ${posts.length} posts to posts.json`);
for (const p of posts) console.log(`  - ${p.date}  ${p.title}`);
