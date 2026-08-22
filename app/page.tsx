import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import { ExperienceList } from "./components/Sections";
import { Figure, WorkFilter, Method, SectionNav } from "./components/Interactive";
import {
  person, figures, experience, clients, work, digital, skills,
  education, languages, cvFileName,
} from "./data/profile";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "method", label: "Method" },
  { id: "experience", label: "Experience" },
  { id: "brands", label: "Brands" },
  { id: "skills", label: "Capability" },
  { id: "contact", label: "Contact" },
];

/**
 * The page is ordered the way a hiring manager reads: the claim, the proof,
 * the work, how it gets made, where it was done, what it covers, how to reach
 * him. Grounds alternate — paper, stone, ink — so that scrolling feels
 * art-directed rather than like falling down a document.
 */
export default function Home() {
  const allWork = [...work, ...digital];

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <Reveal />

      <main id="main" tabIndex={-1}>
        {/* ------------------------------------------------------------ hero */}
        <section className="band hero">
          <div className="shell">
            <p className="avail" data-reveal>
              <span className="avail__dot" aria-hidden="true" />
              {person.availability}
            </p>

            <h1 data-reveal data-i={1}>
              I build brands, and the <mark>content that sells them</mark>.
            </h1>

            <p className="hero__lead" data-reveal data-i={2}>
              {person.strapline}
            </p>

            <div className="hero__cta" data-reveal data-i={3}>
              <a className="btn" href={`/${cvFileName}`} download>Download CV</a>
              <a className="btn btn--ghost" href="#work">See the work</a>
            </div>

            <div className="figures" data-reveal data-i={4}>
              {figures.map((f) => (
                <Figure key={f.label} value={f.value} label={f.label} note={f.note} />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ work */}
        <section className="band band--stone" id="work">
          <div className="shell">
            <span className="label idx" data-reveal>01 — Selected work</span>
            <h2 data-reveal data-i={1} style={{ margin: "1.5rem 0" }}>
              Filter it by what you&rsquo;re hiring for.
            </h2>
            <p className="lead" data-reveal data-i={2}>
              Eleven projects across brand, production, digital and AI. Each says plainly
              whether it was in-house, contract or studio work — having sat inside the brand
              is a different claim from having invoiced it.
            </p>
            <WorkFilter projects={allWork} />
          </div>
        </section>

        {/* ---------------------------------------------------------- method */}
        <section className="band" id="method">
          <div className="shell">
            <span className="label idx" data-reveal>02 — Method</span>
            <h2 data-reveal data-i={1} style={{ margin: "1.5rem 0" }}>
              How the work actually gets made.
            </h2>
            <p className="lead" data-reveal data-i={2}>
              Ten years of craft decides what a brief needs. AI is one of six steps — it
              removed a constraint, it did not replace the job. Open any step to see the
              reasoning.
            </p>
            <Method />
            <p className="pull" data-reveal>
              A catalogue that would once have needed a studio, a crew and six weeks —
              <span> delivered by a small team, on a retainer.</span>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------ experience */}
        <section className="band band--stone" id="experience">
          <div className="shell split">
            <SectionNav items={SECTIONS} />
            <div>
              <span className="label idx" data-reveal>03 — Experience</span>
              <h2 data-reveal data-i={1} style={{ margin: "1.5rem 0" }}>
                Edit suite to creative lead, in ten years.
              </h2>
              <p className="lead" data-reveal data-i={2}>
                I learned this business from the timeline up — cutting other people&rsquo;s
                footage, then shooting it, then producing it, then deciding what should be
                shot at all. It is why the strategy I write can actually be made.
              </p>
              <ExperienceList roles={experience} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- brands */}
        <section className="band" id="brands">
          <div className="shell">
            <span className="label idx" data-reveal>04 — Brands</span>
            <h2 data-reveal data-i={1} style={{ margin: "1.5rem 0" }}>
              Brands I have <span className="em">worked on</span>.
            </h2>
            <ul className="brands" data-reveal data-i={2}>
              {clients.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- skills */}
        <section className="band band--stone" id="skills">
          <div className="shell">
            <span className="label idx" data-reveal>05 — Capability</span>
            <h2 data-reveal data-i={1} style={{ margin: "1.5rem 0" }}>
              What I own end to end.
            </h2>
            <div className="skills">
              {skills.map((g, i) => (
                <div key={g.group} data-reveal data-i={i}>
                  <h3>{g.group}</h3>
                  <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="edu" data-reveal>
              {education.map((e) => (
                <div key={e.qualification}>
                  <span className="label">Education</span>
                  <div className="edu__q">{e.qualification}</div>
                  <div className="fig__n">{e.institution} · {e.period}</div>
                </div>
              ))}
              <div>
                <span className="label">Languages</span>
                <div className="edu__q">{languages.join(" · ")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- contact */}
        <section className="band band--ink" id="contact">
          <div className="shell">
            <div className="contact__grid">
              <div data-reveal>
                <span className="label idx">06 — Contact</span>
                <h2 style={{ margin: "1.5rem 0" }}>
                  Looking for someone to own the whole brand?
                </h2>
                <p className="lead">
                  I&rsquo;m open to Creative Head and creative leadership roles in Hyderabad or
                  Visakhapatnam, and to remote roles anywhere. Send a brief or a job
                  description and I&rsquo;ll reply within 24 hours with an honest read on
                  whether I&rsquo;m the right fit — including when I&rsquo;m not.
                </p>
                <div className="hero__cta">
                  <a className="btn btn--ghost" href={`mailto:${person.email}`}>
                    {person.email}
                  </a>
                  <a className="btn btn--ghost" href={`/${cvFileName}`} download>Download CV</a>
                </div>
              </div>

              <dl className="contact__list" data-reveal data-i={1}>
                <div><dt>Email</dt><dd><a href={`mailto:${person.email}`}>{person.email}</a></dd></div>
                <div><dt>Phone</dt><dd><a href={`tel:${person.phoneHref}`}>{person.phone}</a></dd></div>
                <div><dt>LinkedIn</dt><dd><a href={person.linkedinUrl} target="_blank" rel="noreferrer">{person.linkedin}</a></dd></div>
                <div><dt>Studio</dt><dd><a href={person.studioUrl} target="_blank" rel="noreferrer">{person.studio}</a></dd></div>
                <div><dt>Based in</dt><dd>{person.location}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <footer className="foot">
          <div className="shell foot__in">
            <span>© {new Date().getFullYear()} {person.name} · {person.legalName}</span>
            <span><a href="/cv">Text CV</a> · <a href={`/${cvFileName}`} download>PDF</a></span>
          </div>
        </footer>
      </main>
    </>
  );
}
