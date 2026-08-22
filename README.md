# Kiran Basa — portfolio

Personal portfolio and CV for **Basa Kiran Kumar** (Kiran Basa), applying for
Creative Head and creative leadership roles. Separate from
[productionx.in](https://productionx.in), which is the studio's site.

Next.js 15 (App Router) + TypeScript, no runtime dependencies beyond React.
Deploys to Vercel.

## The one thing to know

**`app/data/profile.ts` is the only file with facts in it.**

The website, the print CV and the social share card all read from it. Change a
date, a figure or a bullet there and it moves everywhere. Nothing is duplicated,
so the site and the PDF cannot drift apart — which is what normally happens by
about week three of a job search, and it always shows up in an interview.

## Structure

- `app/page.tsx` — the one-page site: hero, work, digital, experience, brands, skills, contact
- `app/cv/page.tsx` + `app/cv/cv.css` — the CV, laid out for A4 print
- `app/components/` — nav, scroll reveal, work cards, experience list
- `app/globals.css` — design tokens and all page styling
- `app/data/profile.ts` — **every fact on the site**
- `scripts/cv.mjs` — renders `/cv` to `public/Kiran-Basa-Creative-Head-CV.pdf`
- `scripts/og.mjs` — renders the share card to `public/og.jpg`

## Local development

```bash
npm install
npm run dev
```

## Regenerating the CV and share card

Both scripts drive headless Chromium against a running server, so the PDF is
literally the `/cv` page printed — not a second template to maintain.

```bash
npm run build && npm start &   # server must be up
npm run assets                 # writes the PDF and the OG image
```

If Chromium is not on the default path, set `CHROME_PATH` to the binary.

Commit the regenerated `public/*.pdf` and `public/og.jpg` — they are the files
recruiters actually download, so they ship with the repo rather than being built
on demand.

## Deploying

Connect the repo to a Vercel project (framework preset: Next.js). Then set
**one** environment variable so canonical URLs, the sitemap, the OG tags and the
Person schema all point at the real domain:

```
NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

Also update `person.portfolio` / `person.portfolioUrl` in `app/data/profile.ts`
so the address printed on the CV matches.

## Before applying anywhere

- [ ] Buy a domain and set `NEXT_PUBLIC_SITE_URL` (a personal domain reads
      better than a `.vercel.app` subdomain on a CV)
- [ ] Add a headshot — `public/` and a slot in the hero
- [ ] Add a showreel link if there is one to link
- [ ] Swap `person.title` per application if the target title differs; the rest
      of the page supports Creative Head, Creative Director, Head of Content and
      Brand & Marketing Manager without further edits
