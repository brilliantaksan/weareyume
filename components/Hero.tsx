import type { SiteContent } from "@/lib/content";
import { CrossScribble, StarScribble, SwirlScribble } from "@/components/Scribbles";

// Hero A — centered logo card (the production hero, closest to the brand mark).
export function HeroA({ content }: { content: SiteContent }) {
  const { hero, next } = content;
  return (
    <section className="hero hero-a">
      <div className="cloud-stage">
        <div className="cloud c1" style={{ width: "75vw", height: "75vw", left: "-25%", top: "-30%", background: "radial-gradient(circle, var(--sky) 0%, var(--sky) 25%, transparent 65%)" }} />
        <div className="cloud c2" style={{ width: "60vw", height: "60vw", right: "-15%", top: "5%", background: "radial-gradient(circle, var(--pink) 0%, var(--pink) 20%, transparent 65%)" }} />
        <div className="cloud c3" style={{ width: "65vw", height: "65vw", left: "10%", bottom: "-35%", background: "radial-gradient(circle, var(--mint) 0%, var(--mint) 22%, transparent 65%)" }} />
        <div className="cloud c4" style={{ width: "55vw", height: "55vw", right: "5%", bottom: "-25%", background: "radial-gradient(circle, var(--peach) 0%, var(--peach) 20%, transparent 65%)" }} />
        <div className="cloud c5" style={{ width: "45vw", height: "45vw", left: "35%", top: "30%", background: "radial-gradient(circle, var(--pink-2) 0%, transparent 70%)" }} />
      </div>

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
          {hero.metaRows.map((row, i) => (
            <div className="meta-row" key={i}>
              <span className="meta-jp">{row.jp}</span>
              <span className="meta-dot">·</span>
              <span>{row.en}</span>
            </div>
          ))}
        </div>

        <p className="hero-tag serif hero-fade" style={{ animationDelay: ".70s" }}>
          {hero.taglineLead}
          <em>{hero.taglineEm}</em>
          {hero.taglineTail}
        </p>

        <div className="hero-cta hero-fade" style={{ animationDelay: ".85s" }}>
          <a href="#join" className="pill">
            {hero.ctaPrimary}
            <span className="arrow">→</span>
          </a>
          <a href="#about" className="pill ghost">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="hero-next hero-fade" style={{ animationDelay: "1.0s" }}>
        <span className="eyebrow">{hero.nextEyebrow}</span>
        <div className="next-line serif">
          {next.dateLabel} <span className="text-pink">·</span> {next.timeLabel}
        </div>
        <div className="next-sub">{next.locationLabel}</div>
      </div>
    </section>
  );
}
