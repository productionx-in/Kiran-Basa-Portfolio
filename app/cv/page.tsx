import type { Metadata } from "next";
import {
  person,
  figures,
  experience,
  earlyCredits,
  skills,
  education,
  languages,
  clients,
} from "../data/profile";
import "./cv.css";

export const metadata: Metadata = {
  title: `${person.legalName} · ${person.title} · CV`,
  description: `Curriculum vitae of ${person.name}, ${person.title}.`,
  robots: { index: false, follow: true },
};

/**
 * The CV, as a page rather than as a separate document.
 *
 * `scripts/cv.mjs` prints this to A4 PDF with headless Chromium, so the PDF a
 * recruiter downloads and the page they might land on are the same artefact
 * built from the same data. The alternative — a hand-maintained PDF beside a
 * hand-maintained site — drifts within a fortnight, and the drift always shows
 * up in an interview.
 *
 * Layout targets two A4 pages. Ten years of roles does not fit on one without
 * either lying by omission or shrinking the type past readability, and a
 * two-page CV is entirely normal at this level of seniority.
 */
export default function CV() {
  const recent = experience.filter((r) => !r.early);
  const early = experience.filter((r) => r.early);

  return (
    <article className="cv">
      <header className="cv__head">
        <h1>{person.legalName}</h1>
        <p className="cv__title">
          {person.title} &nbsp;|&nbsp; {person.subtitle} &nbsp;|&nbsp; Founder, ProductionX
        </p>
        {/*
          Two deliberate rows rather than one line left to wrap. Six items on
          one line orphaned the last link onto a row of its own, which looked
          like an accident.

          The studio's own site is not here. It sells studio services, and a
          founder applying for a full-time role does not want the reader's one
          click landing on a page that pitches for client work — it feeds the
          exact doubt the application has to answer. It moves down to the
          ProductionX entry instead, where it reads as a citation. GitHub takes
          the slot: nine public repositories are evidence, not a pitch.
        */}
        <p className="cv__contact">
          {person.location} &nbsp;·&nbsp; {person.phone} &nbsp;·&nbsp;{" "}
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </p>
        <p className="cv__contact">
          <a href={person.linkedinUrl}>{person.linkedin}</a> &nbsp;·&nbsp;{" "}
          <a href={person.portfolioUrl}>{person.portfolio}</a> &nbsp;·&nbsp;{" "}
          <a href={person.githubUrl}>{person.github}</a>
        </p>
      </header>

      <section>
        <h2>Profile</h2>
        <p className="cv__summary">
          Ten or more years in creative production, starting with editing, cinematography
          and production work, and including assistant direction. I moved into creative
          direction, brand content and marketing as my responsibilities grew. I still
          direct, shoot and stay hands-on with production, and I understand the brand and
          business objective behind the work. I use AI to make production faster and more
          scalable, not to replace creative judgment. Looking for Creative Lead
          opportunities, and open to Creative Director, Head of Creative, Creative
          Production Lead and Content Lead roles.
        </p>
      </section>

      {/* The numbers, banded so the eye finds them before the prose. */}
      <section className="cv__figs" aria-label="Key results">
        {figures.map((f) => (
          <div key={f.label}>
            <span className="cv__fig-v">{f.value}</span>
            <span className="cv__fig-l">{f.label}</span>
            <span className="cv__fig-n">{f.note}</span>
          </div>
        ))}
      </section>

      <section>
        <h2>Core skills</h2>
        <ul className="cv__skills">
          {skills.map((g) => (
            <li key={g.group}>
              <strong>{g.group}</strong>: {g.items.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Professional experience</h2>
        {recent.map((r) => (
          <div className="cv__role" key={r.org}>
            <div className="cv__role-head">
              <span className="cv__role-title">
                {r.role} &nbsp;|&nbsp; {r.org}
                {/* The studio's address sits with the studio, where it reads as
                    a citation rather than as a pitch at the top of the page. */}
                {r.urlLabel && <span className="cv__role-url"> &nbsp;·&nbsp; {r.urlLabel}</span>}
              </span>
              <span className="cv__role-when">{r.period}</span>
            </div>
            <div className="cv__role-place">{r.place}</div>
            <ul>
              {r.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}

        {/*
         * Earlier roles compressed to a line each. They still have to appear —
         * a gap in a CV is read as something being hidden — but at ten years'
         * distance the detail no longer earns its column inches.
         */}
        <h3 className="cv__sub">Earlier</h3>
        {early.map((r) => (
          <div className="cv__role cv__role--slim" key={r.org}>
            <div className="cv__role-head">
              <span className="cv__role-title">
                {r.role} &nbsp;|&nbsp; {r.org}
              </span>
              <span className="cv__role-when">{r.period}</span>
            </div>
            <div className="cv__role-place">
              {r.place}, {r.points[0]}
            </div>
          </div>
        ))}

        {/* Practical credits, not jobs — no company or date range, so they
            read as what they were rather than as more full-time employment. */}
        {earlyCredits.length > 0 && (
          <div className="cv__role cv__role--slim">
            <div className="cv__role-head">
              <span className="cv__role-title">Early production credits</span>
            </div>
            <div className="cv__role-place">
              {earlyCredits.map((c) => `${c.project}: ${c.role}`).join("; ")}.
            </div>
          </div>
        )}
      </section>

      <section className="cv__foot-grid">
        <div>
          <h2>Education</h2>
          {education.map((e) => (
            <p key={e.qualification} className="cv__edu">
              <strong>{e.qualification}</strong> ({e.period})
              <br />
              {e.institution}
            </p>
          ))}
        </div>
        <div>
          <h2>Languages</h2>
          <p className="cv__edu">{languages.join(" · ")}</p>
        </div>
      </section>

      <section>
        <h2>Brands worked on</h2>
        <p className="cv__edu">{clients.join(" · ")}</p>
      </section>
    </article>
  );
}
