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
