import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import { WorkCard, ExperienceList } from "./components/Sections";
import {
  person,
  figures,
  experience,
  clients,
  work,
  digital,
  skills,
  education,
  languages,
  cvFileName,
} from "./data/profile";

/**
 * One page, ordered by what a hiring manager needs and in what order they
 * need it: who you are, what you have moved, what you have made, where you
 * have done it, what you can do, and how to reach you. Nothing decorative
 * sits between two of those.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <Reveal />

      <main id="top">
        {/* ------------------------------------------------------------ hero */}
        <section className="band hero">
          <div className="shell hero__grid">
            <div>
            <p className="avail" data-reveal>
              <span className="avail__dot" aria-hidden="true" />
              {person.availability}
            </p>

            <h1 data-reveal data-i={1}>
              {person.title}.<br />
              <span className="em">{person.subtitle}</span>
            </h1>

            <p className="hero__lead" data-reveal data-i={2}>
              {person.strapline}
            </p>

            <div className="hero__cta" data-reveal data-i={3}>
              <a className="btn" href={`/${cvFileName}`} download>
                Download CV
              </a>
              <a className="btn btn--ghost" href="#work">
                See the work
              </a>
              <a className="btn btn--ghost" href={`mailto:${person.email}`}>
                Email me
              </a>
            </div>

            <div className="hero__meta" data-reveal data-i={4}>
              <span>{person.location}</span>
              <span>
                <a href={person.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </span>
              <span>
                <a href={person.studioUrl} target="_blank" rel="noreferrer">
                  {person.studio}
                </a>
              </span>
            </div>
            </div>

            {/* The proof, beside the claim rather than a scroll below it. */}
            <div className="figures" aria-label="Record">
              {figures.map((f, i) => (
                <div key={f.label} data-reveal data-i={i}>
                  <div className="fig__v">{f.value}</div>
                  <div className="fig__l">{f.label}</div>
                  <div className="fig__n">{f.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ work */}
        <section className="band" id="work">
          <div className="shell">
            <span className="label idx" data-reveal>
              01 — Selected work
            </span>
            <h2 data-reveal data-i={1} style={{ margin: "1.25rem 0" }}>
              What the work <span className="em">moved</span>.
            </h2>
            <p className="lead" data-reveal data-i={2}>
              Ordered by what each piece proves rather than by date. Where a project was
              in-house it says so — having sat inside the brand is a different claim from
              having invoiced it, and the stronger one.
            </p>

            <div className="work__grid">
              {work.map((p, i) => (
                <WorkCard key={p.code} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- digital */}
        <section className="band" id="digital">
          <div className="shell">
            <span className="label idx" data-reveal>
              02 — Digital
            </span>
            <h2 data-reveal data-i={1} style={{ margin: "1.25rem 0" }}>
              And the places the content <span className="em">lands</span>.
            </h2>
            <p className="lead" data-reveal data-i={2}>
              Sites designed and built end to end, all three live. A creative lead who can
              take a brand through to the storefront removes a handover — and a handover is
              where most brand work quietly loses its shape.
            </p>

            <div className="work__grid">
              {digital.map((p, i) => (
                <WorkCard key={p.code} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ experience */}
        <section className="band" id="experience">
          <div className="shell">
            <span className="label idx" data-reveal>
              03 — Experience
            </span>
            <h2 data-reveal data-i={1} style={{ margin: "1.25rem 0" }}>
              Edit suite to <span className="em">creative lead</span>, in ten years.
            </h2>
            <p className="lead" data-reveal data-i={2}>
              I learned this business from the timeline up — cutting other people&rsquo;s
              footage, then shooting it, then producing it, then deciding what should be
              shot at all. It is why the strategy I write can actually be made.
            </p>

            <ExperienceList roles={experience} />
          </div>
        </section>

        {/* --------------------------------------------------------- clients */}
        <section className="band" aria-label="Brands worked with">
          <div className="shell">
            <span className="label idx" data-reveal>
              04 — Brands
            </span>
            <h2 data-reveal data-i={1} style={{ margin: "1.25rem 0" }}>
              Brands I have <span className="em">worked on</span>.
            </h2>
            <p className="lead" data-reveal data-i={2}>
              In-house, on contract and through the studio — across automotive, fashion and
              lifestyle, hospitality, food and beverage, corporate and events.
            </p>
            <div className="clients">
              {clients.map((c, i) => (
                <span className="chip" key={c} data-reveal data-i={i}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- skills */}
        <section className="band" id="skills">
          <div className="shell">
            <span className="label idx" data-reveal>
              05 — Capability
            </span>
            <h2 data-reveal data-i={1} style={{ margin: "1.25rem 0" }}>
              What I <span className="em">own</span> end to end.
            </h2>

            <div className="skills">
              {skills.map((g, i) => (
                <div key={g.group} data-reveal data-i={i}>
                  <h3>{g.group}</h3>
                  <ul>
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="edu" data-reveal>
              {education.map((e) => (
                <div key={e.qualification}>
                  <span className="label">Education</span>
                  <div className="edu__q">{e.qualification}</div>
                  <div className="fig__n">
                    {e.institution} · {e.period}
                  </div>
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
        <section className="band contact" id="contact">
          <div className="shell">
            <div className="contact__grid">
              <div data-reveal>
                <span className="label idx">06 — Contact</span>
                <h2 style={{ margin: "1.25rem 0" }}>
                  Looking for someone to own the <span className="em">whole</span> brand?
                </h2>
                <p className="lead">
                  I am open to Creative Head and creative leadership roles in Hyderabad or
                  Visakhapatnam, and to remote roles anywhere. Send a brief or a job
                  description and I will reply within 24 hours with an honest read on
                  whether I am the right fit — including when I am not.
                </p>
                <div className="hero__cta">
                  <a className="btn" href={`mailto:${person.email}`}>
                    {person.email}
                  </a>
                  <a className="btn btn--ghost" href={`/${cvFileName}`} download>
                    Download CV
                  </a>
                </div>
              </div>

              <dl className="contact__list" data-reveal data-i={1}>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${person.email}`}>{person.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${person.phoneHref}`}>{person.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>LinkedIn</dt>
                  <dd>
                    <a href={person.linkedinUrl} target="_blank" rel="noreferrer">
                      {person.linkedin}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Studio</dt>
                  <dd>
                    <a href={person.studioUrl} target="_blank" rel="noreferrer">
                      {person.studio}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>{person.location}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <footer className="foot">
          <div className="shell foot__in">
            <span>
              © {new Date().getFullYear()} {person.name} · {person.legalName}
            </span>
            <span>
              <a href="/cv">Text CV</a> · <a href={`/${cvFileName}`} download>PDF</a>
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
