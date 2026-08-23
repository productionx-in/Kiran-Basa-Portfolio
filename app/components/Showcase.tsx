"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "../lib/motion";
import type { Project } from "../data/profile";

/**
 * The work, as a scroll you move through rather than a grid you scan.
 *
 * Each project owns a full viewport. The media is sticky and reveals through a
 * clip-path mask as the panel arrives, scaling down from 1.15 to 1 so the
 * frame settles rather than snaps. The copy tracks separately and slightly
 * faster, which is what makes the two feel like different planes instead of
 * one moving block.
 *
 * A fixed index on the left counts the projects and fills a progress rule, so
 * the reader always knows how much work is left — the thing a long scroll
 * usually fails to tell you.
 */
export default function Showcase({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // The counter must work even with motion off — it is navigation, not decoration.
    const panels = gsap.utils.toArray<HTMLElement>(".sc__panel", el);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setI(Number((vis[0].target as HTMLElement).dataset.i ?? 0));
      },
      { threshold: [0.4, 0.6] },
    );
    panels.forEach((p) => io.observe(p));

    if (reduced()) return () => io.disconnect();

    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        const media = panel.querySelector<HTMLElement>(".sc__media");
        const img = panel.querySelector<HTMLElement>(".sc__img");
        const copy = panel.querySelector<HTMLElement>(".sc__copy");

        if (media && img) {
          // Reveal: the mask opens from the bottom while the image settles.
          gsap.fromTo(media,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.1, ease: "power4.out",
              scrollTrigger: { trigger: panel, start: "top 78%", once: true },
            });
          gsap.fromTo(img, { scale: 1.15 }, {
            scale: 1, ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }

        if (copy) {
          gsap.fromTo(copy, { y: 60 }, {
            y: -60, ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }
      });
    }, el);

    return () => { io.disconnect(); ctx.revert(); };
  }, []);

  return (
    <div className="sc" ref={root}>
      {/* Fixed index — where you are, and how much is left. */}
      <div className="sc__index" aria-hidden="true">
        <span className="sc__now">{String(i + 1).padStart(2, "0")}</span>
        <span className="sc__rule">
          <span style={{ transform: `scaleY(${(i + 1) / projects.length})` }} />
        </span>
        <span className="sc__total">{String(projects.length).padStart(2, "0")}</span>
      </div>

      <ol className="sc__list">
        {projects.map((p, n) => (
          <li className="sc__panel" key={p.code} data-i={n} data-alt={n % 2 === 1}>
            <div className="sc__inner">
              {p.poster ? (
                <div className="sc__media" data-cursor={p.href ? "Visit" : ""}>
                  {p.video ? (
                    <video
                      className="sc__img" poster={p.poster} src={p.video}
                      autoPlay muted loop playsInline preload="none"
                      aria-label={p.shot || p.name}
                    />
                  ) : (
                    <Image className="sc__img" src={p.poster} alt={p.shot || p.name} fill sizes="(max-width:900px) 100vw, 55vw" />
                  )}
                  {p.shot && <figcaption className="sc__shot">{p.shot}</figcaption>}
                </div>
              ) : (
                /* No honest image for this one yet, so the space argues in type
                   instead of showing something that contradicts the copy. */
                <div className="sc__media sc__media--none">
                  <span className="sc__none-k">{p.kind}</span>
                  <p className="sc__none-t">{p.name}</p>
                </div>
              )}

              <div className="sc__copy">
                <span className="sc__code">{p.code} / {String(projects.length).padStart(2, "0")}</span>
                <span className="sc__kind">{p.kind}</span>
                <h3>{p.name}</h3>
                <p className="sc__blurb">{p.blurb}</p>
                {p.result && (
                  <p className="sc__result"><strong>Result</strong>{p.result}</p>
                )}
                <div className="sc__foot">
                  <span className="sc__credit">{p.credit}</span>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noreferrer" className="sc__link" data-cursor="Open">
                      {p.hrefLabel ?? "Open live site ↗"}
                    </a>
                  )}
                </div>
                <ul className="sc__tags">
                  {p.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
