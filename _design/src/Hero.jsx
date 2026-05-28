// Hero A — "Profile-card" / centered logo (closest to the brand mark)
// Hero B — Editorial / asymmetric spread

function HeroA({ next }) {
  return (
    <section className="hero hero-a">
      {/* Soft gradient cloud bed — pulled from the profile pic */}
      <div className="cloud-stage">
        <div className="cloud c1" style={{ width: "75vw", height: "75vw", left: "-25%", top: "-30%",
          background: "radial-gradient(circle, var(--sky) 0%, var(--sky) 25%, transparent 65%)" }} />
        <div className="cloud c2" style={{ width: "60vw", height: "60vw", right: "-15%", top: "5%",
          background: "radial-gradient(circle, var(--pink) 0%, var(--pink) 20%, transparent 65%)" }} />
        <div className="cloud c3" style={{ width: "65vw", height: "65vw", left: "10%", bottom: "-35%",
          background: "radial-gradient(circle, var(--mint) 0%, var(--mint) 22%, transparent 65%)" }} />
        <div className="cloud c4" style={{ width: "55vw", height: "55vw", right: "5%", bottom: "-25%",
          background: "radial-gradient(circle, var(--peach) 0%, var(--peach) 20%, transparent 65%)" }} />
        <div className="cloud c5" style={{ width: "45vw", height: "45vw", left: "35%", top: "30%",
          background: "radial-gradient(circle, var(--pink-2) 0%, transparent 70%)" }} />
      </div>

      {/* white scribbles on the gradient */}
      <div className="scribble" style={{ top: "12%", left: "12%", color: "#fff" }}>
        <CrossScribble size={70} color="rgba(255,255,255,.95)" />
      </div>
      <div className="scribble" style={{ top: "18%", right: "10%", color: "#fff" }}>
        <SwirlScribble size={160} color="rgba(255,255,255,.95)" />
      </div>
      <div className="scribble" style={{ bottom: "12%", left: "16%", color: "#fff" }}>
        <StarScribble size={140} color="rgba(255,255,255,.95)" />
      </div>
      <div className="scribble" style={{ bottom: "18%", right: "20%", color: "#fff" }}>
        <CrossScribble size={50} color="rgba(255,255,255,.9)" />
      </div>

      <div className="hero-inner">
        <h1 className="hero-mark serif" aria-label="Yu+Me">
          <span className="hm-l" style={{ animationDelay: ".00s" }}>Y</span>
          <span className="hm-l" style={{ animationDelay: ".08s" }}>u</span>
          <span className="hm-l hm-plus" style={{ animationDelay: ".18s" }}>+</span>
          <span className="hm-l" style={{ animationDelay: ".28s" }}>M</span>
          <span className="hm-l" style={{ animationDelay: ".36s" }}>e</span>
        </h1>

        <div className="hero-meta hero-fade" style={{ animationDelay: ".55s" }}>
          <div className="meta-row">
            <span className="meta-jp">渋谷</span>
            <span className="meta-dot">·</span>
            <span>Shibuya, Tokyo</span>
          </div>
          <div className="meta-row">
            <span className="meta-jp">週末 12〜15時</span>
            <span className="meta-dot">·</span>
            <span>A Socratica node</span>
          </div>
        </div>

        <p className="hero-tag serif hero-fade" style={{ animationDelay: ".70s" }}>
          A space for makers, dreamers &amp; builders<br />
          to work on their <em>high-effort passion projects</em><br />
          together at the same table.
        </p>

        <div className="hero-cta hero-fade" style={{ animationDelay: ".85s" }}>
          <a href="#join" className="pill">
            Join next session
            <span className="arrow">→</span>
          </a>
          <a href="#about" className="pill ghost">What is Yu+Me?</a>
        </div>
      </div>

      {/* Bottom-right floating next-gathering chip */}
      <div className="hero-next hero-fade" style={{ animationDelay: "1.0s" }}>
        <span className="eyebrow">Next gathering</span>
        <div className="next-line serif">{next.dateLabel} <span className="text-pink">·</span> {next.timeLabel}</div>
        <div className="next-sub">Shibuya, Tokyo</div>
      </div>

      <style>{`
        .hero-a { min-height: 100vh; display: grid; place-items: center; padding: 140px 0 100px; position: relative; overflow: hidden; }
        .hero-inner { position: relative; z-index: 2; text-align: center; max-width: 1100px; padding: 0 32px; }
                .hero-mark {
          font-size: clamp(96px, 18vw, 260px);
          line-height: .85;
          letter-spacing: -.04em;
          color: var(--ink);
          margin: 0;
          display: inline-flex;
          align-items: baseline;
          filter: url(#crayon-rough);
        }
        .hero-mark .hm-l {
          display: inline-block;
          opacity: 0;
          transform: translateY(.2em) scale(.92);
          animation: hm-in .7s cubic-bezier(.2,.7,.2,1) forwards;
        }
        .hero-mark .hm-plus { color: var(--hot-pink); font-size: .7em; margin: 0 .03em; }
        @keyframes hm-in {
          from { opacity: 0; transform: translateY(.2em) scale(.9); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .hero-fade {
          opacity: 0;
          transform: translateY(12px);
          animation: hero-fade-in .8s cubic-bezier(.2,.7,.2,1) forwards;
        }
        @keyframes hero-fade-in {
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-meta { display: flex; gap: 24px; justify-content: center; margin: 28px 0 32px; font-size: 14px; letter-spacing: .04em; color: var(--ink-soft); flex-wrap: wrap; }
        .meta-row { display: inline-flex; align-items: center; gap: 10px; }
        .meta-jp { font-weight: 500; color: var(--ink); }
        .meta-dot { opacity: .4; }
                .hero-tag { font-size: clamp(22px, 2.6vw, 32px); line-height: 1.45; max-width: 720px; margin: 0 auto 44px; color: var(--ink); }
        .hero-tag em {
          font-style: italic;
          color: var(--hot-pink);
          background-image: linear-gradient(180deg,
            transparent 0%,
            transparent 28%,
            rgba(255,255,255,.82) 28%,
            rgba(255,255,255,.82) 96%,
            transparent 96%);
          padding: 0 .25em;
          border-radius: 2px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .hero-cta { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin: 0; }
        .hero-next { position: absolute; bottom: 32px; right: 32px; z-index: 3; display: inline-flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 18px 22px; background: rgba(255,255,255,.75); backdrop-filter: blur(10px); border-radius: 14px; text-align: left; box-shadow: 0 10px 30px -15px rgba(0,0,0,.2); }
        @media (max-width: 700px) { .hero-next { right: 16px; bottom: 16px; padding: 14px 18px; } .next-line { font-size: 18px !important; } }
        .next-line { font-size: 22px; }
        .next-sub { font-size: 13px; color: var(--ink-soft); }
      `}</style>
    </section>
  );
}

function HeroB({ next }) {
  // Editorial layout: big asymmetric wordmark, photo collage on the right, marquee top
  const pastDates = ["08.23", "09.06", "09.20", "10.04", "10.18", "11.07", "11.21"];

  return (
    <section className="hero hero-b">
      <div className="hero-b-top wrap">
        <div className="hero-b-id">
          <span className="eyebrow">Yu+Me — Vol. 12</span>
          <span className="eyebrow text-pink">A Socratica Node · Tokyo</span>
        </div>
      </div>

      <div className="wrap hero-b-grid">
        <div className="hero-b-left">
          <h1 className="hero-b-mark serif">
            <span className="line">Yu</span>
            <span className="line plus text-pink">+</span>
            <span className="line">Me</span>
          </h1>
          <p className="hero-b-tag serif">
            A weekend co-working session for makers, dreamers &amp; builders. Bring a passion project. Work alongside friends. <em>No work, no homework.</em>
          </p>
          <div className="hero-b-cta">
            <a href="#join" className="pill">RSVP for {next.dateShort} <span className="arrow">→</span></a>
            <a href="#about" className="pill ghost">About</a>
          </div>
          <div className="hero-b-meta">
            <div><span className="eyebrow">Where</span><div className="serif">{next.locationLabel}</div></div>
            <div><span className="eyebrow">When</span><div className="serif">週末 · {next.timeLabel}</div></div>
            <div><span className="eyebrow">Cost</span><div className="serif">Free, by RSVP</div></div>
          </div>
        </div>

        <div className="hero-b-right">
          <div className="collage">
            <div className="photo collage-1" style={{ "--tilt": "-3deg" }}>
              <div className="placeholder">SESSION PHOTO · AUG 23</div>
              <span className="tape-tag" style={{ top: "-14px", left: "-10px", color: "#fff" }}>
                <span style={{ filter: "url(#crayon-rough)" }}>Aug 23</span>
              </span>
            </div>
            <div className="photo collage-2" style={{ "--tilt": "4deg" }}>
              <div className="placeholder">SESSION PHOTO · SEP 06</div>
              <span className="tape-tag" style={{ bottom: "10px", left: "10px", color: "#fff" }}>
                <span style={{ filter: "url(#crayon-rough)" }}>Sep 06</span>
              </span>
            </div>
            <div className="photo collage-3" style={{ "--tilt": "-2deg" }}>
              <div className="placeholder">SESSION PHOTO · SEP 20</div>
              <span className="tape-tag" style={{ top: "10px", right: "10px", color: "#fff" }}>
                <span style={{ filter: "url(#crayon-rough)" }}>Sep 20</span>
              </span>
            </div>
            <div className="scribble" style={{ top: "-30px", right: "-20px" }}>
              <SwirlScribble size={140} color="var(--hot-pink)" />
            </div>
            <div className="scribble" style={{ bottom: "-30px", left: "20%" }}>
              <CrossScribble size={70} color="var(--hot-pink)" />
            </div>
            <div className="scribble" style={{ top: "40%", left: "-30px" }}>
              <StarScribble size={80} color="var(--hot-pink)" />
            </div>
          </div>
        </div>
      </div>

      <div className="marquee" style={{ marginTop: "100px" }}>
        <div className="track">
          {[...pastDates, ...pastDates].map((d, i) => (
            <span key={i} className="item">
              <span>{d}</span> <span className="dot" />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .hero-b { padding: 100px 0 0; position: relative; overflow: hidden; }
        .hero-b-top { display: flex; justify-content: space-between; padding-top: 24px; padding-bottom: 60px; }
        .hero-b-id { display: flex; justify-content: space-between; width: 100%; align-items: center; }
        .hero-b-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 900px) { .hero-b-grid { grid-template-columns: 1fr; gap: 64px; } }
        .hero-b-mark { font-size: clamp(110px, 16vw, 220px); line-height: .82; letter-spacing: -.045em; margin: 0; }
        .hero-b-mark .line { display: block; }
        .hero-b-mark .plus { font-size: .65em; margin-left: .25em; }
        .hero-b-tag { font-size: clamp(20px, 2.1vw, 26px); line-height: 1.4; margin: 32px 0 36px; max-width: 540px; color: var(--ink-soft); }
        .hero-b-tag em { font-style: italic; color: var(--ink); }
        .hero-b-cta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px; }
        .hero-b-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding-top: 28px; border-top: 1px solid rgba(24,20,16,.15); max-width: 540px; }
        .hero-b-meta .serif { font-size: 17px; margin-top: 4px; }
        .collage { position: relative; aspect-ratio: 4/4.5; }
        .collage .photo { position: absolute; width: 60%; }
        .collage-1 { top: 0;     left: 0;       transform: rotate(-3deg); width: 58%; }
        .collage-2 { top: 18%;   right: 0;      transform: rotate(4deg);  width: 60%; }
        .collage-3 { bottom: 0;  left: 20%;     transform: rotate(-2deg); width: 60%; }
      `}</style>
    </section>
  );
}

Object.assign(window, { HeroA, HeroB });
