export interface TimelineEntry {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  techPills: string[];
  icon: string;
}

export const timeline: TimelineEntry[] = [
  {
    id: "present",
    title: "Building This Portfolio",
    timeframe: "Present",
    description:
      "Designing and developing a premium portfolio experience with Next.js 14, advanced animations, and a custom green-on-black design system.",
    techPills: ["Next.js 14", "TypeScript", "Framer Motion", "Tailwind CSS"],
    icon: "🚀",
  },
  {
    id: "fullstack-app",
    title: "First Full-Stack App Shipped",
    timeframe: "Month 11",
    description:
      "Built and deployed a complete web application with authentication, database management, and a polished live frontend.",
    techPills: ["Next.js", "PostgreSQL", "Express.js", "Vercel"],
    icon: "🎯",
  },
  {
    id: "went-fullstack",
    title: "Went Full-Stack",
    timeframe: "Month 6",
    description:
      "Expanded from frontend-only to building REST APIs and database-backed applications. Started working with server-side logic and data persistence.",
    techPills: ["Node.js", "Express.js", "PostgreSQL", "JWT"],
    icon: "⚡",
  },
  {
    id: "typescript",
    title: "Discovered TypeScript",
    timeframe: "Month 3",
    description:
      "Migrated my first project from JavaScript to TypeScript. The type safety and developer experience were game-changers. Never looked back.",
    techPills: ["TypeScript", "React", "Type Safety"],
    icon: "💎",
  },
  {
    id: "first-code",
    title: "Wrote First Line of Code",
    timeframe: "Month 1",
    description:
      "Started with HTML and CSS. Within weeks, I was building interactive UIs with React. The physics brain loved the systematic logic of programming.",
    techPills: ["HTML", "CSS", "JavaScript", "React"],
    icon: "✨",
  },
];
