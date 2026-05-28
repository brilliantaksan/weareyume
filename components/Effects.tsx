"use client";

import { useEffect } from "react";

// Crayon cursor + soft colored trail. Disabled on touch devices.
export function CrayonCursor() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const cursor = document.createElement("div");
    cursor.className = "crayon-cursor";
    document.body.appendChild(cursor);

    const trail: { el: HTMLDivElement }[] = [];
    const TRAIL_LEN = 14;
    const COLORS = [
      "rgba(168,216,240,.55)",
      "rgba(244,181,196,.55)",
      "rgba(185,227,182,.55)",
      "rgba(255,207,163,.55)",
      "rgba(255,61,122,.45)",
    ];
    for (let i = 0; i < TRAIL_LEN; i++) {
      const t = document.createElement("div");
      t.className = "crayon-trail";
      const size = 8 + Math.random() * 14;
      t.style.width = t.style.height = size + "px";
      t.style.background = `radial-gradient(circle, ${COLORS[i % COLORS.length]} 0%, transparent 70%)`;
      t.style.filter = "blur(2px)";
      document.body.appendChild(t);
      trail.push({ el: t });
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let lastDrop = 0;
    let trailIdx = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const tgt = e.target as Element | null;
      const isInteractive = tgt?.closest("a, button, .pill, .faq-q, .photo");
      cursor.classList.toggle("over-link", !!isInteractive);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = (now: number) => {
      cx += (mx - cx) * 0.35;
      cy += (my - cy) * 0.35;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";

      if (now - lastDrop > 35) {
        lastDrop = now;
        const t = trail[trailIdx];
        trailIdx = (trailIdx + 1) % TRAIL_LEN;
        t.el.style.left = mx + (Math.random() - 0.5) * 10 + "px";
        t.el.style.top = my + (Math.random() - 0.5) * 10 + "px";
        t.el.style.opacity = "0.9";
        t.el.style.transition = "none";
        requestAnimationFrame(() => {
          t.el.style.transition = "opacity 1.2s ease-out, transform 1.2s ease-out";
          t.el.style.opacity = "0";
          t.el.style.transform = `translate(-50%,-50%) scale(${0.4 + Math.random() * 0.5})`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      cursor.remove();
      trail.forEach((t) => t.el.remove());
    };
  }, []);
  return null;
}

// Draws every .scribble on as it scrolls into view.
export function ScribbleObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".scribble");
    els.forEach((s) => {
      s.querySelectorAll<SVGGeometryElement>("path, line, polyline, circle").forEach((p) => {
        try {
          const len = p.getTotalLength ? p.getTotalLength() : 600;
          p.style.setProperty("--len", String(Math.ceil(len + 20)));
        } catch {
          /* noop */
        }
      });
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("drawn");
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    els.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}
