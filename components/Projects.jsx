// Projects — stacking scroll tabs, Maven-style
function Projects() {
  const projects = [
    {
      id: "rfl",
      label: "The RFL Agent",
      date: "Jun–Sep 2025",
      org: "Dassault Systèmes SolidWorks",
      tag: "Agentic AI",
      headline: "An agent that automates Product Management workflows.",
      body:
        "My main project while interning at SolidWorks: a locally-hosted agent that automates search-and-summarize, question-answering, and text summarization tasks across internal PM workflows. Throughout my internship, I owned the UI, backend API, and testing framework.",
      chips: ["LangChain", "FastAPI", "React", "Docker"],
      links: [{ label: "Slides", href: "docs/billxia.pdf" }],
      visual: "rfl",
      accent: "#2D4A3E",
    },
    {
      id: "jebs",
      label: "JEBS",
      date: "Jun 2023 – Jun 2025",
      org: "National Library of Medicine · NIH",
      tag: "BioNLP",
      headline: "A fine-grained biomedical lexical simplification task.",
      body:
        "The culmination of my two summer research internships at the NLM. I annotated 1,200+ sentence pairs and developed a suite of language models that identify, simplify, and explain non-consumer biomedical terms in research abstracts. Presented at TREC 2024 and ACL 2025 in Vienna. First-authored paper published in the ACL Findings.",
      chips: ["NLP", "Fine-tuning", "Hugging Face", "PyTorch"],
      links: [
        { label: "ACL Paper", href: "https://aclanthology.org/2025.findings-acl.907/" },
        { label: "ArXiv", href: "https://www.arxiv.org/abs/2506.12898" },
        { label: "ACL Poster", href: "docs/ACL 2025_Find-3515_poster.pdf" },
      ],
      visual: "jebs",
      accent: "#7A4A2B",
    },
    {
      id: "worldmodels",
      label: "World Models",
      date: "Sep 2024 – May 2025",
      org: "Senior Honors Thesis · Tufts",
      tag: "Embodied AI",
      headline: "Grounding LLMs in embodied puzzle environments.",
      body:
        "For my thesis, I built a novel OpenAI Gym environment for embodied puzzle solving and benchmarked various LLMs grounding strategies against reinforcement learning agents. My results reveal a clear gap between what LLMs claim to know and what they actually understand, pointing the way for future grounding work.",
      chips: ["RL", "LangChain", "Ollama", "OpenAI Gym"],
      links: [
        { label: "GitHub", href: "https://github.com/bill-from-ri/EscGridEnv_Public" },
        { label: "PDF", href: "docs/WorldModels.pdf" },
      ],
      visual: "worldmodels",
      accent: "#2A3A6B",
    },
    {
      id: "kgrag",
      label: "KG-RAG Chatbot",
      date: "April 2025",
      org: "Full-stack interview project",
      tag: "Side project",
      headline: "A customer-support chatbot backed by a knowledge graph.",
      body:
        "A full-stack webapp built around an LLM-powered chatbot with a Neo4j knowledge graph for retrieval-augmented generation. LangChain and Ollama on the model side, Flask backend, React frontend. Implemented in 1 week as part of the SolidWorks interview process.",
      chips: ["Neo4j", "LangChain", "Flask", "React"],
      links: [
        { label: "GitHub", href: "https://github.com/bill-from-ri/KG_RAG" },
        { label: "Slides", href: "docs/DS Project Presentation.pdf" },
      ],
      visual: "kgrag",
      accent: "#8B1A1A",
    },
    {
      id: "alchemist",
      label: "Alchemist's Dungeon",
      date: "February 2022",
      org: "CS 23 · Game Design",
      tag: "Game",
      headline: "A 2D puzzle game with slippery floors.",
      body:
        "A single-player puzzle game I built with three classmates at Tufts. Players must navigate levels with slippery floors to collect potion ingredients.",
      chips: ["Unity", "C#"],
      links: [{ label: "itch.io", href: "https://alko08.itch.io/alchemists-dungeon" }],
      visual: "alchemist",
      accent: "#5A3A7A",
    },
  ];

  const stackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!stackRef.current) return;
      const cards = stackRef.current.querySelectorAll(".proj-card");
      const viewportMid = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const mid = (r.top + r.bottom) / 2;
        const d = Math.abs(mid - viewportMid);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActive(bestIdx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="projects" id="projects" data-screen-label="03 Projects">
      <div className="section-head">
        <span className="section-num">02</span>
        <span className="section-kicker">Projects</span>
      </div>
      <h2 className="section-title">
        Selected <em>work</em>
      </h2>
      <p className="section-lede">
        A handful of programming projects I've worked on in the past. For a more comprehensive list of my projects, check out my <a href="#publications">Publications</a> and <a href="https://github.com/bill-from-ri">GitHub</a>.
      </p>

      <div className="proj-tabs" role="tablist">
        {projects.map((p, i) => (
          <button
            key={p.id}
            className={"proj-tab " + (i === active ? "on" : "")}
            onClick={() => {
              const el = document.getElementById("proj-" + p.id);
              if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
            }}
          >
            <span className="tn">0{i + 1}</span>
            <span className="tl">{p.label}</span>
          </button>
        ))}
      </div>

      <div className="proj-stack" ref={stackRef}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total }) {
  const top = 100 + index * 14; // stack offset
  return (
    <article
      className="proj-card"
      id={"proj-" + project.id}
      style={{ top: top + "px", zIndex: index + 1, "--accent": project.accent }}
    >
      <div className="proj-card-inner">
        <header className="proj-head">
          <div className="proj-head-l">
            <span className="proj-tag">{project.tag}</span>
            <span className="proj-date">{project.date}</span>
          </div>
          <span className="proj-idx">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </header>

        <div className="proj-body">
          <div className="proj-text">
            <div className="proj-org">{project.org}</div>
            <h3 className="proj-label">{project.label}</h3>
            <p className="proj-headline">{project.headline}</p>
            <p className="proj-desc">{project.body}</p>
            <div className="proj-chips">
              {project.chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
            <div className="proj-links">
              {project.links.map((l) => (
                <a key={l.label} className="ghost-link" href={l.href} target="_blank" rel="noreferrer">
                  {l.label} <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>
          <div className="proj-visual">
            <ProjectVisual kind={project.visual} accent={project.accent} label={project.label} />
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectVisual({ kind, accent, label }) {
  if (kind === "jebs") {
    return (
      <svg viewBox="0 0 400 300" className="pv-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#F5F1EA"/>
        <g fill="none" stroke={accent} strokeWidth="1.2">
          <line x1="40" y1="60" x2="360" y2="60" />
          <line x1="40" y1="90" x2="280" y2="90" />
          <line x1="40" y1="120" x2="340" y2="120" />
          <line x1="40" y1="150" x2="220" y2="150" />
        </g>
        <rect x="120" y="50" width="140" height="20" fill={accent} fillOpacity="0.14" rx="2"/>
        <rect x="100" y="110" width="90" height="20" fill={accent} fillOpacity="0.24" rx="2"/>
        <g fontFamily="ui-monospace,monospace" fontSize="9" fill={accent}>
          <text x="40" y="220">ACUTE MYOCARDIAL INFARCTION → heart attack</text>
          <text x="40" y="238">HEPATOMEGALY → enlarged liver</text>
          <text x="40" y="256">HYPERCHOLESTEROLEMIA → high cholesterol</text>
        </g>
        <g stroke={accent} strokeWidth="1.5" fill="none">
          <path d="M260 60 Q 300 100 260 130" />
          <polygon points="258,126 265,130 262,122" fill={accent}/>
        </g>
        <text x="40" y="285" fontFamily="ui-monospace,monospace" fontSize="8" fill="#999">fig. biomedical lexical simplification</text>
      </svg>
    );
  }
  if (kind === "rfl") {
    return (
      <svg viewBox="0 0 400 300" className="pv-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#F5F1EA"/>
        <g fill="none" stroke={accent} strokeWidth="1">
          {[0,1,2,3,4,5].map(i => <line key={i} x1="40" y1={50+i*40} x2="360" y2={50+i*40} />)}
        </g>
        <circle cx="200" cy="150" r="28" fill={accent} />
        <circle cx="200" cy="150" r="44" fill="none" stroke={accent} strokeWidth="1" opacity="0.4"/>
        <circle cx="200" cy="150" r="64" fill="none" stroke={accent} strokeWidth="1" opacity="0.2"/>
        <g stroke={accent} strokeWidth="1" fill="none">
          <line x1="200" y1="150" x2="110" y2="90"/>
          <line x1="200" y1="150" x2="300" y2="90"/>
          <line x1="200" y1="150" x2="100" y2="220"/>
          <line x1="200" y1="150" x2="310" y2="220"/>
        </g>
        {[[110,90],[300,90],[100,220],[310,220]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="8" fill="#F5F1EA" stroke={accent} strokeWidth="1.4"/>
        ))}
        <text x="200" y="154" textAnchor="middle" fontFamily="EB Garamond, serif" fontSize="14" fill="#F5F1EA" fontStyle="italic">agent</text>
        <g fontFamily="ui-monospace,monospace" fontSize="8" fill={accent}>
          <text x="70" y="80">search</text>
          <text x="270" y="80">summarize</text>
          <text x="60" y="240">retrieve</text>
          <text x="270" y="240">synthesize</text>
        </g>
      </svg>
    );
  }
  if (kind === "worldmodels") {
    return (
      <svg viewBox="0 0 400 300" className="pv-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#F5F1EA"/>
        {/* grid env */}
        <g transform="translate(40,40)">
          {Array.from({length:6}).map((_,r)=>
            Array.from({length:8}).map((_,c)=>(
              <rect key={r+"-"+c} x={c*28} y={r*28} width="27" height="27" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.35"/>
            ))
          )}
          <rect x={2*28} y={3*28} width="27" height="27" fill={accent} opacity="0.8"/>
          <rect x={5*28} y={1*28} width="27" height="27" fill={accent} opacity="0.4"/>
          <rect x={6*28} y={4*28} width="27" height="27" fill="none" stroke={accent} strokeWidth="2"/>
          <path d={`M${2*28+14} ${3*28+14} L${5*28+14} ${1*28+14} L${6*28+14} ${4*28+14}`} fill="none" stroke={accent} strokeWidth="1.4" strokeDasharray="3 3"/>
        </g>
        <text x="40" y="260" fontFamily="ui-monospace,monospace" fontSize="9" fill={accent}>agent_pos = (2,3)  goal = (6,4)</text>
        <text x="40" y="278" fontFamily="ui-monospace,monospace" fontSize="9" fill="#999">env: EscGridEnv-v0</text>
      </svg>
    );
  }
  if (kind === "kgrag") {
    return (
      <svg viewBox="0 0 400 300" className="pv-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#F5F1EA"/>
        {/* knowledge graph */}
        {[[200,60],[110,140],[290,140],[80,230],[200,230],[320,230]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="18" fill="#F5F1EA" stroke={accent} strokeWidth="1.4"/>
          </g>
        ))}
        <g stroke={accent} strokeWidth="1" opacity="0.6">
          <line x1="200" y1="60" x2="110" y2="140"/>
          <line x1="200" y1="60" x2="290" y2="140"/>
          <line x1="110" y1="140" x2="80" y2="230"/>
          <line x1="110" y1="140" x2="200" y2="230"/>
          <line x1="290" y1="140" x2="200" y2="230"/>
          <line x1="290" y1="140" x2="320" y2="230"/>
        </g>
        <g fontFamily="EB Garamond, serif" fontSize="11" fill={accent} textAnchor="middle" fontStyle="italic">
          <text x="200" y="64">pin</text>
          <text x="110" y="144">user</text>
          <text x="290" y="144">board</text>
          <text x="80" y="234">tag</text>
          <text x="200" y="234">share</text>
          <text x="320" y="234">reply</text>
        </g>
      </svg>
    );
  }
  // alchemist — show real img
  return (
    <div className="pv-img" style={{ backgroundImage: "url(assets/alchemist-dungeon.png)" }}>
      <div className="pv-img-tint" />
    </div>
  );
}

window.Projects = Projects;
