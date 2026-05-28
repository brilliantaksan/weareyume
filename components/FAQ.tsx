"use client";

import { useState } from "react";
import type { SiteContent, Faq } from "@/lib/content";

export function FAQ({
  content,
  faqs,
}: {
  content: SiteContent;
  faqs: Faq[];
}) {
  const [open, setOpen] = useState(0);
  const h = content.faqHeading;
  return (
    <section id="faq" className="section-pad faq-section">
      <div className="wrap">
        <div className="faq-head">
          <span className="divider-jp">{h.eyebrow}</span>
          <h2 className="h-section">{h.heading}</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={f.id} className={"faq-item " + (open === i ? "open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.question}</span>
                <span className="chev">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
