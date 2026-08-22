"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let booted = false;
let lenis: Lenis | null = null;

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One motion runtime for the whole page.
 *
 * Lenis drives the scroll position and GSAP's ScrollTrigger reads from it, so
 * pinned sections and smooth scrolling agree instead of fighting each other —
 * the usual cause of a horizontal rail that stutters or overshoots.
 *
 * Everything here is a no-op under prefers-reduced-motion: no smoothing, no
 * pinning, no transforms. The page still has to be readable by someone who
 * gets motion sick, and by anyone whose JS never arrives.
 */
export function initMotion() {
  if (booted || typeof window === "undefined") return;
  booted = true;

  gsap.registerPlugin(ScrollTrigger);

  if (reduced()) {
    // Reveal everything immediately and leave the page alone.
    document.documentElement.classList.add("motion-off");
    return;
  }

  document.documentElement.classList.add("motion-on");

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links have to go through Lenis or they jump while it eases.
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href")!.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    lenis?.scrollTo(el, { offset: -80 });
  });
}

export function killMotion() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  lenis?.destroy();
  lenis = null;
  booted = false;
  gsap.ticker.lagSmoothing(500, 33);
}

/**
 * Splits an element's text into per-word spans, each wrapped in an overflow
 * clip so words can rise out of a mask rather than just fading.
 *
 * Written by hand rather than using GSAP's SplitText, which is a paid plugin.
 * The original text is preserved on the node so the DOM a screen reader walks
 * is the sentence, not a pile of fragments: the wrapper keeps the accessible
 * name via aria-label and the fragments are hidden from the a11y tree.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  if (!text.trim() || el.dataset.split === "done") return [];
  el.dataset.split = "done";
  el.setAttribute("aria-label", text);

  const frag = document.createDocumentFragment();
  const out: HTMLElement[] = [];

  text.split(/(\s+)/).forEach((chunk) => {
    if (!chunk.trim()) return frag.appendChild(document.createTextNode(" "));
    const mask = document.createElement("span");
    mask.className = "mask";
    mask.setAttribute("aria-hidden", "true");
    const word = document.createElement("span");
    word.className = "mask__w";
    word.textContent = chunk;
    mask.appendChild(word);
    frag.appendChild(mask);
    out.push(word);
  });

  el.textContent = "";
  el.appendChild(frag);
  return out;
}

export { gsap, ScrollTrigger };
