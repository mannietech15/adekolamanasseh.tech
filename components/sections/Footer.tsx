"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, ChevronRight, Mail } from "lucide-react";

/* ── Brand SVG icons ─────────────────────────────────────────── */
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */
const quickLinks = [
  { label: "Home",       href: "#hero" },
  { label: "About",      href: "#about" },
  { label: "Toolkit",    href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

const connectLinks = [
  { icon: GitHubIcon,  label: "GitHub",   href: "https://github.com/mannietech15" },
  { icon: LinkedInIcon,label: "LinkedIn", href: "https://www.linkedin.com/in/adekola-manasseh-2350293ab" },
  { icon: XIcon,       label: "X (Twitter)", href: "https://x.com/MannieTech01" },
  { icon: Mail,        label: "WhatsApp / Contact", href: "#contact" },
];

const colVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.12 } }),
};

/* ── Component ───────────────────────────────────────────────── */
export function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--background)] overflow-hidden pt-20">
      {/* Subtle top-edge accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.35), transparent)" }}
      />

      {/* Faint radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,255,136,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* ── Col 1: Branding ───────────────────────────────── */}
          <motion.div
            variants={colVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            {/* Logo / name */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,204,106,0.08))",
                  border: "1px solid rgba(0,255,136,0.3)",
                  color: "var(--accent-primary)",
                }}
              >
                A
              </div>
              <span className="font-bold text-[var(--text-primary)] tracking-tight">
                Adekola Manasseh
              </span>
            </div>

            {/* Underline accent */}
            <div
              className="w-10 h-[2px] rounded-full mb-4"
              style={{ background: "var(--accent-primary)" }}
            />

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs">
              Full-Stack Developer specialising in React, Next.js, Node.js, and
              modern web technologies. Building real products from Lagos.
            </p>

            {/* Meta info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <MapPin size={14} className="text-[var(--accent-primary)] flex-shrink-0" />
                Based in Lagos, Nigeria
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Briefcase size={14} className="text-[var(--accent-primary)] flex-shrink-0" />
                Available for opportunities
              </div>
            </div>
          </motion.div>

          {/* ── Col 2: Quick Links ────────────────────────────── */}
          <motion.div
            variants={colVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              Quick Links
            </h3>
            <div
              className="w-10 h-[2px] rounded-full mb-5"
              style={{ background: "var(--accent-primary)" }}
            />

            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors duration-200"
                  >
                    <ChevronRight
                      size={13}
                      className="text-[var(--accent-primary)] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3: Connect ────────────────────────────────── */}
          <motion.div
            variants={colVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              Connect
            </h3>
            <div
              className="w-10 h-[2px] rounded-full mb-5"
              style={{ background: "var(--accent-primary)" }}
            />

            <ul className="space-y-3">
              {connectLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="group flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors duration-200 w-full text-left"
                    >
                      <span
                        className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          background: "rgba(0,255,136,0.06)",
                          border: "1px solid rgba(0,255,136,0.12)",
                        }}
                      >
                        <Icon size={14} />
                      </span>
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="mt-14 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            style={{ fontFamily: "var(--font-great-vibes)" }}
            className="text-lg text-[var(--text-muted)]"
          >
            © 2025 Adekola Manasseh. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5">
            Built with
            <span className="text-[var(--accent-primary)]">Next.js</span>
            &amp;
            <span className="text-[var(--accent-primary)]">Framer Motion</span>
            <motion.span
              className="inline-block text-[var(--accent-primary)]"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ♥
            </motion.span>
          </p>
        </div>
      </div>
    </footer>
  );
}
