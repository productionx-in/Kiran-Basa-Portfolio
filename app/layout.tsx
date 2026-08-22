import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
import "./globals.css";
import { person, experience, skills, education, clients } from "./data/profile";

/**
 * Two faces, each with a job.
 *
 * Bricolage Grotesque is a contemporary variable grotesque with genuine
 * character in its wider optical sizes — it carries the headlines, where a
 * creative director's page has to look art-directed rather than typeset. Inter
 * Tight does everything read at speed. Neither is the studio's Instrument
 * Serif pairing, and neither is a serif: the earlier serif draft read as the
 * same designer's hand as productionx.in, which was the point of rebuilding.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-display",
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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
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
