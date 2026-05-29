"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ExternalLink, GitFork, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 250,
    damping: 25,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setSpotlight({ x: 50, y: 50 });
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1200 }}
    >
      <Link href={`/projects/${project.id}`} className="block h-full" tabIndex={-1} aria-label={`View ${project.title} details`}>
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-full rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] transition-all duration-500 group-hover:border-[rgba(0,255,136,0.35)]">
          {/* Spotlight gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              background: `radial-gradient(500px circle at ${spotlight.x}% ${spotlight.y}%, rgba(0,255,136,0.1), transparent 50%)`,
            }}
          />

          {/* Grainient texture overlay for depth */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Project visual header */}
          <div
            className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
              />
            ) : (
              <>
                {/* Animated grid pattern */}
                <div className="absolute inset-0 grid-overlay opacity-40" />
                
                {/* Floating decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    className="absolute top-4 right-4 w-24 h-24 rounded-full border border-[rgba(0,255,136,0.08)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute bottom-8 left-4 w-16 h-16 rounded-full border border-[rgba(0,255,136,0.05)]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <motion.div
                  className="relative z-10 flex flex-col items-center gap-2"
                  animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-[rgba(0,255,136,0.12)] border border-[rgba(0,255,136,0.2)] flex items-center justify-center backdrop-blur-sm"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-[var(--accent-primary)] font-mono font-bold text-xl">
                      {project.title.charAt(0)}
                    </span>
                  </motion.div>
                  <div className="font-mono text-xs text-[var(--accent-primary)] opacity-50">
                    /{project.id}
                  </div>
                </motion.div>
              </>
            )}
            
            {/* Gradient overlay to ensure text/border readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Card body */}
          <div className="relative p-6 z-10">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
              {project.title}
            </h3>
            <p className={`text-sm text-[var(--text-secondary)] leading-relaxed ${project.shortFeatures ? 'mb-4' : 'mb-5'}`}>
              {project.description}
            </p>

            {project.shortFeatures && (
              <div className="mb-5">
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {project.shortFeatures.map((feature, i) => (
                    <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start">
                      <span className="text-[var(--accent-primary)] mr-2 mt-0.5">•</span>
                      <span className="flex-1 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.stack.map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-3 border-t border-[var(--border)]">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300 group/link"
                  aria-label={`Live demo of ${project.title}`}
                  whileHover={{ x: 2 }}
                >
                  <ExternalLink size={14} />
                  <span className="group-hover/link:underline underline-offset-4">Live Demo</span>
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300 group/link"
                  aria-label={`GitHub repository for ${project.title}`}
                  whileHover={{ x: 2 }}
                >
                  <GitFork size={14} />
                  <span className="group-hover/link:underline underline-offset-4">Source</span>
                </motion.a>
              )}

              {/* View Details */}
              <div
                className="ml-auto flex items-center gap-1.5 text-[0.85rem] font-bold tracking-wide text-[var(--accent-primary)] transition-all duration-300"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                View Details
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

          {/* Hover glow aura */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[rgba(0,255,136,0.15)] via-transparent to-[rgba(0,255,213,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-sm" />
        </div>
      </motion.div>
      </Link>
    </motion.div>
  );
}
