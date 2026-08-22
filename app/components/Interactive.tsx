"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project, Discipline } from "../data/profile";
import { DISCIPLINES, method } from "../data/profile";

/* ------------------------------------------------------------------ hooks */

/**
 * Fires once when the element first enters view. Used for anything that should
 * animate on arrival — never for anything that must be readable, because an
 * observer that fails must never be able to hide content.
 */
function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { rootMargin, threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, rootMargin]);

  return [ref, seen] as const;
}

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------- counters */

/**
 * Counts up to the figure when it arrives on screen.
 *
 * The full value is rendered server-side and the count-up only ever replaces
 * it after mount, so the number is correct with JavaScript off and correct
 * before the animation runs. Prefixes and suffixes (₹, L+, %, yrs) are kept
 * out of the animated span so the layout cannot jitter as digits change.
 */
export function Figure({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const parsed = useMemo(() => {
    const m = value.match(/^(\D*)(\d+)(.*)$/);
    return m ? { pre: m[1], n: Number(m[2]), post: m[3] } : null;
  }, [value]);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (!seen || !parsed || reduceMotion()) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // ease-out-cubic: fast first, settles gently on the real number
      setShown(Math.round(parsed.n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, parsed]);

  return (
    <div className="fig" ref={ref}>
      <div className="fig__v">
        {parsed && shown !== null ? (
          <>
            {parsed.pre}
            <span className="tnum">{shown}</span>
            {parsed.post}
          </>
        ) : (
          value
        )}
      </div>
      <div className="fig__l">{label}</div>
      <div className="fig__n">{note}</div>
    </div>
  );
}

/* ------------------------------------------------------------------- work */

function Card({ p }: { p: Project }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [ref, seen] = useInView<HTMLElement>();

  /* Video is loaded only once the card is near the viewport, and plays on
     hover or focus. A portfolio that autoplays eight clips at once costs a
     reader on mobile data more than it earns in polish. */
  const play = useCallback(() => {
    if (!reduceMotion()) vid.current?.play().catch(() => {});
  }, []);
  const stop = useCallback(() => {
    const v = vid.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  return (
    <article
      className="card"
      ref={ref}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      tabIndex={0}
      aria-label={`${p.name} — ${p.kind}`}
    >
      <div className="card__media">
        <span className="card__code">{p.code}</span>
        {p.video && seen ? (
          <video ref={vid} poster={p.poster} src={p.video} muted loop playsInline preload="none" />
        ) : (
          <Image src={p.poster} alt="" fill sizes="(max-width:820px) 100vw, 46vw" />
        )}
        <span className="card__hint" aria-hidden="true">
          {p.video ? "Hover to play" : ""}
        </span>
      </div>
      <div className="card__body">
        <span className="card__kind">{p.kind}</span>
        <h3>{p.name}</h3>
        <p>{p.blurb}</p>
        {p.result && (
          <p className="card__result">
            <strong>Result</strong>
            {p.result}
          </p>
        )}
        <div className="card__foot">
          <span className="card__credit">{p.credit}</span>
          {p.href && (
            <a href={p.href} target="_blank" rel="noreferrer" className="card__link">
              Visit ↗
            </a>
          )}
        </div>
        <ul className="card__tags" aria-label="Disciplines">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * The work grid, filterable by discipline.
 *
 * The filter is the argument: a hiring manager who came for a content role
 * clicks "Production" and sees a producer; one hiring for brand clicks
 * "Brand & strategy" and sees a strategist. Same record, read from their
 * angle. Filtering hides nothing permanently — the count is always shown, so
 * the breadth stays visible even while a subset is displayed.
 */
export function WorkFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Discipline | "All">("All");

  const shown = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.tags.includes(active))),
    [active, projects],
  );

  const counts = useMemo(() => {
    const c = new Map<string, number>([["All", projects.length]]);
    DISCIPLINES.forEach((d) => c.set(d, projects.filter((p) => p.tags.includes(d)).length));
    return c;
  }, [projects]);

  return (
    <>
      <div className="filter" role="group" aria-label="Filter work by discipline">
        {(["All", ...DISCIPLINES] as const).map((d) => (
          <button
            key={d}
            type="button"
            className="chip"
            data-on={active === d}
            aria-pressed={active === d}
            onClick={() => setActive(d)}
          >
            {d}
            <span className="chip__n">{counts.get(d)}</span>
          </button>
        ))}
      </div>

      <p className="filter__status" role="status">
        Showing {shown.length} of {projects.length} projects
        {active !== "All" && ` in ${active}`}.
      </p>

      <div className="work__grid">
        {shown.map((p) => (
          <Card key={p.code} p={p} />
        ))}
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- method */

/**
 * The pipeline, openable step by step.
 *
 * Each step shows its one-line summary always, and the reasoning on demand.
 * The summary alone answers "what is your process"; the detail answers "do you
 * actually know why" — and only the second reader needs to click.
 */
export function Method() {
  const [open, setOpen] = useState<number | null>(2);

  return (
    <ol className="method">
      {method.map((m, i) => {
        const isOpen = open === i;
        return (
          <li className="method__row" key={m.step} data-open={isOpen}>
            <button
              type="button"
              className="method__btn"
              aria-expanded={isOpen}
              aria-controls={`method-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="method__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="method__text">
                <span className="method__step">{m.step}</span>
                <span className="method__body">{m.body}</span>
              </span>
              <span className="method__chev" aria-hidden="true" />
            </button>
            <div className="method__detail" id={`method-${i}`} hidden={!isOpen}>
              <p>{m.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------------------------------------------------------- compare */

/**
 * Drag-to-compare, for showing a generated frame against a shot one.
 *
 * Built and ready, but deliberately not rendered yet: it needs a real pair of
 * frames — one photographed, one generated, same product. Wiring it to stand-in
 * images would fake the exact claim it exists to prove.
 *
 * Pointer, keyboard and touch all drive the same value, and it is a real
 * slider input underneath rather than a div with listeners — so it is
 * operable by anyone, announced correctly, and works before the JS that
 * prettifies it has loaded.
 */
export function Compare({
  before,
  after,
  beforeLabel,
  afterLabel,
  caption,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <figure className="cmp">
      <div className="cmp__box" style={{ ["--pos" as string]: `${pos}%` }}>
        <Image src={before} alt={beforeLabel} fill sizes="100vw" className="cmp__img" />
        <div className="cmp__clip">
          <Image src={after} alt={afterLabel} fill sizes="100vw" className="cmp__img" />
        </div>
        <span className="cmp__tag cmp__tag--l">{beforeLabel}</span>
        <span className="cmp__tag cmp__tag--r">{afterLabel}</span>
        <span className="cmp__bar" aria-hidden="true">
          <span className="cmp__grip" />
        </span>
        <input
          className="cmp__range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal ${afterLabel} over ${beforeLabel}`}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------- scrollspy */

/**
 * Sticky section nav that tracks the reader's position.
 *
 * Rendered as real anchors so it works with JS off; the highlight is the only
 * part that needs script.
 */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        // The section nearest the top of the viewport wins, so the highlight
        // does not flicker between two sections both partly on screen.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="spy" aria-label="Sections">
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} data-on={active === i.id}>
              <span className="spy__dot" aria-hidden="true" />
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
