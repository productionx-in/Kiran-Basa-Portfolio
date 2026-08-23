"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, reduced } from "../lib/motion";
import type { Project } from "../data/profile";

/* Degrees between cards on the wheel. The radius lives in CSS (--R) so the
   arc can flatten on a phone without this file knowing about breakpoints. */
const STEP = 9;

/**
 * The work as a rotating arc.
 *
 * Every card is placed tangent to one large circle whose centre sits far below
 * the viewport, so the fan curves the way a hand of cards does. One CSS
 * variable — `--rot` on the wheel — moves all of them at once, which keeps
 * eleven cards on a single compositor-friendly transform each.
 *
 * Three things drive that rotation, and they compose rather than fight:
 * scrolling the section, dragging the wheel, and a slow idle drift that stops
 * the moment either of the other two happens.
 *
 * The card nearest the top of the arc is the "active" one: it scales up, comes
 * forward, and its detail is written out beneath the stage. That is what makes
 * the thing readable rather than merely decorative — the motion always
 * resolves to one legible project.
 */
export default function Arc({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const wheel = useRef<HTMLDivElement>(null);
  const rot = useRef(0);
  const drift = useRef(true);
  const [active, setActive] = useState(0);

  const mid = (projects.length - 1) / 2;

  /**
   * Places every card and works out which one is on top.
   *
   * Angles wrap over the full span of the wheel, so a card leaving one side
   * re-enters on the other and the fan is never half empty — the thing that
   * separates a wheel from a row of cards that happens to be curved.
   */
  const apply = useCallback((deg: number) => {
    rot.current = deg;
    const span = projects.length * STEP;
    const w = wheel.current;
    if (!w) return;

    let best = 0, bestAbs = Infinity;
    const cards = w.children;
    for (let i = 0; i < cards.length; i++) {
      let a = (i - mid) * STEP + deg;
      // Wrap into [-span/2, span/2) so the arc is continuous.
      a = ((((a + span / 2) % span) + span) % span) - span / 2;
      (cards[i] as HTMLElement).style.setProperty("--a", `${a}deg`);
      const abs = Math.abs(a);
      if (abs < bestAbs) { bestAbs = abs; best = i; }
    }
    setActive((cur) => (cur === best ? cur : best));
  }, [mid, projects.length]);

  useEffect(() => {
    apply(mid * STEP);
    if (reduced()) return;

    const el = root.current;
    const w = wheel.current;
    if (!el || !w) return;


    const ctx = gsap.context(() => {
      /* Scroll drives the wheel across the section's travel. */
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
        onUpdate: (self) => {
          if (!drift.current) return;
          // One full turn of the wheel across the section's travel.
          apply(mid * STEP - self.progress * projects.length * STEP);
        },
      });

      /* Idle drift, so the wheel is alive before anyone touches it. */
      let raf = 0;
      const idle = () => {
        if (drift.current && !st.isActive) apply(rot.current - 0.035);
        raf = requestAnimationFrame(idle);
      };
      raf = requestAnimationFrame(idle);

      /* Drag. Pointer events cover mouse, pen and touch in one path. */
      let down = false, startX = 0, startRot = 0;
      const onDown = (e: PointerEvent) => {
        down = true; drift.current = false;
        startX = e.clientX; startRot = rot.current;
        w.setPointerCapture?.(e.pointerId);
        el.dataset.drag = "true";
      };
      const onMove = (e: PointerEvent) => {
        if (!down) return;
        apply(startRot + (e.clientX - startX) * 0.06);
      };
      const onUp = () => {
        down = false;
        el.dataset.drag = "false";
        // Hand control back to scroll after a beat, not instantly, or the
        // wheel snaps away from wherever the reader just put it.
        window.setTimeout(() => { drift.current = true; }, 1800);
      };

      w.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);

      return () => {
        cancelAnimationFrame(raf);
        w.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    }, root);

    return () => ctx.revert();
  }, [apply, mid, projects.length]);

  const go = useCallback((i: number) => {
    drift.current = false;
    gsap.to({ v: rot.current }, {
      v: (mid - i) * STEP, duration: 0.7, ease: "power3.out",
      onUpdate() { apply((this.targets()[0] as { v: number }).v); },
      onComplete() { window.setTimeout(() => { drift.current = true; }, 1800); },
    });
  }, [apply, mid]);

  const p = projects[active];

  return (
    <div className="arc" ref={root} data-drag="false">
      <div className="arc__stage">
        <div className="arc__wheel" ref={wheel} data-cursor="Drag">
          {projects.map((pr, i) => (
            <button
              type="button"
              className="arc__card"
              key={pr.code}
              data-on={i === active}
              style={{ ["--a" as string]: `${(i - mid) * STEP}deg`, zIndex: i === active ? 30 : 10 }}
              onClick={() => go(i)}
              aria-label={`${pr.name} — ${pr.kind}`}
              aria-current={i === active}
            >
              {pr.poster ? (
                <Image src={pr.poster} alt="" fill sizes="22vw" className="arc__img" />
              ) : (
                /* No honest still exists for this one yet. Rather than leave a
                   hole in the fan, the card is set as a type tile so it reads
                   as a deliberate piece of the sequence. */
                <span className="arc__none">
                  <span className="arc__none-k">{pr.kind}</span>
                  <span className="arc__none-n">{pr.name}</span>
                  <span className="arc__none-r" aria-hidden="true" />
                </span>
              )}
              <span className="arc__num">{pr.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The motion always resolves here. */}
      <div className="arc__read" role="status" aria-live="polite">
        <div className="arc__meta">
          <span className="arc__count">{p.code} / {String(projects.length).padStart(2, "0")}</span>
          <span className="arc__kind">{p.kind}</span>
        </div>
        <h3>{p.name}</h3>
        <p className="arc__blurb">{p.blurb}</p>
        {p.result && <p className="arc__result"><strong>Result</strong>{p.result}</p>}
        <div className="arc__foot">
          <span className="arc__credit">{p.credit}</span>
          {p.href && (
            <a href={p.href} target="_blank" rel="noreferrer" className="arc__link" data-cursor="Open">
              {p.hrefLabel ?? "Open live site ↗"}
            </a>
          )}
        </div>
        {p.shot && <p className="arc__shot">Image: {p.shot}</p>}
      </div>

      <p className="arc__hint" aria-hidden="true">Drag the arc · scroll to travel · click a card</p>
    </div>
  );
}
