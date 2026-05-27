"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="relative py-[var(--section-padding)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(0,255,136,0.03)] to-transparent hidden xl:block" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <motion.span className="section-label" whileHover={{ scale: 1.1 }}>05</motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">My Journey</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--border)] to-transparent ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[var(--text-secondary)] text-lg mb-16 max-w-xl"
        >
          11 months of momentum. Every milestone earned, not given.
        </motion.p>

        <div className="relative max-w-2xl mx-auto">
          {/* Timeline connector line with gradient */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-dim)] to-transparent"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-10">
            {timeline.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative pl-16 md:pl-20 group"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-4 md:left-6 top-1 w-5 h-5 rounded-full bg-[var(--surface)] border-2 border-[var(--accent-primary)] z-10 transition-all duration-300"
                  whileHover={{
                    backgroundColor: "var(--accent-primary)",
                    boxShadow: "0 0 20px rgba(0,255,136,0.4)",
                  }}
                />

                {/* Card */}
                <motion.div
                  className="relative p-6 rounded-xl bg-[var(--surface)] glow-border transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[rgba(0,255,136,0.04)] to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    {/* Timeframe pill */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-[rgba(0,255,136,0.08)] text-[var(--accent-primary)] border border-[rgba(0,255,136,0.1)] mb-3">
                      {entry.timeframe}
                    </span>

                    {/* Title row */}
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-xl flex-shrink-0">{entry.icon}</span>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                        {entry.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {entry.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {entry.techPills.map((tech) => (
                        <span key={tech} className="tech-pill text-[0.65rem]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Present — still building */}
          <motion.div
            className="relative pl-16 md:pl-20 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="absolute left-4 md:left-6 top-1">
              <motion.div
                className="w-5 h-5 rounded-full bg-[var(--accent-primary)]"
                animate={{
                  scale: [1, 1.4, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(0,255,136,0.5)",
                    "0 0 0 12px rgba(0,255,136,0)",
                    "0 0 0 0 rgba(0,255,136,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-[var(--accent-primary)] font-mono text-sm font-medium flex items-center gap-2">
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ●
              </motion.span>
              Present — still building
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
