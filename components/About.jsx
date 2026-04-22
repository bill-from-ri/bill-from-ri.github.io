// About — bio + Live Telemetry card
function About() {
  const telemetry = [
    { label: "Reading", value: "Pachinko", sub: "Min Jin Lee" },
    { label: "Bouldering", value: "V3–V4", sub: "working on heel hooks" },
    { label: "Listening", value: "Barns Courtney", sub: "on repeat" },
    { label: "Gaming", value: "Crusader Kings 3", sub: "ruining my sleep" },
  ];

  return (
    <section className="about" id="about" data-screen-label="02 About">
      <div className="section-head">
        <span className="section-num">01</span>
        <span className="section-kicker">About</span>
      </div>

      <div className="about-grid">
        <div className="about-prose">
          <h2 className="section-title">
            I build <em>language models</em> by day and
            <br />write <em>fantasy</em> by night.
          </h2>
          <div className="about-body">
            <p>
              Hello — I'm Bill. I'm a Founding Applied AI Engineer at
              {" "}<a href="https://mavenbio.com/" target="_blank" rel="noreferrer">Maven Bio</a>,
              where I'm helping build AI agents for biopharma research. I
              graduated from Tufts in May 2025 with a BS in Computer Science
              and minors in English and Mathematics.
            </p>
            <p>
              My research centers on natural language processing — biomedical
              text simplification, information retrieval, and grounding large
              language models in embodied environments. My first-authored
              paper on biomedical lexical simplification was published at
              ACL 2025.
            </p>
            <p>
              When I'm not debugging a retrieval pipeline, I'm usually
              worldbuilding for a D&amp;D campaign, drafting a short story,
              or falling off a V4 at the climbing gym.
            </p>
          </div>
        </div>

        <aside className="telemetry-card" aria-label="Live telemetry">
          <div className="telemetry-head">
            <div className="telemetry-pulse" aria-hidden="true">
              <span /><span /><span />
            </div>
            <div className="telemetry-title">Live Telemetry</div>
            <div className="telemetry-status">ACTIVE</div>
          </div>
          <dl className="telemetry-list">
            {telemetry.map((t, i) => (
              <div className="telemetry-row" key={i}>
                <dt>{t.label}</dt>
                <dd>
                  <span className="tv-main">{t.value}</span>
                  <span className="tv-sub">{t.sub}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="telemetry-foot">
            <span className="mono">last sync · just now</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

window.About = About;
