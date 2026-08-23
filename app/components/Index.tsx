"use client";

/**
 * The index of selected work.
 *
 * This is the section the whole page is built around, and its structure is the
 * argument. A creative head is hired for judgement across a body of work rather
 * than for one hero image, so the work is presented the way an archive presents
 * itself: numbered, ruled, and labelled twice over — once by craft, once by how
 * the engagement actually worked.
 *
 * That second label is the one most portfolios quietly omit. A hiring manager
 * reads in-house work and freelance work differently and is right to: sitting
 * inside a brand through its approval chain is a different job from being
 * briefed by one. Every row states which it was, and both labels are filters,
 * so a reader can ask "show me the in-house brand work" and get an answer
 * instead of scrolling for it.
 *
 * Accessibility and failure modes:
 *   · Each row is one button with `aria-expanded` controlling one panel.
 *   · Panels default to open in CSS and are only collapsed under `html.js`, so
 *     a reader with no JavaScript gets the whole index written out.
 *   · Filtering is state, not display trickery — filtered-out rows leave the
 *     DOM, so screen readers and find-in-page agree with what is on screen.
 */

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap, reduced } from "../lib/motion";
import { Flip } from "gsap/Flip";
import { GROUPS, ENGAGEMENTS, type Project, type Engagement, type GroupKey } from "../data/profile";

/* Registered lazily on first use rather than at module scope: this file is
   imported during the server render, and plugin registration belongs in the
   browser. */
let flipReady = false;
function registerFlip() {
  if (flipReady) return;
  gsap.registerPlugin(Flip);
  flipReady = true;
}

/* ------------------------------------------------------------------- row */

function Row({
  p,
  open,
  onToggle,
  onPeek,
}: {
  p: Project;
  open: boolean;
  onToggle: () => void;
  onPeek: (src: string | null) => void;
}) {
  const group = GROUPS.find((g) => g.key === p.group);
  const panelId = `work-${p.code}`;
  const video = useRef<HTMLVideoElement>(null);

  /* A site recording is only worth its bandwidth once someone has asked to see
     the project, so it plays on open and rewinds on close. */
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (open && !reduced()) v.play().catch(() => {});
    else {
      v.pause();
      v.currentTime = 0;
    }
  }, [open]);

  return (
    <article className={`row${open ? " row--open" : ""}`}>
      <h3>
        <button
          type="button"
          className="row__btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onPointerEnter={() => onPeek(p.poster || null)}
          onPointerLeave={() => onPeek(null)}
          data-cursor={open ? "Close" : "Open"}
        >
          <span className="row__n">{p.code}</span>
          <span className="row__t">{p.name}</span>
          <span className="row__g">{group?.label}</span>
          <span className="row__e">
            <span className="badge">{p.engagement}</span>
          </span>
          <span className="row__th">
            {p.poster && (
              <Image src={p.poster} alt="" width={220} height={140} sizes="7rem" aria-hidden="true" />
            )}
          </span>
        </button>
      </h3>

      <div className="row__panel" id={panelId} role="region" aria-label={p.name}>
        <div className="row__panelIn">
          <div className="detail">
            <div>
              {p.poster ? (
                <div className="detail__media">
                  {p.video ? (
                    <video
                      ref={video}
                      poster={p.poster}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label={p.shot || p.name}
                    >
                      <source src={p.video} type="video/webm" />
                    </video>
                  ) : (
                    <Image
                      src={p.poster}
                      alt={p.shot || p.name}
                      width={1400}
                      height={880}
                      sizes="(min-width: 900px) 55vw, 100vw"
                    />
                  )}
                  {p.shot && <span className="detail__cap">{p.shot}</span>}
                </div>
              ) : (
                /* Missing rather than wrong. The only frame to hand for the
                   previsualisation work was a property render, and this entry
                   exists to say previz is not a real-estate tool — so it says
                   the frame is pending instead of arguing against itself. */
                <div className="detail__pending">
                  <span>Frame pending</span>
                  <span style={{ opacity: 0.7 }}>Stills from this pipeline to follow</span>
                </div>
              )}
            </div>

            <div className="detail__body">
              <p className="detail__blurb">{p.blurb}</p>

              <div className="detail__meta">
                <div className="detail__row">
                  <span className="detail__rk">Engagement</span>
                  <span className="detail__rv">{p.credit}</span>
                </div>
                <div className="detail__row">
                  <span className="detail__rk">Discipline</span>
                  <span className="detail__rv">{p.kind}</span>
                </div>
                {p.result && (
                  <div className="detail__row">
                    <span className="detail__rk">Result</span>
                    <span className="detail__rv detail__result">{p.result}</span>
                  </div>
                )}
                <div className="detail__row">
                  <span className="detail__rk">Tagged</span>
                  <span className="tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              {p.href && (
                <a className="btn" href={p.href} target="_blank" rel="noreferrer noopener">
                  {p.hrefLabel ?? "Open live site ↗"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------- index */

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [group, setGroup] = useState<GroupKey | null>(null);
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [open, setOpen] = useState<string | null>(projects[0]?.code ?? null);
  const [peek, setPeek] = useState<string | null>(null);

  const list = useRef<HTMLDivElement>(null);
  const peekEl = useRef<HTMLDivElement>(null);

  const shown = useMemo(
    () =>
      projects.filter(
        (p) => (!group || p.group === group) && (!engagement || p.engagement === engagement),
      ),
    [projects, group, engagement],
  );

  /* Counts sit on the chips because a filter that can return nothing is a
     dead end, and a filter that says "3" before you press it is a map. */
  const counts = useMemo(() => {
    const g = Object.fromEntries(GROUPS.map((x) => [x.key, 0])) as Record<GroupKey, number>;
    const e = Object.fromEntries(ENGAGEMENTS.map((x) => [x, 0])) as Record<Engagement, number>;
    for (const p of projects) {
      g[p.group]++;
      e[p.engagement]++;
    }
    return { g, e };
  }, [projects]);

  /* ---- Flip: the rows move to their new positions rather than blinking ---- */

  const state = useRef<Flip.FlipState | null>(null);
  const captureBeforeFilter = useCallback(() => {
    if (reduced() || !list.current) return;
    registerFlip();
    state.current = Flip.getState(list.current.querySelectorAll(".row"));
  }, []);

  useEffect(() => {
    if (!state.current || reduced()) return;
    Flip.from(state.current, {
      duration: 0.55,
      ease: "power3.inOut",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.25 }),
    });
    state.current = null;
  }, [group, engagement]);

  /* ---- the cursor-follow preview ---------------------------------------- */

  useEffect(() => {
    const el = peekEl.current;
    if (!el || reduced()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (e: PointerEvent) => {
      // Held to the right of centre rather than centred on the pointer: the
      // titles run down the left of the index, and a preview that lands on the
      // words you are reading is worse than no preview.
      gsap.to(el, {
        x: Math.max(e.clientX + 200, innerWidth * 0.64),
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const setFilter = (fn: () => void) => {
    captureBeforeFilter();
    fn();
  };

  const active = group !== null || engagement !== null;

  return (
    <>
      <div className="filters">
        <span className="filters__k">Craft</span>
        {GROUPS.map((g) => (
          <button
            key={g.key}
            type="button"
            className="chip"
            aria-pressed={group === g.key}
            onClick={() => setFilter(() => setGroup(group === g.key ? null : g.key))}
          >
            {g.label}
            <span className="chip__n">{counts.g[g.key]}</span>
          </button>
        ))}
      </div>

      <div className="filters">
        <span className="filters__k">Engagement</span>
        {ENGAGEMENTS.map((e) => (
          <button
            key={e}
            type="button"
            className="chip"
            aria-pressed={engagement === e}
            onClick={() => setFilter(() => setEngagement(engagement === e ? null : e))}
          >
            {e}
            <span className="chip__n">{counts.e[e]}</span>
          </button>
        ))}
        {active && (
          <button
            type="button"
            className="filters__clear"
            onClick={() =>
              setFilter(() => {
                setGroup(null);
                setEngagement(null);
              })
            }
          >
            Clear
          </button>
        )}
      </div>

      {/* Announced politely so a screen-reader user hears the result of a filter
          they just pressed, which is otherwise a silent change. */}
      <p className="sr" aria-live="polite">
        {shown.length} of {projects.length} projects shown
        {group ? `, ${GROUPS.find((g) => g.key === group)?.label}` : ""}
        {engagement ? `, ${engagement}` : ""}.
      </p>

      <div className="idx" ref={list}>
        {shown.map((p) => (
          <Row
            key={p.code}
            p={p}
            open={open === p.code}
            onToggle={() => setOpen(open === p.code ? null : p.code)}
            onPeek={setPeek}
          />
        ))}
        {!shown.length && <p className="idx__empty">Nothing under that combination — clear a filter.</p>}
      </div>

      <div ref={peekEl} className="peek" data-on={peek ? "true" : "false"} aria-hidden="true">
        {peek && <Image src={peek} alt="" width={520} height={390} sizes="19rem" />}
      </div>
    </>
  );
}
