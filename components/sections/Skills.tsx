"use client";

import { motion } from "framer-motion";
import {
  skills,
  skillCategoryLabels,
  type SkillCategory,
  coreSkills,
  skillIcons,
  topSkillsData,
} from "@/data/skills";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";
import RadarAnimation from "@/components/ui/RadarAnimation";

// ─── Particles ────────────────────────────────────────────────────────────────
function ParticlesBackground() {
  const dots = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        dur: Math.random() * 15 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-[var(--accent-primary)]"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            opacity: 0.1,
          }}
          animate={{ y: [0, -25, 0], opacity: [0.06, 0.18, 0.06] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <line x1="10%" y1="20%" x2="40%" y2="60%" stroke="var(--accent-primary)" strokeWidth="1" />
        <line x1="60%" y1="15%" x2="30%" y2="80%" stroke="var(--accent-primary)" strokeWidth="1" />
        <line x1="80%" y1="30%" x2="50%" y2="90%" stroke="var(--accent-primary)" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ─── Orbit chip ───────────────────────────────────────────────────────────────
function OrbitChip({ skill }: { skill: string }) {
  return (
    <motion.div
      className="relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl cursor-default whitespace-nowrap"
      style={{
        background: "linear-gradient(135deg, rgba(0,18,9,0.88) 0%, rgba(0,8,4,0.92) 100%)",
        border: "1px solid rgba(0,255,136,0.22)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
        backdropFilter: "blur(14px)",
      }}
      whileHover={{
        scale: 1.18,
        y: -5,
        border: "1px solid rgba(0,255,136,0.65)",
        boxShadow: "0 0 28px rgba(0,255,136,0.28), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="absolute top-0 left-3 right-3 h-[1px] rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.25), transparent)" }}
      />
      <div className="w-6 h-6 rounded-md flex items-center justify-center text-sm flex-shrink-0"
        style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.22)" }}
      >
        {skillIcons[skill] || "⚡"}
      </div>
      <span className="text-[11px] font-mono font-semibold text-[var(--accent-primary)] tracking-wide">{skill}</span>
    </motion.div>
  );
}

// ─── Orbit ring ───────────────────────────────────────────────────────────────
function OrbitRing() {
  const innerSkills = coreSkills.slice(0, 4);
  const outerSkills = coreSkills.slice(4);

  return (
    <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[rgba(0,255,136,0.2)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-12 md:inset-16 rounded-full border-2 border-[rgba(0,255,136,0.25)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-24 md:inset-32 rounded-full border-2 border-[rgba(0,255,136,0.15)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-[rgba(0,255,136,0.04)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--surface)] border-2 border-[var(--accent-primary)] flex items-center justify-center z-10 relative"
          animate={{ boxShadow: ["0 0 20px rgba(0,255,136,0.2)", "0 0 40px rgba(0,255,136,0.4)", "0 0 20px rgba(0,255,136,0.2)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-2xl md:text-3xl font-bold gradient-text">A</span>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {innerSkills.map((skill, i) => {
          const angle = ((360 / innerSkills.length) * i * Math.PI) / 180;
          const radius = 32;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <motion.div key={skill} className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent-primary)] pointer-events-none z-20"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
              <OrbitChip skill={skill} />
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {outerSkills.map((skill, i) => {
          const angle = ((360 / outerSkills.length) * i * Math.PI) / 180;
          const radius = 46;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <motion.div key={skill} className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent-primary)] pointer-events-none z-20"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
              <OrbitChip skill={skill} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// (RadarTooltip removed — replaced by WebGL RadarAnimation)

// ─── Custom bar tooltip ────────────────────────────────────────────────────────
function BarTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (!active || !payload?.length) return null;
  const { name, level, icon } = payload[0].payload;
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(0,18,9,0.95) 0%, rgba(0,8,4,0.98) 100%)",
      border: "1px solid rgba(0,255,136,0.35)",
      borderRadius: 12,
      padding: "10px 16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.7), 0 0 20px rgba(0,255,136,0.1)",
      backdropFilter: "blur(16px)",
    }}>
      <p style={{ color: "rgba(0,255,136,0.7)", fontSize: 10, fontFamily: "monospace", marginBottom: 4, letterSpacing: "0.08em" }}>
        {icon} {name.toUpperCase()}
      </p>
      <p style={{ color: "#00ff88", fontSize: 22, fontWeight: 700, margin: 0 }}>
        {level}<span style={{ fontSize: 12, opacity: 0.6 }}>%</span>
      </p>
    </div>
  );
}

// ─── Glassmorphic chart card wrapper ──────────────────────────────────────────
function ChartCard({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl p-6"
      style={{
        background: "linear-gradient(135deg, rgba(0,18,9,0.7) 0%, rgba(0,6,3,0.85) 100%)",
        border: "1px solid rgba(0,255,136,0.15)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top shimmer edge */}
      <div className="absolute top-0 left-6 right-6 h-[1px] rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)" }}
      />
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)" }}
      />

      <div className="mb-4">
        <p className="text-[10px] font-mono text-[var(--accent-primary)] opacity-60 uppercase tracking-widest mb-1">{subtitle}</p>
        <h4 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h4>
      </div>
      {children}
    </motion.div>
  );
}

// ─── Main skill chart section ─────────────────────────────────────────────────
function SkillCharts() {
  const [activeBar, setActiveBar] = useState<number | null>(null);

  // Gradient stops for bars
  const barColors = topSkillsData.map((_, i) => {
    const opacity = 0.55 + (i % 3) * 0.15;
    return `rgba(0,255,136,${opacity})`;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ── WebGL Radar animation ── */}
      <ChartCard title="Knowledge Radar" subtitle="Live scan">
        <div className="h-[260px] rounded-xl overflow-hidden">
          <RadarAnimation
            color="#00ff88"
            backgroundColor="#000000"
            speed={0.6}
            scale={0.55}
            ringCount={8}
            spokeCount={8}
            ringThickness={0.04}
            spokeThickness={0.012}
            sweepSpeed={0.9}
            sweepWidth={2.5}
            sweepLobes={1}
            falloff={1.8}
            brightness={1.1}
            enableMouseInteraction={true}
            mouseInfluence={0.08}
          />
        </div>
      </ChartCard>

      {/* ── Horizontal bar chart ── */}
      <ChartCard title="Top Skills Proficiency" subtitle="Skill breakdown">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topSkillsData}
              layout="vertical"
              margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
              barCategoryGap="22%"
            >
              <defs>
                {topSkillsData.map((_, i) => (
                  <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#00cc6a" stopOpacity={0.5} />
                  </linearGradient>
                ))}
                <filter id="barGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "rgba(0,255,136,0.4)", fontSize: 9, fontFamily: "monospace" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={72}
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(0,255,136,0.04)" }} />
              <Bar
                dataKey="level"
                radius={[0, 6, 6, 0]}
                filter="url(#barGlow)"
                onMouseEnter={(_, index) => setActiveBar(index)}
                onMouseLeave={() => setActiveBar(null)}
              >
                {topSkillsData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={`url(#barGrad${i})`}
                    opacity={activeBar === null || activeBar === i ? 1 : 0.45}
                    style={{ transition: "opacity 0.2s" }}
                  />
                ))}
                <LabelList
                  dataKey="level"
                  position="right"
                  formatter={(v: unknown) => `${v}%`}
                  style={{
                    fill: "rgba(0,255,136,0.7)",
                    fontSize: 10,
                    fontFamily: "monospace",
                    fontWeight: 600,
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

// ─── Category meta (accent colours + decorative icon per category) ────────────
const categoryMeta: Record<SkillCategory, { accent: string; glow: string; bg: string; icon: string; colSpan: string }> = {
  languages:  { accent: "#38bdf8", glow: "rgba(56,189,248,0.15)",  bg: "rgba(56,189,248,0.04)",  icon: "{ }", colSpan: "" },
  frameworks: { accent: "#00ff88", glow: "rgba(0,255,136,0.15)",   bg: "rgba(0,255,136,0.04)",   icon: "⚛",   colSpan: "md:col-span-2" },
  databases:  { accent: "#c084fc", glow: "rgba(192,132,252,0.15)", bg: "rgba(192,132,252,0.04)", icon: "◈",   colSpan: "" },
  cloudDevOps:{ accent: "#fb923c", glow: "rgba(251,146,60,0.15)",  bg: "rgba(251,146,60,0.04)",  icon: "⚙",   colSpan: "" },
  other:      { accent: "#f472b6", glow: "rgba(244,114,182,0.15)", bg: "rgba(244,114,182,0.04)", icon: "✦",   colSpan: "" },
};

// ─── Exported section ─────────────────────────────────────────────────────────
export function Skills() {
  const categories = Object.keys(skills) as SkillCategory[];

  return (
    <section id="skills" className="relative py-[var(--section-padding)] overflow-hidden">
      <ParticlesBackground />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span className="section-label" whileHover={{ scale: 1.1 }}>03</motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">My Toolkit</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--border)] to-transparent ml-4" />
        </motion.div>

        {/* ── Top row: Charts side by side ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SkillCharts />
        </motion.div>

        {/* ── Bottom row: bento grid of category cards ── */}
        <div>
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono text-[var(--accent-primary)] opacity-50 uppercase tracking-[0.2em]">Full Stack Arsenal</span>
            <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(0,255,136,0.2), transparent)" }} />
            <span className="text-[10px] font-mono opacity-30 text-[var(--text-muted)]">{categories.reduce((acc, c) => acc + skills[c].length, 0)} skills</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, catIndex) => {
              const meta = categoryMeta[category];
              const skillList = skills[category];
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                  className={`relative rounded-2xl p-5 overflow-hidden group ${meta.colSpan}`}
                  style={{
                    background: `linear-gradient(135deg, ${meta.bg} 0%, rgba(0,6,3,0.85) 100%)`,
                    border: `1px solid rgba(${meta.accent === "#00ff88" ? "0,255,136" : meta.accent === "#38bdf8" ? "56,189,248" : meta.accent === "#c084fc" ? "192,132,252" : meta.accent === "#fb923c" ? "251,146,60" : "244,114,182"},0.18)`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)",
                    backdropFilter: "blur(16px)",
                  }}
                  whileHover={{ boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${meta.accent}33, inset 0 1px 0 rgba(255,255,255,0.05)` }}
                >
                  {/* Top shimmer */}
                  <div className="absolute top-0 left-4 right-4 h-[1px] rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${meta.accent}55, transparent)` }}
                  />

                  {/* Decorative large icon */}
                  <div
                    className="absolute bottom-3 right-4 text-6xl font-black select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ color: meta.accent, opacity: 0.07, fontFamily: "monospace", lineHeight: 1 }}
                  >
                    {meta.icon}
                  </div>

                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${meta.glow} 0%, transparent 70%)` }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-[0.18em] mb-1" style={{ color: meta.accent, opacity: 0.7 }}>Category</p>
                      <h3 className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight">
                        {skillCategoryLabels[category]}
                      </h3>
                    </div>
                    {/* Count badge */}
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold font-mono ml-2"
                      style={{
                        background: `${meta.accent}18`,
                        border: `1px solid ${meta.accent}40`,
                        color: meta.accent,
                      }}
                    >
                      {skillList.length}
                    </div>
                  </div>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {skillList.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: catIndex * 0.06 + skillIndex * 0.035 }}
                        whileHover={{ y: -3, scale: 1.07 }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg cursor-default"
                        style={{
                          background: `${meta.accent}0d`,
                          border: `1px solid ${meta.accent}28`,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                        onHoverStart={(e) => {
                          (e.target as HTMLElement).style.borderColor = `${meta.accent}70`;
                          (e.target as HTMLElement).style.boxShadow = `0 0 12px ${meta.accent}22, 0 4px 12px rgba(0,0,0,0.4)`;
                        }}
                        onHoverEnd={(e) => {
                          (e.target as HTMLElement).style.borderColor = `${meta.accent}28`;
                          (e.target as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
                        }}
                      >
                        <span className="text-[10px]" style={{ color: meta.accent, opacity: 0.8 }}>
                          {skillIcons[skill] || "•"}
                        </span>
                        <span className="text-[11px] font-mono font-medium text-[var(--text-primary)]">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
