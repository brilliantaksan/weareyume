// Canonical content types + default content.
//
// The defaults below mirror the original prototype exactly. They serve two
// purposes: (1) the seed inserted into Supabase on first setup, and (2) a
// fallback the public site renders if the DB is unreachable, so the page
// never breaks.

export type MetaRow = { jp: string; en: string };
export type Stat = { n: string; l: string };
export type Step = { n: string; jp: string; t: string; body: string; color: string };
export type LinkItem = { label: string; url: string };

export type SiteContent = {
  hero: {
    metaRows: MetaRow[];
    taglineLead: string; // before the highlighted phrase
    taglineEm: string; // the highlighted italic phrase
    taglineTail: string; // after the highlighted phrase
    ctaPrimary: string;
    ctaSecondary: string;
    nextEyebrow: string;
  };
  next: {
    dateLabel: string;
    dateShort: string;
    timeLabel: string;
    locationLabel: string;
    lumaUrl: string;
  };
  manifesto: {
    eyebrow: string;
    headingLine1: string;
    headingEm: string;
    headingLine3: string;
    paragraphs: string[]; // supports a single [socratica] token -> link
    socraticaUrl: string;
    emph: string;
    emphPink: string;
    stats: Stat[];
  };
  how: {
    eyebrow: string;
    heading: string; // \n splits lines
    sub: string;
    steps: Step[];
  };
  upcoming: {
    eyebrow: string;
    heading: string;
    lumaUrl: string;
  };
  demos: {
    eyebrow: string;
    heading: string; // \n splits lines
    sub: string;
  };
  gallery: {
    eyebrow: string;
    heading: string;
    sub: string;
    instagramUrl: string;
  };
  faqHeading: {
    eyebrow: string;
    heading: string;
  };
  join: {
    eyebrow: string;
    title: string; // \n splits lines
    lumaUrl: string;
    reminderEmail: string;
  };
  footer: {
    tagline: string; // \n splits lines
    findUs: LinkItem[];
    socratica: LinkItem[];
    remindCopy: string;
    bottomLeft: string;
    bottomRight: string;
  };
};

export type Demo = {
  id: string;
  tag: string;
  title: string;
  maker: string;
  body: string;
  color: string;
  sort_order: number;
};

export type SessionRow = {
  id: string;
  date_label: string;
  day: string;
  title: string;
  location: string;
  spots: string;
  luma_url: string;
  is_next: boolean;
  sort_order: number;
};

export type GalleryPhoto = {
  id: string;
  image_path: string | null; // Supabase Storage path; null => striped placeholder
  date_label: string;
  tilt: string;
  sort_order: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    metaRows: [
      { jp: "渋谷", en: "Shibuya, Tokyo" },
      { jp: "週末 12〜15時", en: "A Socratica node" },
    ],
    taglineLead: "A space for makers, dreamers & builders\nto work on their ",
    taglineEm: "high-effort passion projects",
    taglineTail: "\ntogether at the same table.",
    ctaPrimary: "Join next session",
    ctaSecondary: "What is Yu+Me?",
    nextEyebrow: "Next gathering",
  },
  next: {
    dateLabel: "Sat. Dec 6",
    dateShort: "Dec 6",
    timeLabel: "12:00 – 15:00",
    locationLabel: "Cr/pto Café & Bar, Shibuya",
    lumaUrl: "https://luma.com/YuMe",
  },
  manifesto: {
    eyebrow: "私たちについて · About",
    headingLine1: "Come make",
    headingEm: "your thing",
    headingLine3: "with us.",
    paragraphs: [
      "Yu+Me is a weekend co-working session in Shibuya, part of [socratica] — a global network of 40+ nodes where students, alumni, artists and tinkerers gather to make stuff together.",
      "We're united by the love of making things, and we want to help you make your thing. Bring a passion project — coding, writing, knitting, music, gardening, anything. We'll work in Pomodoros, demo what we made, eat snacks, and become friends.",
    ],
    socraticaUrl: "https://socratica.info",
    emph: "No work allowed. No homework.",
    emphPink: "Just the stuff you'd do anyway, with people who care.",
    stats: [
      { n: "40+", l: "Socratica nodes worldwide" },
      { n: "3h", l: "Per session" },
      { n: "¥0", l: "Always free, by RSVP" },
    ],
  },
  how: {
    eyebrow: "流れ · How a session works",
    heading: "3 hours, one table,\neveryone's making.",
    sub: "Loosely structured. Mostly snacks and Pomodoros.",
    steps: [
      { n: "01", jp: "集合", t: "Arrive & say hi", body: "Doors open 11:50. We start with snacks, intros and ~15 min of small talk. New face? You'll be welcomed by name.", color: "sky" },
      { n: "02", jp: "宣言", t: "Declare your project", body: "Everyone gets 30 seconds to say what they're working on today. The smaller and weirder, the better.", color: "peach" },
      { n: "03", jp: "集中", t: "Pomodoro work blocks", body: "Two 50-minute focus blocks with a 10-minute break between. Headphones in. Get the thing done.", color: "mint" },
      { n: "04", jp: "発表", t: "Demos & celebrate", body: "Show what you made. 3 bullet points or a half-broken prototype — both count. We clap loudly.", color: "pink" },
    ],
  },
  upcoming: {
    eyebrow: "次回 · Upcoming sessions",
    heading: "Pull up a chair.",
    lumaUrl: "https://luma.com/YuMe",
  },
  demos: {
    eyebrow: "発表 · Demos",
    heading: "What people\nactually made.",
    sub: "Whether it's 3 bullet points on a Google Doc or a full-blown prototype, every session ends with demos. Here's a slice.",
  },
  gallery: {
    eyebrow: "記録 · Past sessions",
    heading: "The receipts.",
    sub: "Every Saturday for the last 12 weeks.",
    instagramUrl: "https://www.instagram.com/weareyume_",
  },
  faqHeading: {
    eyebrow: "よくある質問 · FAQ",
    heading: "Things people ask.",
  },
  join: {
    eyebrow: "RSVP · 申し込み",
    title: "See you\nSaturday?",
    lumaUrl: "https://luma.com/YuMe",
    reminderEmail: "hello@weareyume.com",
  },
  footer: {
    tagline: "A Socratica node based in Shibuya, Tokyo.\n週末 · Weekends · 12:00–15:00",
    findUs: [
      { label: "Luma", url: "https://luma.com/YuMe" },
      { label: "Instagram @weareyume_", url: "https://www.instagram.com/weareyume_" },
      { label: "X / Twitter", url: "https://x.com/yuandmetokyo" },
      { label: "hello@weareyume.com", url: "mailto:hello@weareyume.com" },
    ],
    socratica: [
      { label: "socratica.info", url: "https://socratica.info" },
      { label: "Find a node near you", url: "https://socratica.info/map" },
      { label: "Host toolbox", url: "https://toolbox.socratica.info" },
    ],
    remindCopy: "One email per session. Nothing else.",
    bottomLeft: "© 2025 Yu+Me · Made with ❤ in 渋谷",
    bottomRight: "A Socratica node. The spark continues.",
  },
};

export const DEFAULT_DEMOS: Demo[] = [
  { id: "seed-1", tag: "Code · Nov 21", title: "Anomia Mobile", maker: "Aiko", body: "A real-time word game ported to React Native — built across 4 sessions.", color: "sky", sort_order: 0 },
  { id: "seed-2", tag: "Art · Nov 07", title: "Tokyo Tower Linocut", maker: "Marcus", body: "A 4-block reduction print, hand-pulled. The third block didn't register but it kind of works.", color: "peach", sort_order: 1 },
  { id: "seed-3", tag: "Hardware · Oct 18", title: "Tea timer for one", maker: "Ren", body: "Tiny e-ink device that brews the perfect cup. Currently lives in a 3D-printed box.", color: "mint", sort_order: 2 },
  { id: "seed-4", tag: "Writing · Oct 04", title: "Zine: Notes on commuting", maker: "Sora", body: "12-page riso zine drafted entirely during a single Pomodoro. Drawings included.", color: "pink", sort_order: 3 },
  { id: "seed-5", tag: "Music · Sep 20", title: "Loop pedal lullabies", maker: "Yuki", body: "An EP of four lullabies. Recorded between Pomodoros on a borrowed mic.", color: "sky", sort_order: 4 },
  { id: "seed-6", tag: "Web · Sep 06", title: "Transit map for ghosts", maker: "Lex", body: "An imaginary subway, plotted on top of the real Yamanote line. Updates every Sunday.", color: "peach", sort_order: 5 },
];

export const DEFAULT_SESSIONS: SessionRow[] = [
  { id: "seed-1", date_label: "12.06", day: "Sat", title: "Yu+Me · Vol. 12 — Year-end show & tell", location: "Cr/pto Café & Bar, Shibuya", spots: "12 / 24 spots left", luma_url: "https://luma.com/YuMe", is_next: true, sort_order: 0 },
  { id: "seed-2", date_label: "12.20", day: "Sat", title: "Yu+Me · Vol. 13 — Holiday craft session", location: "TBD, Shibuya", spots: "RSVP opens Dec 8", luma_url: "https://luma.com/YuMe", is_next: false, sort_order: 1 },
  { id: "seed-3", date_label: "01.10", day: "Sat", title: "Yu+Me · Vol. 14 — First gathering of '26", location: "Cr/pto Café & Bar, Shibuya", spots: "Save the date", luma_url: "https://luma.com/YuMe", is_next: false, sort_order: 2 },
];

export const DEFAULT_GALLERY: GalleryPhoto[] = [
  { id: "seed-1", image_path: null, date_label: "08.23", tilt: "-3deg", sort_order: 0 },
  { id: "seed-2", image_path: null, date_label: "09.06", tilt: "2deg", sort_order: 1 },
  { id: "seed-3", image_path: null, date_label: "09.20", tilt: "-2deg", sort_order: 2 },
  { id: "seed-4", image_path: null, date_label: "10.04", tilt: "4deg", sort_order: 3 },
  { id: "seed-5", image_path: null, date_label: "10.18", tilt: "-4deg", sort_order: 4 },
  { id: "seed-6", image_path: null, date_label: "11.07", tilt: "3deg", sort_order: 5 },
  { id: "seed-7", image_path: null, date_label: "11.21", tilt: "-2deg", sort_order: 6 },
  { id: "seed-8", image_path: null, date_label: "12.06", tilt: "2deg", sort_order: 7 },
];

export const DEFAULT_FAQS: Faq[] = [
  { id: "seed-1", question: "I'm not technical. Can I still come?", answer: "Absolutely. We've had poets, knitters, gardeners, ceramicists and one person training for a marathon. The only requirement is that you're working on something you actually care about.", sort_order: 0 },
  { id: "seed-2", question: "What counts as a 'passion project'?", answer: "Whatever's been nagging at you that you haven't made time for. Could be a novel, an app, a song, a piece of furniture, learning a language. Not allowed: work for your job, homework, or anything someone is paying you to do.", sort_order: 1 },
  { id: "seed-3", question: "Is this in English or Japanese?", answer: "Both. Me and Claudia (your hosts) are still pretty beginner at Japanese and very much learning ourselves — so don't worry about your level either way. About half our regulars are non-Japanese; bring whoever, in whichever language.", sort_order: 2 },
  { id: "seed-4", question: "Do I need to bring anything?", answer: "Just whatever you need to work on your project. Laptops, sketchbooks, knitting needles, weird hardware. We provide snacks, coffee and washi tape.", sort_order: 3 },
  { id: "seed-5", question: "How is this different from a normal coworking space?", answer: "There's no 'work' here. Yu+Me is about the things you do because you want to, not because you have to. Plus: demos, snacks, friends.", sort_order: 4 },
];

export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "hello@weareyume.com";
