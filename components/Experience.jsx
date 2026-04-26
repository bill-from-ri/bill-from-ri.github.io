// Experience — pinned scroll, like Maven
function Experience() {
  const items = [
    {
      date: "Oct 2025 — Present",
      role: "Founding Applied AI Engineer",
      org: "Maven Bio",
      where: "Boston, MA",
      body:
        "Building AI agents to accelerate biopharma business intelligence workflows. I contribute to our platform's main agent as well as various agentic automation processes within the site like our upcoming proactive monitoring system.",
      visual: "maven",
    },
    {
      date: "Jun — Sep 2025",
      role: "AI Product Management Intern",
      org: "Dassault Systèmes · SolidWorks",
      where: "Waltham, MA",
      body:
        "Developed and deployed a full-stack, local LLM agent that interfaces with Dassault's internal web APIs; the agent improved access to analytics and documentation for 20+ SolidWorks project managers.",
      visual: "solidworks",
    },
    {
      date: "Jun 2023 — May 2025",
      role: "Summer Research Intern",
      org: "National Library of Medicine · NIH",
      where: "Bethesda, MD",
      body:
        "Designed JEBS, a fine-grained lexical simplification task and dataset, presented at TREC 2024, NIH Poster Day, and ACL 2025. First-authored paper published in the ACL Findings. Advised by Dr. Dina Demner-Fushman and Dr. Brian Ondov.",
      visual: "nih",
    },
    {
      date: "May - Dec 2022",
      role: "Research Assistant",
      org: "Tufts University · HCI Lab",
      where: "Medford, MA",
      body:
        "Conducted research under Prof. Robert Jacob focused on differentiating mental workload states in people performing complex cognitive tasks (e.g. chess, n-back, mental rotation). Co-authored 2 papers based on my findings.",
      visual: "tufts_eng",
    },
    {
      date: "Sep 2021 — May 2025",
      role: "BS Computer Science",
      org: "Tufts University",
      where: "Medford, MA",
      body: (
        <>
          Graduated <em>Summa cum laude</em> (GPA 3.81) with minors in English and Mathematics. Spent 4 semesters as a teaching assistant for CS 105: Programming Languages. Completed a senior honors thesis on embodied AI agents.
        </>
      ),
      visual: "tufts_uni",
    },
  ];

  const wrapRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [pinProgress, setPinProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setPinProgress(p);
      const idx = Math.min(items.length - 1, Math.floor(p * items.length));
      setActiveIdx(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="xp"
      id="experience"
      data-screen-label="05 Experience"
      ref={wrapRef}
      style={{ height: `${items.length * 90}vh` }}
    >
      <div className="xp-sticky">
        <div className="xp-head">
          <div className="section-head">
            <span className="section-num">04</span>
            <span className="section-kicker">Experience</span>
          </div>
          <h2 className="section-title">
            Places I've <em>worked</em>
          </h2>
        </div>

        <div className="xp-stage">
          <div className="xp-rail">
            {items.map((it, i) => (
              <div key={i} className={"xp-rail-item " + (i === activeIdx ? "on" : "") + (i < activeIdx ? " past" : "")}>
                <div className="xp-rail-dot" />
                <div className="xp-rail-date">{it.date}</div>
              </div>
            ))}
            <div className="xp-rail-line">
              <div className="xp-rail-fill" style={{ height: (pinProgress * 100) + "%" }} />
            </div>
          </div>

          <div className="xp-content">
            {items.map((it, i) => (
              <div key={i} className={"xp-slide " + (i === activeIdx ? "on" : "")}>
                <div className="xp-text">
                  <div className="xp-org-wrap">
                    <span className="xp-counter">0{i + 1} / 0{items.length}</span>
                    <span className="xp-where">{it.where}</span>
                  </div>
                  <h3 className="xp-role">{it.role}</h3>
                  <div className="xp-org">{it.org}</div>
                  <p className="xp-body">{it.body}</p>
                </div>
                <div className="xp-visual">
                  <ExperienceVisual kind={it.visual} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xp-progress" aria-hidden>
          <div className="xp-progress-fill" style={{ width: (pinProgress * 100) + "%" }} />
        </div>
      </div>
    </section>
  );
}

function ExperienceVisual({ kind }) {
  const logos = {
    maven: { src: "assets/logos/maven.png", alt: "Maven Bio" },
    solidworks: { src: "assets/logos/solidworks.png", alt: "Dassault Systèmes SolidWorks" },
    nih: { src: "assets/logos/nlm.png", alt: "National Library of Medicine" },
    tufts_eng: { src: "assets/logos/tufts-eng.png", alt: "Tufts University" },
    tufts_uni: { src: "assets/logos/tufts-university.png", alt: "Tufts University" },
  };
  const [imgFailed, setImgFailed] = useState(false);
  const logo = logos[kind];
  if (logo && !imgFailed) {
    return (
      <img
        className="xp-logo"
        src={logo.src}
        alt={logo.alt}
        onError={() => setImgFailed(true)}
      />
    );
  }

  const common = { width: "100%", height: "100%", viewBox: "0 0 400 500", xmlns: "http://www.w3.org/2000/svg" };
  if (kind === "maven") {
    return (
      <svg {...common}>
        <defs>
          <pattern id="mvstripe" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#2D4A3E" strokeWidth="1" opacity="0.12"/>
          </pattern>
        </defs>
        <rect width="400" height="500" fill="#EAE4D6"/>
        <rect width="400" height="500" fill="url(#mvstripe)"/>
        <g transform="translate(200 250)">
          <circle r="90" fill="none" stroke="#2D4A3E" strokeWidth="1.2" opacity="0.5"/>
          <circle r="60" fill="none" stroke="#2D4A3E" strokeWidth="1.2" opacity="0.7"/>
          <circle r="30" fill="#2D4A3E"/>
          {[0,60,120,180,240,300].map(a => {
            const rad = a * Math.PI / 180;
            return <line key={a} x1={Math.cos(rad)*30} y1={Math.sin(rad)*30} x2={Math.cos(rad)*90} y2={Math.sin(rad)*90} stroke="#2D4A3E" strokeWidth="1"/>;
          })}
        </g>
        <text x="30" y="470" fontFamily="ui-monospace,monospace" fontSize="10" fill="#2D4A3E">MAVEN BIO · AI FOR BIOPHARMA</text>
      </svg>
    );
  }
  if (kind === "solidworks") {
    return (
      <svg {...common}>
        <rect width="400" height="500" fill="#E8E0D0"/>
        <g fill="none" stroke="#7A4A2B" strokeWidth="1.2" transform="translate(200 250)">
          <polygon points="-90,-70 90,-70 110,70 -110,70"/>
          <polygon points="-90,-70 -110,70 -70,100 -50,-40"/>
          <polygon points="90,-70 70,-40 50,100 110,70"/>
          <line x1="-50" y1="-40" x2="50" y2="-40"/>
          <line x1="-50" y1="-40" x2="-70" y2="100"/>
          <line x1="50" y1="-40" x2="70" y2="100"/>
        </g>
        <text x="30" y="470" fontFamily="ui-monospace,monospace" fontSize="10" fill="#7A4A2B">SOLIDWORKS · PRODUCT MGMT</text>
      </svg>
    );
  }
  if (kind === "nih") {
    return (
      <svg {...common}>
        <rect width="400" height="500" fill="#E6DFD0"/>
        <g transform="translate(200 250)" fill="none" stroke="#2A3A6B" strokeWidth="1.3">
          {Array.from({length:30}).map((_,i)=>{
            const t = i/29;
            const y = -120 + t*240;
            const x1 = Math.sin(t*Math.PI*4) * 60;
            const x2 = -x1;
            return <g key={i}>
              <line x1={x1} y1={y} x2={x2} y2={y} opacity={0.35+0.4*Math.abs(Math.sin(t*Math.PI*4))}/>
            </g>;
          })}
        </g>
        <text x="30" y="470" fontFamily="ui-monospace,monospace" fontSize="10" fill="#2A3A6B">NLM · NIH · BIOMEDICAL NLP</text>
      </svg>
    );
  }
  // tufts
  return (
    <svg {...common}>
      <rect width="400" height="500" fill="#E9E1D1"/>
      <g transform="translate(200 250)" fill="none" stroke="#5A3A7A" strokeWidth="1.2">
        <rect x="-120" y="-40" width="240" height="120"/>
        <polygon points="-140,-40 0,-120 140,-40"/>
        <line x1="-120" y1="80" x2="120" y2="80"/>
        <rect x="-20" y="20" width="40" height="60"/>
        <line x1="-80" y1="-40" x2="-80" y2="80"/>
        <line x1="-40" y1="-40" x2="-40" y2="80"/>
        <line x1="40" y1="-40" x2="40" y2="80"/>
        <line x1="80" y1="-40" x2="80" y2="80"/>
      </g>
      <text x="30" y="470" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5A3A7A">TUFTS UNIVERSITY · BS CS</text>
    </svg>
  );
}

window.Experience = Experience;
