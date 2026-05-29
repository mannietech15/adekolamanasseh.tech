export interface ProjectMetric {
  label: string;
  value: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  category: "frontend" | "fullstack" | "opensource";
  liveUrl?: string;
  githubUrl?: string;
  playstoreUrl?: string;
  featured: boolean;
  gradient: string;
  image?: string;
  gallery?: string[];
  shortFeatures?: string[];
  // Detail page fields
  year: string;
  status: "live" | "in-progress" | "archived";
  role: string;
  duration: string;
  highlights: string[];
  metrics?: ProjectMetric[];
  challenges?: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: "allroundar",
    title: "Allroundar",
    description:
      "As a core member of the development team, I helped build Allroundar—a versatile platform that consolidates various transportation options (ridesharing, carpooling, luxury hires), delivery services, and a comprehensive professional marketplace. It emphasizes user convenience, safety, and seamless integration of daily essential services.",
    shortFeatures: [
      "User registration and profile management with secure authentication",
      "Multi-modal transportation services including ride-hailing and logistics",
      "Delivery services for food, general items, and specialized parcels",
    ],
    longDescription:
      "As a core member of the development team, I helped build Allroundar—a versatile platform that consolidates various transportation options (ridesharing, carpooling, luxury hires), delivery services, and a comprehensive professional marketplace. It emphasizes user convenience, safety, and seamless integration of daily essential services.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Express.js", "JWT", "Tailwind CSS"],
    category: "fullstack",
    liveUrl: "https://librix.vercel.app",
    githubUrl: "https://github.com/mannietech15",
    playstoreUrl: "https://play.google.com/store",
    featured: true,
    gradient: "from-emerald-500/20 to-cyan-500/20",
    image: "/projects/Allroundar/AllRoundar1.png",
    gallery: [
      "/projects/Allroundar/AllRoundar1.png",
      "/projects/Allroundar/AllRoundar2.png",
      "/projects/Allroundar/AllRoundar3.png",
      "/projects/Allroundar/AllRoundar4.png",
      "/projects/Allroundar/AllRoundar5.png",
      "/projects/Allroundar/AllRoundar6.png",
      "/projects/Allroundar/AllRoundar7.png",
    ],
    year: "2024",
    status: "live",
    role: "Full-Stack Developer",
    duration: "6 weeks",
    highlights: [
      "Integrating diverse services (transport, delivery, marketplace) into a single intuitive platform",
      "Ensuring real-time tracking and matching algorithms perform efficiently at scale",
      "Implementing robust safety and verification processes across user roles",
      "Handling secure payments and instant payouts with multiple gateways",
      "Balancing cross-platform compatibility for mobile and web",
      "Designed modular architecture to separate service modules while maintaining unified UI/UX",
      "Utilized optimized algorithms and cloud services for real-time GPS and matching",
      "Integrated third-party verification APIs and encrypted storage for safety features",
      "Leveraged payment SDKs with fallback mechanisms and scheduled batch processing",
      "Built with React Native for mobile and React for web to share codebase",
    ],
    metrics: [
      { label: "Reservations Processed", value: "500+", icon: "📅" },
      { label: "API Endpoints Built", value: "28", icon: "🔗" },
      { label: "Page Load Time", value: "<1.2s", icon: "⚡" },
      { label: "Lighthouse Score", value: "96", icon: "🏆" },
    ],
    challenges:
      "Developing a comprehensive super-app like Allroundar presented unique architectural and UX challenges. The primary focus was balancing a massive feature set—spanning transportation, delivery, and professional services—while maintaining high performance, real-time synchronization, and a seamless, intuitive user experience across both web and mobile platforms.",
    accentColor: "#00ff88",
  },
  {
    id: "finovatex",
    title: "FinovateX",
    description:
      "A premium stock market analysis platform providing real-time price tracking, historical data visualization, and personalized portfolio management for modern investors.",
    shortFeatures: [
      "Real-time stock price monitoring with low-latency updates",
      "Interactive technical analysis charts and market indicators",
      "Comprehensive portfolio tracking and performance analytics",
    ],
    longDescription:
      "FinovateX redefines how investors interact with financial markets. Built on a high-performance Next.js architecture with server-side rendering, the platform pulls live market data from the Alpha Vantage API and presents it through a suite of sophisticated, interactive charts — candlestick views, multi-stock overlays, and 30-day trend lines with custom tooltips and zoom controls. At its core sits a layered caching engine: in-memory storage for high-frequency tickers and localStorage persistence for session continuity, achieving an ~87% cache hit rate that keeps the experience blazing fast while operating entirely within the free API tier. Users can build and monitor personalised watchlists, track portfolio performance in real time, and set price alerts that trigger via periodic background refetches — all within a sleek, dark-mode interface designed to feel as premium as the data it delivers.",
    stack: ["Next.js", "TypeScript", "Node.js", "REST API", "Recharts", "Vercel"],
    category: "fullstack",
    liveUrl: "https://finovatex.adekola.dev",
    githubUrl: "https://github.com/mannietech15",
    featured: true,
    gradient: "from-green-500/20 to-emerald-500/20",
    image: "/projects/finovatex.png",
    gallery: [
      "/projects/finovatex/finovatex.png",
      "/projects/finovatex/fin1.png",
      "/projects/finovatex/fin3.png",
      "/projects/finovatex/fin4.png",
      "/projects/finovatex/fin7.png",
      "/projects/finovatex/chartFin.png",
      "/projects/finovatex/chartFin2.png",
    ],
    year: "2024",
    status: "live",
    role: "Frontend + API Integration",
    duration: "3 weeks",
    highlights: [
      "Integrated Alpha Vantage API with a smart TTL-based caching layer to respect rate limits",
      "Built interactive candlestick and line charts with Recharts, custom tooltips, and zoom",
      "Implemented server-side rendering for sub-second initial page loads",
      "Created a multi-stock comparison view with colour-coded overlays",
      "Added a price-alert system using localStorage + periodic refetch",
    ],
    metrics: [
      { label: "Stocks Trackable", value: "5,000+", icon: "📈" },
      { label: "Chart Data Points", value: "30 days", icon: "📊" },
      { label: "Cache Hit Rate", value: "~87%", icon: "⚡" },
      { label: "API Calls Saved", value: "70%", icon: "💡" },
    ],
    challenges:
      "Alpha Vantage's free tier caps at 25 calls/day. I solved this with a layered cache: in-memory for hot tickers + localStorage for persistence, so popular stocks are served entirely from cache while cold tickers fetch fresh data only on demand.",
    accentColor: "#00ff88",
  },
  {
    id: "portfolio-v1",
    title: "Portfolio v1",
    description:
      "My first developer portfolio — a React-powered single-page app with smooth animations and modern design.",
    longDescription:
      "The first iteration of my personal portfolio site, built with React and TypeScript. Features smooth page transitions, responsive design, and dynamic content rendering via a JSON data layer so all content is easily editable without touching JSX. This project was my deep dive into Framer Motion and taught me how to balance visual richness with performance by code-splitting and lazy-loading heavy animation sections.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "frontend",
    githubUrl: "https://github.com/mannietech15",
    featured: true,
    gradient: "from-lime-500/20 to-green-500/20",
    image: "/projects/portfolio-v1.png",
    year: "2023",
    status: "archived",
    role: "Solo Developer & Designer",
    duration: "2 weeks",
    highlights: [
      "Designed a custom design system from scratch using CSS custom properties",
      "Built reusable animation hooks wrapping Framer Motion for consistent spring physics",
      "Achieved 100 Lighthouse performance score via code-splitting and lazy loading",
      "Implemented a JSON-driven content layer — all copy editable without touching JSX",
      "Shipped with a one-command Vercel deployment pipeline",
    ],
    metrics: [
      { label: "Lighthouse Performance", value: "100", icon: "🏆" },
      { label: "Components Built", value: "18", icon: "🧩" },
      { label: "Bundle Size", value: "< 80KB", icon: "📦" },
      { label: "Build Time", value: "< 12s", icon: "⚡" },
    ],
    challenges:
      "Getting Framer Motion animations to feel natural without tanking performance was tricky. I built a custom hook that detects the user's `prefers-reduced-motion` preference and swaps spring animations for instant transitions, giving accessibility wins without duplicating component logic.",
    accentColor: "#39d353",
  },
  {
    id: "api-toolkit",
    title: "REST API Toolkit",
    description:
      "A collection of RESTful API patterns and middleware implementations for Express.js applications.",
    longDescription:
      "A reusable set of Express.js middleware, authentication patterns, and API architecture templates. Includes rate limiting, request validation (Zod), error handling, and JWT auth flows. Designed as a production-ready boilerplate that I use as a starting point for all new backend projects. The toolkit is fully typed with TypeScript and includes a comprehensive test suite via Vitest.",
    stack: ["Node.js", "Express.js", "TypeScript", "JWT", "PostgreSQL", "Zod", "Vitest"],
    category: "opensource",
    githubUrl: "https://github.com/mannietech15",
    featured: true,
    gradient: "from-teal-500/20 to-emerald-500/20",
    image: "/projects/api-toolkit.png",
    year: "2024",
    status: "in-progress",
    role: "Author & Maintainer",
    duration: "Ongoing",
    highlights: [
      "Built a composable middleware pipeline with typed request/response contexts",
      "Integrated Zod for runtime schema validation on all route inputs",
      "Implemented sliding-window rate limiting without Redis dependency",
      "Added comprehensive error normalisation — all errors map to RFC 7807 Problem Details",
      "Wrote 94% test coverage with Vitest and Supertest integration tests",
    ],
    metrics: [
      { label: "Middleware Modules", value: "12", icon: "🔧" },
      { label: "Test Coverage", value: "94%", icon: "✅" },
      { label: "TypeScript Strict", value: "100%", icon: "🛡️" },
      { label: "Zero Runtime Deps", value: "Core", icon: "📦" },
    ],
    challenges:
      "Building a rate limiter without Redis that still works correctly under concurrent load required implementing an atomic in-memory sliding window using a Map with mutex-like semantics in Node.js's single-threaded environment — no race conditions, no external dependencies.",
    accentColor: "#00cc6a",
  },
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "opensource", label: "Open Source" },
] as const;
