"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project, Role } from "../data/profile";

/**
 * A work card. Video is used only where a still cannot carry the point — a
 * website scroll or a previz walkthrough — and it is muted, looping, playsInline
 * and lazily loaded so it never costs a reader their data plan or their
 * attention. Everything else is a poster image, which loads faster and reads
 * better on a phone.
 */
export function WorkCard({ p, i }: { p: Project; i: number }) {
  return (
    <article className="card" data-reveal data-i={i}>
      <div className="card__media">
        <span className="card__code">{p.code}</span>
        {p.video ? (
          <video
            poster={p.poster}
            src={p.video}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${p.name} — walkthrough`}
          />
        ) : (
          /* `fill` because the container already fixes the aspect ratio, and the
             sizes hint stops a phone downloading the desktop-width variant. */
          <Image
            src={p.poster}
            alt={p.name}
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
            priority={i === 0}
          />
        )}
      </div>
      <div className="card__body">
        <span className="card__kind">{p.kind}</span>
        <h3>{p.name}</h3>
        <p>{p.blurb}</p>
        {p.result && (
          <p className="card__result">
            <strong>Result</strong> {p.result}
          </p>
        )}
        <span className="card__credit">{p.credit}</span>
      </div>
    </article>
  );
}

/**
 * The experience list.
 *
 * Recent roles are open; the four earlier ones sit behind a toggle. A hiring
 * manager needs the last three roles in detail and the rest as evidence that
 * the arc is real — putting all eight at full length pushes the contact
 * details two screens further down for no gain.
 */
export function ExperienceList({ roles }: { roles: Role[] }) {
  const [open, setOpen] = useState(false);
  const recent = roles.filter((r) => !r.early);
  const early = roles.filter((r) => r.early);

  return (
    <>
      <div className="exp">
        {recent.map((r, i) => (
          <Row key={r.org} r={r} i={i} />
        ))}
      </div>

      {early.length > 0 && (
        <div className="exp__more">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="early-roles"
          >
            {open ? "Hide earlier roles" : `Show ${early.length} earlier roles (2016 — 2022)`}
          </button>

          <div className="exp" id="early-roles" hidden={!open}>
            {early.map((r, i) => (
              <Row key={r.org} r={r} i={i} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function Row({ r, i }: { r: Role; i: number }) {
  return (
    <div className="exp__row" data-reveal data-i={i}>
      <div className="exp__meta">
        <div className="exp__org">{r.org}</div>
        <div className="exp__period">{r.period}</div>
        <div className="exp__period">{r.place}</div>
      </div>
      <div>
        <div className="exp__role">{r.role}</div>
        <ul className="exp__points">
          {r.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
        {r.detail && <p className="exp__detail">{r.detail}</p>}
      </div>
    </div>
  );
}
