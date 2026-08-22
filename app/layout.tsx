import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { person, experience, skills, education, clients } from "./data/profile";

/**
 * Two faces, each with a job.
 *
 * Fraunces is a variable serif with real character in its optical sizes — it
 * carries the name and the section heads. Inter does everything a recruiter
 * actually reads at speed. Deliberately not the studio's Instrument Serif +
 * Inter pairing: this page belongs to Kiran, not to ProductionX.
 */
const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
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
  "Creative Head with ten years from edit suite to creative leadership. Built three brands at Ujwala Group to ₹48L+ in sales; led content for India's first Mercedes-Maybach showroom. Hyderabad, India — open to remote.";

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
