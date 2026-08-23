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
   * thing on the page, and closes on the three ways he actually makes a frame.
   *
   * Written as four short sentences rather than one balanced one. An earlier
   * draft ran the last clause as a tidy comma triad and read like a machine
   * had set it; breaking the rhythm is most of what makes prose sound written.
   */
  strapline:
    "Ten years, editor to creative lead. Three brands built from nothing to ₹48L+ in sales, India's first Mercedes-Maybach showroom, 100+ projects shot and cut. I shoot when a crew is the only way to get it. I generate when a camera can't get there. The rest I automate.",
  location: "Hyderabad, Telangana, India",
  /** His stated constraint, verbatim in effect: Hyderabad or Vizag, else remote. */
  availability: "Open to Creative Head roles in Hyderabad or Visakhapatnam — and to remote roles anywhere",
  email: "basakiran9@gmail.com",
  phone: "+91 93919 26846",
  phoneHref: "+919391926846",
  linkedin: "linkedin.com/in/kiranbasa",
  linkedinUrl: "https://www.linkedin.com/in/kiranbasa/",
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
  { value: "₹48L+", label: "Sales generated", note: "Three brands, six months, Ujwala Group" },
  { value: "50%", label: "Showroom footfall", note: "Increase at Mercedes-Benz Silver Star" },
  { value: "300+", label: "Qualified enquiries", note: "First four months of paid spend" },
  { value: "10 yrs", label: "Editor to creative lead", note: "Cutting in 2016. Running creative by 2025." },
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
      "A small studio working with early-stage brands. Branding, content, production, and the site it all lands on.",
      "Three client sites live, plus a launch microsite for a residential development. I design them and I build them.",
      "Built an AI pipeline that pays for itself. Product and model shots with no studio booked, and property walkthroughs a sales team can show before the building exists.",
      "Scoping, pricing, pitching, invoicing. The commercial side is mine as well as the creative.",
    ],
    detail:
      "The studio is where I tested the AI side on real client money instead of on demos. It made me quicker and cheaper without dropping the standard. That is the thing I would bring in-house.",
  },
  {
    org: "Ujwala Group",
    role: "Head of Creative & Marketing",
    period: "Nov 2025 — May 2026",
    place: "Hyderabad, India",
    points: [
      "Walked into a warehouse of stock with no brand on any of it. Fashion, luxury furniture, smart-home. Built three identities from nothing: 1UJ Fashion, 1UJ The International Hub, and the parent Ujwala Group.",
      "Hired five people across social, content and inventory, trained them, and wrote the process they worked to.",
      "Took 600+ fashion SKUs and 150+ luxury and lifestyle lines from brand kit to a live Shopify store.",
      "Ran the Google and Meta spend. 300+ qualified enquiries in the first four months.",
      "₹30L+ in luxury and lifestyle, ₹18L+ in fashion. ₹48L+ altogether.",
      "Shot the entire e-commerce catalogue without a shoot. Every garment, then the premium furniture line including the Bugatti office, dining and bedroom ranges, generated and retouched to something that held up on the storefront and in paid social.",
    ],
    detail:
      "Six months, three brands, one team, one storefront, and a revenue number at the end of it. The brand kit, the ad spend and the commerce were all mine. That is unusual, and it is most of why I would do it again.",
  },
  {
    org: "Mercedes-Benz Silver Star Hyderabad",
    role: "Content Producer",
    period: "Dec 2024 — Nov 2025",
    place: "Hyderabad, India",
    points: [
      "Ran creative for the launch of India's first Mercedes-Maybach showroom, inside the marque's guidelines and its sign-off chain.",
      "Photography and film across both ranges, to the standard the marque requires. 50+ campaign and delivery films directed and cut.",
      "Worked with the Sales and Service Marketing GMs on campaigns across social, print and WhatsApp. Showroom footfall and lead conversion up 50%, service campaign engagement up 80%.",
      "One service campaign brought in ₹14L of business inside a month. Grew the showroom's Instagram from 6,000 to 17,000 in eight months.",
    ],
    detail:
      "Working inside a marque that size taught me consistency beats any one brilliant asset. Guidelines are not the obstacle. They are the job.",
  },
  {
    org: "Self-employed",
    role: "Independent Freelance Producer",
    period: "Nov 2022 — Nov 2024",
    place: "Hyderabad, India",
    points: [
      "Two years of contract shooting. Automotive, hotels, restaurants, corporate, events.",
      "I used the time to learn the strategy side rather than only the camera side. That is what got me the Mercedes job.",
    ],
  },
  {
    org: "RVR PRO",
    role: "Cinematographer",
    period: "Jun 2022 — Oct 2022",
    place: "Hyderabad, India",
    early: true,
    points: [
      "10+ corporate and commercial projects in five months, several of them recognised in the industry.",
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
      "Grew the party's following by 35%+ in six months, with several videos past a million views.",
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
      "Ran production start to finish on a steady roster of corporate, event and media work.",
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
      "Edited 100+ projects. Corporate films, promos, ads.",
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

/**
 * How the work was engaged, kept separate from what it was.
 *
 * A hiring manager reads in-house work and freelance work differently, and
 * they are right to — sitting inside a brand through its approval chain is a
 * different job from being briefed by one. Every piece states which it was, so
 * nobody has to guess and nothing is quietly upgraded.
 */
export const ENGAGEMENTS = ["In-house", "Freelance", "Studio", "White-label"] as const;
export type Engagement = (typeof ENGAGEMENTS)[number];

/** The shelves the work sits on. Named by craft, not by client. */
export const GROUPS = [
  { key: "brand", label: "Brand & Campaign", blurb: "Identity, positioning and the campaigns that carry them." },
  { key: "production", label: "Content Production", blurb: "Films, shoots and events — ten years behind the camera." },
  { key: "digital", label: "Web & Digital", blurb: "Sites and storefronts, designed and built end to end." },
  { key: "ai", label: "AI & Generative", blurb: "Making the frame that cannot be photographed yet." },
] as const;
export type GroupKey = (typeof GROUPS)[number]["key"];

export type Project = {
  /** What the image is, so a caption can say it rather than implying it. */
  shot?: string;
  group: GroupKey;
  engagement: Engagement;
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
  /** Overrides the default "Open live site" wording. */
  hrefLabel?: string;
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
    group: "brand",
    engagement: "In-house",
    shot: "Campaign frame, 1UJ Fashion",
    tags: ["Brand & strategy", "Digital", "AI"],
    kind: "Brand build · Retail & e-commerce",
    blurb:
      "Three brands from nothing. Identity, brand kit, campaign system, and a Shopify launch across 600+ fashion SKUs and 150+ luxury lines. The model and product imagery was generated, which took the shoot bill out without taking the standard out.",
    credit: "In-house · Head of Creative & Marketing, Ujwala Group",
    result: "₹48L+ in sales · 300+ qualified enquiries in four months · five-person team hired and trained",
    poster: "/work/fashion.jpg",
  },
  {
    code: "02",
    name: "India's first Mercedes-Maybach showroom",
    group: "brand",
    engagement: "In-house",
    shot: "Marque detail, Mercedes-Benz Silver Star",
    tags: ["Brand & strategy", "Production"],
    kind: "Automotive · Luxury launch",
    blurb:
      "Creative direction and execution for the launch of the first Maybach showroom in India. Film, photography and campaign work, all of it made inside a global marque's guidelines and its sign-off chain.",
    credit: "In-house · Content Producer, Mercedes-Benz Silver Star Hyderabad",
    result: "50% increase in showroom footfall and lead conversion · 80% increase in service campaign engagement",
    href: "https://www.instagram.com/mercedesbenzsilverstar/",
    hrefLabel: "See the account this work fed ↗",
    poster: "/work/mercedes.jpg",
  },
  {
    code: "03",
    name: "AI previsualisation & generated content",
    group: "ai",
    engagement: "Studio",
    shot: "",
    tags: ["AI", "Production"],
    kind: "AI · Production pipeline",
    blurb:
      "A pipeline for making the thing that cannot be photographed yet, because it is not built, not manufactured, or not worth what a shoot would cost. Property walkthroughs before the slab is poured are one use. Product, model and campaign imagery are the others. It is not a real-estate tool. It is a way to originate whatever visual a brief needs.",
    credit: "Studio · ProductionX",
    /* No image: the only frame to hand was a property render, and this card
       exists to say previz is not a real-estate tool. Awaiting a correct
       still from the pipeline. */
    poster: "",
  },
  {
    code: "04",
    name: "Premium automotive retail",
    group: "production",
    engagement: "Freelance",
    shot: "Tracking-vehicle frame, premium auto retail",
    tags: ["Production"],
    kind: "Automotive · Drive & performance",
    blurb:
      "Tracking-vehicle and gimbal work for premium auto retail. Cut twice: once long for the launch screen, once short for the feed.",
    credit: "Freelance & studio · BMW, Krishna Motors, Silver Star Hyderabad",
    poster: "/work/bmw.jpg",
  },
  {
    code: "05",
    name: "Hospitality property films",
    group: "production",
    engagement: "Freelance",
    shot: "Property film still",
    tags: ["Production"],
    kind: "Hospitality · Cinematic",
    blurb:
      "Property content for hotels and resorts. Rooms, ambience, service, and the quiet hours nobody photographs.",
    credit: "Freelance & studio · Hotels, resorts and bars",
    poster: "/work/hotel.jpg",
  },
  {
    code: "06",
    name: "Always-on food & beverage social",
    group: "production",
    engagement: "Freelance",
    shot: "Interior coverage, food & beverage",
    tags: ["Production", "Brand & strategy"],
    kind: "F&B · Content systems",
    blurb:
      "A month of café and restaurant content out of one morning of coverage. Food styling, ambience, staff and stills, planned as a system instead of as a shoot.",
    credit: "Freelance & studio · Hole in the Wall and others",
    poster: "/work/cafe.jpg",
  },
  {
    code: "07",
    name: "Corporate launches & event coverage",
    group: "production",
    engagement: "Freelance",
    shot: "Multi-camera event coverage",
    tags: ["Production"],
    kind: "Corporate · Multi-camera",
    blurb:
      "Brand launches, corporate films, product reveals, multi-camera event coverage. Delivered on the schedule the event set, not the one production wanted.",
    credit: "Across roles · IRDAI, Everest Abercorn, Pit Stop Group",
    poster: "/work/event.jpg",
  },
];

/** Live sites — the part that separates him from producers who only shoot. */
export const digital: Project[] = [
  {
    code: "08",
    name: "Mahati Bhikshu",
    group: "digital",
    engagement: "Studio",
    shot: "Live site, scrolling",
    tags: ["Digital"],
    kind: "Website · Design & build",
    blurb:
      "Portfolio site for a Kuchipudi artist, actor and educator. Film, gallery, teaching and press held together in one scroll.",
    credit: "ProductionX · Live",
    poster: "/work/mahati.jpg",
    video: "/work/mahati.webm",
  },
  {
    code: "09",
    name: "Aruna Bhikshu",
    group: "digital",
    engagement: "Studio",
    shot: "Live site, scrolling",
    tags: ["Digital"],
    kind: "Website · Design & build",
    blurb:
      "Built around repertoire, teaching and enquiry. The structure is what keeps decades of work findable.",
    credit: "ProductionX · Live",
    poster: "/work/aruna.jpg",
    video: "/work/aruna.webm",
  },
  {
    code: "10",
    name: "OTHO Realty",
    group: "digital",
    engagement: "Studio",
    shot: "Generated walkthrough frame, OTHO Realty",
    tags: ["Brand & strategy", "Digital", "AI"],
    kind: "Real estate · Brand & prototype",
    blurb:
      "Brand building and a working site prototype for a realty client. This is where the previsualisation pipeline earns its money, with generated walkthroughs sitting next to the brand they are selling.",
    credit: "ProductionX · Live prototype",
    href: "https://otho-prototype.vercel.app/",
    /* The property render belongs here rather than on the previsualisation
       entry: this is the realty client the pipeline was built for, so the frame
       is about the client rather than a claim that previz is a realty tool.
       It also stops OTHO and Sattva Amora sharing one image, which labelled one
       client's build as another's. */
    poster: "/work/previz.jpg",
  },
  {
    code: "11",
    name: "Sattva Amora",
    group: "digital",
    engagement: "White-label",
    shot: "Prototype build, scrolling",
    tags: ["Digital"],
    kind: "Website · White-label prototype",
    blurb:
      "Website prototype for a residential launch. Narrative scroll, floor plans, enquiry capture. Built white-label, so it went out under someone else's name.",
    credit: "White-label · Prototype build only",
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
  { step: "Brief & positioning", body: "What the brand needs to say, and who to. Nothing gets made before that is settled.", detail: "Discovery, a look at the competition, and the one sentence the brand has to own. Most bad campaigns are a positioning failure wearing a production budget." },
  { step: "Direction", body: "References, art direction, and the look locked before a single asset exists.", detail: "A board, a palette, a type system, a shot list. Locking the look early is the thing that stops a small team making everything twice." },
  { step: "Generate", body: "AI imagery and video where a camera cannot go, or cannot justify the cost.", detail: "Product on a set nobody built. A garment on a model nobody booked. A tower before the slab is poured. It gets used where it wins on time or on money, never by default." },
  { step: "Shoot", body: "A real crew where only real footage will do. The two are not in competition.", detail: "People, places, texture, anything that has to actually be true. Ten years behind a camera is what tells me which of the two a brief needs." },
  { step: "Art-direct & finish", body: "Grade, retouch, layout. The standard is the same whichever way the frame was made.", detail: "This is the step that decides whether generated work reads as premium or as a shortcut. It is craft, and it does not get skipped." },
  { step: "Ship & measure", body: "Storefront, campaign, analytics, then round two.", detail: "Shopify, Meta and Google, then the numbers. Work nobody measures is decoration." },
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
      "Previsualisation of anything not yet built or shot",
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
  { group: "Craft", name: "Adobe Creative Suite", use: "Premiere, After Effects, Photoshop. Edit, motion and retouch." },
  { group: "Craft", name: "DaVinci Resolve Studio", use: "Grade and finish, where a film gets its final look" },

  { group: "Generative", name: "Runway", use: "Generative video and shot extension inside an edit" },
  { group: "Generative", name: "Veo 3.0", use: "Generated footage for shots a camera cannot get" },
  { group: "Generative", name: "Nano Banana", use: "Product and model imagery, and precise image editing" },
  { group: "Generative", name: "Higgsfield", use: "Photoreal stills and motion for campaign work" },

  { group: "Build", name: "Claude Code · Cursor", use: "Building the client sites, and the small tools around them" },
  { group: "Build", name: "Lovable · Emergent", use: "Fast front-end builds when a brief needs a page this week" },
  { group: "Build", name: "Shopify", use: "Storefronts — a 600+ SKU catalogue taken live" },

  { group: "Growth", name: "Meta Ads Manager", use: "Paid social, planned against the content it runs on" },
  { group: "Growth", name: "Google Ads", use: "Search and demand capture" },
  { group: "Growth", name: "Google Analytics", use: "What the work actually moved" },

  { group: "Ops", name: "Zapier", use: "Wiring the tools together so nobody re-types anything twice" },
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
