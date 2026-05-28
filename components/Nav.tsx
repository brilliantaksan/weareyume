"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <div className="wrap nav-wrap">
        <a href="#" className="nav-mark serif">
          Yu+Me
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#how">How it works</a>
          <a href="#sessions">Sessions</a>
          <a href="#demos">Demos</a>
          <a href="#gallery">Gallery</a>
        </div>
        <a href="#join" className="pill nav-cta">
          RSVP <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}
