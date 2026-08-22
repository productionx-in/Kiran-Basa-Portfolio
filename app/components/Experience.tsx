"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { initMotion, killMotion, gsap, ScrollTrigger, splitWords, reduced } from "../lib/motion";
import type { Project } from "../data/profile";

/* ------------------------------------------------------------------ boot */

/** Starts the motion runtime once, and tears it down on unmount. */
export function Motion() {
  useEffect(() => {
    initMotion();
    return () => killMotion();
  }, []);
  return null;
}

/* ---------------------------------------------------------------- cursor */

/**
 * A cursor that reports what it is over.
 *
 * Two parts: a dot that tracks exactly, and a ring that lags behind it. The
 * ring grows and takes a label when the pointer is over anything marked
 * data-cursor, which is how the page tells you a card is draggable or a rail
 * scrolls — affordances that would otherwise need written instructions.
 *
 * Pointer-coarse devices never mount it: a phone has no cursor to augment.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  /* Decide first. The elements do not exist until this says so, which is why
     wiring them up has to wait for the second pass. */
  useEffect(() => {
    if (reduced()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setActive(true);
  }, []);

  useEffect(() => {
    const d = dot.current, r = ring.current;
    if (!active || !d || !r) return;

    document.documentElement.classList.add("has-cursor");
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const next = t?.dataset.cursor ?? "";
      setLabel((cur) => (cur === next ? cur : next));
      r.dataset.on = t ? "true" : "false";
    };

    const tick = () => {
      // The ring eases toward the pointer; the dot is exact. The gap between
      // them is what reads as weight.
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      d.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      r.style.transform = `translate3d(${ringPos.x}px,${ringPos.y}px,0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div className="cur-dot" ref={dot} aria-hidden="true" />
      <div className="cur-ring" ref={ring} aria-hidden="true">
        <span>{label}</span>
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- intro */

/**
 * The first two seconds.
 *
 * A curtain that counts up and lifts, and it is the only blocking animation on
 * the page. It is skipped entirely under reduced motion, and it removes itself
 * from the DOM afterwards so it can never trap a click or a screen reader.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced()) return setGone(true);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setGone(true) });
      const counter = { v: 0 };
      tl.to(counter, {
        v: 100, duration: 1.1, ease: "power2.inOut",
        onUpdate: () => {
          const n = el.querySelector(".intro__n");
          if (n) n.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      })
        .to(".intro__name span", { yPercent: -100, stagger: 0.04, duration: 0.5, ease: "power3.in" }, "-=0.3")
        .to(el, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "-=0.1");
    }, root);

    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div className="intro" ref={root} aria-hidden="true">
      <div className="intro__name">
        {"KIRAN BASA".split("").map((c, i) => (
          <span key={i}>{c === " " ? " " : c}</span>
        ))}
      </div>
      <div className="intro__n">000</div>
    </div>
  );
}

/* ------------------------------------------------------------- headlines */

/**
 * A heading whose words rise out of a mask as it enters view.
 *
 * The text is rendered normally on the server and only split once JS runs, so
 * with no JS — or before hydration — it is an ordinary, readable heading.
 */
export function Lines({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const words = splitWords(el);
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.035,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref as never} className={`lines ${className}`}>
      {children}
    </Tag>
  );
}

/** Blocks that drift up as they arrive. Cheaper than Lines, used for body. */
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 40, autoAlpha: 0, duration: 0.85, ease: "power3.out", delay,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}

/* -------------------------------------------------------------- work rail */

/**
 * The work, as a horizontal rail driven by vertical scroll.
 *
 * The section pins and the track translates sideways, so scrolling down walks
 * you through the projects. Each image counter-moves inside its frame, which
 * is what stops a horizontal move from feeling like a slide deck.
 *
 * Below 900px the pin is dropped entirely and it becomes a native swipe rail —
 * pinning on a phone fights the browser's own scroll and always loses.
 */
export function WorkRail({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const t = track.current!;
        const distance = () => t.scrollWidth - window.innerWidth + 96;

        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Parallax inside each frame, tied to the rail's own progress.
        gsap.utils.toArray<HTMLElement>(".rail__img").forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, {
            xPercent: 8, ease: "none",
            scrollTrigger: { trigger: img.closest(".rail__card"), containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
      });

      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="rail" ref={root}>
      <div className="rail__track" ref={track}>
        {projects.map((p) => (
          <article className="rail__card" key={p.code} data-cursor={p.href ? "Visit" : "View"}>
            <div className="rail__frame">
              <Image src={p.poster} alt={p.name} fill sizes="(max-width:900px) 86vw, 42vw" className="rail__img" />
              <span className="rail__code">{p.code}</span>
            </div>
            <div className="rail__meta">
              <span className="rail__kind">{p.kind}</span>
              <h3>{p.name}</h3>
              <p>{p.blurb}</p>
              {p.result && <p className="rail__result">{p.result}</p>}
              <span className="rail__credit">{p.credit}</span>
              {p.href && (
                <a href={p.href} target="_blank" rel="noreferrer" className="rail__link">
                  Open live site ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="rail__hint" aria-hidden="true">Scroll to move sideways →</p>
    </div>
  );
}

/* --------------------------------------------------------------- marquee */

/**
 * An infinite ticker whose speed and direction follow the reader's scroll.
 *
 * The list is duplicated once and wrapped with a modulo, so it loops without a
 * seam. Tying timeScale to scroll velocity makes the band feel attached to the
 * reader's own movement rather than looping on an indifferent timer.
 */
export function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const row = root.current!.querySelector<HTMLElement>(".mq__row")!;
      const half = () => row.scrollWidth / 2;

      const drift = gsap.to(row, {
        x: () => -half(),
        duration: 34,
        ease: "none",
        repeat: -1,
        modifiers: { x: (v) => `${parseFloat(v) % half()}px` },
      });

      ScrollTrigger.create({
        trigger: root.current,
        onUpdate: (self) => {
          drift.timeScale(gsap.utils.clamp(0.6, 6, 1 + Math.abs(self.getVelocity()) / 700));
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="mq" ref={root} aria-hidden="true">
      <div className="mq__row">
        {doubled.map((c, i) => (
          <span key={`${c}-${i}`}>
            {c}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- method pin */

/**
 * The pipeline as a pinned, stepping section.
 *
 * The list pins while a large step number and its reasoning swap alongside,
 * so the reader moves *through* the process rather than reading a list of it.
 * The active step is driven by scroll progress, and every step is also a real
 * button, so keyboard users can step it directly.
 */
export function MethodPin({ steps }: { steps: { step: string; body: string; detail: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        /* Pin the whole two-column block, not just the left stage. Pinning
           one column lets the other scroll away, which empties half the
           screen for the rest of the pin duration. */
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 96px",          // clears the sticky nav
          end: () => `+=${steps.length * 380}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999));
            setI((cur) => (cur === idx ? cur : idx));
          },
        });
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, [steps.length]);

  return (
    <div className="method2" ref={root}>
      <div className="method__stage">
        <div className="method__big" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
        <div className="method__live" role="status" aria-live="polite">
          <h3>{steps[i].step}</h3>
          <p>{steps[i].detail}</p>
        </div>
      </div>
      <ol className="method__list">
        {steps.map((s, idx) => (
          <li key={s.step} data-on={idx === i}>
            <button type="button" onClick={() => setI(idx)} aria-current={idx === i}>
              <span className="method__idx">{String(idx + 1).padStart(2, "0")}</span>
              <span>
                <strong>{s.step}</strong>
                <em>{s.body}</em>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* --------------------------------------------------------------- counter */

export function Counter({ value, label, note }: { value: string; label: string; note: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const m = value.match(/^(\D*)(\d+)(.*)$/);
    if (!m) return;
    const out = el.querySelector<HTMLElement>(".ctr__v")!;
    const o = { v: 0 };

    const ctx = gsap.context(() => {
      gsap.to(o, {
        v: Number(m[2]), duration: 1.5, ease: "power2.out",
        onUpdate: () => { out.textContent = `${m[1]}${Math.round(o.v)}${m[3]}`; },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [value]);

  return (
    <div className="ctr" ref={ref}>
      <div className="ctr__v tnum">{value}</div>
      <div className="ctr__l">{label}</div>
      <div className="ctr__n">{note}</div>
    </div>
  );
}

/* -------------------------------------------------------------- magnetic */

/** A button that leans toward the pointer. Small, and it makes a page feel alive. */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current?.firstElementChild as HTMLElement | undefined;
    if (!el || reduced() || !window.matchMedia("(hover: hover)").matches) return;

    const enter = () => gsap.to(el, { scale: 1.04, duration: 0.3, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.28,
        y: (e.clientY - (r.top + r.height / 2)) * 0.4,
        duration: 0.4, ease: "power3.out",
      });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" });

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <span className="mag" ref={ref}>{children}</span>;
}
