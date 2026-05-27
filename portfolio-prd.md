# Product Requirements Document
## Elite Developer Portfolio — "The Peak Build"

**Version:** 1.1  
**Audience:** AI coding agent / developer implementing the portfolio  
**Goal:** Build the most technically impressive, visually stunning personal developer portfolio that exists on the web. This is not a template. This is a statement.

---

## 0. Owner — Personal Details

This is the real person the portfolio is for. Use these details verbatim everywhere — no placeholders.

| Field | Value |
|---|---|
| **Full Name** | Adekola Manasseh |
| **Display Name** | Manasseh |
| **Age** | 16 |
| **Education** | Physics student, University of Lagos (Unilag) |
| **Experience** | 11 months of self-taught full-stack development |
| **Role** | Full-Stack Developer |
| **Location** | Lagos, Nigeria |

### Narrative — Use This to Write the Bio

Adekola is a 16-year-old Physics student at the University of Lagos who has spent the last 11 months building full-stack web applications from scratch. While his peers are learning the basics, he's shipping real products — REST APIs, database-driven apps, and polished frontends. He approaches code with the same rigour Physics demands: understand the system deeply, then build with precision. He's not waiting to be older to do great work.

> The AI should use this narrative to write the bio section in first person, in Adekola's voice — confident, grounded, not arrogant. Lean into the contrast: young, Physics student, yet already building production-quality full-stack software.

### Stat Cards (CountUp values)

| Stat | Value | Label |
|---|---|---|
| Experience | 11 | Months Building |
| Stack Size | 25+ | Technologies |
| Mindset | 1 | Physics Brain |

> Note: Do not use "years of experience" — 11 months is the honest, impressive number. Frame it as momentum, not a gap.

### Hero RotatingText — Roles to Cycle Through

1. "Full-Stack Developer"
2. "Physics Student"
3. "Open Source Builder"
4. "16 & Shipping"

### CircularText (around profile photo)

`ADEKOLA MANASSEH • FULL-STACK DEV • UNILAG •`

### SEO / Metadata

```tsx
title: "Adekola Manasseh — Full-Stack Developer",
description: "16-year-old Physics student at Unilag building full-stack web apps with React, Next.js, Node.js and more.",
url: "https://adekola.dev", // update with real domain
```

---

---

## 1. Project Overview

Build a **single-page React application** (Next.js 14+ App Router, TypeScript, Tailwind CSS) that serves as a personal developer portfolio. The visual language should feel like a premium creative studio built it — dark, precise, animated, alive. Every interaction should feel intentional. Every pixel should earn its place.

This portfolio must make recruiters and developers say "how did they do that?"

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + CSS custom properties |
| Animations | Framer Motion + React Bits components |
| 3D Effects | Three.js (via React Three Fiber where needed) |
| Icons | Lucide React |
| Fonts | Geist (headings) + JetBrains Mono (code/accents) |
| Deployment | Vercel |

---

## 3. React Bits Animations — Required Components

Pull all of these directly from **[reactbits.dev](https://reactbits.dev)**. Install via:
```bash
npx shadcn@latest add @react-bits/<ComponentName>-TS-TW
```

### 3.1 Text Animations (use on headings, hero copy, section intros)

| Component | Where to Use |
|---|---|
| **BlurText** | Hero name reveal on load — blur-in each word |
| **SplitText** | Tagline / role title — split by word, stagger in |
| **GradientText** | Accent phrases, skill labels, highlighted words |
| **DecryptedText** | "Currently available for work" status badge — decrypt effect on hover |
| **FuzzyText** | Section number labels (01, 02, 03) — glitch aesthetic |
| **CountUp** | Stats section: years of experience, projects shipped, GitHub stars |
| **CircularText** | Decorative circular badge around profile photo or CTA button |
| **ShinyText** | CTA button text ("View My Work", "Download CV") |
| **RotatingText** | Hero subtitle cycling through roles: "Frontend Engineer", "OSS Contributor", "Systems Thinker" |

### 3.2 Backgrounds (use per section, not all at once)

| Component | Where to Use |
|---|---|
| **Aurora** | Hero section full-screen background — slow, deep purple/teal palette |
| **Beams** | About section background — subtle light beams |
| **Particles** | Skills section — floating dot field, low opacity |
| **Dot Field** | Footer / contact section background |
| **Grain** (Grainient) | Project cards texture overlay for depth |

> ⚠️ Use only ONE background component per section. Do not stack them. Reduce opacity to ~15–30% so content stays readable.

### 3.3 Animations / Interactive

| Component | Where to Use |
|---|---|
| **SplashCursor** | Global — replaces default cursor with a fluid ink-splash trail |
| **Magnet** | Social links and CTA buttons — pull toward cursor on hover |
| **BlobCursor** | Alternative to SplashCursor — use on mobile fallback |
| **Ballpit** | Easter egg — trigger on a hidden click (e.g., clicking the logo 3x) |
| **Pixel Trail** | Hero section — subtle pixel trail following mouse |
| **Magic Rings** | Decorative element on the hero or about section |
| **Antigravity** | Skills icons float with antigravity physics on hover |

### 3.4 UI Components

| Component | Where to Use |
|---|---|
| **Animated List** | Tech stack / skills rendered as an animated stacking list |
| **Orbit Images** | Tech logos orbiting a central element in the skills section |
| **Metallic Paint** | Decorative divider or background panel accent |
| **Ribbons** | Decorative side accents on the projects section |
| **Spotlight** | Project cards — spotlight effect follows cursor within card bounds |
| **Tilt Card** | Project cards — 3D perspective tilt on hover |
| **Glass Icons** | Social media links rendered as frosted glass icon buttons |
| **Dock** | Fixed bottom navigation dock (macOS-style) for section links |

---

## 4. Sections & Detailed Requirements

### 4.1 — Hero Section

**Purpose:** First impression. Must stop the scroll.

**Layout:**
- Full viewport height (`100vh`)
- Name **"Adekola Manasseh"** in massive type (clamp 64px–120px), using **BlurText** on load
- Subtitle with **RotatingText** cycling through: "Full-Stack Developer" → "Physics Student" → "Open Source Builder" → "16 & Shipping" (600ms interval, smooth crossfade)
- One-liner bio: *"Building full-stack software from Lagos, one shipped project at a time."*
- Two CTAs: "See My Work" (scroll to projects) and "Get In Touch" (scroll to contact) — both use **Magnet** and **ShinyText**
- **Aurora** background, palette: deep indigo → violet → midnight blue
- **SplashCursor** active globally from this point
- Animated scroll indicator (bouncing chevron, fade out on scroll)
- Subtle grid overlay (1px lines, 3% opacity) for depth

**Behavior:**
- On load: Background fades in first (300ms), then name BlurText plays, then subtitle, then bio, then CTAs (each staggered 150ms)
- All elements use `will-change: transform` for GPU acceleration

---

### 4.2 — About Section

**Purpose:** Personality + credibility.

**Layout:**
- Two-column: left = text, right = profile photo + **CircularText** badge
- Headline: "Who I Am" (FuzzyText label "02" beside it)
- Bio written in first person using the narrative from Section 0. Key beats to hit:
  - 16 years old, Physics student at Unilag
  - 11 months of building real full-stack software
  - Loves the intersection of analytical thinking (Physics) and creation (code)
  - Available for projects, collaborations, internships
- **Beams** background, low opacity
- Three stat cards below bio using **CountUp** (values from Section 0):
  - "11" → "Months Building"
  - "25+" → "Technologies"
  - "∞" → "Things to Build" (no CountUp on this one — just render it with a pulse animation)
- Each stat card has a subtle border-glow on hover

**Photo treatment:**
- Circular crop, border-gradient (matches Aurora palette)
- **CircularText** rotating around it: `ADEKOLA MANASSEH • FULL-STACK DEV • UNILAG •`
- Subtle hover: photo desaturates → resaturates on hover

---

### 4.3 — Skills / Tech Stack Section

**Purpose:** Show range without being a Wikipedia list.

**Layout:**
- Headline: "My Toolkit" (SplitText entrance)
- **Particles** background
- Two display modes shown simultaneously:
  1. **Orbit Images** — core technologies orbit a central "A" (Adekola) node
  2. **Animated List** — secondary tools stacking in from the right
- Skills grouped exactly as below, each group label using **GradientText**
- Hover on any skill: **Antigravity** float + tooltip

**Adekola's Actual Tech Stack — populate the data file with exactly this:**

```ts
// data/skills.ts

export const skills = {
  languages: [
    "JavaScript", "TypeScript", "HTML", "CSS", "SQL"
  ],
  frameworks: [
    "React", "Next.js", "Tailwind CSS", "Bootstrap",
    "Express.js", "Node.js", "FastAPI"
  ],
  databases: [
    "PostgreSQL", "MySQL", "Supabase", "SQLite",
    "Better-SQLite3"
  ],
  cloudDevOps: [
    "Vercel", "GitHub Actions", "Render"
  ],
  other: [
    "REST API", "GraphQL", "JWT", "Git"
  ]
};
```

**Orbit Images (core 8 — the ones that go in the orbit ring):**
React, Next.js, TypeScript, Node.js, PostgreSQL, Tailwind CSS, Express.js, Supabase

**Animated List (secondary — stacks in from right):**
FastAPI, MySQL, SQLite, Better-SQLite3, GitHub Actions, Vercel, Render, GraphQL, JWT, Bootstrap

---

### 4.4 — Projects Section

**Purpose:** The proof. This section wins or loses the hire.

**Layout:**
- Headline: "Things I've Built" (BlurText, word by word)
- **Ribbons** decorative element on the right edge
- 3–4 featured projects in a responsive grid (2-col desktop, 1-col mobile)
- Below: "More on GitHub" link with animated arrow

**Per Project Card:**
- **Tilt Card** (3D tilt on hover, max 15deg)
- **Spotlight** effect (cursor-following light inside card bounds)
- **Grainient** texture overlay (adds film grain depth)
- Top: project screenshot or custom abstract illustration
- Body: name (bold), one-line description, tech stack pills
- Footer: Live Demo link + GitHub link (both use Lucide icons)
- On hover: card lifts (`translateY(-8px)`), border brightens

**Filtering:**
- Category filters at top: All / Frontend / Full-Stack / Open Source
- Filter transitions: items scale down and fade when hiding, scale up on show (Framer Motion `AnimatePresence`)

---

### 4.5 — Experience / Timeline Section

**Purpose:** Show the trajectory — 11 months, real work done, momentum building.

**Important framing note for the AI:** Adekola has 11 months of experience and is 16. He likely does not have traditional employment history. This section should be reframed as **"My Journey"** — a timeline of milestones, not job titles.

**Suggested timeline entries (AI should populate with real data if provided, otherwise use these as structural placeholders):**

```
[Most Recent] — First Full-Stack App Shipped
Built and deployed a complete web application with auth, database, and live frontend.
Stack: Next.js, PostgreSQL, Express.js, Vercel

[Month ~6] — Went Full-Stack
Expanded from frontend-only to building REST APIs and database-backed apps.
Learned: Node.js, Express, PostgreSQL, JWT auth

[Month ~3] — Discovered TypeScript
Migrated first project from JavaScript to TypeScript. Never looked back.

[Month 1] — Wrote First Line of Code
Started with HTML/CSS. Within weeks, building interactive UIs with React.
```

**Layout:**
- Vertical timeline, left-aligned connector line (gradient from top to bottom, matches brand palette)
- Each entry: milestone icon, title, timeframe, 1–2 line description, tech pills
- Entrance: each entry slides in from left with staggered delay as it enters viewport
- Use Framer Motion `useInView` for scroll-triggered entrance
- At the bottom: a pulsing dot labeled **"Present — still building"**

---

### 4.6 — Contact Section

**Purpose:** Make it embarrassingly easy to reach out.

**Layout:**
- Full-width, dark panel
- Headline: "Let's Build Something" (**ShinyText** treatment)
- **Dot Field** background
- Two options side by side:
  1. Email address (click to copy, with animated "Copied!" toast confirmation)
  2. Calendar booking link (e.g., Cal.com)
- Below: social links row using **Glass Icons** (GitHub, LinkedIn, Twitter/X, Resume PDF)
- All social icons use **Magnet** pull effect
- Footer: "Designed & Built by Adekola Manasseh • 2025" with a subtle heartbeat animation on the "•"

---

### 4.7 — Global Navigation

**Layout:** Fixed **Dock** component at the bottom center of the screen (macOS-style)

**Items:**
- Home (house icon)
- About (person icon)
- Work (briefcase icon)
- Contact (mail icon)

**Behavior:**
- Dock items magnify on hover (React Bits Dock default behavior)
- Active section item glows
- On mobile: dock becomes a bottom tab bar, no magnification
- Hides on scroll down, reappears on scroll up

---

## 5. Design System

### Color Palette

```css
--background:     #080810;   /* Near-black with blue undertone */
--surface:        #0f0f1a;   /* Card backgrounds */
--surface-raised: #16162a;   /* Elevated cards */
--border:         #1e1e3a;   /* Subtle borders */
--accent-primary: #7c3aed;   /* Violet — primary brand color */
--accent-secondary:#06b6d4;  /* Cyan — secondary accent */
--accent-glow:    #a855f7;   /* Lighter violet for glows */
--text-primary:   #f1f0ff;   /* Near-white with cool tint */
--text-secondary: #8b8aad;   /* Muted text */
--text-muted:     #4a4a6a;   /* Very muted, decorative use only */
--success:        #10b981;   /* Available status, success states */
```

### Typography

```css
--font-heading: 'Geist', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', 'Fira Code', monospace;

/* Scale */
--text-xs:   0.75rem;
--text-sm:   0.875rem;
--text-base: 1rem;
--text-lg:   1.125rem;
--text-xl:   1.25rem;
--text-2xl:  1.5rem;
--text-4xl:  2.25rem;
--text-6xl:  3.75rem;
--text-8xl:  6rem;
```

### Spacing & Layout

- Max content width: `1200px`
- Section padding: `120px 0` (desktop), `80px 0` (mobile)
- Horizontal padding: `clamp(24px, 5vw, 80px)`
- Border radius: `12px` (cards), `8px` (small elements), `9999px` (pills)

### Motion Design Principles

1. **Entrance animations**: Elements enter once, from a resting state. No loops on primary content.
2. **Easing**: Use `ease-out` for entrances, `ease-in-out` for transitions. Never use linear.
3. **Duration**: 200ms (micro), 400ms (standard), 600ms (complex), 1000ms+ (hero/background only).
4. **Reduced motion**: All animations must respect `prefers-reduced-motion`. Wrap Framer Motion with a custom hook that disables motion when the OS preference is set.
5. **Performance**: Never animate `width`, `height`, or `margin`. Only animate `transform` and `opacity`.

---

## 6. Interactivity Requirements

| Interaction | Behavior |
|---|---|
| Scroll to section | Smooth scroll with 80px offset (for dock) |
| Copy email | Click → clipboard copy → animated toast "Copied!" for 2s |
| Project card hover | Tilt + Spotlight + lift simultaneously |
| Social links | Magnet pull toward cursor, glass shimmer on hover |
| Nav dock | Magnification on hover, active state glow |
| Skills hover | Antigravity float, tooltip slides in |
| Hero cursor | SplashCursor fluid ink trail follows mouse |
| Easter egg | Click logo 3x → Ballpit physics takes over screen for 5s |

---

## 7. Performance Requirements

- **Lighthouse score:** 95+ on Performance, 100 on Accessibility, 100 on Best Practices
- **LCP:** < 2.5s
- **CLS:** < 0.1
- **FID/INP:** < 100ms
- **Bundle size:** < 300kb initial JS (code-split by section)
- All images: WebP format, lazy loaded with blur placeholder
- React Bits components: lazy loaded with `dynamic(() => import(...), { ssr: false })` in Next.js
- No layout shift from fonts: use `font-display: swap` + preload

---

## 8. Responsiveness

| Breakpoint | Layout Changes |
|---|---|
| Mobile (< 640px) | Single column, dock becomes tab bar, no Tilt/Spotlight on cards, Ballpit disabled |
| Tablet (640–1024px) | Two-column hero, single-col projects |
| Desktop (> 1024px) | Full layout as designed |
| Wide (> 1440px) | Content locked to max-width, backgrounds extend full width |

**Touch devices:** Disable `SplashCursor`, `Magnet`, `Spotlight`, and `Tilt Card` on touch devices (detect via `'ontouchstart' in window`). Fall back to opacity-only hover states.

---

## 9. Accessibility

- All interactive elements: minimum 44×44px touch target
- All images: descriptive `alt` text
- Focus indicators: custom `outline: 2px solid var(--accent-primary)` with `2px offset`
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- Semantic HTML: `<section>`, `<nav>`, `<main>`, `<article>` used correctly
- ARIA labels on icon-only buttons
- `prefers-reduced-motion`: disables all animations, keeps layout intact

---

## 10. File Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page, section composition
│   └── globals.css         # CSS variables, base styles
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Dock.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── StatCard.tsx
│   │   └── Toast.tsx
│   └── react-bits/         # All React Bits components live here
├── data/
│   ├── projects.ts         # Project data (title, desc, stack, links, image)
│   ├── skills.ts           # Skills grouped by category
│   └── experience.ts       # Work history
├── hooks/
│   ├── useReducedMotion.ts # Respects prefers-reduced-motion
│   └── useScrollSpy.ts    # Tracks active nav section
├── lib/
│   └── utils.ts
└── public/
    ├── og-image.png        # 1200×630 Open Graph image
    └── assets/
```

---

## 11. SEO & Metadata

```tsx
// app/layout.tsx
export const metadata = {
  title: "Adekola Manasseh — Full-Stack Developer",
  description: "16-year-old Physics student at Unilag building full-stack web apps with React, Next.js, Node.js and more.",
  openGraph: {
    title: "Adekola Manasseh — Full-Stack Developer",
    description: "16-year-old Physics student at Unilag building full-stack web apps with React, Next.js, Node.js and more.",
    image: "/og-image.png",
    url: "https://adekola.dev", // update with real domain
  },
  twitter: { card: "summary_large_image" },
  robots: "index, follow",
};
```

---

## 12. Implementation Order

Build in this order to catch design issues early:

1. **Foundation**: Set up Next.js, Tailwind config, CSS variables, fonts
2. **Global**: Add SplashCursor and Dock (present on all sections)
3. **Hero**: Build and perfect this first — it sets the tone for everything
4. **Projects**: Most important content section, build second
5. **About**: Add personality and stats
6. **Skills**: Add the Orbit and Animated List
7. **Experience**: Quick win, mostly layout
8. **Contact**: Final section, polish the CTAs
9. **Polish pass**: Add all micro-interactions, test all React Bits components
10. **Performance pass**: Lighthouse audit, lazy loading, image optimization
11. **Accessibility pass**: Screen reader test, keyboard nav, reduced motion

---

## 13. Quality Bar

Before shipping, every item on this list must be true:

- [ ] SplashCursor works smoothly at 60fps with no jank
- [ ] Hero BlurText plays on first load, not on every visit (use sessionStorage flag)
- [ ] All React Bits components fall back gracefully if JS is slow
- [ ] Project cards tilt correctly on all desktop browsers
- [ ] Dock highlights the correct section while scrolling
- [ ] Email copy works on Safari (use `navigator.clipboard` with fallback)
- [ ] No horizontal scroll on any viewport
- [ ] All external links open in `_blank` with `rel="noopener noreferrer"`
- [ ] Dark mode is the only mode (no toggle needed — it IS the design)
- [ ] Easter egg (Ballpit) works and is discoverable

---

*This PRD is a living document. Treat it as the source of truth for all implementation decisions. When in doubt: make it more impressive, not less.*
