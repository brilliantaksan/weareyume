import * as React from "react";
import type {
  SiteContent,
  Demo,
  SessionRow,
  GalleryPhoto,
} from "@/lib/content";
import {
  CrossScribble,
  SpiralScribble,
  StarScribble,
  SwirlScribble,
  UnderlineScribble,
} from "@/components/Scribbles";
import { ReminderForm } from "@/components/ReminderForm";

function multiline(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));
}

// Renders a manifesto paragraph, swapping a [socratica] token for a link.
function ParagraphWithLink({ text, url }: { text: string; url: string }) {
  const parts = text.split("[socratica]");
  if (parts.length === 1) return <p>{text}</p>;
  return (
    <p>
      {parts[0]}
      <a href={url} className="text-pink">
        Socratica
      </a>
      {parts.slice(1).join("[socratica]")}
    </p>
  );
}

export function Manifesto({ content }: { content: SiteContent }) {
  const m = content.manifesto;
  return (
    <section id="about" className="section-pad manifesto">
      <div className="wrap">
        <div className="manifesto-grid">
          <div className="manifesto-left">
            <span className="divider-jp">{m.eyebrow}</span>
            <h2 className="h-section">
              {m.headingLine1}
              <br />
              <em>{m.headingEm}</em>,<br />
              {m.headingLine3}
            </h2>
            <div className="scribble" style={{ top: "12%", right: "-40px" }}>
              <UnderlineScribble size={220} color="var(--hot-pink)" />
            </div>
          </div>
          <div className="manifesto-right">
            {m.paragraphs.map((p, i) => (
              <ParagraphWithLink key={i} text={p} url={m.socraticaUrl} />
            ))}
            <p className="manifesto-emph serif">
              {m.emph} <span className="text-pink">{m.emphPink}</span>
            </p>
            <div className="manifesto-stats">
              {m.stats.map((s, i) => (
                <div key={i}>
                  <div className="stat-n serif">{s.n}</div>
                  <div className="stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ content }: { content: SiteContent }) {
  const h = content.how;
  return (
    <section className="section-pad how-section" id="how">
      <div className="wrap">
        <div className="how-head">
          <span className="divider-jp">{h.eyebrow}</span>
          <h2 className="h-section">{multiline(h.heading)}</h2>
          <p className="how-sub">{h.sub}</p>
        </div>

        <div className="how-grid">
          {h.steps.map((s, i) => (
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
    </section>
  );
}

export function Upcoming({
  content,
  sessions,
}: {
  content: SiteContent;
  sessions: SessionRow[];
}) {
  const u = content.upcoming;
  return (
    <section id="sessions" className="section-pad gradient-section">
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="up-head">
          <span className="divider-jp" style={{ color: "var(--ink)" }}>
            {u.eyebrow}
          </span>
          <h2 className="h-section">{u.heading}</h2>
        </div>
        <div className="up-list">
          {sessions.map((s) => (
            <a
              href={s.luma_url || u.lumaUrl}
              key={s.id}
              className={"up-row " + (s.is_next ? "is-next" : "")}
            >
              <div className="up-date serif">
                <span className="up-d">{s.date_label}</span>
                <span className="up-day">{s.day}</span>
              </div>
              <div className="up-mid">
                <div className="up-title serif">{s.title}</div>
                <div className="up-loc">{s.location}</div>
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
    </section>
  );
}

export function Demos({
  content,
  demos,
}: {
  content: SiteContent;
  demos: Demo[];
}) {
  const d = content.demos;
  return (
    <section id="demos" className="section-pad demos-section">
      <div className="wrap">
        <div className="demo-head">
          <div>
            <span className="divider-jp">{d.eyebrow}</span>
            <h2 className="h-section">{multiline(d.heading)}</h2>
          </div>
          <p className="demo-sub">{d.sub}</p>
        </div>
        <div className="demo-grid">
          {demos.map((demo) => (
            <div key={demo.id} className={"note " + demo.color + " demo-card"}>
              <div className="demo-tag">{demo.tag}</div>
              <h3 className="demo-title serif">{demo.title}</h3>
              <div className="demo-by">by {demo.maker}</div>
              <p className="demo-body">{demo.body}</p>
            </div>
          ))}
        </div>
        <div className="scribble" style={{ top: "25%", right: "-30px" }}>
          <SpiralScribble size={120} color="var(--hot-pink)" />
        </div>
      </div>
    </section>
  );
}

export function Gallery({
  content,
  gallery,
  publicUrl,
}: {
  content: SiteContent;
  gallery: GalleryPhoto[];
  publicUrl: (path: string | null) => string | null;
}) {
  const g = content.gallery;
  return (
    <section id="gallery" className="section-pad gallery-section">
      <div className="wrap">
        <div className="gallery-head">
          <span className="divider-jp">{g.eyebrow}</span>
          <h2 className="h-section">{g.heading}</h2>
          <p className="gallery-sub">{g.sub}</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((photo) => {
            const src = publicUrl(photo.image_path);
            return (
              <figure
                key={photo.id}
                className="gallery-photo"
                style={{ "--tilt": photo.tilt } as React.CSSProperties}
              >
                <div className="photo">
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={`Yu+Me session ${photo.date_label}`} />
                  ) : (
                    <div className="placeholder">YU+ME · {photo.date_label}</div>
                  )}
                </div>
                <figcaption
                  className="tape-tag"
                  style={{
                    position: "absolute",
                    top: -14,
                    left: 12,
                    color: "var(--hot-pink)",
                    filter: "url(#crayon-rough)",
                  }}
                >
                  {photo.date_label}
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="gallery-foot">
          <a href={g.instagramUrl} className="pill ghost">
            More on Instagram <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function JoinCTA({ content }: { content: SiteContent }) {
  const j = content.join;
  const { next } = content;
  return (
    <section id="join" className="join-section gradient-section">
      <div className="cloud-stage">
        <div className="cloud" style={{ width: "50vw", height: "50vw", left: "-15%", top: "10%", background: "radial-gradient(circle, var(--pink) 0%, transparent 70%)" }} />
        <div className="cloud" style={{ width: "40vw", height: "40vw", right: "-10%", bottom: "-10%", background: "radial-gradient(circle, var(--sky) 0%, transparent 70%)" }} />
        <div className="cloud" style={{ width: "35vw", height: "35vw", right: "20%", top: "20%", background: "radial-gradient(circle, var(--mint) 0%, transparent 70%)" }} />
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="join-inner">
          <div className="scribble" style={{ top: "-30px", right: "10%" }}>
            <StarScribble size={70} color="#fff" />
          </div>
          <div className="scribble" style={{ bottom: "-30px", left: "10%" }}>
            <SwirlScribble size={120} color="#fff" />
          </div>
          <span className="eyebrow" style={{ color: "var(--ink)" }}>
            {j.eyebrow}
          </span>
          <h2 className="h-display join-title">{multiline(j.title)}</h2>
          <p className="join-sub">
            {next.dateLabel} · {next.timeLabel} · {next.locationLabel}
          </p>
          <a href={j.lumaUrl} className="pill" style={{ marginTop: 28 }}>
            RSVP on Luma <span className="arrow">→</span>
          </a>
          <div className="join-or">
            or —{" "}
            <a
              href={`mailto:${j.reminderEmail}`}
              className="text-pink"
              style={{ borderBottom: "1px solid currentColor" }}
            >
              get a friendly email reminder
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ content }: { content: SiteContent }) {
  const f = content.footer;
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-mark serif">Yu+Me</div>
            <p className="footer-tag">{multiline(f.tagline)}</p>
          </div>
          <div>
            <div className="footer-h">Find us</div>
            <ul>
              {f.findUs.map((l, i) => (
                <li key={i}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-h">Socratica</div>
            <ul>
              {f.socratica.map((l, i) => (
                <li key={i}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-h">Get reminded</div>
            <p className="footer-tag" style={{ marginBottom: 12 }}>
              {f.remindCopy}
            </p>
            <ReminderForm />
          </div>
        </div>
        <div className="footer-bottom">
          <span>{f.bottomLeft}</span>
          <span>{f.bottomRight}</span>
        </div>
      </div>
    </footer>
  );
}
