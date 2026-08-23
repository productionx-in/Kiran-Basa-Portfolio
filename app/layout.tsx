import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import { person, experience, skills, education, clients } from "./data/profile";

/**
 * Three faces, three jobs, no overlap. The page is built as an index — a
 * document that lists a body of work — and an index needs a voice, a hand and
 * a reading face.
 *
 * Newsreader is the voice: a modern transitional serif with real editorial
 * weight, drawn for screen at display sizes. It carries the name, the headings
 * and the lead, and it is what stops the page reading as a template.
 *
 * IBM Plex Mono is the archive's own hand — every number, label, badge and
 * piece of metadata. Mono is doing semantic work here rather than decoration:
 * if it is set in mono it is a fact about the work rather than a claim.
 *
 * Inter Tight reads at speed and does the body copy and the interface.
 *
 * None of the three is the studio's own pairing on productionx.in. This page
 * has to look like a different hand from the company's, because it is arguing
 * for a person rather than a business.
 */
const display = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Set this once the domain is live. Everything canonical, OG and schema-related
 * derives from it, so there is exactly one string to change.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kiran-basa-portfolio.vercel.app";

const title = `${person.name} — ${person.title}, ${person.subtitle}`;
const description =
  "Creative Head in Hyderabad. Ten years from the edit suite to creative leadership — three brands built to ₹48L+ in sales, India's first Mercedes-Maybach showroom, 100+ projects. Open to roles in Hyderabad or Visakhapatnam, and remote anywhere.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  /**
   * A hiring manager's first move is to search the name. These are the words
   * that need to be attached to it when they do.
   */
  keywords: [
    "Kiran Basa",
    "Basa Kiran Kumar",
    "Creative Head Hyderabad",
    "Creative Director Hyderabad",
    "Brand Strategy",
    "Content Leadership",
    "Head of Creative and Marketing",
    "Video Production Hyderabad",
    "ProductionX",
  ],
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title,
    description,
    url: siteUrl,
    siteName: person.name,
    locale: "en_IN",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${person.name} — ${person.title}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

/**
 * Person schema, not Organization — this page is a person looking for a job,
 * and search engines treat the two very differently. `knowsAbout` and
 * `alumniOf` are the fields that make a name resolve to a professional rather
 * than to a coincidence of spelling.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.legalName,
  url: siteUrl,
  jobTitle: person.title,
  email: `mailto:${person.email}`,
  telephone: person.phoneHref,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  image: `${siteUrl}/og.jpg`,
  sameAs: [person.linkedinUrl, person.studioUrl],
  worksFor: {
    "@type": "Organization",
    name: experience[0].org,
    url: person.studioUrl,
  },
  alumniOf: education.map((e) => ({
    "@type": "EducationalOrganization",
    name: e.institution,
  })),
  knowsAbout: skills.flatMap((g) => g.items).slice(0, 24),
  knowsLanguage: ["English", "Telugu", "Hindi"],
  description,
  /** The brands are what make the name credible to a machine as well as a reader. */
  affiliation: clients.slice(0, 6).map((c) => ({ "@type": "Organization", name: c })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <head>
        {/*
          Runs before first paint, and does two separate jobs.

          `js` says a script ran at all. Collapsible panels default to open in
          CSS and are only collapsed under this class, so a reader whose bundle
          never arrives gets every project and every role in full rather than a
          column of headings that will not open.

          `js-intro` additionally says motion is welcome. The title card is
          display:none without it, so nobody is left under a black overlay that
          nothing will ever lift.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;d.classList.add('js');" +
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)" +
              "d.classList.add('js-intro')}catch(e){}",
          }}
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
