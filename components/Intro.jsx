// Intro — full-screen curtain shown on first visit (2.4s, gated by sessionStorage in App)
function Intro() {
  console.log('[Intro] function called (rendering) at', performance.now().toFixed(0), 'ms');
  React.useEffect(() => {
    console.log('[Intro] useEffect fired (mounted) at', performance.now().toFixed(0), 'ms');
    return () => console.log('[Intro] unmounted at', performance.now().toFixed(0), 'ms');
  }, []);
  return (
    <div className="intro-curtain" role="presentation" aria-hidden="true">
      <div className="intro-line">
        <div className="intro-kicker">PORTFOLIO · 2026</div>
        <h1 className="intro-title">William <em>Xia</em></h1>
      </div>
    </div>
  );
}

window.Intro = Intro;
