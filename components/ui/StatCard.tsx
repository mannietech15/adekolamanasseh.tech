"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
  icon?: string;
}

export function StatCard({ end, suffix = "", duration = 2, label, icon }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out for satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      className="relative group h-full"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative p-6 rounded-xl bg-[var(--surface)] glow-border overflow-hidden h-full flex flex-col justify-between">
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[rgba(0,255,136,0.06)] to-transparent" />

        {/* Animated top border on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Icon — top right */}
        {icon && (
          <motion.div
            className="absolute top-4 right-4 text-2xl z-10"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            {icon}
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10">
          <div className="text-4xl md:text-5xl font-bold text-[var(--accent-primary)] text-glow font-mono tabular-nums">
            {count}
            {suffix}
          </div>
          <div className="text-sm text-[var(--text-secondary)] mt-2 font-medium">
            {label}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[rgba(0,255,136,0.06)] to-transparent rounded-bl-full" />
        </div>
      </div>
    </motion.div>
  );
}

interface InfinityStatProps {
  label: string;
}

export function InfinityStat({ label }: InfinityStatProps) {
  return (
    <motion.div
      className="relative group h-full"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative p-6 rounded-xl bg-[var(--surface)] glow-border overflow-hidden h-full flex flex-col justify-between">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[rgba(0,255,136,0.06)] to-transparent" />

        {/* Animated top border on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

        <div className="relative z-10">
          <motion.div
            className="text-4xl md:text-5xl font-bold text-[var(--accent-primary)] text-glow font-mono"
            animate={{
              scale: [1, 1.06, 1],
              textShadow: [
                "0 0 10px rgba(0,255,136,0.5)",
                "0 0 30px rgba(0,255,136,0.8)",
                "0 0 10px rgba(0,255,136,0.5)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ∞
          </motion.div>
          <div className="text-sm text-[var(--text-secondary)] mt-2 font-medium">
            {label}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[rgba(0,255,136,0.06)] to-transparent rounded-bl-full" />
        </div>
      </div>
    </motion.div>
  );
}
