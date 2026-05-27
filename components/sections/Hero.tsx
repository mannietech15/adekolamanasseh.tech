"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import TextType from "@/components/ui/TextType";
import ShinyText from "@/components/ui/ShinyText";
import { GlassmorphicOrb } from "@/components/ui/GlassmorphicOrb";

const roles = [
  "Full-Stack Developer",
  "Physics Student",
  "Open Source Builder",
  "16 & Shipping",
];

// Cinematic Aurora background
function AuroraBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main aurora blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,136,0.25), rgba(0,204,106,0.08), transparent 70%)",
            filter: "blur(120px)",
            top: "-30%",
            left: "-15%",
          }}
          animate={{
            x: [0, 120, -60, 0],
            y: [0, -60, 60, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,213,0.18), rgba(0,255,136,0.04), transparent 70%)",
            filter: "blur(100px)",
            top: "15%",
            right: "-20%",
          }}
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 70, -40, 0],
            scale: [1, 0.85, 1.12, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(170,255,0,0.12), transparent 70%)",
            filter: "blur(100px)",
            bottom: "5%",
            left: "25%",
          }}
          animate={{
            x: [0, 70, -90, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--accent-primary)]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.12,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,255,136,0.08)] to-transparent"
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Decorative code snippet in background */}
      <div className="absolute right-[5%] top-[15%] opacity-20 font-mono text-sm text-[var(--accent-primary)] pointer-events-none select-none hidden lg:block">
        <pre>{`const developer = {
  name: "Adekola Manasseh",
  age: 16,
  stack: ["React", "Next.js",
          "Node.js", "PostgreSQL"],
  passion: Infinity,
};

while (developer.passion) {
  buildSomethingAmazing();
  ship();
}`}</pre>
      </div>
    </div>
  );
}

// BlurText effect for name — word-by-word for more drama
function BlurTextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(24px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Rotating text for roles
function RotatingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative h-[1.6em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-x-0 text-[var(--accent-primary)] font-mono whitespace-nowrap text-center"
        >
          {"{ "}{items[index]}{" }"}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Decrypted text effect for status badge
function DecryptedText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= text.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-default"
    >
      {displayText}
    </span>
  );
}

export function Hero() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <AuroraBackground />

      {/* Glassmorphic orb — ambient depth element, behind hero text */}
      <GlassmorphicOrb />

      {/* Main content */}
      <div className="relative z-10 section-container w-full">
        {showContent && (
          <div className="flex flex-col items-center gap-6 text-center px-4">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass text-sm cursor-default"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [1, 0.6, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(0,255,136,0.4)",
                    "0 0 0 6px rgba(0,255,136,0)",
                    "0 0 0 0 rgba(0,255,136,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                style={{ fontFamily: "var(--font-great-vibes)" }}
                className="text-[var(--accent-primary)] text-2xl font-bold leading-none tracking-wide"
              >
                <DecryptedText text="...available for work." />
              </span>
            </motion.div>

            {/* Name — separate lines with flex to prevent cut-off */}
            <div className="w-full pb-4">
              <h1 className="font-bold leading-[1.1] tracking-tight flex flex-col items-center justify-center gap-2">
                {/* Static prefix + typed variable ending */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="text-[clamp(2rem,5vw,4.5rem)] h-[2.8em] flex flex-wrap items-center justify-center text-center gap-x-[0.3em]"
                >
                  <span style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em" }}>
                    <ShinyText
                      text="Fullstack developer building"
                      color="#e2e8f0"
                      shineColor="#00ff88"
                      speed={3}
                      spread={110}
                      direction="left"
                      className="font-extrabold whitespace-nowrap"
                    />
                  </span>
                  <TextType
                    text={[
                      "scalable solutions.",
                      "robust APIs.",
                      "seamless UIs.",
                      "end-to-end apps.",
                      "production-grade systems.",
                    ]}
                    typingSpeed={55}
                    deletingSpeed={25}
                    pauseDuration={1800}
                    showCursor={true}
                    cursorCharacter="|"
                    textColors={["#00ff88","#00ff88","#00ff88","#00ff88","#00ff88"]}
                    cursorClassName="text-[var(--accent-primary)]"
                    className="font-extrabold"
                    style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em" } as React.CSSProperties}
                  />
                </motion.div>
                <BlurTextReveal
                  text="Manasseh"
                  className="block text-[clamp(2.8rem,8vw,7.5rem)] gradient-text"
                  delay={0.7}
                />
              </h1>
            </div>

            {/* Rotating subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
              className="text-xl md:text-2xl font-medium w-full max-w-md"
            >
              <RotatingText items={roles} />
            </motion.div>

            {/* Bio line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
              className="text-[var(--text-secondary)] text-base md:text-lg max-w-xl leading-relaxed"
            >
              Building full-stack software from Lagos, one shipped project at a
              time.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.1, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="shimmer-btn relative px-8 py-4 rounded-full bg-[var(--accent-primary)] text-[var(--background)] font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden group"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 40px rgba(0,255,136,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">See My Work</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 rounded-full border border-[var(--border)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,255,136,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.span
          className="text-[var(--text-muted)] font-mono text-[10px] tracking-[0.2em] uppercase"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="text-[var(--accent-primary)] opacity-40"
            size={20}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
