"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, reduced } from "../lib/motion";
import type { Project } from "../data/profile";

/**
 * Hand-placed layout. A random scatter looks random; a composed one looks
 * art-directed. Each tile carries its own depth, which drives how far it moves
 * against the pointer — near tiles travel further, so the cluster reads as
 * space rather than as a pile of divs.
 */
const LAYOUT = [
  { x: 12, y: 18, w: 22, d: 1.5, r: -3 },
  { x: 38, y: 6,  w: 26, d: 0.7, r: 2 },
  { x: 68, y: 15, w: 20, d: 1.2, r: 4 },
  { x: 4,  y: 52, w: 24, d: 0.9, r: 3 },
  { x: 31, y: 40, w: 19, d: 1.8, r: -2 },
  { x: 55, y: 45, w: 25, d: 1.1, r: -4 },
  { x: 80, y: 44, w: 17, d: 0.6, r: 3 },
  { x: 17, y: 76, w: 21, d: 1.3, r: -3 },
  { x: 44, y: 72, w: 23, d: 0.8, r: 2 },
  { x: 70, y: 74, w: 19, d: 1.6, r: -2 },
  { x: 90, y: 12, w: 15, d: 1.0, r: 5 },
];

/**
 * The work as a floating cluster you move through rather than scroll past.
 *
 * Pointer position drives a parallax across eleven tiles at different depths;
 * hovering one lifts it and dims the rest; selecting one opens the full detail
 * beside the cluster. Every tile is a real button, so the whole thing is
 * operable by keyboard and announced properly — a gallery that only works
 * with a mouse is a gallery half the readers cannot use.
 *
 * Below 900px the scatter collapses to a scroll-snapping column, because
 * absolute-positioned overlap on a phone is unusable.
 */
export default function Cluster({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (reduced()) return;
    const el = root.current;
    if (!el) return;
    if (!window.matchMedia("(min-width: 900px) and (hover: hover)").matches) return;

    const tiles = gsap.utils.toArray<HTMLElement>(".cl__tile", el);
    const setters = tiles.map((t) => ({
      x: gsap.quickTo(t, "x", { duration: 0.9, ease: "power3.out" }),
      y: gsap.quickTo(t, "y", { duration: 0.9, ease: "power3.out" }),
      d: Number(t.dataset.d ?? 1),
    }));

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // -1..1 from the centre of the cluster, not the window, so the effect
      // stays correct wherever the section sits on the page.
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      setters.forEach((s) => {
        s.x(-nx * 26 * s.d);
        s.y(-ny * 20 * s.d);
      });
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  const active = open !== null ? projects[open] : null;

  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    if (open === null) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, close]);

  return (
    <div className="cl">
      <div
        className="cl__stage"
        ref={root}
        data-dim={hover !== null || open !== null}
        role="list"
      >
        {projects.map((p, i) => {
          const L = LAYOUT[i % LAYOUT.length];
          return (
            <div
              key={p.code}
              className="cl__tile"
              role="listitem"
              data-d={L.d}
              data-on={hover === i || open === i}
              style={{
                left: `${L.x}%`,
                top: `${L.y}%`,
                width: `${L.w}%`,
                zIndex: hover === i || open === i ? 40 : Math.round(L.d * 10),
                ["--r" as string]: `${L.r}deg`,
              }}
            >
              <button
                type="button"
                className="cl__btn"
                data-cursor={open === i ? "Close" : "Open"}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-label={`${p.name} — ${p.kind}`}
              >
                <Image src={p.poster} alt="" fill sizes="26vw" className="cl__img" />
                <span className="cl__code">{p.code}</span>
                <span className="cl__cap">{p.name}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* The detail. Rendered as a live region so a screen reader is told what
          opened, and always present in the DOM order right after the cluster. */}
      <div className="cl__panel" data-open={active !== null} role="region" aria-live="polite">
        {active ? (
          <>
            <div className="cl__panel-head">
              <span className="cl__kind">{active.kind}</span>
              <button type="button" className="cl__close" onClick={close} aria-label="Close project">
                Close ✕
              </button>
            </div>
            <h3>{active.name}</h3>
            <p>{active.blurb}</p>
            {active.result && (
              <p className="cl__result">
                <strong>Result</strong>
                {active.result}
              </p>
            )}
            <dl className="cl__facts">
              <div><dt>Role</dt><dd>{active.credit}</dd></div>
              {active.shot && <div><dt>Image</dt><dd>{active.shot}</dd></div>}
            </dl>
            {active.href && (
              <a href={active.href} target="_blank" rel="noreferrer" className="cl__link" data-cursor="Visit">
                Open live site ↗
              </a>
            )}
          </>
        ) : (
          <p className="cl__hint">
            <span aria-hidden="true">◈</span> Move through the cluster. Select any piece to read it.
          </p>
        )}
      </div>
    </div>
  );
}
