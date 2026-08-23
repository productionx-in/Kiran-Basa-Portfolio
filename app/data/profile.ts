/**
 * One file, two outputs.
 *
 * The website (`app/page.tsx`) and the print CV (`app/cv/page.tsx`, rendered to
 * PDF by `scripts/cv.mjs`) both read from here. Edit a fact once and it moves in
 * both places — which is the only way a portfolio and a résumé stay in agreement
 * over the months an actual job search takes.
 *
 * Every fact below is taken from Kiran's own CV. Where the ProductionX website
 * makes a larger claim than the CV supports, the CV wins: a recruiter who finds
 * a contradiction between two of your own pages stops believing both.
 */

export const person = {
  /** Legal name on the CV is Basa Kiran Kumar; he works as Kiran Basa. */
  name: "Kiran Basa",
  legalName: "Basa Kiran Kumar",
  /** The role he is actually applying for. Everything on the page argues for it. */
  title: "Creative Head",
  subtitle: "Brand Strategy & Content Leadership",
  /**
   * The headline claim. Craft and leadership carry it; AI appears as one of
   * three tools in the strapline, which is the true proportion. An earlier
   * draft led on "AI-native creative leader" and Kiran corrected it: the AI
   * makes the work smart, it is not the skill being sold.
   */
  headline: "I build brands, and the content that sells them.",
  /**
   * The one line a recruiter reads before deciding whether to keep scrolling.
   * It leads with the arc, because ten years of range is the least replicable
   * thing on the page — and closes on a number, because numbers get quoted.
   */
  strapline:
    "Ten years from the edit suite to creative leadership. Three brands built from nothing to ₹48L+ in sales, India's first Mercedes-Maybach showroom, 100+ projects shot and cut. I shoot when only a crew will do, generate when a camera cannot go, and automate the rest.",
  location: "Hyderabad, Telangana, India",
  /** His stated constraint, verbatim in effect: Hyderabad or Vizag, else remote. */
  availability: "Open to Creative Head roles in Hyderabad or Visakhapatnam — and to remote roles anywhere",
  email: "basakiran9@gmail.com",
  phone: "+91 93919 26846",
  phoneHref: "+919391926846",
  linkedin: "linkedin.com/in/kiranbasa-45a778293",
  linkedinUrl: "https://www.linkedin.com/in/kiranbasa-45a778293",
  studio: "productionx.in",
  studioUrl: "https://productionx.in",
  /**
   * This portfolio's own address. Change it in one place when the domain is
   * bought — it appears on the CV, in the metadata and in the Person schema.
   */
  portfolio: "kiran-basa-portfolio.vercel.app",
  portfolioUrl: "https://kiran-basa-portfolio.vercel.app",
} as const;

/**
 * The four numbers, chosen for what a hiring manager can do with them.
 *
 * Revenue first — it is the only figure on the page that a CFO recognises, and
 * a creative who can name a revenue number is rare enough to be memorable.
 */
export const figures = [
  { value: "₹48L+", label: "Sales generated", note: "Three brands built at Ujwala Group" },
  { value: "50%", label: "Showroom footfall", note: "Increase at Mercedes-Benz Silver Star" },
  { value: "300+", label: "Qualified enquiries", note: "First four months of paid campaigns" },
  { value: "10 yrs", label: "Editor to creative lead", note: "100+ projects across the arc" },
];

export type Role = {
  org: string;
  role: string;
  period: string;
  place: string;
  /** Site and CV both use these. Verb first, result last. */
  points: string[];
  /** Site only — cut from the one-page CV to keep it to one page. */
  detail?: string;
  /** Older roles collapse behind a toggle on the site and compress on the CV. */
  early?: boolean;
};

export const experience: Role[] = [
  {
    org: "ProductionX",
    role: "Founder",
    period: "May 2026 — Present",
    place: "Hyderabad, India",
    points: [
      "Run an independent creative studio for early-stage and startup brands — content, branding and production, from positioning through delivery.",
      "Design and ship client websites end to end, including three live sites and a launch microsite for a residential development.",
      "Built an AI production pipeline that earns its place commercially: generated product and model imagery, and real-estate previsualisation that lets a sales team walk a buyer through a building before it is built.",
      "Own the commercial side alongside the creative — scoping, pricing, pitching and client relationships.",
    ],
    detail:
      "The studio is where I have tested the AI-native side of the craft on real client money rather than on demos. It has made me faster and cheaper at the same standard, which is the argument I would bring in-house.",
  },
  {
    org: "Ujwala Group",
    role: "Head of Creative & Marketing",
    period: "Nov 2025 — May 2026",
    place: "Hyderabad, India",
    points: [
      "Inherited inventory with no brand behind it — fashion, luxury furniture, smart-home products — and built three identities from scratch: 1UJ Fashion, 1UJ The International Hub, and the parent Ujwala Group.",
      "Hired and trained a five-person team across social, content and inventory, and set the creative operations they ran on.",
      "Took a 600+ SKU fashion catalogue and 150+ luxury and lifestyle SKUs from brand kit to a full Shopify launch.",
      "Ran Google and Meta campaigns that brought in 300+ qualified enquiries in the first four months.",
      "Generated ₹30L+ in luxury and lifestyle sales and ₹18L+ in fashion — ₹48L+ in total.",
      "Produced the entire e-commerce catalogue with AI — every garment through to the premium furniture line, including the Bugatti office, dining and bedroom ranges — holding a luxury visual standard across storefront, social and ads with no photo shoot behind it.",
    ],
    detail:
      "This is the role the rest of the page is really about. Three brands, one team, one storefront and a revenue number — built inside six months, with the brand kit, the campaigns and the commerce all owned by the same person.",
  },
  {
    org: "Mercedes-Benz Silver Star Hyderabad",
    role: "Content Producer",
    period: "Dec 2024 — Nov 2025",
    place: "Hyderabad, India",
    points: [
      "Led creative direction and execution for India's first Mercedes-Maybach showroom, holding the visual storytelling to a global luxury brand's positioning and the dealership's business goals at once.",
      "Produced photography and video across the Mercedes-Benz and Maybach ranges to the standard the marque requires.",
      "Worked with the Sales and Service Marketing GMs on multi-channel campaigns — social, print and WhatsApp — that drove a 50% increase in showroom footfall and lead conversion, and an 80% increase in service campaign engagement.",
      "Aligned content strategy with leadership's marketing and business objectives, supporting the dealership's position as a pioneer in India's luxury automotive space.",
    ],
    detail:
      "Working inside a marque at that level is where I learned that consistency is worth more than any single brilliant asset, and that brand guidelines are the job rather than an obstacle to it.",
  },
  {
    org: "Self-employed",
    role: "Independent Freelance Producer",
    period: "Nov 2022 — Nov 2024",
    place: "Hyderabad, India",
    points: [
      "Contract video production and cinematography for corporate and commercial clients across automotive, hospitality, food and beverage, and events.",
      "Used the period deliberately to add brand strategy and content direction to a production skill set, ahead of moving into full-time creative leadership.",
    ],
  },
  {
    org: "RVR PRO",
    role: "Cinematographer",
    period: "Jun 2022 — Oct 2022",
    place: "Hyderabad, India",
    early: true,
    points: [
      "Shot 10+ corporate and commercial projects in five months, several recognised within the industry.",
      "Worked closely with directors to land visuals clients signed off without rework.",
    ],
  },
  {
    org: "Telugu Desam Party",
    role: "Content Creator",
    period: "Feb 2020 — May 2021",
    place: "Mangalagiri, Andhra Pradesh",
    early: true,
    points: [
      "Grew the organisation's online following by 35%+ in six months through creative social campaigns.",
      "Produced video campaigns that crossed 1M+ views on Facebook and YouTube.",
      "Delivered against a 24/7 news cycle, keeping campaign updates consistently live.",
    ],
  },
  {
    org: "Camzooms Services Pvt Ltd",
    role: "Video Producer",
    period: "Dec 2018 — Jan 2020",
    place: "Hyderabad, India",
    early: true,
    points: [
      "Ran production end to end — pre-production through final delivery — for a steady pipeline of corporate, event and media projects.",
      "Handled on-set scheduling, resource allocation and quality control across a regular client roster.",
      "Improved workflows and cross-team collaboration, which kept deliveries on time and built the company's reputation in events and media.",
    ],
  },
  {
    org: "7th Creations",
    role: "Video Editor",
    period: "Oct 2016 — Nov 2018",
    place: "Visakhapatnam, Andhra Pradesh",
    early: true,
    points: [
      "Edited 100+ projects, from corporate videos to promotional films and ads.",
      "Added animation and VFX work that lifted client satisfaction by 40%.",
      "Built lasting client relationships, including with three major corporations.",
    ],
  },
];

/**
 * Brands worked with across the ten years — in-house, agency and studio.
 * Named because they are checkable. Order is recognition first.
 */
export const clients = [
  "Mercedes-Benz",
  "Maybach",
  "BMW",
  "Tanishq",
  "IRDAI",
  "Ujwala Group",
  "1UJ Fashion",
  "1UJ International Hub",
  "Silver Star Hyderabad",
  "Krishna Motors",
  "Everest Abercorn",
  "Pit Stop Group",
  "European Wellness",
  "Hole in the Wall",
  "Coastal Star",
  "OTHO Realty",
];

export const DISCIPLINES = ["Brand & strategy", "Production", "Digital", "AI"] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export type Project = {
  /** What the image is, so a caption can say it rather than implying it. */
  shot?: string;
  code: string;
  /** One project can belong to several — most of the real ones do. */
  tags: Discipline[];
  name: string;
  kind: string;
  blurb: string;
  /** Says plainly whether this was in-house, freelance or studio work. */
  credit: string;
  result?: string;
  poster: string;
  video?: string;
  href?: string;
};

/**
 * Selected work, ordered by what it proves rather than by date.
 *
 * Each entry states the relationship honestly — in-house work as employment,
 * client work as client work. That distinction is more defensible than a flat
 * logo wall, and it is the stronger claim besides: having sat inside the brand
 * beats having invoiced it.
 */
export const work: Project[] = [
  {
    code: "01",
    name: "1UJ Fashion, 1UJ International Hub & Ujwala Group",
    shot: "Campaign frame, 1UJ Fashion",
    tags: ["Brand & strategy", "Digital", "AI"],
    kind: "Brand build · Retail & e-commerce",
    blurb:
      "Three brands from nothing: identity, brand kit, campaign system and a full Shopify launch across a 600+ SKU fashion catalogue and 150+ luxury and lifestyle lines — with AI-generated model and product imagery cutting the shoot bill without cutting the standard.",
    credit: "In-house · Head of Creative & Marketing, Ujwala Group",
    result: "₹48L+ in sales · 300+ qualified enquiries in four months · five-person team hired and trained",
    poster: "/work/fashion.jpg",
  },
  {
    code: "02",
    name: "India's first Mercedes-Maybach showroom",
    shot: "Marque detail, Mercedes-Benz Silver Star",
    tags: ["Brand & strategy", "Production"],
    kind: "Automotive · Luxury launch",
    blurb:
      "Led creative direction and execution for the launch of the first Maybach showroom in India — film, photography and multi-channel campaign work, produced inside a global marque's guidelines and sign-off process.",
    credit: "In-house · Content Producer, Mercedes-Benz Silver Star Hyderabad",
    result: "50% increase in showroom footfall and lead conversion · 80% increase in service campaign engagement",
    poster: "/work/mercedes.jpg",
  },
  {
    code: "03",
    name: "AI previsualisation & generated content",
    shot: "One output of the pipeline — a residential walkthrough generated before the building existed. Product and campaign imagery come off the same pipeline.",
    tags: ["AI", "Production"],
    kind: "AI · Production pipeline",
    blurb:
      "A pipeline for making the thing that cannot be photographed yet — because it is not built, not manufactured, or not affordable to shoot. Property walkthroughs before the slab is poured are one application; product, model and campaign imagery are the others. Not a real-estate tool: a way to originate any visual a brief calls for.",
    credit: "Studio · ProductionX",
    poster: "/work/previz.jpg",
    video: "/work/previz.webm",
  },
  {
    code: "04",
    name: "Premium automotive retail",
    shot: "Tracking-vehicle frame, premium auto retail",
    tags: ["Production"],
    kind: "Automotive · Drive & performance",
    blurb:
      "Tracking-vehicle and gimbal cinematography for premium auto retail, cut twice over — once for the launch screen, once for the feed.",
    credit: "Freelance & studio · BMW, Krishna Motors, Silver Star Hyderabad",
    poster: "/work/bmw.jpg",
  },
  {
    code: "05",
    name: "Hospitality property films",
    shot: "Property film still",
    tags: ["Production"],
    kind: "Hospitality · Cinematic",
    blurb:
      "Property content for hotels and resorts — rooms, ambience, service, and the quiet hours nobody photographs.",
    credit: "Freelance & studio · Hotels, resorts and bars",
    poster: "/work/hotel.jpg",
  },
  {
    code: "06",
    name: "Always-on food & beverage social",
    shot: "Interior coverage, food & beverage",
    tags: ["Production", "Brand & strategy"],
    kind: "F&B · Content systems",
    blurb:
      "A month of café and restaurant content out of one morning of coverage — food styling, ambience, staff and stills, planned as a system rather than as a shoot.",
    credit: "Freelance & studio · Hole in the Wall and others",
    poster: "/work/cafe.jpg",
  },
  {
    code: "07",
    name: "Corporate launches & event coverage",
    shot: "Multi-camera event coverage",
    tags: ["Production"],
    kind: "Corporate · Multi-camera",
    blurb:
      "Brand launches, corporate films, product reveals and multi-camera event coverage, delivered on the schedule the event set rather than the one production wanted.",
    credit: "Across roles · IRDAI, Everest Abercorn, Pit Stop Group",
    poster: "/work/event.jpg",
  },
];

/** Live sites — the part that separates him from producers who only shoot. */
export const digital: Project[] = [
  {
    code: "08",
    name: "Mahati Bhikshu",
    shot: "Live site, scrolling",
    tags: ["Digital"],
    kind: "Website · Design & build",
    blurb:
      "Portfolio site for a Kuchipudi artist, actor and educator — film, gallery, teaching and press held in one narrative scroll.",
    credit: "ProductionX · Live",
    poster: "/work/mahati.jpg",
    video: "/work/mahati.webm",
  },
  {
    code: "09",
    name: "Aruna Bhikshu",
    shot: "Live site, scrolling",
    tags: ["Digital"],
    kind: "Website · Design & build",
    blurb:
      "Built around repertoire, teaching and enquiry, with a structure that keeps decades of work navigable.",
    credit: "ProductionX · Live",
    poster: "/work/aruna.jpg",
    video: "/work/aruna.webm",
  },
  {
    code: "10",
    name: "OTHO Realty",
    shot: "Live prototype",
    tags: ["Brand & strategy", "Digital", "AI"],
    kind: "Real estate · Brand & prototype",
    blurb:
      "Brand building and a working site prototype for a realty client — the commercial home for the previsualisation pipeline, where generated walkthroughs sit beside the brand they are selling.",
    credit: "ProductionX · Live prototype",
    href: "https://otho-prototype.vercel.app/",
    poster: "/work/sattva.jpg",
  },
  {
    code: "11",
    name: "Sattva Amora",
    shot: "Launch microsite, scrolling",
    tags: ["Digital"],
    kind: "Website · Launch microsite",
    blurb:
      "Launch microsite for a residential project — narrative scroll, floor plans and enquiry capture.",
    credit: "ProductionX · Live",
    poster: "/work/sattva.jpg",
    video: "/work/sattva.webm",
  },
];

/**
 * How the work actually gets made. This is the section that answers "what is
 * he like to work with" — the question every hiring manager has and almost no
 * portfolio answers. Generation sits at step three of six, between direction
 * and shooting, which is where it honestly belongs.
 */
export const method = [
  { step: "Brief & positioning", body: "What the brand needs to say, and who it needs to say it to. Nothing gets made before this is settled.", detail: "Discovery, competitor study, and the one sentence the brand has to own. Most bad campaigns are a positioning failure wearing a production budget." },
  { step: "Direction", body: "References, art direction and the look locked before a single asset exists.", detail: "A board, a palette, a type system and a shot list. Locking the look early is what keeps a small team from re-doing work twice." },
  { step: "Generate", body: "AI imagery and video where a camera cannot go, or cannot justify the cost.", detail: "Product on a set that was never built, a garment on a model never booked, a tower before the slab is poured. Used where it wins on time or money, never as a default." },
  { step: "Shoot", body: "A real crew where only real footage will do. The two are not in competition.", detail: "People, places, texture, the thing that has to be true. Ten years behind a camera is what tells me which of the two a brief needs." },
  { step: "Art-direct & finish", body: "Grade, retouch, layout. The standard is identical whichever way the frame was made.", detail: "This is the step that decides whether generated work reads as premium or as a shortcut. It is craft, and it does not get skipped." },
  { step: "Ship & measure", body: "Storefront, campaign, analytics, next iteration.", detail: "Shopify, Meta and Google, then the numbers. Work that is not measured is decoration." },
];

export type SkillGroup = { group: string; items: string[] };

/**
 * Grouped rather than listed flat — someone scanning for one competence should
 * find its whole cluster in one place rather than reading thirty loose nouns.
 * The group names double as the shape of the job being applied for.
 */
export const skills: SkillGroup[] = [
  {
    group: "Brand & strategy",
    items: [
      "Brand identity & positioning",
      "Creative strategy",
      "Campaign planning",
      "Go-to-market execution",
      "Brand systems & guidelines",
    ],
  },
  {
    group: "Leadership",
    items: [
      "Team hiring & training (5–8)",
      "Cross-functional leadership",
      "Creative operations & workflow automation",
      "Process design (Zapier, ClickUp) to cut cost and turnaround",
      "Budget & vendor management",
      "Client & stakeholder relationships",
    ],
  },
  {
    group: "Marketing & e-commerce",
    items: [
      "Performance marketing (Google & Meta Ads)",
      "Shopify storefronts",
      "Integrated multi-channel campaigns",
      "SEO & local search",
      "Analytics & reporting",
    ],
  },
  {
    group: "Creative production",
    items: [
      "Film direction & cinematography",
      "Visual storytelling",
      "Product & fashion shoots",
      "Multi-camera events",
      "Post supervision & grade",
    ],
  },
  {
    group: "AI-augmented workflows",
    items: [
      "AI product & model imagery at commercial scale",
      "Generative video",
      "Previsualisation — anything not yet built or shot",
      "AI-assisted brand building",
    ],
  },
];

export type Tool = { name: string; use: string; group: string };

/**
 * The stack, with what each tool is actually for.
 *
 * A bare list of software names tells a hiring manager nothing — everyone
 * lists Photoshop. What separates this stack is the shape of it: craft tools
 * and generative tools and build tools and ops tools, run by one person, which
 * is why a small team around him delivers past its headcount.
 */
export const stack: Tool[] = [
  { group: "Craft", name: "Adobe Creative Suite", use: "Edit, motion graphics and retouch — Premiere, After Effects, Photoshop" },
  { group: "Craft", name: "DaVinci Resolve Studio", use: "Grade and finish, where a film gets its final look" },

  { group: "Generative", name: "Runway", use: "Generative video and shot extension inside an edit" },
  { group: "Generative", name: "Veo 3.0", use: "Generated footage for shots a camera cannot get" },
  { group: "Generative", name: "Nano Banana", use: "Product and model imagery, and precise image editing" },
  { group: "Generative", name: "Higgsfield", use: "Photoreal stills and motion for campaign work" },

  { group: "Build", name: "Claude Code · Cursor", use: "Building the client sites and the tools around them" },
  { group: "Build", name: "Lovable · Emergent", use: "Fast front-end builds when a brief needs a page this week" },
  { group: "Build", name: "Shopify", use: "Storefronts — a 600+ SKU catalogue taken live" },

  { group: "Growth", name: "Meta Ads Manager", use: "Paid social, tied to the content it runs on" },
  { group: "Growth", name: "Google Ads", use: "Search and demand capture" },
  { group: "Growth", name: "Google Analytics", use: "What the work actually moved" },

  { group: "Ops", name: "Zapier", use: "Wiring the tools together so nobody re-types anything" },
  { group: "Ops", name: "ClickUp", use: "Running the pipeline — briefs, review, delivery" },
  { group: "Ops", name: "Claude · ChatGPT", use: "Script, copy and SEO drafting against a brief" },
];

export const education = [
  {
    qualification: "B.A. in VFX & Animation",
    institution: "Mahatma Gandhi University — Arena Multimedia",
    period: "2013 — 2016",
  },
];

export const languages = ["English", "Telugu", "Hindi"];

/** Used by both the site footer and the CV file name. */
export const cvFileName = "Kiran-Basa-Creative-Head-CV.pdf";
