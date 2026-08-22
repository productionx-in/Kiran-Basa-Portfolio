import type { MetadataRoute } from "next";

/** The CV page is excluded — the PDF is the artefact meant to circulate. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/cv" }],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://kiranbasa.vercel.app"}/sitemap.xml`,
  };
}
