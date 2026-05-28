// Effects: cursor trail, floating clouds, scribble draw-on-scroll observer, loading screen.

// ----- Loading screen -----
function LoadingScreen() {
  const [gone, setGone] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setGone(true), 1900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={"loading-screen " + (gone ? "gone" : "")}>
      <div className="loading-mark">
        <div className="ls-cloud" />
        <div className="ls-word" aria-label="Yu+Me">
          <span className="ls-letter" style={{ animationDelay: "0.00s" }}>Y</span>
          <span className="ls-letter" style={{ animationDelay: "0.10s" }}>u</span>
          <span className="ls-letter ls-plus" style={{ animationDelay: "0.22s" }}>+</span>
          <span className="ls-letter" style={{ animationDelay: "0.34s" }}>M</span>
          <span className="ls-letter" style={{ animationDelay: "0.46s" }}>e</span>
        </div>
      </div>
    </div>
  );
}

// ----- Crayon cursor + soft trail -----
function CrayonCursor() {
  React.useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const cursor = document.createElement("div");
    cursor.className = "crayon-cursor";
    document.body.appendChild(cursor);

    const trail = [];
    const TRAIL_LEN = 14;
    const COLORS = [
      "rgba(168,216,240,.55)", // sky
      "rgba(244,181,196,.55)", // pink
      "rgba(185,227,182,.55)", // mint
      "rgba(255,207,163,.55)", // peach
      "rgba(255,61,122,.45)",  // hot pink
    ];
    for (let i = 0; i < TRAIL_LEN; i++) {
      const t = document.createElement("div");
      t.className = "crayon-trail";
      const size = 8 + Math.random() * 14;
      t.style.width = t.style.height = size + "px";
      t.style.background = `radial-gradient(circle, ${COLORS[i % COLORS.length]} 0%, transparent 70%)`;
      t.style.filter = "blur(2px)";
      document.body.appendChild(t);
      trail.push({ el: t, x: 0, y: 0, life: 0 });
    }

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let lastDrop = 0;
    let trailIdx = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      // Hover affordance
      const tgt = e.target;
      const isInteractive = tgt.closest('a, button, .pill, .faq-q, .photo');
      cursor.classList.toggle('over-link', !!isInteractive);
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = (now) => {
      cx += (mx - cx) * 0.35;
      cy += (my - cy) * 0.35;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";

      if (now - lastDrop > 35) {
        lastDrop = now;
        const t = trail[trailIdx];
        trailIdx = (trailIdx + 1) % TRAIL_LEN;
        t.el.style.left = (mx + (Math.random() - 0.5) * 10) + "px";
        t.el.style.top  = (my + (Math.random() - 0.5) * 10) + "px";
        t.el.style.opacity = "0.9";
        t.el.style.transition = "none";
        // fade out
        requestAnimationFrame(() => {
          t.el.style.transition = "opacity 1.2s ease-out, transform 1.2s ease-out";
          t.el.style.opacity = "0";
          t.el.style.transform = `translate(-50%,-50%) scale(${0.4 + Math.random()*0.5})`;
        });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      cursor.remove();
      trail.forEach(t => t.el.remove());
    };
  }, []);
  return null;
}

// ----- Floating clouds in hero -----
function FloatingClouds() {
  React.useEffect(() => {
    const stage = document.querySelector('.cloud-stage');
    if (!stage) return;
    const clouds = stage.querySelectorAll('.cloud');
    const data = [...clouds].map((el, i) => ({
      el,
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      r: 0,
      vr: (Math.random() - 0.5) * 0.05,
    }));
    let raf;
    const tick = () => {
      data.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.r += d.vr;
        if (d.x < -0.2 || d.x > 1.0) d.vx *= -1;
        if (d.y < -0.2 || d.y > 0.9) d.vy *= -1;
        d.el.style.transform = `translate(${d.x*100}vw, ${d.y*100}%) rotate(${d.r}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}

// ----- Scribble draw-on-scroll -----
function ScribbleObserver() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.scribble');
    // Compute path lengths
    els.forEach(s => {
      s.querySelectorAll('path, line, polyline, circle').forEach(p => {
        try {
          const len = p.getTotalLength ? p.getTotalLength() : 600;
          p.style.setProperty('--len', Math.ceil(len + 20));
        } catch (e) {}
      });
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('drawn');
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    els.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}

Object.assign(window, {
  LoadingScreen, CrayonCursor, FloatingClouds, ScribbleObserver,
});
