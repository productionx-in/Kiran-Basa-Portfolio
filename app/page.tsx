import {
  person,
  figures,
  experience,
  clients,
  work,
  digital,
  method,
  skills,
  stack,
  education,
  languages,
  cvFileName,
} from "./data/profile";
import { WorkIndex } from "./components/Index";
import { Ledger } from "./components/Ledger";
import {
  Motion,
  Progress,
  Cursor,
  Intro,
  Rise,
  Lines,
  NameFill,
  Counter,
  Marquee,
  Magnetic,
  Spy,
} from "./components/Chrome";

/**
 * One page, read as a document.
 *
 * The order is the argument, in the sequence a hiring manager actually reads
 * in: who and where (masthead) → what it was worth (figures) → the work itself
 * (index) → how it gets made (method) → where he has done it (ledger) → what
 * with (stack and capabilities) → who for (clients) → how to reach him.
 *
 * Everything below is server-rendered. The interactive parts are islands that
 * take content already on the page and animate or fold it; none of them is
 * required for the page to be read.
 */

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "method", label: "Method" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

const projects = [...work, ...digital];

/** Grouped in source order so the stack reads Craft → Generative → Build → Growth → Ops. */
const stackGroups = stack.reduce<{ group: string; items: typeof stack }[]>((acc, tool) => {
  const last = acc[acc.length - 1];
  if (last && last.group === tool.group) last.items.push(tool);
  else acc.push({ group: tool.group, items: [tool] });
  return acc;
}, []);

export default function Page() {
  return (
    <>
      <Motion />
      <Progress />
      <Cursor />
      <Intro name={person.name} role={person.title} />

      <a className="skip" href="#work">
        Skip to the work
      </a>

      <header className="topbar">
        <div className="wrap topbar__in">
          <span>
            {person.name} <span style={{ color: "var(--muted)" }}>— {person.title}</span>
          </span>
          <Spy items={SECTIONS} />
          <span style={{ color: "var(--muted)" }}>Hyderabad · IN</span>
        </div>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------- masthead */}
        <section className="wrap mast" aria-labelledby="name">
          <div className="mast__head">
            <h1 className="name" id="name">
              <span className="name__row">Kiran</span>
              <span className="name__row">
                <NameFill>Basa</NameFill>
              </span>
            </h1>

            {/* Contents, the way an index opens. Counts are derived from the
                data rather than typed, so they cannot drift out of date. */}
            <div className="contents">
              <div className="contents__k">In this document</div>
              <ul className="contents__l">
                <li>
                  <b>{projects.length}</b>
                  <span>projects indexed</span>
                </li>
                <li>
                  <b>{experience.length}</b>
                  <span>roles, 2016 — 2026</span>
                </li>
                <li>
                  <b>{clients.length}</b>
                  <span>brands worked with</span>
                </li>
                <li>
                  <b>{stack.length}</b>
                  <span>tools, and what for</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mast__meta">
            <div>
              <div className="mast__k">Role</div>
              <div className="mast__v">{person.title}</div>
            </div>
            <div>
              <div className="mast__k">Practice</div>
              <div className="mast__v">Brand · Production · Digital · AI</div>
            </div>
            <div>
              <div className="mast__k">Track record</div>
              <div className="mast__v">10 years · 100+ projects</div>
            </div>
            <div>
              <div className="mast__k">Status</div>
              <div className="mast__v">
                <span className="flag">Open to roles</span>
              </div>
            </div>
          </div>

          <div className="mast__body">
            <Lines as="p" className="mast__strap">
              {person.strapline}
            </Lines>
            <div className="mast__actions">
              <Magnetic>
                <a className="btn btn--solid" href="#work">
                  See the work
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn" href={`/${cvFileName}`} download>
                  Download CV ↓
                </a>
              </Magnetic>
              <p className="mast__k" style={{ flexBasis: "100%", marginTop: "0.4rem" }}>
                {person.availability}
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- figures */}
        <section className="wrap" aria-label="Results">
          <div className="kicker">
            <b>What it was worth</b>
            <span>Figures from the last two roles</span>
          </div>
          <div className="figs">
            {figures.map((f) => (
              <Counter key={f.label} value={f.value} label={f.label} note={f.note} />
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- index */}
        <section className="wrap" id="work" aria-labelledby="work-h" style={{ paddingTop: "clamp(2.5rem,6vw,5rem)" }}>
          <div className="kicker">
            <b id="work-h">Index — selected work</b>
            <span>
              {projects.length} entries · filter by craft or by engagement
            </span>
          </div>
          <Rise>
            <p className="lede" style={{ paddingBottom: "1.2rem" }}>
              Labelled twice: what the work was, and how it was engaged. In-house
              and freelance are different jobs and are not merged here.
            </p>
          </Rise>
          <WorkIndex projects={projects} />
        </section>

        {/* ------------------------------------------------------------ method */}
        <section
          className="wrap"
          id="method"
          aria-labelledby="method-h"
          style={{ paddingTop: "clamp(3rem,7vw,6rem)" }}
        >
          <div className="kicker">
            <b id="method-h">How it gets made</b>
            <span>Six steps · generation sits at three</span>
          </div>
          <div className="method">
            <div className="method__aside">
              <Rise>
                <p className="lede">
                  Every portfolio shows the output. This is the part a hiring
                  manager actually needs: what I am like to work with.
                </p>
                <p className="prose" style={{ marginTop: "1rem" }}>
                  Generation sits at step three of six, between direction and
                  shooting, which is honestly where it belongs. It is one tool
                  among several — used where it wins on time or money, and never
                  as a default.
                </p>
              </Rise>
            </div>
            <ol className="steps">
              {method.map((m, i) => (
                <Rise as="li" className="step" key={m.step} delay={i * 0.03}>
                  <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="step__t">{m.step}</h3>
                    <p className="step__b">{m.body}</p>
                    <p className="step__d">{m.detail}</p>
                  </div>
                </Rise>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ ledger */}
        <section
          className="wrap"
          id="experience"
          aria-labelledby="exp-h"
          style={{ paddingTop: "clamp(3rem,7vw,6rem)" }}
        >
          <div className="kicker">
            <b id="exp-h">Ledger — where the work was done</b>
            <span>Editor · 2016 → Creative Head · 2026</span>
          </div>
          <Ledger roles={experience} />
        </section>

        {/* ------------------------------------------------------------- stack */}
        <section
          className="wrap"
          id="stack"
          aria-labelledby="stack-h"
          style={{ paddingTop: "clamp(3rem,7vw,6rem)" }}
        >
          <div className="kicker">
            <b id="stack-h">Stack — and what each one is for</b>
            <span>Craft · Generative · Build · Growth · Ops</span>
          </div>
          <Rise>
            <p className="lede">
              A list of software names tells you nothing — everyone lists
              Photoshop. What matters is the shape: craft, generation, build and
              operations, run by one person.
            </p>
          </Rise>
          <div className="cols">
            {stackGroups.map((g, i) => (
              <Rise className="tool" key={g.group} delay={i * 0.04}>
                <div className="tool__g">{g.group}</div>
                <ul className="tool__list">
                  {g.items.map((t) => (
                    <li key={t.name}>
                      <div className="tool__n">{t.name}</div>
                      <div className="tool__u">{t.use}</div>
                    </li>
                  ))}
                </ul>
              </Rise>
            ))}
          </div>

          <div className="kicker" style={{ marginTop: "clamp(1.5rem,4vw,3rem)" }}>
            <b>Capabilities</b>
            <span>What the role would be getting</span>
          </div>
          <div className="caps">
            {skills.map((s) => (
              <div className="cap" key={s.group}>
                <h3 className="cap__g">{s.group}</h3>
                <ul className="cap__list">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- clients */}
        <section aria-label="Brands worked with" style={{ paddingTop: "clamp(3rem,7vw,6rem)" }}>
          <div className="wrap">
            <div className="kicker">
              <b>Brands worked with</b>
              <span>In-house, agency and studio · {clients.length} named</span>
            </div>
          </div>
          <Marquee items={clients} />
        </section>

        {/* ----------------------------------------------------------- contact */}
        <section className="wrap contact" id="contact" aria-labelledby="contact-h">
          <div className="kicker" style={{ paddingLeft: 0 }}>
            <b id="contact-h">Contact</b>
            <span>Replies within a day</span>
          </div>
          <Lines as="p" className="contact__h">
            Looking for a creative head who can direct it and also build it.
          </Lines>

          <div className="contact__grid">
            <div>
              <div className="contact__k">Email</div>
              <a className="contact__v" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </div>
            <div>
              <div className="contact__k">Phone</div>
              <a className="contact__v" href={`tel:${person.phoneHref}`}>
                {person.phone}
              </a>
            </div>
            <div>
              <div className="contact__k">LinkedIn</div>
              <a className="contact__v" href={person.linkedinUrl} target="_blank" rel="noreferrer noopener">
                {person.linkedin} ↗
              </a>
            </div>
            <div>
              <div className="contact__k">Based</div>
              <div className="contact__v">{person.location}</div>
            </div>
            <div>
              <div className="contact__k">Open to</div>
              <div className="contact__v">Hyderabad · Visakhapatnam · Remote</div>
            </div>
            <div>
              <div className="contact__k">Studio</div>
              <a className="contact__v" href={person.studioUrl} target="_blank" rel="noreferrer noopener">
                {person.studio} ↗
              </a>
            </div>
          </div>

          <div className="mast__actions" style={{ marginTop: "clamp(1.5rem,3vw,2.4rem)" }}>
            <Magnetic>
              <a className="btn btn--solid" href={`mailto:${person.email}`}>
                Start a conversation
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn" href={`/${cvFileName}`} download>
                Download CV ↓
              </a>
            </Magnetic>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <span>
          {person.legalName} · {education[0].qualification}, {education[0].period}
        </span>
        <span>{languages.join(" · ")}</span>
        <span>
          <a href="#top">Back to top ↑</a>
        </span>
      </footer>
    </>
  );
}
