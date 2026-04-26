// Publications — compact list
function Publications() {
  const pubs = [
    {
      year: "2026",
      items: [
        {
          tag: "JBI",
          tagKind: "journal",
          title: "Lessons from the TREC Plain Language Adaptation of Biomedical Abstracts (PLABA) track",
          authors: ["Brian Ondov", "William Xia", "Kush Attal", "Ishita Unde", "Jerry He", "Dina Demner-Fushman"],
          authorIdx: 1,
          venue: "Journal of Biomedical Informatics, 2025",
          links: [
            { label: "JBI", href: "https://www.sciencedirect.com/science/article/pii/S1532046426000079" },
            { label: "ArXiv", href: "https://www.arxiv.org/abs/2507.14096" },
          ],
        },
      ]
    },
    {
      year: "2025",
      items: [
        {
          tag: "ACL",
          tagKind: "conference",
          title: "JEBS: A Fine-grained Biomedical Lexical Simplification Task",
          authors: ["William Xia", "Ishita Unde", "Brian Ondov", "Dina Demner-Fushman"],
          authorIdx: 0,
          venue: "Proceedings of the 63rd Annual Meeting of the Association of Computational Linguistics",
          links: [
            { label: "ACL", href: "https://aclanthology.org/2025.findings-acl.907/" },
            { label: "ArXiv", href: "https://www.arxiv.org/abs/2506.12898" },
            { label: "PDF", href: "https://www.arxiv.org/pdf/2506.12898" },
          ],
        },
        {
          tag: "IEEE",
          tagKind: "journal",
          title: "Decoding Chess Puzzle Play and Standard Cognitive Tasks for BCI: A Low-Cost EEG Study",
          authors: ["Matthew Russell", "Samuel Youkeles", "William Xia", "Kenny Zheng", "Aman Shah", "Robert J.K. Jacob"],
          authorIdx: 2,
          venue: "IEEE Transactions on Cognitive and Developmental Systems",
          links: [{ label: "ArXiv", href: "https://arxiv.org/abs/2505.07592" }],
        },
        {
          tag: "Thesis",
          tagKind: "thesis",
          title: "Grounding Large Language Models with Natural Language World Models",
          authors: ["William Xia"],
          authorIdx: 0,
          venue: "Senior Honors Thesis · Tufts Digital Library",
          links: [{ label: "PDF", href: "docs/Senior Thesis.pdf" }],
        },
        {
          tag: "NAT",
          tagKind: "conference",
          title: "Neural Correlates of Move Quality During Chess Games: A Low-Cost EEG Study",
          authors: ["Matthew Russell", "William Xia", "Samuel Youkeles", "Alexander Gu", "Robert J.K. Jacob"],
          authorIdx: 1,
          venue: "Proceedings of the 4th Neuroadaptive Technologies Conference",
          links: [
            { label: "NAT", href: "https://opus4.kobv.de/opus4-btu/frontdoor/index/index/docId/7215" },
            { label: "PDF", href: "docs/NAT25_CHESS.docx.pdf" },
          ],
        },
      ],
    },
  ];

  return (
    <section className="pubs" id="publications" data-screen-label="04 Publications">
      <div className="section-head">
        <span className="section-num">03</span>
        <span className="section-kicker">Publications</span>
      </div>
      <div className="pubs-top">
        <h2 className="section-title">
          Papers I've <em>published</em>
        </h2>
        <a className="ghost-link lg" href="https://scholar.google.com/citations?hl=en&user=KoY_mHQAAAAJ" target="_blank" rel="noreferrer">
          Google Scholar <span aria-hidden>→</span>
        </a>
      </div>

      {pubs.map((group) => (
        <div className="pub-group" key={group.year}>
          <div className="pub-year">{group.year}</div>
          <ol className="pub-list">
            {group.items.map((p, i) => (
              <li key={i} className="pub-item">
                <div className="pub-tag-wrap">
                  <span className={"pub-tag " + p.tagKind}>{p.tag}</span>
                </div>
                <div className="pub-body">
                  <h3 className="pub-title">{p.title}</h3>
                  <div className="pub-authors">
                    {p.authors.map((a, j) => (
                      <span key={j}>
                        {j === p.authorIdx ? <em>{a}</em> : a}
                        {j < p.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                  <div className="pub-venue">{p.venue}</div>
                  <div className="pub-links">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="mini-link">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}

window.Publications = Publications;
