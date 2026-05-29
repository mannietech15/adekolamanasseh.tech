"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { id: "hero",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Work" },
  { id: "experience", label: "Journey" },
  { id: "contact",    label: "Contact" },
];

export function TopNav() {
  const activeSectionSpy = useScrollSpy();
  const pathname = usePathname();
  const router = useRouter();
  
  const activeSection = pathname === "/" ? activeSectionSpy : (pathname.startsWith("/projects") ? "projects" : "");

  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    if (y > 20) setMenuOpen(false); // close menu when user scrolls
  });

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (pathname !== "/") {
      router.push(id === "hero" ? "/" : `/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const glassStyle = {
    background:  scrolled ? "rgba(8,10,8,0.22)" : "rgba(8,10,8,0.12)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderColor: scrolled ? "rgba(0,255,136,0.14)" : "rgba(255,255,255,0.07)",
    boxShadow:   scrolled
      ? "0 2px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,255,136,0.04) inset"
      : "0 2px 16px rgba(0,0,0,0.12)",
  };

  return (
    <motion.header
      className="fixed top-4 inset-x-0 z-[9998] flex justify-center pointer-events-none px-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Desktop nav (md+) ── */}
      <nav
        className="pointer-events-auto hidden md:flex items-center gap-1 px-10 py-2.5 rounded-full border transition-all duration-500 max-w-[860px] w-[72vw]"
        style={glassStyle}
        aria-label="Primary navigation"
      >
        <button
          onClick={() => scrollTo("hero")}
          className="mr-4 font-semibold text-sm text-[var(--text-primary)] tracking-wide hover:text-[var(--accent-primary)] transition-colors duration-300 whitespace-nowrap"
          aria-label="Go to top"
        >
          Adekola<span className="text-[var(--accent-primary)] ml-1">Manasseh</span>
        </button>

        <div className="w-px h-4 bg-[var(--border)] mr-2 opacity-60" />

        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              style={{ color: isActive ? "var(--accent-primary)" : "var(--text-secondary)" }}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="topnav-active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.22)",
                    boxShadow: "0 0 12px rgba(0,255,136,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Mobile nav (< md) ── */}
      <div className="pointer-events-auto flex md:hidden w-full flex-col items-end">
        {/* Mobile top bar */}
        <div
          className="flex items-center justify-between w-full px-5 py-3 rounded-2xl border transition-all duration-500"
          style={glassStyle}
        >
          <button
            onClick={() => scrollTo("hero")}
            className="font-semibold text-sm text-[var(--text-primary)] tracking-wide"
          >
            Adekola<span className="text-[var(--accent-primary)] ml-1">Manasseh</span>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2 w-full rounded-2xl border overflow-hidden"
              style={{
                background: "rgba(6,8,6,0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(0,255,136,0.14)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors duration-200 border-b last:border-b-0"
                    style={{
                      color:       isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                      borderColor: "rgba(0,255,136,0.07)",
                      background:  isActive ? "rgba(0,255,136,0.06)" : "transparent",
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
