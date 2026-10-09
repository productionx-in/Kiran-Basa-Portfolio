/**
 * One file, two outputs.
 *
 * The website (`app/page.tsx`) and the print CV (`app/cv/page.tsx`, rendered to
 * PDF by `scripts/cv.mjs`) both read from here. Edit a fact once and it moves in
 * both places — which is the only way a portfolio and a résumé stay in agreement
 * over the months an actual job search takes.
 *
 * Every fact below is taken from Kiran's own account of his career. Where the
 * ProductionX website makes a larger claim than this file supports, this file
 * wins: a recruiter who finds a contradiction between two of your own pages
 * stops believing both.
 */

export const person = {
  /** Legal name on the CV is Basa Kiran Kumar; he works as Kiran Basa. */
  name: "Kiran Basa",
  legalName: "Basa Kiran Kumar",
  /**
   * He has held the title "Creative Lead" twice, at Ujwala Group and now at
   * ProductionX, so it leads everywhere on the page rather than a grander
   * title he has not actually held. Creative Director, Head of Creative and
   * the rest are roles he is open to, not roles he has had, and they live in
   * `availability` instead of here.
   */
  title: "Creative Lead",
  /**
   * Deliberately no "Marketing" in the headline. He understands marketing and
   * it shows up in the skills and experience sections, but the headline is
   * the one place a reader forms a first impression, and that impression
   * should be production and creative direction, not a marketing title.
   */
  subtitle: "Creative Direction, Production & Brand Content",
  /**
   * The headline claim. Production first, because it is the foundation the
   * rest was built on: editor, then cinematographer and assistant director,
   * then producer, then creative lead. Brand and marketing came later, as he
   * took on more responsibility for the business behind the work, so they
   * read as what he also understands rather than as the lead identity.
   */
  headline: "I come from production, and I lead the creative work from brief to final cut.",
  /**
   * The one line a recruiter reads before deciding whether to keep scrolling.
   * Leads with the production arc rather than with a revenue number, because
   * the arc is the part of the story that actually explains the rest of it.
   */
  strapline:
    "Ten years, editor to creative lead. I started in assistant direction and cinematography, cutting on a web series and short films before moving into production and then creative leadership. Three brands built from nothing, and the launch of India's first Mercedes-Maybach showroom. I still shoot, direct and edit. I use AI to make production faster, not to replace the craft.",
  location: "Hyderabad, Telangana, India",
  /**
   * His stated constraint on location, unchanged: Hyderabad or Vizag, else
   * remote. Creative Lead is the title that leads the page; these are the
   * other titles the same work maps to, so a recruiter searching under any
   * of them still finds an accurate match. Names roles he's open to, not
   * ones he's held.
   */
  availability:
    "Open to Creative Lead, Creative Production Lead, Creative Director, Head of Creative, Content Lead, Brand Creative and Creative Team Lead roles, in Hyderabad or Visakhapatnam, and remote anywhere",
  email: "basakiran9@gmail.com",
  phone: "+91 93919 26846",
  phoneHref: "+919391926846",
  linkedin: "linkedin.com/in/kiranbasa",
  linkedinUrl: "https://www.linkedin.com/in/kiranbasa/",
  studio: "productionx.in",
  studioUrl: "https://productionx.in",
  /**
   * Nine public repositories of real client work — the studio site, OTHO
   * Realty, Mahati, Aruna, NeXtHer, and the skills toolkit. This is the only
   * link on the CV that proves the "I design them and I build them" claim
   * rather than asserting it, which is why it earns a place in the contact
   * line and the studio's marketing site does not.
   */
  github: "github.com/productionx-in",
  githubUrl: "https://github.com/productionx-in",
  /**
   * This portfolio's own address. Change it in one place when the domain is
   * bought — it appears on the CV, in the metadata and in the Person schema.
   */
  portfolio: "kiran-basa-portfolio.vercel.app",
  portfolioUrl: "https://kiran-basa-portfolio.vercel.app",
} as const;

/**
 * The four numbers, chosen for scale rather than revenue. ₹48L+ in sales was
 * here before, but it is a small figure next to the scope of the roles he is
 * targeting, and it risks anchoring the reader's sense of the role down
 * rather than up. Dropped in favour of a number that signals scope instead.
 */
export const figures = [
  { value: "10 yrs", label: "Editor to creative lead", note: "Cutting in 2016. Leading creative by 2025." },
  { value: "100+", label: "Projects shot and cut", note: "Film, photography and brand content across ten years" },
  { value: "50%", label: "Showroom footfall", note: "Increase at Mercedes-Benz Silver Star" },
  { value: "750+", label: "SKUs taken live", note: "Fashion, luxury and lifestyle, Ujwala Group" },
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
  /** Printed next to the organisation. Used where the work is public. */
  url?: string;
  urlLabel?: string;
};

export const experience: Role[] = [
  {
    org: "ProductionX",
    role: "Founder & Creative Lead",
    period: "May 2026 - Present",
    place: "Hyderabad, India",
    url: "https://productionx.in",
    urlLabel: "productionx.in",
    points: [
      "A creative production studio. Film, photography, branding and brand content for early-stage brands.",
      "Creative direction, production planning and concept development on every project, from the first brief to delivery.",
      "AI-assisted content production for clients who need product, model or property imagery without a full shoot.",
      "Client management, pricing, pitching and vendors. Websites and digital experiences too, when a brief calls for one.",
    ],
    detail:
      "The studio is where I tested the AI side on real client money instead of on demos. It made production quicker and cheaper without dropping the standard. That is the thing I would bring in-house.",
  },
  {
    org: "Ujwala Group",
    role: "Creative Lead",
    period: "Nov 2025 - May 2026",
    place: "Hyderabad, India",
    points: [
      "Led the creative and marketing function across three brands: fashion, luxury furniture and smart-home, starting from a warehouse of stock with no brand on any of it.",
      "Built all three brand identities and their visual communication from the ground up: 1UJ Fashion, 1UJ The International Hub, and the parent Ujwala Group.",
      "Hired and trained a five-person team across social, content and inventory, and wrote the process they worked to.",
      "Took 600+ fashion SKUs and 150+ luxury and lifestyle SKUs from brand development to a full Shopify launch.",
      "Led content, campaigns and digital marketing across Google, Meta and social platforms.",
      "Generated 300+ qualified enquiries through paid campaigns in the first four months.",
      "Produced the complete e-commerce catalogue, including the premium furniture line, using AI-assisted product and model imagery instead of traditional photoshoots.",
    ],
    detail:
      "Three brands, one team, one storefront, in six months. The brand kit, the ad spend and the commerce were all mine. That is unusual, and it is most of why I would do it again.",
  },
  {
    org: "Mercedes-Benz Silver Star Hyderabad",
    role: "Content Producer",
    period: "Dec 2024 - Nov 2025",
    place: "Hyderabad, India",
    points: [
      "Led creative direction and production for the launch of India's first Mercedes-Maybach showroom, inside the marque's global guidelines and its sign-off chain.",
      "Produced photography, video and campaign content across the Mercedes-Benz and Maybach ranges, including print and WhatsApp campaigns, working with the Sales and Service Marketing GMs.",
      "Handled the creative side of showroom launches, events and customer experience, plus content planning and posting schedules across social.",
      "Campaigns contributed to 50% growth in showroom footfall and lead conversion, and an 80% improvement in service campaign engagement.",
      "Grew the showroom's Instagram following from 6,000 to 17,000 in eight months through consistent content.",
    ],
    detail:
      "Working inside a marque that size taught me consistency beats any one brilliant asset. Guidelines are not the obstacle. They are the job.",
  },
  {
    org: "Self-employed",
    role: "Independent Freelance Producer",
    period: "Nov 2022 - Nov 2024",
    place: "Hyderabad, India",
    points: [
      "Two years of contract shooting. Automotive, hotels, restaurants, corporate, events.",
      "I used the time to learn the strategy side rather than only the camera side. That is what got me the Mercedes job.",
    ],
  },
  {
    org: "RVR PRO",
    role: "Cinematographer",
    period: "Jun 2022 - Oct 2022",
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
    period: "Feb 2020 - May 2021",
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
    period: "Dec 2018 - Jan 2020",
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
    period: "Oct 2016 - Nov 2018",
    place: "Visakhapatnam, Andhra Pradesh",
    early: true,
    points: [
      "Edited 100+ projects. Corporate films, promos, ads.",
      "Added animation and VFX work that lifted client satisfaction by 40%.",
      "Built lasting client relationships, including with three major corporations.",
    ],
  },
];

export type Credit = {
  /** What it was, named plainly rather than dressed up as an employer. */
  project: string;
  role: string;
  note: string;
};

/**
 * Practical production credits from the same early years. Not separate
 * full-time jobs, so they sit apart from `experience` rather than inside it
 * with a company and a start and end date they never had. They matter
 * because they show production was the foundation from the start, not
 * something picked up later. Katha ran during the Camzooms employment
 * period (noted below); the other two were unrelated to Camzooms.
 */
export const earlyCredits: Credit[] = [
  {
    project: "Katha (web series)",
    role: "Assistant Director",
    note: "A project during the Camzooms period. One of the assistant directors on the production team, for around five months. Also edited two episodes.",
  },
  {
    project: "Geetha Subramanyam (Season 2)",
    role: "Assistant Director, Direction Department",
    note: "A separate production. One of the assistant directors, mainly through early pre-production.",
  },
  {
    project: "Short film projects",
    role: "Assistant Director & Post-Production",
    note: "Independent freelance work, separate from Camzooms, across several short films.",
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
  { key: "production", label: "Content Production", blurb: "Films, shoots and events, ten years behind the camera." },
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
    shot: "Bugatti-line executive furniture, 1UJ International Hub",
    tags: ["Brand & strategy", "Digital", "AI"],
    kind: "Brand build · Retail & e-commerce",
    blurb:
      "Three brands from nothing. Identity, brand kit, campaign system, and a Shopify launch across 600+ fashion SKUs and 150+ luxury lines. The model and product imagery was generated, which took the shoot bill out without taking the standard out.",
    credit: "In-house · Creative Lead, Ujwala Group",
    result: "750+ SKUs taken live · 300+ qualified enquiries in four months · five-person team hired and trained",
    poster: "/work/1uj-hub.jpg",
    video: "/work/1uj-hub.webm",
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
    video: "/work/mercedes.webm",
  },
  {
    code: "03",
    name: "AI previsualisation & generated content",
    group: "ai",
    engagement: "Studio",
    shot: "Generated interior walkthrough, previsualisation pipeline",
    tags: ["AI", "Production"],
    kind: "AI · Production pipeline",
    blurb:
      "A pipeline for making the thing that cannot be photographed yet, because it is not built, not manufactured, or not worth what a shoot would cost. Property walkthroughs before the slab is poured are one use. Product, model and campaign imagery are the others. It is not a real-estate tool. It is a way to originate whatever visual a brief needs.",
    credit: "Studio · ProductionX",
    poster: "/work/previsualisation.jpg",
    video: "/work/previsualisation.webm",
  },
];

/** Live sites — the part that separates him from producers who only shoot. */
export const digital: Project[] = [
  {
    code: "04",
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
    code: "05",
    name: "Sattva Amora",
    group: "digital",
    engagement: "White-label",
    shot: "Live site, scrolling",
    tags: ["Digital"],
    kind: "Website · White-label build",
    blurb:
      "Live site for a residential launch. Narrative scroll, floor plans, enquiry capture. Built white-label, so it went out under someone else's name.",
    credit: "White-label · Live",
    href: "https://amorabysattva.com/",
    poster: "/work/sattva.jpg",
    video: "/work/sattva.webm",
  },
  {
    code: "06",
    name: "OTHO Realty",
    group: "digital",
    engagement: "Studio",
    shot: "Generated walkthrough frame, OTHO Realty",
    tags: ["Brand & strategy", "Digital", "AI"],
    kind: "Real estate · Brand & site",
    blurb:
      "Brand building and a live site for a realty client. This is where the previsualisation pipeline earns its money, with generated walkthroughs sitting next to the brand they are selling.",
    credit: "ProductionX · Live",
    href: "https://otho.co.in/",
    /* The property render belongs here rather than on the previsualisation
       entry: this is the realty client the pipeline was built for, so the frame
       is about the client rather than a claim that previz is a realty tool.
       It also stops OTHO and Sattva Amora sharing one image, which labelled one
       client's build as another's. */
    poster: "/work/previz.jpg",
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
 * Grouped rather than listed flat, and ordered so creative and production
 * lead: roughly 60% creative and production, 25% brand and marketing, 15% AI
 * and digital, both in the order the groups appear and in how much weight
 * each one carries. Someone scanning for one competence should find its whole
 * cluster in one place rather than reading forty loose nouns.
 */
export const skills: SkillGroup[] = [
  {
    group: "Creative Direction & Production",
    items: [
      "Creative direction",
      "Creative production",
      "Film direction",
      "Cinematography",
      "Video production",
      "Photography",
      "Visual storytelling",
    ],
  },
  {
    group: "Creative & Team Leadership",
    items: [
      "Creative leadership",
      "Team leadership",
      "Team hiring & training (5-8)",
      "Budget & vendor management",
      "Client & stakeholder relationships",
    ],
  },
  {
    group: "Brand & Marketing",
    items: [
      "Brand strategy",
      "Creative strategy",
      "Content strategy",
      "Campaign development",
      "Digital marketing",
      "Performance marketing",
      "Social media marketing",
      "Google Ads",
      "Meta Ads",
      "E-commerce",
      "Shopify",
    ],
  },
  {
    group: "AI & Digital Production",
    items: [
      "Generative AI",
      "AI-assisted production",
      "AI product & model imagery at commercial scale",
      "Previsualisation of anything not yet built or shot",
      "Website design & build (Next.js, React)",
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
  { group: "Craft", name: "DSLR & mirrorless cameras", use: "Own the shoot end to end, as DOP and content producer" },
  { group: "Craft", name: "Adobe Creative Suite", use: "Premiere, After Effects, Photoshop. Edit, motion and retouch." },
  { group: "Craft", name: "DaVinci Resolve Studio", use: "Grade and finish, where a film gets its final look" },

  { group: "Generative", name: "Runway", use: "Generative video and shot extension inside an edit" },
  { group: "Generative", name: "Veo 3.0", use: "Generated footage for shots a camera cannot get" },
  { group: "Generative", name: "Nano Banana", use: "Product and model imagery, and precise image editing" },
  { group: "Generative", name: "Higgsfield", use: "Photoreal stills and motion for campaign work" },

  { group: "Build", name: "Claude Code · Cursor", use: "Building client sites when a brief calls for one" },
  { group: "Build", name: "Lovable · Emergent", use: "Fast front-end builds when a brief needs a page this week" },
  { group: "Build", name: "Shopify", use: "Storefronts, including a 600+ SKU catalogue taken live" },

  { group: "Growth", name: "Meta Ads Manager", use: "Paid social, planned against the content it runs on" },
  { group: "Growth", name: "Google Ads", use: "Search and demand capture" },
  { group: "Growth", name: "Google Analytics", use: "What the work actually moved" },

  { group: "Ops", name: "Zapier", use: "Wiring the tools together so nobody re-types anything twice" },
  { group: "Ops", name: "ClickUp", use: "Running the pipeline: briefs, review, delivery" },
  { group: "Ops", name: "Claude · ChatGPT", use: "Script, copy and SEO drafting against a brief" },
];

/**
 * B.A. comes first because it's the completed degree, and the footer cites
 * `education[0]` as the one-line credential. D.F.Tech is real and relevant
 * training, but the course was discontinued, so it is labelled as coursework
 * rather than presented as a finished qualification.
 */
export const education = [
  {
    qualification: "B.A. in VFX & Animation",
    institution: "Mahatma Gandhi University, Arena Multimedia",
    period: "2013 - 2016",
  },
  {
    qualification: "D.F.Tech in Direction (coursework, discontinued)",
    institution: "Dadasaheb Phalke Film School",
    period: "2018",
  },
];

export const languages = ["English", "Telugu", "Hindi"];

/** Used by both the site footer and the CV file name. */
export const cvFileName = "Kiran-Basa-Creative-Lead-CV.pdf";
