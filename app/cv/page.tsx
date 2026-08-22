import type { Metadata } from "next";
import {
  person,
  figures,
  experience,
  skills,
  education,
  languages,
  clients,
} from "../data/profile";
import "./cv.css";

export const metadata: Metadata = {
  title: `${person.legalName} — ${person.title} · CV`,
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
        <p className="cv__contact">
          {person.location} &nbsp;·&nbsp; {person.phone} &nbsp;·&nbsp;{" "}
          <a href={`mailto:${person.email}`}>{person.email}</a> &nbsp;·&nbsp;{" "}
          <a href={person.linkedinUrl}>{person.linkedin}</a> &nbsp;·&nbsp;{" "}
          {/* Portfolio before the studio: this CV's job is to get the reader
              onto the page with the work on it. */}
          <a href={person.portfolioUrl}>{person.portfolio}</a> &nbsp;·&nbsp;{" "}
          <a href={person.studioUrl}>{person.studio}</a>
        </p>
      </header>

      <section>
        <h2>Profile</h2>
        <p className="cv__summary">
          Creative leader with ten years across the whole production chain — from cutting
          other people&rsquo;s footage to owning brand strategy, campaigns and a creative
          team. Built three brands from zero to market at Ujwala Group, taking them to
          ₹48L+ in sales inside six months; before that, directed content for
          India&rsquo;s first Mercedes-Maybach showroom, where multi-channel campaign work
          lifted showroom footfall 50%. Comfortable owning brand identity, performance
          marketing and creative production end to end, and fluent in the AI-augmented
          workflows that now decide what a small team can deliver. Seeking a Creative Head
          role owning brand strategy end to end.
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
              <strong>{g.group}</strong> — {g.items.join(", ")}
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
              {r.place} — {r.points[0]}
            </div>
          </div>
        ))}
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
