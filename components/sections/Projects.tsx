"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects, projectCategories } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ArrowUpRight, BookOpen, FolderGit2 } from "lucide-react";
import GooeyButton from "@/components/ui/GooeyButton";

// Decorative ribbons
function RibbonsDecoration() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none overflow-hidden hidden lg:block">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute right-0 w-[1px]"
          style={{
            top: `${15 + i * 15}%`,
            height: `${25 + i * 5}%`,
            background: `linear-gradient(to bottom, transparent, rgba(0,255,136,${0.03 + i * 0.02}), transparent)`,
            right: `${i * 8}px`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-[var(--section-padding)] overflow-hidden"
    >
      <RibbonsDecoration />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <motion.span className="section-label" whileHover={{ scale: 1.1 }}>04</motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
            Things I&apos;ve Built
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--border)] to-transparent ml-4" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[var(--text-secondary)] text-lg mb-10 max-w-xl"
        >
          Real projects, real code, real users. Each one taught me something new.
        </motion.p>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {projectCategories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-mono transition-all duration-300 relative overflow-hidden ${
                activeFilter === cat.id
                  ? "bg-[var(--accent-primary)] text-[var(--background)] shadow-[0_0_25px_rgba(0,255,136,0.25)]"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[rgba(0,255,136,0.3)] hover:text-[var(--accent-primary)]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA buttons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          {/* View More Projects — GooeyButton with particle burst on hover */}
          <GooeyButton
            href="https://github.com/mannietech15?tab=repositories"
            label="View More Projects"
            icon={<FolderGit2 size={17} />}
            trailingIcon={<ArrowUpRight size={16} />}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 3, 2, 4, 1]}
          />

          {/* View My Blogs — accent outline */}
          <motion.a
            href="https://hashnode.com/@MannieTech"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-outfit)" }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[rgba(0,255,136,0.35)] text-[var(--accent-primary)] text-[0.95rem] font-bold tracking-wide hover:bg-[rgba(0,255,136,0.07)] hover:border-[rgba(0,255,136,0.65)] transition-all duration-300 group"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing live dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]" />
            </span>
            <BookOpen size={17} />
            <span>View My Blogs</span>
            <ArrowUpRight
              size={16}
              className="group-hover:rotate-45 transition-transform duration-300"
            />
          </motion.a>

          {/* More on GitHub — subtle ghost */}
          <motion.a
            href="https://github.com/mannietech15"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-outfit)" }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] text-[0.9rem] font-semibold tracking-wide hover:border-[rgba(0,255,136,0.3)] hover:text-[var(--accent-primary)] hover:bg-[rgba(0,255,136,0.04)] transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>More on GitHub</span>
            <ArrowUpRight
              size={16}
              className="group-hover:rotate-45 transition-transform duration-300"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
