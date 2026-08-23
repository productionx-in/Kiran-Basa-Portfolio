"use client";

/**
 * Experience as a ledger, and the method that runs underneath it.
 *
 * Ten years is the least replicable thing on the page, so the roles are set as
 * a dated ledger rather than as cards: date, role, organisation, in one column
 * you can read down. The bullets are folded away because a recruiter scanning
 * for shape should not have to wade through detail, and a hiring manager who
 * has found the role they care about should be able to open it and get all of
 * it.
 *
 * The older roles collapse behind one control. They are real and they belong on
 * the page — the arc from editor to creative lead is the argument — but they do
 * not need to compete with the last three years for attention.
 */

import { useState } from "react";
import type { Role } from "../data/profile";

function Job({ r, defaultOpen }: { r: Role; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `job-${r.org.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <article className={`job${open ? " job--open" : ""}`}>
      <h3>
        <button
          type="button"
          className="job__btn"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          data-cursor={open ? "Close" : "Detail"}
        >
          <span className="job__when">{r.period}</span>
          <span className="job__role">
            {r.role}
            <span className="job__org">
              {r.org} · {r.place}
            </span>
          </span>
          <span className="job__sign" aria-hidden="true">
            +
          </span>
        </button>
      </h3>

      <div className="job__panel" id={id} role="region" aria-label={`${r.role}, ${r.org}`}>
        <div className="job__panelIn">
          <div className="job__body">
            <span className="job__spacer" aria-hidden="true" />
            <div>
              <ul className="job__points">
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {/* The one line in each role that is opinion rather than record —
                  what the job taught him. It is the closest thing on the page to
                  an interview answer. */}
              {r.detail && <p className="job__note">{r.detail}</p>}
            </div>
            <span aria-hidden="true" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function Ledger({ roles }: { roles: Role[] }) {
  const [showEarly, setShowEarly] = useState(false);
  const recent = roles.filter((r) => !r.early);
  const early = roles.filter((r) => r.early);

  return (
    <div className="ledger">
      {recent.map((r, i) => (
        <Job key={r.org + r.period} r={r} defaultOpen={i === 0} />
      ))}

      {early.length > 0 && (
        <>
          {showEarly &&
            early.map((r) => <Job key={r.org + r.period} r={r} defaultOpen={false} />)}
          <button
            type="button"
            className="more"
            aria-expanded={showEarly}
            onClick={() => setShowEarly(!showEarly)}
          >
            {showEarly ? "— Hide the first four roles" : `+ Show ${early.length} earlier roles (2016 — 2022)`}
          </button>
        </>
      )}
    </div>
  );
}
