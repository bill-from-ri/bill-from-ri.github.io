// Content — Substack featured cards
function Content() {
  const substack = [
    { title: "What is Epidemiology?", date: "Coming soon" },
    { title: "Social Determinants of Health", date: "Coming soon" },
    {
      title: "What is Public Health?",
      date: "April 28, 2026",
      embed: "https://billxia.substack.com/p/what-is-public-health",
    },
  ];

  React.useEffect(() => {
    if (!substack.some((p) => p.embed)) return;
    const script = document.createElement("script");
    script.src = "https://substack.com/embedjs/embed.js";
    script.async = true;
    script.charSet = "utf-8";
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // const youtube = [
  //   { title: "Building an isometric VTT", date: "Coming soon", dur: "15:00", kind: "Dev Diary" },
  //   { title: "MapSlice: Game Engine Dev Diary", date: "Coming soon", dur: "15:00", kind: "Dev Diary" },
  //   { title: "Welcome to my channel!", date: "Coming soon", dur: "3:00", kind: "Welcome" },
  // ];

  return (
    <section className="content" id="content" data-screen-label="07 Content">
      <div className="section-head">
        <span className="section-num">06</span>
        <span className="section-kicker">Substack</span>
      </div>
      <h2 className="section-title">
        My public <em>journal</em>
      </h2>
      <p className="section-lede">
        Substack is where I document my self-learning journey into the life sciences.
        {/* YouTube is where I share dev diaries and other project updates. */}
      </p>

      <div className="cc-block">
        <div className="cc-row">
          {substack.map((p, i) => (
            p.embed ? (
              <div key={i} className="cc-card cc-card-embed">
                <div className="substack-post-embed">
                  <p lang="en">{p.title} by Bill Xia</p>
                  <p></p>
                  <a data-post-link href={p.embed}>Read on Substack</a>
                </div>
              </div>
            ) : (
              <article key={i} className="cc-card cc-card-post">
                <div className="cc-card-art">
                  <svg viewBox="0 0 400 240" preserveAspectRatio="none">
                    <defs>
                      <pattern id={"sp-"+i} patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="400" height="240" fill="currentColor" opacity="0.08"/>
                    <rect width="400" height="240" fill={"url(#sp-"+i+")"}/>
                  </svg>
                  <div className="cc-card-placeholder mono">post preview</div>
                </div>
                <div className="cc-card-body">
                  <h3 className="cc-card-title">{p.title}</h3>
                  <div className="cc-card-date mono">{p.date}</div>
                </div>
              </article>
            )
          ))}
        </div>
      </div>

      {/*
      <div className="cc-block">
        <div className="cc-head">
          <div className="cc-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor"/><polygon points="10,9 16,12 10,15" fill="#F5F1EA"/></svg>
            <span className="cc-name">YouTube</span>
            <span className="cc-handle mono">@bill-from-ri</span>
          </div>
          <a className="ghost-link" href="https://www.youtube.com/@bill-from-ri" target="_blank" rel="noreferrer">Subscribe <span aria-hidden>→</span></a>
        </div>
        <div className="cc-row">
          {youtube.map((v, i) => (
            <article key={i} className="cc-card cc-card-video">
              <div className="cc-card-art">
                <svg viewBox="0 0 400 225" preserveAspectRatio="none">
                  <defs>
                    <pattern id={"yp-"+i} patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(-45)">
                      <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.28"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="225" fill="currentColor" opacity="0.08"/>
                  <rect width="400" height="225" fill={"url(#yp-"+i+")"}/>
                </svg>
                <div className="cc-play" aria-hidden>
                  <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="1.2"/><polygon points="19,15 35,24 19,33" fill="currentColor"/></svg>
                </div>
                <div className="cc-dur mono">{v.dur}</div>
              </div>
              <div className="cc-card-body">
                <div className="cc-card-meta mono">{v.kind.toUpperCase()}</div>
                <h3 className="cc-card-title">{v.title}</h3>
                <div className="cc-card-date mono">{v.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
      */}
    </section>
  );
}

window.Content = Content;
