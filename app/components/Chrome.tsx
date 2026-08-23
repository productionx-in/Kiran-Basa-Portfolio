"use client";

/**
 * The page's motion runtime and the small interactive parts that appear in more
 * than one section.
 *
 * Two rules hold everywhere in this file:
 *
 *   1. Nothing here may be load-bearing for reading the page. Every component
 *      renders its content in a finished state on the server; motion only ever
 *      takes something that is already visible and animates it. A blocked
 *      bundle or a thrown error costs an effect, never the content.
 *   2. `prefers-reduced-motion` is a hard stop, not a softened duration. The
 *      runtime marks the document `motion-off` and returns.
 */

import { useEffect, useRef, useState } from "react";
import { initMotion, killMotion, gsap, ScrollTrigger, splitWords, reduced } from "../lib/motion";

/* ------------------------------------------------------------------- boot */

/** Starts the motion runtime once, and tears it down on unmount. */
export function Motion() {
  useEffect(() => {
    initMotion();
    return () => killMotion();
  }, []);
  return null;
}

/* --------------------------------------------------------------- progress */

/** A hairline of accent across the top, showing how far through the index you are. */
export function Progress() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced() || !el.current) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (el.current) el.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => st.kill();
  }, []);

  return <div ref={el} className="prog" aria-hidden="true" />;
}

/* ----------------------------------------------------------------- cursor */

/**
 * A cursor that reports what it is over.
 *
 * A dot that tracks exactly, and a ring that lags behind it. The ring grows and
 * takes a word when the pointer is over anything carrying `data-cursor`, which
 * is how a row says "open" without printing the instruction next to itself.
 *
 * Never mounts on a coarse pointer: a phone has no cursor to augment.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  /* Decide first — the nodes below do not exist until this says so, which is
     why wiring them up has to wait for a second pass. */
  useEffect(() => {
    if (reduced()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setActive(true);
  }, []);

  useEffect(() => {
    const d = dot.current;
    const r = ring.current;
    if (!active || !d || !r) return;

    document.documentElement.classList.add("has-cursor");
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const lag = { ...pos };
    let raf = 0;
    let live = false;

    const move = (e: PointerEvent) => {
      if (!live) {
        // Jump both parts to the pointer before fading in, so the ring does not
        // sail across the page from wherever it was parked.
        live = true;
        lag.x = e.clientX;
        lag.y = e.clientY;
        document.documentElement.classList.add("cursor-live");
      }
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const next = t?.dataset.cursor ?? "";
      setLabel((cur) => (cur === next ? cur : next));
      r.dataset.on = t ? "true" : "false";
    };

    const tick = () => {
      // The ring eases toward the pointer, the dot is exact. The gap between
      // the two is what reads as weight.
      lag.x += (pos.x - lag.x) * 0.16;
      lag.y += (pos.y - lag.y) * 0.16;
      d.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      r.style.transform = `translate3d(${lag.x}px,${lag.y}px,0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor", "cursor-live");
    };
  }, [active]);

  if (!active) return null;
  return (
    <div aria-hidden="true">
      <div ref={dot} className="cur">
        <div className="cur__d" />
      </div>
      <div ref={ring} className="cur">
        <div className="cur__r" data-on="false">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ intro */

/**
 * A two-second title card.
 *
 * It is `display:none` in CSS and only shown under `html.js-intro`, a class set
 * by an inline script in the document head before first paint. So a reader with
 * no JavaScript never receives a black overlay that nothing will ever lift, and
 * neither does one who asked for reduced motion.
 */
export function Intro({ name, role }: { name: string; role: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reduced()) return;

    const bar = el.querySelector(".intro__bar i");
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        document.documentElement.classList.remove("js-intro");
        el.remove();
      },
    });

    tl.fromTo(el.querySelectorAll(".intro__n, .intro__r"), { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" })
      .to(bar, { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0.25)
      .to(el, { yPercent: -100, duration: 0.75, ease: "power3.inOut" }, "+=0.15");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div>
        <span className="mask">
          <span className="intro__n mask__w">{name}</span>
        </span>
        <span className="mask" style={{ display: "block" }}>
          <span className="intro__r mask__w">{role}</span>
        </span>
        <span className="intro__bar">
          <i />
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- reveals */

/**
 * Rises a block into place once, when it first crosses into view.
 *
 * The element is claimed with `js-reveal` from inside the effect rather than in
 * the markup, so anything the runtime never reaches simply stays visible.
 */
export function Rise({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  ...rest
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  delay?: number;
  className?: string;
  [k: string]: unknown;
}) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || reduced()) return;
    node.classList.add("js-reveal");
    const tw = gsap.fromTo(
      node,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 88%", once: true },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
      node.classList.remove("js-reveal");
    };
  }, [delay]);

  return (
    <Tag ref={el} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Reveals a sentence word by word, each rising out of its own clip.
 *
 * The split runs client-side over text that is already in the DOM, and the
 * original sentence is preserved on the wrapper as `aria-label` so a screen
 * reader hears the sentence rather than a pile of fragments.
 */
export function Lines({
  children,
  as: Tag = "p",
  className,
}: {
  children: string;
  as?: React.ElementType;
  className?: string;
}) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || reduced()) return;
    const words = splitWords(node);
    if (!words.length) return;
    const tw = gsap.fromTo(
      words,
      { yPercent: 108 },
      {
        yPercent: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.022,
        scrollTrigger: { trigger: node, start: "top 88%", once: true },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <Tag ref={el} className={className}>
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- name fill */

/**
 * The outlined surname fills with accent as the title card lifts.
 *
 * It was on a scroll scrub first, which was wrong: the name sits at the very
 * top of the page, so any scroll large enough to drive the fill has already
 * pushed most of the word off screen. Nobody would have seen it. Tying it to
 * the intro instead puts the whole beat in view, and the hollow outline is
 * still the state the page arrives in.
 *
 * The fill layer defaults to full in CSS and is only emptied under `html.js` —
 * so with no JavaScript the name is solid and legible rather than a hollow word
 * that never completes.
 */
export function NameFill({ children }: { children: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || reduced()) return;
    const tw = gsap.to(node, {
      backgroundSize: "100% 100%",
      duration: 1.15,
      // Lands as the curtain clears, so the two read as one movement.
      delay: 1.7,
      ease: "power2.inOut",
    });
    return () => {
      tw.kill();
    };
  }, []);

  return (
    <span ref={el} className="name__out">
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- counter */

/**
 * Counts a figure up when it arrives.
 *
 * Deliberately driven by IntersectionObserver rather than by the GSAP timeline:
 * the number has to be correct even when every animation is switched off, and
 * the simplest way to guarantee that is to render the final value on the server
 * and only ever overwrite it while the count is in flight.
 */
export function Counter({ value, label, note }: { value: string; label: string; note: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || reduced()) return;

    // Pull the number out of "₹48L+" or "300+" and keep whatever wraps it.
    const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    const [, pre, digits, post] = m;
    const target = parseFloat(digits);
    const dp = digits.includes(".") ? 1 : 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = `${pre}${obj.n.toFixed(dp)}${post}`;
          },
          onComplete: () => {
            node.textContent = value;
          },
        });
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className="fig">
      <div className="fig__v">
        <span ref={el}>{value}</span>
      </div>
      <div className="fig__l">{label}</div>
      <div className="fig__n">{note}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- marquee */

/**
 * The client list, moving at a base speed and pushed by the scroll.
 *
 * Scroll velocity feeds the rate and the direction, so the line reacts to the
 * reader rather than looping indifferently past them. With motion off the CSS
 * turns the same markup into a wrapped list, which is why the items are plain
 * inline elements and not absolutely positioned.
 */
export function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = root.current;
    const rail = track.current;
    if (!wrap || !rail || reduced()) return;

    const half = rail.scrollWidth / 2;
    if (!half) return;

    let x = 0;
    let dir = 1;
    let vel = 0;
    const base = 0.55;

    // One page-wide trigger reports both which way the reader is going and how
    // fast; the ticker below reads the last values rather than measuring again.
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        dir = self.direction;
        vel = Math.abs(self.getVelocity());
      },
    });

    const tick = () => {
      x -= (base + Math.min(vel / 260, 9)) * dir;
      vel *= 0.92; // decay, so the line settles back to its base speed

      // The track holds the list twice; wrapping at half its width makes the
      // seam invisible without cloning nodes on every frame.
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      rail.style.transform = `translate3d(${x}px,0,0)`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [items]);

  return (
    <div ref={root} className="marq">
      <div ref={track} className="marq__track">
        {[...items, ...items].map((c, i) => (
          <span className="marq__i" key={`${c}-${i}`} aria-hidden={i >= items.length}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- magnetic */

/** A control that leans toward the pointer. Pure affordance; costs nothing if it never runs. */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current?.firstElementChild as HTMLElement | null;
    if (!node || reduced()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      gsap.to(node, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.26,
        y: (e.clientY - (r.top + r.height / 2)) * 0.34,
        duration: 0.5,
        ease: "power3.out",
      });
    };
    const leave = () => gsap.to(node, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1,0.4)" });

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(node);
    };
  }, []);

  return <span ref={el}>{children}</span>;
}

/* -------------------------------------------------------------- scroll spy */

/**
 * Marks the nav link for whichever section is currently in the reading band.
 *
 * IntersectionObserver rather than ScrollTrigger, for the same reason as the
 * counter: navigation has to keep working when the animation runtime is off.
 */
export function Spy({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) {
          setCurrent(hit.target.id);
          return;
        }
        // Nothing in the reading band. Above the first section that means the
        // masthead, so nothing should be marked — otherwise the last section
        // read stays highlighted all the way back at the top of the page.
        const first = document.getElementById(items[0]?.id ?? "");
        if (first && first.getBoundingClientRect().top > innerHeight * 0.4) setCurrent("");
      },
      { rootMargin: "-18% 0px -68% 0px" },
    );
    items.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) io.observe(node);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="topbar__nav" aria-label="Sections">
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`} aria-current={current === i.id ? "true" : undefined}>
          {i.label}
        </a>
      ))}
    </nav>
  );
}
