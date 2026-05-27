export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  category: "frontend" | "fullstack" | "opensource";
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  gradient: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "librix",
    title: "Librix",
    description:
      "A full-stack library reservation management system with real-time booking, user auth, and an elegant dashboard.",
    longDescription:
      "Built a complete library management platform featuring real-time seat reservations, JWT authentication, role-based access control, and a polished dark-mode dashboard. Full CRUD operations with PostgreSQL backend.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Express.js", "JWT", "Tailwind CSS"],
    category: "fullstack",
    liveUrl: "https://librix.vercel.app",
    githubUrl: "https://github.com/adekola",
    featured: true,
    gradient: "from-emerald-500/20 to-cyan-500/20",
    image: "/projects/librix.png",
  },
  {
    id: "stock-dashboard",
    title: "Stock Analysis Dashboard",
    description:
      "Real-time stock analysis dashboard with live market data, caching, and responsive data visualization.",
    longDescription:
      "An interactive stock analysis tool pulling real-time data from the Alpha Vantage API. Features intelligent caching to handle API rate limits, server-side rendering for instant data display, and clean data visualizations.",
    stack: ["Next.js", "TypeScript", "Node.js", "REST API", "Vercel"],
    category: "fullstack",
    liveUrl: "https://stocks.adekola.dev",
    githubUrl: "https://github.com/adekola",
    featured: true,
    gradient: "from-green-500/20 to-emerald-500/20",
    image: "/projects/stock-dashboard.png",
  },
  {
    id: "portfolio-v1",
    title: "Portfolio v1",
    description:
      "My first developer portfolio — a React-powered single-page app with smooth animations and modern design.",
    longDescription:
      "The first iteration of my personal portfolio site, built with React and TypeScript. Features smooth page transitions, responsive design, and dynamic content rendering.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "frontend",
    githubUrl: "https://github.com/adekola",
    featured: true,
    gradient: "from-lime-500/20 to-green-500/20",
    image: "/projects/portfolio-v1.png",
  },
  {
    id: "api-toolkit",
    title: "REST API Toolkit",
    description:
      "A collection of RESTful API patterns and middleware implementations for Express.js applications.",
    longDescription:
      "A reusable set of Express.js middleware, authentication patterns, and API architecture templates. Includes rate limiting, validation, error handling, and JWT auth flows.",
    stack: ["Node.js", "Express.js", "JWT", "PostgreSQL", "REST API"],
    category: "opensource",
    githubUrl: "https://github.com/adekola",
    featured: true,
    gradient: "from-teal-500/20 to-emerald-500/20",
    image: "/projects/api-toolkit.png",
  },
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "opensource", label: "Open Source" },
] as const;
