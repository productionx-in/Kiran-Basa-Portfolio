"use client";

import { useEffect } from "react";

/**
 * Scroll reveal, deliberately minimal.
 *
 * No animation library for a page this size, and no transform that could leave
 * a fact invisible if the observer never fires — every element starts hidden
 * only because this component is mounted, and mounting immediately reveals
 * anything already on screen. A recruiter with JavaScript disabled still gets
 * the page, because `[data-reveal]` elements are visible by default until this
 * runs (see the `.js-reveal` guard in globals.css).
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    document.documentElement.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          // Stagger within a group so a grid resolves left to right, not at once.
          const i = Number(el.dataset.i ?? 0);
          el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
