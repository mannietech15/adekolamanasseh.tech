"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Home, User, Code2, Briefcase, Clock, Mail } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "projects", icon: Briefcase, label: "Work" },
  { id: "experience", icon: Clock, label: "Journey" },
  { id: "contact", icon: Mail, label: "Contact" },
];

// macOS-style magnifying dock item
function DockItem({
  item,
  isActive,
  mouseX,
  onClick,
}: {
  item: (typeof navItems)[number];
  isActive: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 150;
    return val - rect.x - rect.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [44, 58, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  const Icon = item.icon;

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ width, height: width }}
      className={`relative flex items-center justify-center rounded-2xl transition-colors duration-300 ${
        isActive
          ? "text-[var(--accent-primary)]"
          : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
      }`}
      whileTap={{ scale: 0.9 }}
      aria-label={`Navigate to ${item.label} section`}
      aria-current={isActive ? "true" : undefined}
    >
      {/* Active glow background */}
      {isActive && (
        <motion.div
          layoutId="dock-active-bg"
          className="absolute inset-0 rounded-2xl bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          style={{ boxShadow: "0 0 20px rgba(0,255,136,0.15)" }}
        />
      )}
      <Icon size={20} className="relative z-10" />

      {/* Active indicator dot below */}
      {isActive && (
        <motion.div
          layoutId="dock-dot"
          className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-[var(--accent-primary)]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          style={{ boxShadow: "0 0 6px rgba(0,255,136,0.6)" }}
        />
      )}

      {/* Tooltip on hover */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-[10px] font-mono text-[var(--text-secondary)] whitespace-nowrap opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
      >
        {item.label}
      </motion.div>
    </motion.button>
  );
}

export function Dock() {
  const activeSection = useScrollSpy();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    // Dock stays visible across all scroll positions as requested
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999]"
          aria-label="Main navigation"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          <div className="glass-strong rounded-2xl px-3 py-2 flex items-end gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {navItems.map((item) => (
              <DockItem
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                mouseX={mouseX}
                onClick={() => scrollTo(item.id)}
              />
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
