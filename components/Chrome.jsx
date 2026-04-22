// Intro curtain — Maven-style wipe on first load
function Intro() {
  const [phase, setPhase] = useState("in"); // in | out | done
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 1400);
    const t2 = setTimeout(() => setPhase("done"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (phase === "done") return null;
  return (
    <div className={"intro-curtain " + phase}>
      <div className="intro-line">
        <span className="intro-kicker mono">WILLIAM XIA · PORTFOLIO</span>
        <span className="intro-title">
          Building <em>language models</em> by day, writing <em>fantasy</em> by night.
        </span>
      </div>
    </div>
  );
}
window.Intro = Intro;

// Tweaks panel
function Tweaks({ settings, setSettings }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setVisible(true);
      if (e.data.type === "__deactivate_edit_mode") setVisible(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);
  if (!visible) return null;

  const update = (k, v) => {
    const next = { ...settings, [k]: v };
    setSettings(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <span>Tweaks</span>
        <button onClick={() => setVisible(false)} aria-label="Close">×</button>
      </div>
      <div className="tweaks-body">
        <div className="tw-row">
          <label>Accent</label>
          <div className="tw-swatches">
            {[
              ["#2D4A3E", "forest"],
              ["#7A4A2B", "brown"],
              ["#8B1A1A", "oxblood"],
              ["#2A3A6B", "ink"],
              ["#1a1a1a", "mono"],
            ].map(([c, n]) => (
              <button
                key={c}
                className={"tw-swatch " + (settings.accent === c ? "on" : "")}
                style={{ background: c }}
                onClick={() => update("accent", c)}
                aria-label={n}
              />
            ))}
          </div>
        </div>
        <div className="tw-row">
          <label>Hero layout</label>
          <div className="tw-opts">
            {["editorial", "display", "minimal"].map((o) => (
              <button
                key={o}
                className={"tw-opt " + (settings.hero === o ? "on" : "")}
                onClick={() => update("hero", o)}
              >{o}</button>
            ))}
          </div>
        </div>
        <div className="tw-row">
          <label>Background warmth</label>
          <div className="tw-opts">
            {[
              ["cool", "#F1F1EE"],
              ["warm", "#F5F1EA"],
              ["paper", "#EFE7D5"],
            ].map(([n, c]) => (
              <button
                key={n}
                className={"tw-opt " + (settings.bg === n ? "on" : "")}
                onClick={() => update("bg", n)}
              >{n}</button>
            ))}
          </div>
        </div>
        <div className="tw-row">
          <label>Intro curtain</label>
          <div className="tw-opts">
            <button className={"tw-opt " + (settings.intro ? "on" : "")} onClick={() => update("intro", true)}>on</button>
            <button className={"tw-opt " + (!settings.intro ? "on" : "")} onClick={() => update("intro", false)}>off</button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.Tweaks = Tweaks;
