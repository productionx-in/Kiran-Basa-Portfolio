"use client";

import { useEffect, useState } from "react";
import { person, cvFileName } from "../data/profile";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#method", label: "Method" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav" data-stuck={stuck}>
      <nav className="shell nav__in" aria-label="Primary">
        <a href="#top" className="nav__name">
          {person.name}
        </a>
        <div className="nav__right">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          {/* The single most-clicked control on a portfolio. Never buried. */}
          <a className="btn" href={`/${cvFileName}`} download>
            Download CV
          </a>
        </div>
      </nav>
    </header>
  );
}
