import Nav from "./components/Nav";
import Cluster from "./components/Cluster";
import { ExperienceList } from "./components/Sections";
import {
  Motion, Cursor, Intro, Lines, Rise, Marquee, MethodPin, Counter, Magnetic,
} from "./components/Experience";
import {
  person, figures, experience, clients, work, digital, skills,
  education, languages, cvFileName, method, stack,
} from "./data/profile";

/**
 * The page is written as a sequence of moments, not a stack of sections.
 *
 * Every heading arrives word by word out of a mask, the work is a rail you
 * push sideways by scrolling, the method pins and steps through itself, and
 * the brand list runs at the speed you scroll. Under prefers-reduced-motion
 * none of that happens and the same markup reads as a clean document — which
 * is the test any of this has to pass.
 */
export default function Home() {
  const allWork = [...work, ...digital];

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Motion />
      <Cursor />
      <Intro />
      <Nav />

      <main id="main" tabIndex={-1}>
        {/* ------------------------------------------------------------ hero */}
        <section className="band hero">
          <div className="shell">
            <Rise>
              <p className="avail">
                <span className="avail__dot" aria-hidden="true" />
                {person.availability}
              </p>
            </Rise>

            <Lines as="h1">I build brands, and the content that sells them.</Lines>

            <Rise delay={0.1}>
              <p className="hero__lead">{person.strapline}</p>
            </Rise>

            <Rise delay={0.16}>
              <div className="hero__cta">
                <Magnetic>
                  <a className="btn" href={`/${cvFileName}`} download data-cursor="Download">
                    Download CV
                  </a>
                </Magnetic>
                <Magnetic>
                  <a className="btn btn--ghost" href="#work" data-cursor="See work">
                    See the work
                  </a>
                </Magnetic>
              </div>
            </Rise>

            <div className="figures">
              {figures.map((f) => (
                <Counter key={f.label} value={f.value} label={f.label} note={f.note} />
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- marquee */}
        <Marquee items={clients} />
        <p className="sr-only">
          Brands worked on: {clients.slice(0, -1).join(", ")} and {clients.at(-1)}.
        </p>

        {/* ------------------------------------------------------------ work */}
        <section className="band band--stone" id="work">
          <div className="shell">
            <span className="label idx">01 — Selected work</span>
            <Lines className="mt">Eleven pieces, in the dark they were shot in.</Lines>
            <Rise delay={0.1}>
              <p className="lead">
                Each says plainly whether it was in-house, contract or studio work — having
                sat inside the brand is a different claim from having invoiced it.
              </p>
            </Rise>
            <Cluster projects={allWork} />
          </div>
        </section>

        {/* ---------------------------------------------------------- method */}
        <section className="band" id="method">
          <div className="shell">
            <span className="label idx">02 — Method</span>
            <Lines className="mt">How the work actually gets made.</Lines>
            <Rise delay={0.1}>
              <p className="lead">
                Ten years of craft decides what a brief needs. Generation is one of six
                steps — it removed a constraint, it did not replace the job.
              </p>
            </Rise>
            <MethodPin steps={method} />
            <Rise>
              <p className="pull">
                A catalogue that would once have needed a studio, a crew and six weeks —
                <span> delivered by a small team, on a retainer.</span>
              </p>
            </Rise>
          </div>
        </section>

        {/* ------------------------------------------------------ experience */}
        <section className="band band--stone" id="experience">
          <div className="shell">
            <span className="label idx">03 — Experience</span>
            <Lines className="mt">Edit suite to creative lead, in ten years.</Lines>
            <Rise delay={0.1}>
              <p className="lead">
                I learned this business from the timeline up — cutting other people&rsquo;s
                footage, then shooting it, then producing it, then deciding what should be
                shot at all. It is why the strategy I write can actually be made.
              </p>
            </Rise>
            <ExperienceList roles={experience} />
          </div>
        </section>

        {/* ---------------------------------------------------------- skills */}
        <section className="band" id="skills">
          <div className="shell">
            <span className="label idx">04 — Capability</span>
            <Lines className="mt">What I own end to end.</Lines>
            <div className="skills">
              {skills.map((g, i) => (
                <Rise key={g.group} delay={i * 0.05}>
                  <h3>{g.group}</h3>
                  <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
                </Rise>
              ))}
            </div>
            {/* The stack, with what each tool is for. A bare list of software
                names says nothing — everyone lists Photoshop. The shape of the
                stack is the argument: craft, generative, build, growth and ops
                run by one person. */}
            <div className="stack">
              {["Craft", "Generative", "Build", "Growth", "Ops"].map((g, gi) => (
                <Rise key={g} delay={gi * 0.04}>
                  <div className="stack__group">
                    <h3>{g}</h3>
                    <ul>
                      {stack.filter((t) => t.group === g).map((t) => (
                        <li key={t.name}>
                          <span className="stack__name">{t.name}</span>
                          <span className="stack__use">{t.use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Rise>
              ))}
            </div>

            <Rise>
              <div className="edu">
                {education.map((e) => (
                  <div key={e.qualification}>
                    <span className="label">Education</span>
                    <div className="edu__q">{e.qualification}</div>
                    <div className="ctr__n">{e.institution} · {e.period}</div>
                  </div>
                ))}
                <div>
                  <span className="label">Languages</span>
                  <div className="edu__q">{languages.join(" · ")}</div>
                </div>
              </div>
            </Rise>
          </div>
        </section>

        {/* --------------------------------------------------------- contact */}
        <section className="band band--ink" id="contact">
          <div className="shell">
            <span className="label idx">05 — Contact</span>
            <Lines className="mt">Want someone to own the whole brand?</Lines>
            <div className="contact__grid" style={{ marginTop: "2rem" }}>
              <Rise>
                <p className="lead">
                  I&rsquo;m open to Creative Head and creative leadership roles in Hyderabad
                  or Visakhapatnam, and to remote roles anywhere. Send a brief or a job
                  description and I&rsquo;ll reply within 24 hours with an honest read on
                  whether I&rsquo;m the right fit — including when I&rsquo;m not.
                </p>
                <div className="hero__cta">
                  <Magnetic>
                    <a className="btn btn--ghost" href={`mailto:${person.email}`} data-cursor="Email">
                      {person.email}
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a className="btn btn--ghost" href={`/${cvFileName}`} download data-cursor="Download">
                      Download CV
                    </a>
                  </Magnetic>
                </div>
              </Rise>

              <Rise delay={0.08}>
                <dl className="contact__list">
                  <div><dt>Email</dt><dd><a href={`mailto:${person.email}`}>{person.email}</a></dd></div>
                  <div><dt>Phone</dt><dd><a href={`tel:${person.phoneHref}`}>{person.phone}</a></dd></div>
                  <div><dt>LinkedIn</dt><dd><a href={person.linkedinUrl} target="_blank" rel="noreferrer">{person.linkedin}</a></dd></div>
                  <div><dt>Studio</dt><dd><a href={person.studioUrl} target="_blank" rel="noreferrer">{person.studio}</a></dd></div>
                  <div><dt>Based in</dt><dd>{person.location}</dd></div>
                </dl>
              </Rise>
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
