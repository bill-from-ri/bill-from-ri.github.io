// Content — Substack + YouTube featured cards
function Content() {
  const substack = [
    { title: "Epidemiology and the People's Health", date: "Coming soon", read: "10 min", kind: "Book Review" },
    { title: "How I Use AI", date: "Coming soon", read: "10 min", kind: "Ideas" },
    { title: "Welcome to my Substack!", date: "Coming soon", read: "3 min", kind: "Welcome" },
  ];
  const youtube = [
    { title: "Building an isometric VTT", date: "Coming soon", dur: "15:00", kind: "Dev Diary" },
    { title: "MapSlice: Game Engine Dev Diary", date: "Coming soon", dur: "15:00", kind: "Dev Diary" },
    { title: "Welcome to my channel!", date: "Coming soon", dur: "3:00", kind: "Welcome" },
  ];

  return (
    <section className="content" id="content" data-screen-label="07 Content">
      <div className="section-head">
        <span className="section-num">06</span>
        <span className="section-kicker">Content Creation</span>
      </div>
      <h2 className="section-title">
        My public <em>journal</em>
      </h2>
      <p className="section-lede">
        Substack is where I document my self-learning journey into the life sciences. YouTube is where I share dev diaries and other project updates.
      </p>

      <div className="cc-block">
        <div className="cc-head">
          <div className="cc-brand">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><rect x="3" y="3" width="18" height="3" fill="currentColor"/><rect x="3" y="9" width="18" height="3" fill="currentColor"/><polygon points="3,15 12,21 21,15" fill="currentColor"/></svg>
            <span className="cc-name">Substack</span>
            <span className="cc-handle mono">@billxia</span>
          </div>
          <a className="ghost-link" href="#" target="_blank" rel="noreferrer">Subscribe <span aria-hidden>→</span></a>
        </div>
        <div className="cc-row">
          {substack.map((p, i) => (
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
                <div className="cc-card-meta mono">{p.kind.toUpperCase()} · {p.read}</div>
                <h3 className="cc-card-title">{p.title}</h3>
                <div className="cc-card-date mono">{p.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="cc-block">
        <div className="cc-head">
          <div className="cc-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor"/><polygon points="10,9 16,12 10,15" fill="#F5F1EA"/></svg>
            <span className="cc-name">YouTube</span>
            <span className="cc-handle mono">@bill-from-ri</span>
          </div>
          <a className="ghost-link" href="#" target="_blank" rel="noreferrer">Subscribe <span aria-hidden>→</span></a>
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
    </section>
  );
}

window.Content = Content;
