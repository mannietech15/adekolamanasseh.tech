"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";
import { generateParticles } from "@/lib/utils";

/* ── Brand SVG icons ─────────────────────────────────────────── */
function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Social links ─────────────────────────────────────────────── */
const socials = [
  {
    icon: GitHubIcon,
    label: "GitHub",
    handle: "mannietech15",
    href: "https://github.com/mannietech15",
    color: "rgba(255,255,255,0.85)",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    handle: "Adekola Manasseh",
    href: "https://www.linkedin.com/in/adekola-manasseh-2350293ab",
    color: "#0A66C2",
  },
  {
    icon: XIcon,
    label: "X (Twitter)",
    handle: "@MannieTech01",
    href: "https://x.com/MannieTech01",
    color: "rgba(255,255,255,0.85)",
  },
];

/* ── WhatsApp helper ──────────────────────────────────────────── */
const WA_NUMBER = "2348087186500"; // international format, no +
function buildWhatsAppUrl(name: string, message: string) {
  const text = encodeURIComponent(
    `Hi Adekola! I'm ${name}.\n\n${message}\n\n(Sent via your portfolio)`
  );
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

/* ── Animated dot-field background ───────────────────────────── */
const dotData = generateParticles(80, 99);
function DotFieldBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dotData.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-[var(--accent-primary)]"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            opacity: d.opacity * 0.6,
          }}
          animate={{ opacity: [d.opacity * 0.3, d.opacity * 0.8, d.opacity * 0.3] }}
          transition={{ duration: d.duration * 0.5, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── WhatsApp icon SVG (brand-accurate) ──────────────────────── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!name.trim() || !message.trim()) return;
    const url = buildWhatsAppUrl(name.trim(), message.trim());
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-[var(--section-padding)] overflow-hidden">
      <DotFieldBackground />

      <div className="section-container relative z-10">
        {/* ── Header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <motion.span className="section-label" whileHover={{ scale: 1.1 }}>06</motion.span>
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">Let&apos;s Build Something</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--border)] to-transparent ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[var(--text-secondary)] text-lg mb-14 max-w-xl"
        >
          Got a project in mind? Need a developer who ships? Drop me a message directly on
          WhatsApp — I reply fast.
        </motion.p>

        {/* ── Two-column layout ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* ── Left: WhatsApp message form ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative p-7 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,18,9,0.85) 0%, rgba(0,8,4,0.9) 100%)",
              border: "1px solid rgba(0,255,136,0.18)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Top shimmer */}
            <div
              className="absolute top-0 left-8 right-8 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)" }}
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)" }}
              >
                <WhatsAppIcon size={22} />
              </div>
              <div>
                <p className="text-[var(--text-primary)] font-semibold leading-tight">Send via WhatsApp</p>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">Opens WhatsApp with your message pre-filled</p>
              </div>
            </div>

            {/* Name input */}
            <div className="mb-4">
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-mono outline-none transition-all duration-300"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(0,255,136,0.12)",
                }}
                onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(0,255,136,0.45)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,255,136,0.06)"; }}
                onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(0,255,136,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {/* Message textarea */}
            <div className="mb-6">
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, idea, or collaboration..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-mono resize-none outline-none transition-all duration-300"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(0,255,136,0.12)",
                }}
                onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(0,255,136,0.45)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,255,136,0.06)"; }}
                onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(0,255,136,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {/* Send button */}
            <motion.button
              onClick={handleSend}
              disabled={!name.trim() || !message.trim()}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden group disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: sent
                  ? "rgba(0,255,136,0.15)"
                  : "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)",
                color: sent ? "#00ff88" : "#000",
              }}
              whileHover={!name.trim() || !message.trim() ? {} : { scale: 1.02, y: -2 }}
              whileTap={!name.trim() || !message.trim() ? {} : { scale: 0.98 }}
            >
              {sent ? (
                <>
                  <span>✓</span>
                  <span>Opening WhatsApp…</span>
                </>
              ) : (
                <>
                  <WhatsAppIcon size={18} />
                  <span>Send on WhatsApp</span>
                  <Send size={15} className="ml-auto group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* ── Right: Social links ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-4"
          >
            <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">
              Find me on
            </p>

            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 6, borderColor: "rgba(0,255,136,0.45)" }}
                  className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: "rgba(0,10,5,0.6)",
                    border: "1px solid rgba(0,255,136,0.12)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: "rgba(0,255,136,0.07)",
                      border: "1px solid rgba(0,255,136,0.18)",
                      color: s.color,
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-[var(--text-muted)] mb-0.5">{s.label}</p>
                    <p className="text-[var(--text-primary)] font-semibold group-hover:text-[var(--accent-primary)] transition-colors truncate">
                      {s.handle}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0"
                  />
                </motion.a>
              );
            })}

            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-2.5 mt-2 px-4 py-3 rounded-xl"
              style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)" }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[var(--accent-primary)] flex-shrink-0"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                style={{ fontFamily: "var(--font-great-vibes)" }}
                className="text-3xl font-bold text-[var(--accent-primary)]"
              >
                Available for projects &amp; collaborations
              </span>
            </motion.div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
