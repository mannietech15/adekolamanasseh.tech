"use client";
import React, { useRef, useEffect, useCallback } from "react";

interface GooeyButtonProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  animationTime?: number;
  timeVariance?: number;
  colors?: number[];
}

/**
 * A single-link button that fires gooey particle bursts on hover.
 * Adapted from the GooeyNav component (React Bits).
 * Particles are themed to the portfolio's green/cyan/lime palette.
 */
const GooeyButton: React.FC<GooeyButtonProps> = ({
  label,
  href,
  icon,
  trailingIcon,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  animationTime = 600,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 3, 2, 4, 1],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef   = useRef<HTMLSpanElement>(null);
  const textRef     = useRef<HTMLSpanElement>(null);
  const btnRef      = useRef<HTMLAnchorElement>(null);

  // ─── helpers ──────────────────────────────────────────────────────────────
  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (dist: number, idx: number, total: number): [number, number] => {
    const angle = ((360 + noise(8)) / total) * idx * (Math.PI / 180);
    return [dist * Math.cos(angle), dist * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end:   getXY(d[1] + noise(7), particleCount - i, particleCount),
      time:  t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = useCallback(
    (element: HTMLElement) => {
      const d: [number, number] = particleDistances;
      const bubbleTime = animationTime * 2 + timeVariance;
      element.style.setProperty("--time", `${bubbleTime}ms`);

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const p = createParticle(i, t, d, particleR);
        element.classList.remove("gb-active");

        setTimeout(() => {
          const particle = document.createElement("span");
          const point    = document.createElement("span");
          particle.classList.add("gb-particle");
          particle.style.setProperty("--start-x", `${p.start[0]}px`);
          particle.style.setProperty("--start-y", `${p.start[1]}px`);
          particle.style.setProperty("--end-x",   `${p.end[0]}px`);
          particle.style.setProperty("--end-y",   `${p.end[1]}px`);
          particle.style.setProperty("--time",    `${p.time}ms`);
          particle.style.setProperty("--scale",   `${p.scale}`);
          particle.style.setProperty("--color",   `var(--gb-c-${p.color}, #00ff88)`);
          particle.style.setProperty("--rotate",  `${p.rotate}deg`);
          point.classList.add("gb-point");
          particle.appendChild(point);
          element.appendChild(particle);
          requestAnimationFrame(() => element.classList.add("gb-active"));
          setTimeout(() => { try { element.removeChild(particle); } catch {} }, t);
        }, 30);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [particleCount, particleDistances, particleR, animationTime, timeVariance, colors]
  );

  const syncPosition = useCallback(() => {
    if (!containerRef.current || !filterRef.current || !textRef.current || !btnRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const bRect = btnRef.current.getBoundingClientRect();
    const s = {
      left:   `${bRect.x - cRect.x}px`,
      top:    `${bRect.y - cRect.y}px`,
      width:  `${bRect.width}px`,
      height: `${bRect.height}px`,
    };
    Object.assign(filterRef.current.style, s);
    Object.assign(textRef.current.style,   s);
  }, []);

  const handleHover = useCallback(() => {
    if (!filterRef.current || !textRef.current) return;
    syncPosition();
    // Clear lingering particles
    filterRef.current.querySelectorAll(".gb-particle").forEach((p) =>
      filterRef.current!.removeChild(p)
    );
    // Retrigger text flash
    textRef.current.classList.remove("gb-text-active");
    void textRef.current.offsetWidth;
    textRef.current.classList.add("gb-text-active");
    // Burst!
    makeParticles(filterRef.current);
  }, [syncPosition, makeParticles]);

  useEffect(() => {
    syncPosition();
    textRef.current?.classList.add("gb-text-active");
    const ro = new ResizeObserver(syncPosition);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [syncPosition]);

  return (
    <>
      <style>{`
        /* ── GooeyButton palette — green/cyan/lime/neon ── */
        :root {
          --gb-c-1: #00ff88;
          --gb-c-2: #00ffd5;
          --gb-c-3: #aaff00;
          --gb-c-4: #39ff14;
        }
        /* ── gooey filter layer ── */
        .gb-filter {
          position: absolute;
          pointer-events: none;
          display: grid;
          place-items: center;
          z-index: 0;
          filter: blur(7px) contrast(100) blur(0);
          mix-blend-mode: lighten;
        }
        .gb-filter::before {
          content: "";
          position: absolute;
          inset: -75px;
          z-index: -2;
          background: black;
        }
        .gb-filter::after {
          content: "";
          position: absolute;
          inset: 0;
          background: white;
          opacity: 1;
          border-radius: 9999px;
          z-index: -1;
        }
        /* ── particles ── */
        .gb-particle,
        .gb-point {
          display: block;
          opacity: 0;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          transform-origin: center;
        }
        .gb-particle {
          --time: 5s;
          position: absolute;
          top: calc(50% - 8px);
          left: calc(50% - 8px);
          animation: gb-particle-kf calc(var(--time)) ease 1 -350ms;
        }
        .gb-point {
          background: var(--color);
          opacity: 1;
          animation: gb-point-kf calc(var(--time)) ease 1 -350ms;
        }
        @keyframes gb-particle-kf {
          0%   { transform: rotate(0deg) translate(var(--start-x), var(--start-y)); opacity: 1; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          70%  { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; animation-timing-function: ease; }
          85%  { transform: rotate(calc(var(--rotate) * 0.66)) translate(var(--end-x), var(--end-y)); opacity: 1; }
          100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 1; }
        }
        @keyframes gb-point-kf {
          0%   { transform: scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          25%  { transform: scale(calc(var(--scale) * 0.25)); }
          38%  { opacity: 1; }
          65%  { transform: scale(var(--scale)); opacity: 1; animation-timing-function: ease; }
          85%  { transform: scale(var(--scale)); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
      `}</style>

      {/* Outer container — needs dark bg for mix-blend-mode: lighten to work */}
      <div
        ref={containerRef}
        className="relative inline-flex"
        style={{ transform: "translate3d(0,0,0.01px)" }}
      >
        {/* The actual button — sits above the filter layer */}
        <a
          ref={btnRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleHover}
          style={{ fontFamily: "var(--font-outfit)", position: "relative", zIndex: 3 }}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--accent-primary)] text-[var(--background)] text-[0.95rem] font-bold tracking-wide shadow-[0_0_28px_rgba(0,255,136,0.28)] hover:shadow-[0_0_45px_rgba(0,255,136,0.45)] transition-shadow duration-300 group select-none"
        >
          {icon}
          <span>{label}</span>
          {trailingIcon}
        </a>

        {/* Gooey filter — renders the blurred blob + particles */}
        <span className="gb-filter" ref={filterRef} />

        {/* Text overlay (required by gooey technique but hidden behind our <a>) */}
        <span
          ref={textRef}
          style={{ position: "absolute", pointerEvents: "none", zIndex: 1, opacity: 0 }}
        />
      </div>
    </>
  );
};

export default GooeyButton;
