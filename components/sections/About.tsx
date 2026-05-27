"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StatCard, InfinityStat } from "@/components/ui/StatCard";
import ElectricBorder from "@/components/ui/ElectricBorder";

function CircularText() {
  const text = "ADEKOLA MANASSEH • FULL-STACK DEV • UNILAG • ";
  return (
    <div className="absolute inset-0">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path
            id="circle-path"
            d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
          />
        </defs>
        <text
          fill="var(--accent-primary)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="3"
          opacity="0.6"
        >
          <textPath href="#circle-path">{text}</textPath>
        </text>
      </motion.svg>
    </div>
  );
}

// Stylized avatar with coding aesthetics
function ProfileAvatar() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[var(--surface-raised)] via-[var(--surface)] to-[var(--background)] flex items-center justify-center relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hexgrid" width="50" height="43.3" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <polygon points="24.8,22 37.4,14.6 37.4,0 24.8,-7.4 12.2,0 12.2,14.6" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexgrid)" />
        </svg>
      </div>

      {/* Main avatar content */}
      <div className="relative z-10 text-center">
        {/* Stylized "A" monogram */}
        <div className="relative">
          <motion.span
            className="text-7xl font-bold gradient-text block"
            animate={{
              textShadow: [
                "0 0 20px rgba(0,255,136,0.3)",
                "0 0 40px rgba(0,255,136,0.5)",
                "0 0 20px rgba(0,255,136,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            A
          </motion.span>
          {/* Terminal-style underscore cursor */}
          <motion.span
            className="absolute -right-2 bottom-2 text-[var(--accent-primary)] font-mono text-5xl"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            _
          </motion.span>
        </div>

        {/* Code-style decorative tag */}
        <motion.div
          className="font-mono text-[10px] text-[var(--accent-dim)] mt-1 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          &lt;developer /&gt;
        </motion.div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[rgba(0,255,136,0.2)]" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[rgba(0,255,136,0.2)]" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[rgba(0,255,136,0.2)]" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[rgba(0,255,136,0.2)]" />
    </div>
  );
}

// Beams background effect
function BeamsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px]"
          style={{
            top: `${12 + i * 16}%`,
            width: "130%",
            left: "-15%",
            transform: `rotate(${-4 + i * 2}deg)`,
            background: `linear-gradient(90deg, transparent, rgba(0,255,136,${0.04 + i * 0.01}), transparent)`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            x: [-30, 30, -30],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative py-[var(--section-padding)] overflow-hidden"
    >
      <BeamsBackground />

      <div className="section-container relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span
            className="section-label"
            whileHover={{ scale: 1.1 }}
          >
            02
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
            Who I Am
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--border)] to-transparent ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              I&apos;m a{" "}
              <span className="text-[var(--accent-primary)] font-medium">
                16-year-old Physics student
              </span>{" "}
              at the University of Lagos who fell in love with building things
              for the web. Over the past{" "}
              <span className="text-[var(--accent-primary)] font-medium">
                11 months
              </span>
              , I&apos;ve taught myself full-stack development from the ground
              up — no bootcamp, no shortcuts.
            </p>

            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Physics taught me to understand systems deeply before trying to
              change them. I bring that same rigour to code:{" "}
              <span className="gradient-text-static font-medium">
                understand the problem
              </span>
              , architect the solution, then build with precision. From REST APIs
              to database-driven apps to polished frontends — I ship real
              products.
            </p>

            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              I love the intersection of{" "}
              <span className="gradient-text-static font-medium">
                analytical thinking
              </span>{" "}
              and{" "}
              <span className="gradient-text-static font-medium">creation</span>
              . While my peers are learning the basics, I&apos;m building
              production-quality software. I&apos;m not waiting to be older to
              do great work.
            </p>

            <motion.div
              className="flex items-center gap-3 pt-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(0,255,136,0.4)",
                    "0 0 0 8px rgba(0,255,136,0)",
                    "0 0 0 0 rgba(0,255,136,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[var(--accent-primary)] font-mono text-sm">
                Available for projects, collaborations & internships
              </span>
            </motion.div>
          </motion.div>

          {/* Photo column — portrait rectangle */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-[300px] h-[440px] md:w-[360px] md:h-[520px]">
              {/* Animated racing border — two white streaks, opposite directions */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 360 520"
                fill="none"
                preserveAspectRatio="none"
              >
                {(() => {
                  const W = 360, H = 520, r = 16;
                  const perimeter = 2 * (W - 2 * r) + 2 * (H - 2 * r) + 2 * Math.PI * r;
                  const lineLen = 450;
                  const gap = perimeter - lineLen;
                  const path = `M ${r} 0 L ${W - r} 0 Q ${W} 0 ${W} ${r} L ${W} ${H - r} Q ${W} ${H} ${W - r} ${H} L ${r} ${H} Q 0 ${H} 0 ${H - r} L 0 ${r} Q 0 0 ${r} 0 Z`;
                  return (
                    <>
                      {/* Streak 1 — clockwise (approaches bottom-right) */}
                      <motion.path
                        d={path}
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={`${lineLen} ${gap}`}
                        animate={{ strokeDashoffset: [0, -perimeter] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Streak 2 — counter-clockwise (approaches top-left), offset half perimeter */}
                      <motion.path
                        d={path}
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={`${lineLen} ${gap}`}
                        animate={{
                          strokeDashoffset: [-(perimeter / 2), -(perimeter / 2) - perimeter],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                    </>
                  );
                })()}
              </svg>

              {/* Inner image area */}
              <div className="absolute inset-[2px] rounded-2xl overflow-hidden">
                <Image
                  src="/mannie.png"
                  alt="Adekola Manasseh"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Subtle ambient glow */}
              <motion.div
                className="absolute -inset-4 rounded-2xl pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(255,255,255,0.04)",
                    "0 0 35px rgba(255,255,255,0.09)",
                    "0 0 15px rgba(255,255,255,0.04)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 items-stretch"
        >
          <ElectricBorder color="#00ff88" speed={0.8} chaos={0.18} borderRadius={12} className="h-full">
            <StatCard end={11} label="Months Building" icon="⚡" />
          </ElectricBorder>
          <ElectricBorder color="#00ff88" speed={0.9} chaos={0.16} borderRadius={12} className="h-full">
            <StatCard end={25} suffix="+" label="Technologies" icon="🛠" />
          </ElectricBorder>
          <ElectricBorder color="#00ff88" speed={1} chaos={0.2} borderRadius={12} className="h-full">
            <InfinityStat label="Things to Build" />
          </ElectricBorder>
        </motion.div>
      </div>
    </section>
  );
}
