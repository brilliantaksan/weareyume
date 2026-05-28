"use client";

import { useState } from "react";

// Lightweight client-side stub matching the prototype's behaviour. Wire this
// to a real list (Buttondown, Resend audience, a Supabase table, etc.) later.
export function ReminderForm() {
  const [done, setDone] = useState(false);
  return (
    <form
      className="footer-form"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {done ? (
        <span style={{ fontSize: 14, color: "rgba(255,255,255,.8)" }}>
          Thanks! We&apos;ll be in touch.
        </span>
      ) : (
        <>
          <input type="email" placeholder="you@email.com" required />
          <button type="submit" aria-label="Subscribe">
            →
          </button>
        </>
      )}
    </form>
  );
}
