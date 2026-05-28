// All non-hero sections: Manifesto, How It Works, Upcoming, Demos, Gallery, Hosts, FAQ, Join CTA, Footer.

const NEXT = {
  dateLabel: "Sat. Dec 6",
  dateShort: "Dec 6",
  timeLabel: "12:00 – 15:00",
  locationLabel: "Cr/pto Café & Bar, Shibuya",
};

// ---------------------- MANIFESTO ----------------------
function Manifesto() {
  return (
    <section id="about" className="section-pad manifesto">
      <div className="wrap">
        <div className="manifesto-grid">
          <div className="manifesto-left">
            <span className="divider-jp">私たちについて · About</span>
            <h2 className="h-section">
              Come make<br />
              <em>your thing</em>,<br />
              with us.
            </h2>
            <div className="scribble" style={{ top: "12%", right: "-40px" }}>
              <UnderlineScribble size={220} color="var(--hot-pink)" />
            </div>
          </div>
          <div className="manifesto-right">
            <p>
              Yu+Me is a weekend co-working session in Shibuya, part of <a href="https://socratica.info" className="text-pink">Socratica</a> — a global network of 40+ nodes where students, alumni, artists and tinkerers gather to make stuff together.
            </p>
            <p>
              We're united by the love of making things, and we want to help you make your thing. Bring a passion project — coding, writing, knitting, music, gardening, anything. We'll work in Pomodoros, demo what we made, eat snacks, and become friends.
            </p>
            <p className="manifesto-emph serif">
              No work allowed. No homework. <span className="text-pink">Just the stuff you'd do anyway, with people who care.</span>
            </p>
            <div className="manifesto-stats">
              <div><div className="stat-n serif">40+</div><div className="stat-l">Socratica nodes worldwide</div></div>
              <div><div className="stat-n serif">3h</div><div className="stat-l">Per session</div></div>
              <div><div className="stat-n serif">¥0</div><div className="stat-l">Always free, by RSVP</div></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .manifesto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        @media (max-width: 900px) { .manifesto-grid { grid-template-columns: 1fr; gap: 40px; } }
        .manifesto-left { position: relative; }
        .manifesto-left .divider-jp { margin-bottom: 24px; }
        .manifesto-left .h-section em { font-style: italic; color: var(--hot-pink); }
        .manifesto-right { font-size: 19px; line-height: 1.55; color: var(--ink-soft); padding-top: 40px; }
        .manifesto-right p { margin: 0 0 24px; }
        .manifesto-right a { border-bottom: 1px solid currentColor; }
        .manifesto-emph { font-family: var(--serif); font-size: 26px !important; color: var(--ink); line-height: 1.3 !important; }
        .manifesto-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(24,20,16,.15); }
        .stat-n { font-size: 48px; line-height: 1; color: var(--ink); }
        .stat-l { font-size: 13px; color: var(--ink-soft); margin-top: 6px; letter-spacing: .02em; }
      `}</style>
    </section>
  );
}

// ---------------------- HOW IT WORKS ----------------------
function HowItWorks() {
  const steps = [
    { n: "01", jp: "集合", t: "Arrive & say hi", body: "Doors open 11:50. We start with snacks, intros and ~15 min of small talk. New face? You'll be welcomed by name.", color: "sky" },
    { n: "02", jp: "宣言", t: "Declare your project", body: "Everyone gets 30 seconds to say what they're working on today. The smaller and weirder, the better.", color: "peach" },
    { n: "03", jp: "集中", t: "Pomodoro work blocks", body: "Two 50-minute focus blocks with a 10-minute break between. Headphones in. Get the thing done.", color: "mint" },
    { n: "04", jp: "発表", t: "Demos & celebrate", body: "Show what you made. 3 bullet points or a half-broken prototype — both count. We clap loudly.", color: "pink" },
  ];
  return (
    <section className="section-pad how-section" id="how">
      <div className="wrap">
        <div className="how-head">
          <span className="divider-jp">流れ · How a session works</span>
          <h2 className="h-section">3 hours, one table,<br />everyone's making.</h2>
          <p className="how-sub">Loosely structured. Mostly snacks and Pomodoros.</p>
        </div>

        <div className="how-grid">
          {steps.map((s, i) => (
            <div key={i} className={"note " + s.color}>
              <div className="tape" />
              <div className="step-n serif">{s.n}</div>
              <div className="step-jp">{s.jp}</div>
              <h3 className="step-t serif">{s.t}</h3>
              <p className="step-body">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="scribble" style={{ top: "26%", left: "16px", transform: "rotate(-6deg)" }}>
          <SwirlScribble size={140} color="var(--hot-pink)" />
        </div>
      </div>

      <style>{`
        .how-section { background: var(--paper); position: relative; overflow: hidden; }
        .how-head { text-align: center; margin-bottom: 64px; }
        .how-head .divider-jp { display: inline-flex; margin-bottom: 24px; }
        .how-head h2 { margin-bottom: 16px; }
        .how-sub { font-size: 18px; color: var(--ink-soft); max-width: 480px; margin: 0 auto; }
        .how-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 900px) { .how-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .how-grid { grid-template-columns: 1fr; } }
        .step-n { font-size: 42px; line-height: 1; color: var(--hot-pink); }
        .step-jp { font-size: 12px; letter-spacing: .15em; color: var(--ink-soft); margin: 8px 0 12px; }
        .step-t { font-size: 24px; margin: 0 0 12px; line-height: 1.15; }
        .step-body { margin: 0; font-size: 15px; line-height: 1.5; color: var(--ink-soft); }
      `}</style>
    </section>
  );
}

// ---------------------- UPCOMING SESSIONS ----------------------
function Upcoming() {
  const sessions = [
    { d: "12.06", day: "Sat", title: "Yu+Me · Vol. 12 — Year-end show & tell", loc: "Cr/pto Café & Bar, Shibuya", spots: "12 / 24 spots left", next: true },
    { d: "12.20", day: "Sat", title: "Yu+Me · Vol. 13 — Holiday craft session", loc: "TBD, Shibuya", spots: "RSVP opens Dec 8", next: false },
    { d: "01.10", day: "Sat", title: "Yu+Me · Vol. 14 — First gathering of '26", loc: "Cr/pto Café & Bar, Shibuya", spots: "Save the date", next: false },
  ];
  return (
    <section id="sessions" className="section-pad gradient-section">
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="up-head">
          <span className="divider-jp" style={{ color: "var(--ink)" }}>次回 · Upcoming sessions</span>
          <h2 className="h-section">Pull up a chair.</h2>
        </div>
        <div className="up-list">
          {sessions.map((s, i) => (
            <a href="https://luma.com/YuMe" key={i} className={"up-row " + (s.next ? "is-next" : "")}>
              <div className="up-date serif">
                <span className="up-d">{s.d}</span>
                <span className="up-day">{s.day}</span>
              </div>
              <div className="up-mid">
                <div className="up-title serif">{s.title}</div>
                <div className="up-loc">{s.loc}</div>
              </div>
              <div className="up-right">
                <span className="up-spots">{s.spots}</span>
                <span className="up-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
        <div className="scribble" style={{ top: "20%", right: "10%" }}>
          <StarScribble size={90} color="rgba(255,255,255,.9)" />
        </div>
        <div className="scribble" style={{ bottom: "10%", left: "5%" }}>
          <CrossScribble size={60} color="rgba(255,255,255,.9)" />
        </div>
      </div>

      <style>{`
        .up-head { text-align: center; margin-bottom: 56px; }
        .up-head .divider-jp { display: inline-flex; margin-bottom: 20px; }
        .up-list { max-width: 920px; margin: 0 auto; background: var(--paper-pure); border-radius: 8px; overflow: hidden; box-shadow: 0 30px 80px -40px rgba(0,0,0,.35); }
        .up-row { display: grid; grid-template-columns: 130px 1fr auto; gap: 24px; padding: 28px 32px; border-bottom: 1px solid rgba(24,20,16,.1); align-items: center; transition: background .2s; }
        .up-row:last-child { border-bottom: none; }
        .up-row:hover { background: #fff5f8; }
        .up-row.is-next { background: linear-gradient(90deg, #fff5f8 0%, transparent 100%); }
        .up-date { display: flex; flex-direction: column; line-height: 1; }
        .up-d { font-size: 36px; letter-spacing: -.02em; }
        .up-day { font-size: 13px; color: var(--ink-soft); margin-top: 6px; letter-spacing: .08em; font-family: var(--sans); }
        .up-title { font-size: 22px; line-height: 1.3; }
        .up-loc { font-size: 14px; color: var(--ink-soft); margin-top: 4px; }
        .up-right { display: flex; align-items: center; gap: 16px; font-size: 14px; color: var(--ink-soft); }
        .up-arrow { font-size: 22px; color: var(--hot-pink); transition: transform .2s; }
        .up-row:hover .up-arrow { transform: translateX(4px); }
        @media (max-width: 700px) {
          .up-row { grid-template-columns: 1fr; gap: 8px; }
          .up-right { justify-content: space-between; }
        }
      `}</style>
    </section>
  );
}

// ---------------------- DEMOS SPOTLIGHT ----------------------
function Demos() {
  const demos = [
    { tag: "Code · Nov 21", title: "Anomia Mobile", by: "Aiko", body: "A real-time word game ported to React Native — built across 4 sessions.", color: "sky" },
    { tag: "Art · Nov 07", title: "Tokyo Tower Linocut", by: "Marcus", body: "A 4-block reduction print, hand-pulled. The third block didn't register but it kind of works.", color: "peach" },
    { tag: "Hardware · Oct 18", title: "Tea timer for one", by: "Ren", body: "Tiny e-ink device that brews the perfect cup. Currently lives in a 3D-printed box.", color: "mint" },
    { tag: "Writing · Oct 04", title: "Zine: Notes on commuting", by: "Sora", body: "12-page riso zine drafted entirely during a single Pomodoro. Drawings included.", color: "pink" },
    { tag: "Music · Sep 20", title: "Loop pedal lullabies", by: "Yuki", body: "An EP of four lullabies. Recorded between Pomodoros on a borrowed mic.", color: "sky" },
    { tag: "Web · Sep 06", title: "Transit map for ghosts", by: "Lex", body: "An imaginary subway, plotted on top of the real Yamanote line. Updates every Sunday.", color: "peach" },
  ];
  return (
    <section id="demos" className="section-pad demos-section">
      <div className="wrap">
        <div className="demo-head">
          <div>
            <span className="divider-jp">発表 · Demos</span>
            <h2 className="h-section">What people<br />actually made.</h2>
          </div>
          <p className="demo-sub">Whether it's 3 bullet points on a Google Doc or a full-blown prototype, every session ends with demos. Here's a slice.</p>
        </div>
        <div className="demo-grid">
          {demos.map((d, i) => (
            <div key={i} className={"note " + d.color + " demo-card"}>
              <div className="demo-tag">{d.tag}</div>
              <h3 className="demo-title serif">{d.title}</h3>
              <div className="demo-by">by {d.by}</div>
              <p className="demo-body">{d.body}</p>
            </div>
          ))}
        </div>
        <div className="scribble" style={{ top: "25%", right: "-30px" }}>
          <SpiralScribble size={120} color="var(--hot-pink)" />
        </div>
      </div>

      <style>{`
        .demos-section { background: var(--paper); position: relative; overflow: hidden; }
        .demo-head { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 64px; align-items: end; }
        @media (max-width: 900px) { .demo-head { grid-template-columns: 1fr; } }
        .demo-head .divider-jp { margin-bottom: 24px; display: inline-flex; }
        .demo-sub { font-size: 18px; line-height: 1.5; color: var(--ink-soft); max-width: 440px; margin: 0; }
        .demo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .demo-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .demo-grid { grid-template-columns: 1fr; } }
        .demo-card { min-height: 240px; display: flex; flex-direction: column; }
        .demo-tag { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--hot-pink); }
        .demo-title { font-size: 26px; line-height: 1.15; margin: 12px 0 4px; }
        .demo-by { font-size: 13px; color: var(--ink-soft); margin-bottom: 16px; font-style: italic; }
        .demo-body { font-size: 15px; line-height: 1.5; color: var(--ink-soft); margin: 0; }
      `}</style>
    </section>
  );
}

// ---------------------- GALLERY ----------------------
function Gallery() {
  // 8 photos, varied tilts. User can swap real photos in.
  const tags = ["08.23", "09.06", "09.20", "10.04", "10.18", "11.07", "11.21", "12.06"];
  const tilts = ["-3deg", "2deg", "-2deg", "4deg", "-4deg", "3deg", "-2deg", "2deg"];
  return (
    <section id="gallery" className="section-pad gallery-section">
      <div className="wrap">
        <div className="gallery-head">
          <span className="divider-jp">記録 · Past sessions</span>
          <h2 className="h-section">The receipts.</h2>
          <p className="gallery-sub">Every Saturday for the last 12 weeks.</p>
        </div>
        <div className="gallery-grid">
          {tags.map((t, i) => (
            <figure key={i} className="gallery-photo" style={{ "--tilt": tilts[i] }}>
              <div className="photo">
                <div className="placeholder">YU+ME · {t}</div>
              </div>
              <figcaption className="tape-tag" style={{ position: "absolute", top: -14, left: 12, color: "var(--hot-pink)", filter: "url(#crayon-rough)" }}>{t}</figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-foot">
          <a href="https://www.instagram.com/weareyume_" className="pill ghost">
            More on Instagram <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <style>{`
        .gallery-section { background: var(--paper); }
        .gallery-head { text-align: center; margin-bottom: 56px; }
        .gallery-head .divider-jp { display: inline-flex; margin-bottom: 20px; }
        .gallery-head h2 { margin-bottom: 12px; }
        .gallery-sub { font-size: 17px; color: var(--ink-soft); margin: 0; }
        .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px 24px; }
        @media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .gallery-grid { grid-template-columns: 1fr; } }
        .gallery-photo { margin: 0; position: relative; }
        .gallery-photo .photo { aspect-ratio: 4/5; }
        .gallery-foot { text-align: center; margin-top: 56px; }
      `}</style>
    </section>
  );
}

// ---------------------- HOSTS ----------------------
function Hosts() {
  const hosts = [
    { name: "Aiko", role: "Host", bio: "iOS engineer by day; obsessive ceramics enthusiast on weekends. Started Yu+Me after attending Symposium in Waterloo." },
    { name: "Marcus", role: "Co-host", bio: "Printmaker and former educator. Brings the snacks. Has strong opinions about washi tape." },
    { name: "Ren", role: "Co-host", bio: "Hardware tinkerer. Will help you debug anything with a USB port." },
  ];
  return (
    <section id="hosts" className="section-pad hosts-section">
      <div className="wrap">
        <div className="hosts-head">
          <span className="divider-jp">主催 · Your hosts</span>
          <h2 className="h-section">Run by three<br />nice people.</h2>
        </div>
        <div className="hosts-grid">
          {hosts.map((h, i) => (
            <div key={i} className="host-card">
              <div className="host-avatar">
                <div className="placeholder">PORTRAIT</div>
              </div>
              <div className="host-name serif">{h.name}</div>
              <div className="host-role">{h.role}</div>
              <p className="host-bio">{h.bio}</p>
            </div>
          ))}
        </div>
        <div className="scribble" style={{ top: "30%", left: "-30px" }}>
          <CircleScribble size={100} color="var(--hot-pink)" strokeWidth={4} />
        </div>
      </div>

      <style>{`
        .hosts-section { background: var(--paper); position: relative; overflow: hidden; }
        .hosts-head { text-align: center; margin-bottom: 64px; }
        .hosts-head .divider-jp { display: inline-flex; margin-bottom: 20px; }
        .hosts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; max-width: 960px; margin: 0 auto; }
        @media (max-width: 900px) { .hosts-grid { grid-template-columns: 1fr; } }
        .host-card { text-align: center; }
        .host-avatar { width: 180px; height: 180px; border-radius: 50%; margin: 0 auto 20px; overflow: hidden; position: relative; background: linear-gradient(135deg, var(--sky-2), var(--pink-2)); }
        .host-avatar .placeholder { position: absolute; inset: 0; display: grid; place-items: center; font-family: ui-monospace, monospace; font-size: 10px; color: var(--ink-soft); letter-spacing: .15em; background-image: repeating-linear-gradient(45deg, rgba(255,255,255,.3) 0 2px, transparent 2px 16px); }
        .host-name { font-size: 28px; line-height: 1; margin-bottom: 4px; }
        .host-role { font-size: 12px; letter-spacing: .15em; text-transform: uppercase; color: var(--hot-pink); margin-bottom: 12px; }
        .host-bio { font-size: 15px; line-height: 1.55; color: var(--ink-soft); max-width: 280px; margin: 0 auto; }
      `}</style>
    </section>
  );
}

// ---------------------- FAQ ----------------------
function FAQ() {
  const faqs = [
    { q: "I'm not technical. Can I still come?", a: "Absolutely. We've had poets, knitters, gardeners, ceramicists and one person training for a marathon. The only requirement is that you're working on something you actually care about." },
    { q: "What counts as a 'passion project'?", a: "Whatever's been nagging at you that you haven't made time for. Could be a novel, an app, a song, a piece of furniture, learning a language. Not allowed: work for your job, homework, or anything someone is paying you to do." },
    { q: "Is this in English or Japanese?", a: "Both. Me and Claudia (your hosts) are still pretty beginner at Japanese and very much learning ourselves — so don't worry about your level either way. About half our regulars are non-Japanese; bring whoever, in whichever language." },
    { q: "Do I need to bring anything?", a: "Just whatever you need to work on your project. Laptops, sketchbooks, knitting needles, weird hardware. We provide snacks, coffee and washi tape." },
    { q: "How is this different from a normal coworking space?", a: "There's no 'work' here. Yu+Me is about the things you do because you want to, not because you have to. Plus: demos, snacks, friends." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="section-pad faq-section">
      <div className="wrap">
        <div className="faq-head">
          <span className="divider-jp">よくある質問 · FAQ</span>
          <h2 className="h-section">Things people ask.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={"faq-item " + (open === i ? "open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="chev">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .faq-head { text-align: center; margin-bottom: 56px; }
        .faq-head .divider-jp { display: inline-flex; margin-bottom: 20px; }
        .faq-list { max-width: 820px; margin: 0 auto; }
      `}</style>
    </section>
  );
}

// ---------------------- JOIN CTA ----------------------
function JoinCTA() {
  return (
    <section id="join" className="join-section gradient-section">
      <div className="cloud-stage">
        <div className="cloud" style={{ width: "50vw", height: "50vw", left: "-15%", top: "10%",
          background: "radial-gradient(circle, var(--pink) 0%, transparent 70%)" }} />
        <div className="cloud" style={{ width: "40vw", height: "40vw", right: "-10%", bottom: "-10%",
          background: "radial-gradient(circle, var(--sky) 0%, transparent 70%)" }} />
        <div className="cloud" style={{ width: "35vw", height: "35vw", right: "20%", top: "20%",
          background: "radial-gradient(circle, var(--mint) 0%, transparent 70%)" }} />
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="join-inner">
          <div className="scribble" style={{ top: "-30px", right: "10%" }}>
            <StarScribble size={70} color="#fff" />
          </div>
          <div className="scribble" style={{ bottom: "-30px", left: "10%" }}>
            <SwirlScribble size={120} color="#fff" />
          </div>
          <span className="eyebrow" style={{ color: "var(--ink)" }}>RSVP · 申し込み</span>
          <h2 className="h-display join-title">
            See you<br />Saturday?
          </h2>
          <p className="join-sub">
            {NEXT.dateLabel} · {NEXT.timeLabel} · {NEXT.locationLabel}
          </p>
          <a href="https://luma.com/YuMe" className="pill" style={{ marginTop: 28 }}>
            RSVP on Luma <span className="arrow">→</span>
          </a>
          <div className="join-or">or — <a href="#" className="text-pink" style={{ borderBottom: "1px solid currentColor" }}>get a friendly email reminder</a></div>
        </div>
      </div>
      <style>{`
        .join-section { padding: 140px 0; position: relative; overflow: hidden; min-height: 80vh; display: flex; align-items: center; }
        .join-inner { text-align: center; max-width: 760px; margin: 0 auto; position: relative; }
        .join-title { font-size: clamp(72px, 12vw, 180px); margin: 16px 0 24px; }
        .join-sub { font-size: 20px; color: var(--ink); margin: 0 auto; max-width: 460px; line-height: 1.4; }
        .join-or { margin-top: 20px; font-size: 14px; color: var(--ink-soft); }
      `}</style>
    </section>
  );
}

// ---------------------- FOOTER ----------------------
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-mark serif">Yu+Me</div>
            <p className="footer-tag">A Socratica node based in Shibuya, Tokyo.<br />週末 · Weekends · 12:00–15:00</p>
          </div>
          <div>
            <div className="footer-h">Find us</div>
            <ul>
              <li><a href="https://luma.com/YuMe">Luma</a></li>
              <li><a href="https://www.instagram.com/weareyume_">Instagram @weareyume_</a></li>
              <li><a href="https://x.com/yuandmetokyo">X / Twitter</a></li>
              <li><a href="mailto:hello@weareyume.com">hello@weareyume.com</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-h">Socratica</div>
            <ul>
              <li><a href="https://socratica.info">socratica.info</a></li>
              <li><a href="https://socratica.info/map">Find a node near you</a></li>
              <li><a href="https://toolbox.socratica.info">Host toolbox</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-h">Get reminded</div>
            <p className="footer-tag" style={{ marginBottom: 12 }}>One email per session. Nothing else.</p>
            <form className="footer-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch."); }}>
              <input type="email" placeholder="you@email.com" required />
              <button type="submit">→</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Yu+Me · Made with ❤ in 渋谷</span>
          <span>A Socratica node. The spark continues.</span>
        </div>
      </div>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 48px; padding-bottom: 64px; border-bottom: 1px solid rgba(255,255,255,.15); }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }
        .footer-mark { font-size: 56px; line-height: 1; }
        .footer-tag { font-size: 14px; color: rgba(255,255,255,.65); margin-top: 12px; line-height: 1.5; }
        .footer-h { font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: var(--hot-pink-soft); margin-bottom: 16px; }
        footer ul { list-style: none; padding: 0; margin: 0; }
        footer li { margin-bottom: 10px; font-size: 15px; }
        .footer-form { display: flex; border-bottom: 1px solid rgba(255,255,255,.3); padding-bottom: 8px; }
        .footer-form input { flex: 1; background: transparent; border: none; color: white; padding: 8px 0; font-family: var(--sans); font-size: 14px; outline: none; }
        .footer-form input::placeholder { color: rgba(255,255,255,.4); }
        .footer-form button { background: transparent; border: none; color: var(--hot-pink-soft); font-size: 18px; cursor: pointer; }
        .footer-bottom { display: flex; justify-content: space-between; padding-top: 32px; font-size: 12px; color: rgba(255,255,255,.4); flex-wrap: wrap; gap: 16px; }
      `}</style>
    </footer>
  );
}

// ---------------------- NAV ----------------------
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <div className="wrap nav-wrap">
        <a href="#" className="nav-mark serif">Yu+Me</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#how">How it works</a>
          <a href="#sessions">Sessions</a>
          <a href="#demos">Demos</a>
          <a href="#gallery">Gallery</a>
        </div>
        <a href="#join" className="pill nav-cta">RSVP <span className="arrow">→</span></a>
      </div>
      <style>{`
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 18px 0; transition: background .3s, padding .3s; }
        .nav.scrolled { background: rgba(251,249,245,.85); backdrop-filter: blur(14px); padding: 12px 0; border-bottom: 1px solid rgba(24,20,16,.08); }
        .nav-wrap { display: flex; justify-content: space-between; align-items: center; gap: 32px; }
        .nav-mark { font-size: 28px; line-height: 1; }
        .nav-links { display: flex; gap: 28px; font-size: 14px; }
        .nav-links a { color: var(--ink-soft); transition: color .15s; }
        .nav-links a:hover { color: var(--hot-pink); }
        .nav-cta { padding: 10px 20px !important; font-size: 13px !important; }
        @media (max-width: 800px) { .nav-links { display: none; } }
      `}</style>
    </nav>
  );
}

Object.assign(window, {
  NEXT, Nav, Manifesto, HowItWorks, Upcoming, Demos, Gallery, Hosts, FAQ, JoinCTA, Footer,
});
