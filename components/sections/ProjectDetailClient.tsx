"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Zap,
  Code2,
  Trophy,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Images,
} from "lucide-react";

interface Props {
  project: Project;
}

const statusConfig = {
  live: { label: "Live", color: "#000000", bg: "#00ff88", dot: "#000000" },
  "in-progress": { label: "In Progress", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", dot: "#fbbf24" },
  archived: { label: "Archived", color: "#8aad9a", bg: "rgba(138,173,154,0.1)", dot: "#8aad9a" },
};

function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,255,136,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function FloatingOrbs({ accentColor }: { accentColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { size: 300, x: "10%", y: "20%", delay: 0, opacity: 0.04 },
        { size: 200, x: "80%", y: "10%", delay: 1.5, opacity: 0.03 },
        { size: 150, x: "65%", y: "70%", delay: 3, opacity: 0.05 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${accentColor}${Math.round(orb.opacity * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [orb.opacity, orb.opacity * 1.5, orb.opacity] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}
    </div>
  );
}

function HeroSection({ project }: { project: Project }) {
  const status = statusConfig[project.status];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div ref={heroRef} className="relative min-h-[55vh] flex items-center overflow-hidden" style={{ opacity }}>
      <FloatingOrbs accentColor={project.accentColor} />

      {/* Gradient header backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}08 0%, transparent 60%)`,
        }}
      />

      <motion.div className="relative z-10 w-full" style={{ y }}>
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300 group"
          >
            <motion.span
              className="flex items-center"
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowLeft size={15} className="mr-2" />
            </motion.span>
            Back to Projects
          </Link>
        </motion.div>

        {/* Status + Category row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          {/* Status badge */}
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold"
            style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}30` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: status.dot,
                boxShadow: `0 0 6px ${status.dot}`,
                animation: project.status === "live" ? "pulse-glow 2s ease-in-out infinite" : "none",
              }}
            />
            {status.label}
          </span>

          {/* Category */}
          <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-[rgba(0,255,136,0.05)] text-[var(--text-secondary)] border border-[var(--border)] capitalize">
            {project.category === "opensource" ? "Open Source" : project.category}
          </span>

          {/* Year */}
          <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
            <Calendar size={12} />
            {project.year}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight"
        >
          <span
            style={{
              background: `linear-gradient(135deg, #e8fff0 0%, ${project.accentColor} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}
          >
            {project.title}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8"
        >
          {project.description}
        </motion.p>

        {/* Meta pills row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {[
            { icon: <User size={13} />, label: project.role },
            { icon: <Clock size={13} />, label: project.duration },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] px-4 py-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
            >
              <span style={{ color: project.accentColor }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 group"
              style={{
                background: project.accentColor,
                color: "#050505",
                boxShadow: `0 0 30px ${project.accentColor}40`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 50px ${project.accentColor}70`;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 30px ${project.accentColor}40`;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(1)";
              }}
            >
              <ExternalLink size={15} />
              Live Demo
              <Sparkles size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide border border-[var(--border)] text-[var(--text-secondary)] hover:border-[rgba(0,255,136,0.4)] hover:text-[var(--accent-primary)] hover:bg-[rgba(0,255,136,0.05)] transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              <GitBranch size={15} />
              View Source
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function GallerySection({ project }: { project: Project }) {
  const images = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  if (!images.length) return null;

  const [active, setActive] = useState(0);

  function prev() { setActive((i) => (i <= 0 ? images.length - 1 : i - 1)); }
  function next() { setActive((i) => (i >= images.length - 1 ? 0 : i + 1)); }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <SectionHeading icon={<Images size={18} />} title="Project Gallery" accentColor={project.accentColor} />

      {/* Main image */}
      <div
        className="relative w-full rounded-2xl overflow-hidden mb-4 group"
        style={{
          border: `1px solid ${project.accentColor}30`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accentColor}10`,
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-10"
          style={{ background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}80, transparent)` }}
        />

        {/* Main image area */}
        <div className="relative w-full aspect-video bg-black">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${project.title} screenshot ${active + 1}`}
              fill
              className="object-cover"
              priority={active === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.65)", border: `1px solid ${project.accentColor}30` }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.65)", border: `1px solid ${project.accentColor}30` }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image counter */}
        <div
          className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full text-xs font-mono"
          style={{ background: "rgba(0,0,0,0.6)", color: project.accentColor, border: `1px solid ${project.accentColor}25` }}
        >
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View screenshot ${i + 1}`}
              className="shrink-0 relative rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: 120,
                height: 72,
                border: i === active
                  ? `2px solid ${project.accentColor}`
                  : "2px solid rgba(255,255,255,0.08)",
                boxShadow: i === active ? `0 0 14px ${project.accentColor}50` : "none",
                transform: i === active ? "scale(1.05)" : "scale(1)",
              }}
            >
              <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
              {i !== active && (
                <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      )}
    </motion.section>
  );
}

function MetricsSection({ project }: { project: Project }) {
  if (!project.metrics) return null;

  const sparklines = [
    [40, 65, 45, 80, 55, 90, 70],
    [70, 50, 85, 60, 75, 45, 90],
    [55, 80, 60, 95, 70, 85, 75],
    [45, 70, 55, 80, 65, 90, 50],
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {project.metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative overflow-hidden rounded-2xl cursor-default group"
            style={{
              background: "rgba(8,14,10,0.85)",
              border: `1px solid ${project.accentColor}20`,
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}50, transparent)`,
              }}
            />

            {/* Hover radial glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}18 0%, transparent 65%)`,
              }}
            />

            {/* Subtle mesh texture */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 p-5 flex flex-col h-full">
              {/* Icon + label row */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider leading-tight">
                  {metric.label}
                </span>
                <span className="text-lg">{metric.icon}</span>
              </div>

              {/* Large metric value */}
              <div
                className="text-4xl font-black tracking-tight leading-none mb-5"
                style={{
                  background: `linear-gradient(135deg, #ffffff 0%, ${project.accentColor} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                {metric.value}
              </div>

              {/* Animated sparkline bars */}
              <div className="flex items-end gap-[3px] h-9 mt-auto">
                {sparklines[i % sparklines.length].map((h, j) => (
                  <motion.div
                    key={j}
                    className="flex-1 rounded-sm"
                    style={{
                      background: j === sparklines[i % sparklines.length].length - 1
                        ? project.accentColor
                        : `${project.accentColor}30`,
                      boxShadow: j === sparklines[i % sparklines.length].length - 1
                        ? `0 0 6px ${project.accentColor}80`
                        : "none",
                    }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 + j * 0.05, ease: "easeOut" }}
                  />
                ))}
              </div>
            </div>

            {/* Corner glow on hover */}
            <div
              className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${project.accentColor}25 0%, transparent 70%)`,
                filter: "blur(10px)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function TechStackSection({ project }: { project: Project }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <SectionHeading icon={<Code2 size={18} />} title="Tech Stack" accentColor={project.accentColor} />
      <div className="flex flex-wrap gap-3">
        {project.stack.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            whileHover={{ scale: 1.08, y: -3 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-mono font-semibold cursor-default"
            style={{
              background: `${project.accentColor}10`,
              color: project.accentColor,
              border: `1px solid ${project.accentColor}25`,
              boxShadow: `0 0 0 0 ${project.accentColor}00`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${project.accentColor}20`;
              (e.currentTarget as HTMLElement).style.background = `${project.accentColor}18`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${project.accentColor}00`;
              (e.currentTarget as HTMLElement).style.background = `${project.accentColor}10`;
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: project.accentColor, boxShadow: `0 0 6px ${project.accentColor}` }}
            />
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.section>
  );
}

function HighlightsSection({ project }: { project: Project }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <SectionHeading icon={<Trophy size={18} />} title="Key Features" accentColor={project.accentColor} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.highlights.map((hl, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{ translateY: -3 }}
            className="flex items-start gap-3 p-4 rounded-xl cursor-default transition-all duration-300"
            style={{
              background: "rgba(17,17,17,0.6)",
              border: `1px solid rgba(255,255,255,0.06)`,
              borderLeft: `2px solid ${project.accentColor}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${project.accentColor}08`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(17,17,17,0.6)";
            }}
          >
            <span
              className="shrink-0 mt-0.5"
              style={{ color: project.accentColor }}
            >
              <CheckCircle2 size={16} />
            </span>
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{hl}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function OverviewSection({ project }: { project: Project }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <SectionHeading icon={<Sparkles size={18} />} title="Project Overview" accentColor={project.accentColor} />
      <div
        className="relative p-7 rounded-2xl"
        style={{
          background: "rgba(10,15,10,0.6)",
          border: `1px solid ${project.accentColor}18`,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Decorative left accent bar */}
        <div
          className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
          style={{ background: `linear-gradient(to bottom, transparent, ${project.accentColor}, transparent)` }}
        />
        <p className="text-[var(--text-secondary)] leading-[1.8] text-base pl-4">{project.longDescription}</p>
      </div>
    </motion.section>
  );
}

function ChallengesSection({ project }: { project: Project }) {
  if (!project.challenges) return null;

  // Split highlights: first half = challenges faced, second half = solutions built
  const mid = Math.ceil(project.highlights.length / 2);
  const challengeItems = project.highlights.slice(0, mid);
  const solutionItems = project.highlights.slice(mid);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <SectionHeading icon={<Zap size={18} />} title="Case Study" accentColor={project.accentColor} />

      {/* Challenges prose block */}
      <div
        className="relative p-6 rounded-2xl overflow-hidden mb-8"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}06 0%, rgba(10,15,10,0.8) 100%)`,
          border: `1px solid ${project.accentColor}18`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full"
          style={{ background: `linear-gradient(to bottom, transparent, ${project.accentColor}, transparent)` }}
        />
        <p className="pl-4 text-[var(--text-secondary)] leading-[1.8] text-sm">{project.challenges}</p>
      </div>

      {/* Side-by-side cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Challenges card — red accent */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-6 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(17,17,17,0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: "linear-gradient(90deg,#ef4444,#f87171,transparent)" }} />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 opacity-60">Problem Space</p>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Challenges</h3>
            </div>
          </div>
          <div className="space-y-3">
            {challengeItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 cursor-default"
                style={{ border: "1px solid rgba(239,68,68,0.12)", background: "rgba(239,68,68,0.03)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.07)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.03)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.12)"; }}
              >
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solutions card — green accent */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative p-6 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(17,17,17,0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg,${project.accentColor},${project.accentColor}80,transparent)` }} />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}35`, color: project.accentColor }}>
              <Lightbulb size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60" style={{ color: project.accentColor }}>Our Approach</p>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Solutions</h3>
            </div>
          </div>
          <div className="space-y-3">
            {solutionItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 cursor-default"
                style={{ border: `1px solid ${project.accentColor}18`, background: `${project.accentColor}04` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${project.accentColor}0a`; (e.currentTarget as HTMLElement).style.borderColor = `${project.accentColor}35`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${project.accentColor}04`; (e.currentTarget as HTMLElement).style.borderColor = `${project.accentColor}18`; }}
              >
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `${project.accentColor}20`, border: `1px solid ${project.accentColor}40`, color: project.accentColor }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function SectionHeading({
  icon,
  title,
  accentColor,
}: {
  icon: React.ReactNode;
  title: string;
  accentColor: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}30`,
          color: accentColor,
        }}
      >
        {icon}
      </div>
      <h2 className="text-xl font-bold text-[var(--text-primary)]">{title}</h2>
      <div
        className="flex-1 h-px ml-2"
        style={{
          background: `linear-gradient(to right, ${accentColor}30, transparent)`,
        }}
      />
    </div>
  );
}

function BottomCTA({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative mt-8 mb-16 p-10 rounded-3xl overflow-hidden text-center"
      style={{
        background: `linear-gradient(135deg, ${project.accentColor}08 0%, rgba(10,15,10,0.9) 50%, ${project.accentColor}05 100%)`,
        border: `1px solid ${project.accentColor}20`,
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <p className="text-xs font-mono tracking-widest text-[var(--text-muted)] mb-3 uppercase">
          Explore More
        </p>
        <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-3">
          Like what you see?
        </h3>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          Check out more of my work or reach out to collaborate on something exciting.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300"
            style={{
              background: project.accentColor,
              color: "#050505",
              boxShadow: `0 0 30px ${project.accentColor}40`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px) scale(1.03)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 50px ${project.accentColor}60`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 30px ${project.accentColor}40`;
            }}
          >
            <ArrowLeft size={15} />
            All Projects
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide border transition-all duration-300 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[rgba(0,255,136,0.4)] hover:bg-[rgba(0,255,136,0.05)]"
            style={{ borderColor: "var(--border)" }}
          >
            Let&apos;s Collaborate
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectDetailClient({ project }: Props) {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "var(--background)", fontFamily: "var(--font-geist-sans)" }}
    >
      <GridBackground />

      {/* Top fade for nav clearance */}
      <div
        className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-16">
        <HeroSection project={project} />

        {/* Divider */}
        <div
          className="w-full h-px my-14"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}30, transparent)`,
          }}
        />

        <GallerySection project={project} />
        <MetricsSection project={project} />
        <OverviewSection project={project} />
        <TechStackSection project={project} />
        <HighlightsSection project={project} />
        <ChallengesSection project={project} />
        <BottomCTA project={project} />
      </div>
    </div>
  );
}
