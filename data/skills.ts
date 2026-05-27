export const skills = {
  languages: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
  frameworks: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
    "Express.js",
    "Node.js",
    "FastAPI",
  ],
  databases: ["PostgreSQL", "MySQL", "Supabase", "SQLite", "Better-SQLite3"],
  cloudDevOps: ["Vercel", "GitHub Actions", "Render"],
  other: ["REST API", "GraphQL", "JWT", "Git"],
};

export const coreSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Express.js",
  "Supabase",
];

export const secondarySkills = [
  "FastAPI",
  "MySQL",
  "SQLite",
  "Better-SQLite3",
  "GitHub Actions",
  "Vercel",
  "Render",
  "GraphQL",
  "JWT",
  "Bootstrap",
];

export type SkillCategory = keyof typeof skills;

export const skillCategoryLabels: Record<SkillCategory, string> = {
  languages: "Languages",
  frameworks: "Frameworks & Libraries",
  databases: "Databases",
  cloudDevOps: "Cloud & DevOps",
  other: "Other Tools",
};

// Skill icons mapping (using simple emoji/text representations)
export const skillIcons: Record<string, string> = {
  JavaScript: "JS",
  TypeScript: "TS",
  HTML: "◇",
  CSS: "◆",
  SQL: "⌘",
  React: "⚛",
  "Next.js": "▲",
  "Tailwind CSS": "🌊",
  Bootstrap: "B",
  "Express.js": "Ex",
  "Node.js": "⬢",
  FastAPI: "⚡",
  PostgreSQL: "🐘",
  MySQL: "🐬",
  Supabase: "⚡",
  SQLite: "📦",
  "Better-SQLite3": "📦",
  Vercel: "▲",
  "GitHub Actions": "⚙",
  Render: "◉",
  "REST API": "↔",
  GraphQL: "◈",
  JWT: "🔐",
  Git: "⑂",
};

// Proficiency levels (0–100) for radar/bar chart
export const skillProficiency: Record<string, number> = {
  JavaScript: 90,
  TypeScript: 85,
  HTML: 95,
  CSS: 88,
  SQL: 78,
  React: 92,
  "Next.js": 88,
  "Tailwind CSS": 90,
  Bootstrap: 75,
  "Express.js": 82,
  "Node.js": 85,
  FastAPI: 70,
  PostgreSQL: 78,
  MySQL: 72,
  Supabase: 80,
  SQLite: 70,
  "Better-SQLite3": 68,
  Vercel: 85,
  "GitHub Actions": 72,
  Render: 75,
  "REST API": 88,
  GraphQL: 72,
  JWT: 80,
  Git: 88,
};

// Radar chart data — grouped by category
export const radarChartData = [
  { subject: "Languages",     fullMark: 100, value: 87 },
  { subject: "Frameworks",    fullMark: 100, value: 85 },
  { subject: "Databases",     fullMark: 100, value: 75 },
  { subject: "Cloud/DevOps",  fullMark: 100, value: 77 },
  { subject: "APIs & Tools", fullMark: 100, value: 82 },
];

// Top skills bar chart data
export const topSkillsData = [
  { name: "React",        level: 92, icon: "⚛" },
  { name: "TypeScript",  level: 85, icon: "TS" },
  { name: "Next.js",     level: 88, icon: "▲" },
  { name: "Node.js",     level: 85, icon: "⬢" },
  { name: "Tailwind",    level: 90, icon: "🌊" },
  { name: "PostgreSQL",  level: 78, icon: "🐘" },
  { name: "Supabase",    level: 80, icon: "⚡" },
  { name: "REST API",    level: 88, icon: "↔" },
];
