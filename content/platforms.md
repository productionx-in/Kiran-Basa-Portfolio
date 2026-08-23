# LinkedIn & Naukri — audit and replacement copy

Facts here come from `app/data/profile.ts`, the same file the site and the PDF CV
read from. If a number changes, change it there first and bring it here — the
whole point of one source is that a recruiter cross-referencing your profile,
your CV and your site never finds two answers to the same question.

Audited 23 August 2026 against live screenshots of both profiles.

Also published as a working sheet with copy buttons and live character counts:
https://claude.ai/code/artifact/0cd332ed-b36c-4245-b1f8-beed26f243a6

---

## The finding that matters most

The same job has three different titles, and your studio has three different
existences, depending on which of your profiles someone opens.

| | CV & portfolio | LinkedIn | Naukri |
|---|---|---|---|
| The Ujwala role | Head of Creative & Marketing | "Creative Head at 1UJ \| Brand, Film & Visual Strategy" | Head of Creative & Marketing |
| …at | Ujwala Group | 1UJ The International Hub | Ujwala Group |
| ProductionX | May 2026 — Present, current | Sep 2023 – May 2026, **ended** | **absent entirely** |
| Freelance, Nov 2022 – Nov 2024 | listed | **missing — leaves a 2-year gap** | **missing — leaves a 2-year gap** |
| Camzooms start | Dec 2018 | — | Aug 2018 |

Three consequences, in order of cost:

1. **Neither platform shows you in a job right now.** LinkedIn has ProductionX
   ending in May 2026; Naukri has no ProductionX at all and stops at Ujwala in
   May 2026. It is August. Both profiles read as three months unemployed, which
   is also why your LinkedIn headline defaulted to two "Ex-" tags.
2. **A two-year hole in 2022–2024** on both. Your CV fills it with the freelance
   producer period. The platforms do not, and a gap a recruiter can see is a gap
   they will ask about — or skip past.
3. **A background check would flag the title.** "Creative Head at 1UJ" is
   strategically smart for search but it is not the title on your CV. Put the
   real title in the employment record and put *Creative Head* in the headline,
   where it is a statement of what you are looking for rather than a claim about
   a former employer.

**Before you paste anything below, settle one fact:** did ProductionX start in
September 2023 and go full-time in May 2026, or start in May 2026? The most
likely truth is the first — a side studio that became the main thing. If so the
entry is **Sep 2023 – Present**, and I should correct `profile.ts`, the CV and
the site to match. Tell me which is right.

---

# LINKEDIN

## 1. Headline — replace it

Currently: `Ex-Mercedes-Benz | Ex-Head of Creative, Ujwala Group.`

This is the single highest-leverage field on the profile. It appears beside your
name in every search result, every comment and every InMail preview. Right now it
says what you used to be, twice, and never says what you are or what you want. A
recruiter searching "Creative Head Hyderabad" does not match it.

**Use:**

```
Creative Head — brand strategy, content & campaigns | Built 3 brands to ₹48L+ in sales · India's first Mercedes-Maybach showroom · 100+ projects in 10 years | Open to roles: Hyderabad, Vizag or remote
```

**If you would rather not signal a job search to studio clients:**

```
Creative Head — brand strategy, content & campaigns | Built 3 brands to ₹48L+ in sales · India's first Mercedes-Maybach showroom · 100+ projects in 10 years | Founder, ProductionX
```

Use LinkedIn's *Open To Work* setting set to **recruiters only** with the second
version. It puts you in recruiter search without putting a green frame on your
photo where your clients can see it.

## 2. Location — change it

Currently `India`. Set it to **Hyderabad, Telangana, India**.

Recruiters filter by city constantly. A country-level location silently drops you
out of every "Hyderabad" search that runs, which is most of the ones you want.

## 3. About — replace it

Yours is not bad. It opens weakly ("I started out as a video editor"), it hides
Ujwala Group behind "a fashion and lifestyle group", it says you are "picking up"
AI tools when you have deployed them on paying work, and it has no way to contact
you. One factual drift to fix: it says ₹48L+ *within four months*; the CV says
300+ enquiries in the first four months and ₹48L+ across the role.

```
I build brands, and the content that sells them.

Ten years ago I was editing other people's footage in Visakhapatnam. Since then I've shot and cut 100+ projects, led creative for a global marque, and built three brands from nothing to ₹48L+ in sales. The through-line is that I never stopped making the work myself — which is why I can direct it, cost it and ship it.

Most recently, as Head of Creative & Marketing at Ujwala Group, I inherited inventory with no brand behind it — fashion, luxury furniture, smart-home — and built three identities from the ground up: 1UJ Fashion, 1UJ The International Hub and the parent Ujwala Group. Brand kit through to a full Shopify launch across a 600+ SKU fashion catalogue and 150+ luxury lines. I hired and trained a five-person team, ran the Google and Meta campaigns that brought in 300+ qualified enquiries in the first four months, and produced the entire e-commerce catalogue — every garment through to the Bugatti furniture ranges — with no photo shoot behind it. ₹48L+ in sales.

Before that I led content for India's first Mercedes-Maybach showroom, working with the Sales and Service Marketing GMs on campaigns that drove a 50% increase in showroom footfall and lead conversion, and an 80% increase in service campaign engagement — all inside a global marque's guidelines and sign-off process.

How I work: I shoot when only a crew will do, generate when a camera cannot go, and automate the rest. Generation sits at step three of six, between direction and shooting, and it earns its place on time or on money or not at all. Ten years behind a camera is what tells me which of the three a brief actually needs.

I run ProductionX, a small studio where I've tested the AI-native side of the craft on real client money rather than on demos — client sites built end to end, generated product and model imagery, previsualisation for buildings that aren't built yet. It made me faster and cheaper at the same standard, and that is the argument I would bring in-house.

What I bring:
◆ Brand strategy and identity, from concept to market
◆ Team leadership across content, marketing and operations
◆ Performance marketing (Google & Meta Ads) and Shopify e-commerce
◆ AI-augmented production, and the ops automation around it
◆ A production background in cinematography, editing and direction

Open to Creative Head roles — Hyderabad or Visakhapatnam on-site, remote anywhere.

basakiran9@gmail.com · +91 93919 26846
```

## 4. Experience — the corrections

### Ujwala Group — retitle and rewrite

Change the title from `Creative Head at 1UJ | Brand, Film & Visual Strategy` to
**Head of Creative & Marketing**, and the company from `1UJ The International Hub`
to **Ujwala Group**. The current description has no numbers in it at all, which is
remarkable given this is the role with the revenue figure.

```
Inherited inventory with no brand behind it — fashion, luxury furniture, smart-home products — and built three identities from scratch: 1UJ Fashion, 1UJ The International Hub, and the parent Ujwala Group.

• Hired and trained a five-person team across social, content and inventory, and set the creative operations they ran on
• Took a 600+ SKU fashion catalogue and 150+ luxury and lifestyle SKUs from brand kit to a full Shopify launch
• Ran Google and Meta campaigns that brought in 300+ qualified enquiries in the first four months
• Generated ₹30L+ in luxury and lifestyle sales and ₹18L+ in fashion — ₹48L+ in total
• Produced the entire e-commerce catalogue with AI — every garment through to the Bugatti office, dining and bedroom ranges — holding a luxury visual standard across storefront, social and ads with no photo shoot behind it
```

### ProductionX — reopen it

It is currently marked as ended in May 2026, which is what makes your whole
profile read as unemployed. Change the end date to **Present** (see the question
at the top about the start date). The description is currently the title again —
"Founder & Creative Director at ProductionX" — which tells a reader nothing.

```
An independent creative studio for early-stage and startup brands — content, branding and production, from positioning through delivery.

• Design and ship client websites end to end, including three live sites and a launch microsite for a residential development
• Built an AI production pipeline that earns its place commercially: generated product and model imagery, and real-estate previsualisation that lets a sales team walk a buyer through a building before it is built
• Own the commercial side alongside the creative — scoping, pricing, pitching and client relationships
```

### Mercedes-Benz Silver Star Hyderabad — add the numbers

The opening line is good. Add what it achieved.

```
Led creative direction and execution for the launch of India's first Mercedes-Maybach showroom, holding the visual storytelling to a global marque's positioning and the dealership's business goals at once.

• Produced photography and video across the Mercedes-Benz and Maybach ranges to the standard the marque requires
• Worked with the Sales and Service Marketing GMs on multi-channel campaigns — social, print and WhatsApp — that drove a 50% increase in showroom footfall and lead conversion, and an 80% increase in service campaign engagement
• Grew the showroom's Instagram following from 6,000 to 17,000 in eight months on a consistent content strategy
• Designed and executed a service campaign that generated ₹14L in business inside one month
• Directed and edited 50+ campaign and delivery films, and cut video delivery time by roughly 30%
```

### Add the missing role — Independent Freelance Producer

This is what closes the 2022–2024 gap. **Self-employed · Nov 2022 – Nov 2024 ·
Hyderabad, India.**

```
Contract video production and cinematography for corporate and commercial clients across automotive, hospitality, food and beverage, and events.

Used the period deliberately to add brand strategy and content direction to a production skill set, ahead of moving into full-time creative leadership.
```

### Check these are present

`Camzooms Services Pvt Ltd — Video Producer — Dec 2018 – Jan 2020` and
`7th Creations — Video Editor — Oct 2016 – Nov 2018`. Naukri has Camzooms
starting **Aug 2018**; the CV says **Dec 2018**. Pick one and make all three
agree.

## 5. Profile hygiene — the things that are not copy

- **Add a profile photo.** You have one on Naukri and none on LinkedIn. A visual
  creative with a grey placeholder avatar reads as a dormant account, and
  profiles with photos get several times the views. Use the same photo on both.
- **Add a banner.** It is a 1584×396 billboard sitting empty at the top of a
  creative director's profile. A frame from the Maybach or 1UJ work would do it.
- **79 connections.** Under 500 displays as a raw number and signals a dormant
  profile; over 500 displays as "500+". Connect with everyone you have worked
  with across the ten years — it also widens the searches you appear in.
- **Featured section.** Pin the portfolio, the CV PDF, the Mercedes-Benz Silver
  Star Instagram, and one of the live sites.
- **Custom URL** is already `linkedin.com/in/kiranbasa`. Nothing to do.
- **Open To Work:** job titles `Creative Head`, `Creative Director`,
  `Head of Creative`, `Head of Marketing`, `Brand Head`, `Content Head`;
  locations Hyderabad, Visakhapatnam, Remote; full-time.
- **Ask for three recommendations** — the Ujwala founders, one of the Mercedes
  GMs, and a studio client. Recommendations are the only part of a LinkedIn
  profile you cannot write yourself, which is exactly why they carry weight.
- **Do not add the portfolio URL** until the site is actually deployed. A dead
  link on a profile is worse than no link.

## 6. Skills to add

Your top five are fine. LinkedIn allows 50 and ranks you on them; you are well
short. Add:

Brand Strategy · Creative Direction · Content Strategy · Brand Identity ·
Art Direction · Campaign Management · Go-to-Market Strategy · Team Leadership ·
Creative Operations · Performance Marketing · Google Ads · Meta Ads · Shopify ·
E-commerce · Social Media Marketing · SEO · Google Analytics · Video Production ·
Cinematography · Video Editing · Adobe Premiere Pro · Adobe After Effects ·
Adobe Photoshop · DaVinci Resolve · Generative AI · AI Content Production ·
Marketing Automation · Zapier · ClickUp · Budget Management · Vendor Management ·
Stakeholder Management · Luxury Brand Marketing · Automotive Marketing ·
Retail Marketing

Pin as top three: **Brand Strategy**, **Creative Direction**, **Content Strategy**.

---

# NAUKRI

Naukri is not LinkedIn. Recruiters search it by literal keyword and filter by
structured fields, and results are ranked partly by how recently the profile was
updated. Density beats elegance here.

## 1. Resume headline — one character is breaking it

Currently:
`Creative Head | Brand Strategy & D2C Growth | Built 3 Brands from Zero to ?48L+ Sales | Ex-Mercedes-Benz | AI-Powered Content & Performance Marketing`

The rupee symbol is rendering as **`?48L+`**. Naukri's field is mangling the ₹
glyph, so your best number currently reads as a typo. Write it as `INR`.

```
Creative Head | 10 yrs in Brand Strategy, Creative Direction, Content Production & Performance Marketing | Built 3 brands from zero to INR 48L+ sales | Ex-Mercedes-Benz | Shopify, Google & Meta Ads, AI content | Hyderabad / Visakhapatnam
```

Check every other field for the same broken glyph before you save — anywhere you
typed ₹ on Naukri is suspect.

## 2. Profile summary

```
Creative Head with 10 years across brand strategy, creative direction and content production — editor to creative lead, 100+ projects delivered.

At Ujwala Group I built three brands from scratch (1UJ Fashion, 1UJ The International Hub, Ujwala Group), hired and trained a 5-person team, took a 600+ SKU catalogue live on Shopify, and generated INR 48L+ in sales with 300+ qualified enquiries from Google and Meta campaigns. At Mercedes-Benz Silver Star I led content for India's first Mercedes-Maybach showroom, driving a 50% increase in showroom footfall and an 80% lift in service campaign engagement.

I own brand, content and performance together: identity and positioning, campaign planning, Shopify e-commerce, Google and Meta Ads, film direction and cinematography, and AI-augmented production that cuts cost and turnaround without cutting standard.

Open to Creative Head and Creative Director roles in Hyderabad or Visakhapatnam, and to remote roles.
```

## 3. Key skills — you have 11, and are losing matches

Naukri matches these literally against job description keywords. Keep what you
have and add the terms recruiters actually type:

Creative Head · Creative Director · Head of Creative · Brand Management ·
Brand Building · Brand Strategy · Creative Direction · Art Direction ·
Content Strategy · Content Production · Campaign Management · Marketing Strategy ·
Go-to-Market · Digital Marketing · Performance Marketing · Google Ads ·
Meta Ads · Social Media Marketing · SEO · Google Analytics · E-commerce ·
Shopify · D2C · Video Production · Cinematography · Video Editing ·
Adobe Premiere Pro · After Effects · Photoshop · DaVinci Resolve ·
AI Content Generation · Generative AI · Marketing Automation · Team Management ·
Luxury Branding · Automotive Marketing · Retail Marketing

## 4. Employment — three fixes, one of them urgent

### Ujwala Group — this is the urgent one

Your description is:

> "Head of Creative & Marketing at Ujwala Group, leading content strategy, social
> media growth, and video production across brands. I handle end-to-end creative
> execution, campaign planning, and performance optimization to drive engagement
> and business impact."

Your single most impressive role, and there is not one number in it. Not the
₹48L+, not the three brands, not the five-person team, not the Shopify launch,
not the 300+ enquiries. Replace with:

```
Built three brands from scratch for a group that had inventory but no brand behind it — 1UJ Fashion, 1UJ The International Hub, and the parent Ujwala Group.

• Hired and trained a 5-person team across social, content and inventory
• Took a 600+ SKU fashion catalogue and 150+ luxury and lifestyle SKUs from brand kit to full Shopify launch
• Ran Google and Meta campaigns generating 300+ qualified enquiries in the first four months
• Generated INR 30L+ in luxury and lifestyle sales and INR 18L+ in fashion — INR 48L+ total
• Produced the entire e-commerce catalogue with AI imagery, from garments to the Bugatti furniture ranges, with no photo shoot
```

### Mercedes-Benz Silver Star — two broken values

Two numbers have gone missing from your text and are printing as errors:

- "Led the production of **over** marketing content" — a number dropped out after
  "over".
- "Drove a **-%** growth in Instagram followers (from 6K to 17K)" — the
  percentage dropped out. 6,000 to 17,000 is **183%**.

```
Led content creation and creative direction for India's first Mercedes-Maybach showroom.

• Drove a 183% increase in Instagram followers, from 6,000 to 17,000 in eight months, on a consistent content strategy
• Worked with the Sales and Service Marketing GMs on multi-channel campaigns that drove a 50% increase in showroom footfall and lead conversion, and an 80% increase in service campaign engagement
• Designed and executed a service campaign that generated INR 14L in business within one month
• Directed and edited 50+ campaign and delivery films, raising the visual standard for luxury automotive content
• Improved workflow processes, reducing video delivery time by approximately 30%
```

### Add ProductionX, and add the freelance period

ProductionX is missing from Naukri entirely, which is why your most recent
employment ends in May 2026. Add it as your current role, and add
**Self-employed — Independent Freelance Producer — Nov 2022 to Nov 2024** to close
the two-year gap. Copy for both is in the LinkedIn section above; swap ₹ for INR.

## 5. Education — it is empty

The section says "Add". A blank education record hurts profile completeness and
drops you out of any search that filters on qualification.

```
B.A. in VFX & Animation
Mahatma Gandhi University — Arena Multimedia
2013 – 2016
```

## 6. IT skills — also empty

This is a structured, searchable table, and an empty one costs you every search
that filters on software. Fill it with software, version, last used, years:

| Software | Last used | Experience |
|---|---|---|
| Adobe Premiere Pro | 2026 | 10 years |
| Adobe After Effects | 2026 | 8 years |
| Adobe Photoshop | 2026 | 10 years |
| DaVinci Resolve | 2026 | 5 years |
| Shopify | 2026 | 1 year |
| Google Ads | 2026 | 2 years |
| Meta Ads Manager | 2026 | 3 years |
| Google Analytics | 2026 | 2 years |
| Zapier | 2026 | 1 year |
| ClickUp | 2026 | 2 years |

Adjust the years to what is true — these are drawn from your role dates, not from
anything you told me directly.

## 7. Career profile — two blanks only you can fill

- **Desired role:** Creative Head. If Naukri's taxonomy does not offer it, use
  *Creative Director* or *Head – Marketing*, whichever their dropdown has.
- **Functional area:** Marketing & Communication (secondary: Content, Editorial &
  Journalism)
- **Industry:** Advertising / Marketing / Media & Entertainment; also tick Retail
  and Automotive
- **Employment type:** Full time, permanent
- **Preferred locations:** Hyderabad, Visakhapatnam, Remote
- **Notice period:** ⟵ fill this in
- **Current and expected CTC:** ⟵ fill this in. Naukri filters hard on it and
  leaving it blank drops you out of budgeted searches.

## 8. Two mechanics worth knowing

- **Naukri ranks search results partly by when the profile was last updated.**
  Log in and make a small edit once a week while you are searching. It is the
  cheapest visibility you will get on that platform.
- **Upload the CV PDF** as your attached resume — `Kiran-Basa-Creative-Head-CV.pdf`
  from the portfolio. Recruiters download the attachment far more often than they
  read the profile page.

---

## One number to bring back to the CV

Your Naukri profile has a figure the CV and portfolio do not: **a service campaign
that generated ₹14L in business within one month**, and the Instagram growth from
6,000 to 17,000. Both are strong, both are specific, and both are missing from
`profile.ts`. Say the word and I will add them to the CV, the site and the
Mercedes entry everywhere.
