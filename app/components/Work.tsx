"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Project, GroupKey } from "../data/profile";
import { GROUPS } from "../data/profile";

/**
 * The work as an editorial mosaic.
 *
 * The previous arc forced eleven images of wildly different shape into
 * identical 3:4 tiles on a curve, which cropped the life out of every one of
 * them — a badge, a wide interior and a tall site screenshot do not want the
 * same frame. A mosaic treats that variety as the point: each piece is given
 * the span its image actually wants, and the irregular edge is the
 * composition rather than a failure of it.
 *
 * Selecting a tile opens its full detail in a strip below the grid, so the
 * layout never jumps and nothing is hidden behind a modal.
 */

/** Spans are authored per piece, not derived — a composed grid beats an even one. */
const SPAN: Record<string, string> = {
  "01": "c2 r2", "02": "c2 r1", "03": "c1 r2", "04": "c1 r1",
  "05": "c2 r1", "06": "c1 r1", "07": "c1 r1", "08": "c1 r2",
  "09": "c1 r1", "10": "c2 r1", "11": "c1 r1",
};

export default function Work({ projects }: { projects: Project[] }) {
  const [group, setGroup] = useState<GroupKey | "all">("all");
  const [openCode, setOpenCode] = useState<string | null>(null);

  const shown = group === "all" ? projects : projects.filter((p) => p.group === group);
  const open = projects.find((p) => p.code === openCode) ?? null;

  const close = useCallback(() => setOpenCode(null), []);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, close]);

  return (
    <div className="wk">
      <div className="wk__shelves" role="group" aria-label="Filter work by craft">
        <button
          type="button" className="wk__shelf" data-on={group === "all"}
          aria-pressed={group === "all"} onClick={() => { setGroup("all"); setOpenCode(null); }}
        >
          Everything<span>{projects.length}</span>
        </button>
        {GROUPS.map((g) => (
          <button
            key={g.key} type="button" className="wk__shelf" data-on={group === g.key}
            aria-pressed={group === g.key}
            onClick={() => { setGroup(g.key); setOpenCode(null); }}
          >
            {g.label}<span>{projects.filter((p) => p.group === g.key).length}</span>
          </button>
        ))}
      </div>

      <p className="wk__line" role="status">
        {group === "all"
          ? "Everything, newest craft first."
          : GROUPS.find((g) => g.key === group)?.blurb}
      </p>

      <div className="wk__grid">
        {shown.map((p) => (
          <button
            type="button"
            key={p.code}
            className={`wk__tile ${SPAN[p.code] ?? "c1 r1"}`}
            data-on={openCode === p.code}
            data-none={!p.poster}
            onClick={() => setOpenCode(openCode === p.code ? null : p.code)}
            aria-expanded={openCode === p.code}
            aria-label={`${p.name} — ${p.kind}, ${p.engagement}`}
            data-cursor={openCode === p.code ? "Close" : "Read"}
          >
            {p.poster ? (
              <Image src={p.poster} alt="" fill sizes="(max-width:820px) 100vw, 40vw" className="wk__img" />
            ) : (
              <span className="wk__none">
                <span className="wk__none-k">{p.kind}</span>
                <span className="wk__none-n">{p.name}</span>
              </span>
            )}
            <span className="wk__veil" aria-hidden="true" />
            <span className="wk__meta">
              <span className="wk__code">{p.code}</span>
              <span className="wk__eng" data-e={p.engagement}>{p.engagement}</span>
            </span>
            {/* The type tile already states both, so the caption would
                repeat it. */}
            {p.poster && (
              <span className="wk__cap">
                <span className="wk__kind">{p.kind}</span>
                <span className="wk__name">{p.name}</span>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Detail opens below the grid rather than over it, so nothing jumps. */}
      <div className="wk__read" data-open={!!open} role="region" aria-live="polite">
        {open && (
          <>
            <div className="wk__read-head">
              <span className="wk__kind">{open.kind}</span>
              <button type="button" className="wk__close" onClick={close}>Close ✕</button>
            </div>
            <h3>{open.name}</h3>
            <div className="wk__read-grid">
              <div>
                <p className="wk__blurb">{open.blurb}</p>
                {open.result && (
                  <p className="wk__result"><strong>Result</strong>{open.result}</p>
                )}
              </div>
              <dl className="wk__facts">
                <div><dt>Engaged as</dt><dd><span className="wk__eng" data-e={open.engagement}>{open.engagement}</span></dd></div>
                <div><dt>Role</dt><dd>{open.credit}</dd></div>
                {open.shot && <div><dt>Image</dt><dd>{open.shot}</dd></div>}
                {open.href && (
                  <div>
                    <dt>Live</dt>
                    <dd>
                      <a href={open.href} target="_blank" rel="noreferrer" className="wk__link">
                        {open.hrefLabel ?? "Open ↗"}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
