"use client";

import { useAnimationControls } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const rand  = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));

// ── CSS keyframes — orbital spin only, compositor thread ───────────────────
const KEYFRAMES = `
  @keyframes orb-cw  { to { transform: rotate( 360deg); } }
  @keyframes orb-ccw { to { transform: rotate(-360deg); } }
`;

interface MiniOrbData {
  id: number;
  size: number;
  radius: number;
  orbitDur: number;
  delay: number;
  tilt: number;
  cw: boolean;
  hasHighlight: boolean;
}

// Pure-CSS mini orb — zero Framer Motion, zero JS animation overhead
function MiniOrb({ o }: { o: MiniOrbData }) {
  const spinFwd = o.cw ? "orb-cw"  : "orb-ccw";
  const spinRev = o.cw ? "orb-ccw" : "orb-cw";
  const delay   = `${-o.delay}s`;

  return (
    /* 1 — static orbit-plane tilt */
    <div style={{
      position: "absolute", top: "50%", left: "50%",
      width: 0, height: 0,
      transform: `translate(-50%,-50%) rotate(${o.tilt}deg)`,
    }}>
      {/* 2 — orbit arm spin (compositor thread) */}
      <div style={{
        position: "absolute", width: 0, height: 0,
        willChange: "transform",
        animation: `${spinFwd} ${o.orbitDur}s linear ${delay} infinite`,
      }}>
        {/* 3 — position at orbit radius */}
        <div style={{
          position: "absolute",
          left: o.radius,
          top: -(o.size / 2),
          width: o.size,
          height: o.size,
          willChange: "transform",
        }}>
          {/* 4 — counter-rotate so visual stays upright */}
          <div style={{
            width: "100%", height: "100%",
            willChange: "transform",
            animation: `${spinRev} ${o.orbitDur}s linear ${delay} infinite`,
          }}>
            {/* 5 — static visual: pure fill, no animation, no repaint */}
            <div style={{
              width: "100%", height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse 78% 72% at 46% 40%, #2d7a4f 0%, #1a5c35 28%, #0d3d22 55%, #041508 100%)",
              border: "none",
              boxShadow: "none",
            }}>
              {o.hasHighlight && (
                <div style={{
                  position: "absolute",
                  width: "38%", height: "38%",
                  top: "8%", right: "8%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 40% 38%, rgba(255,255,255,0.70) 0%, rgba(210,255,230,0.25) 42%, transparent 70%)",
                }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main exported component ──────────────────────────────────────────────────
export function GlassmorphicOrb() {
  const bounceControls = useAnimationControls();
  const driftControls  = useAnimationControls();

  // Randomised bounce + squish — Framer Motion only for the big orb
  useEffect(() => {
    let alive = true;
    (async () => {
      while (alive) {
        const dur   = rand(2.4, 5.2);
        const yUp   = rand(-20, -38);
        const yDown = rand(7, 18);
        await bounceControls.start({
          y:      [0, yUp, yDown, yUp * 0.55, 0],
          scaleX: [1, rand(0.93, 0.98), rand(1.04, 1.09), rand(0.96, 0.99), 1],
          scaleY: [1, rand(1.03, 1.08), rand(0.91, 0.96), rand(1.01, 1.04), 1],
          transition: { duration: dur, ease: "easeInOut", times: [0, 0.27, 0.54, 0.78, 1] },
        });
      }
    })();
    return () => { alive = false; };
  }, [bounceControls]);

  // Randomised side-to-side drift
  useEffect(() => {
    let alive = true;
    (async () => {
      while (alive) {
        await driftControls.start({
          x: [0, rand(12, 32), rand(-28, -10), rand(6, 20), 0],
          transition: { duration: rand(4.5, 9), ease: "easeInOut", times: [0, 0.28, 0.58, 0.8, 1] },
        });
      }
    })();
    return () => { alive = false; };
  }, [driftControls]);

  // Generate mini orb data once at mount — two distinct orbital bands
  const miniOrbs = useMemo<MiniOrbData[]>(() => {
    const makeOrb = (i: number, radiusMin: number, radiusMax: number, sizeMin: number, sizeMax: number): MiniOrbData => {
      const size = rand(sizeMin, sizeMax);
      return {
        id:           i,
        size,
        radius:       rand(radiusMin, radiusMax),
        orbitDur:     rand(3, 9),
        delay:        rand(0, 18),
        tilt:         rand(0, 180),
        cw:           Math.random() > 0.5,
        hasHighlight: size >= 42,
      };
    };

    // Inner ring: close to main orb
    const innerCount = randInt(26, 34);
    const inner = Array.from({ length: innerCount }, (_, i) =>
      makeOrb(i, 250, 370, 28, 58)
    );

    // Mid ring: clearly further out
    const midCount = randInt(30, 38);
    const mid = Array.from({ length: midCount }, (_, i) =>
      makeOrb(innerCount + i, 520, 720, 22, 50)
    );

    // Far ring: much farther — sparse, small
    const farCount = randInt(15, 25);
    const far = Array.from({ length: farCount }, (_, i) =>
      makeOrb(innerCount + midCount + i, 900, 1100, 16, 36)
    );

    return [...inner, ...mid, ...far];
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none w-[300px] h-[300px] md:w-[640px] md:h-[640px]"
      style={{
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
    >
      {/* Inject CSS keyframes once */}
      <style>{KEYFRAMES}</style>

      {/* ── Mini orbiting orbs (pure CSS, compositor thread) ── */}
      {miniOrbs.map((o) => <MiniOrb key={o.id} o={o} />)}

      {/* ── Main orb: drift layer ── */}
      <motion.div className="absolute inset-0" animate={driftControls}>
        {/* Ambient dark-green haze */}
        <div className="absolute inset-0 rounded-full" style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,30,15,0.95) 0%, rgba(0,12,6,1) 70%, rgba(0,6,3,1) 100%)",
          filter: "blur(50px)",
          transform: "scale(1.38)",
        }} />

        {/* ── Main orb: bounce + squish ── */}
        <motion.div
          className="absolute inset-0"
          animate={bounceControls}
          style={{
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse 78% 72% at 46% 40%, #1a5c35 0%, #0f4226 20%, #082e1a 42%, #042010 65%, #021208 85%, #010805 100%)",
            border: "none", boxShadow: "none",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            overflow: "hidden",
          }}
        >
          {/* Specular highlight */}
          <motion.div
            className="absolute"
            style={{
              width: 130, height: 130, top: "18%", right: "12%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 40% 38%, rgba(255,255,255,0.85) 0%, rgba(220,255,235,0.48) 38%, rgba(180,255,215,0.12) 65%, transparent 80%)",
              filter: "blur(8px)", boxShadow: "none",
            }}
            animate={{ opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          {/* Scan line */}
          <motion.div
            className="absolute left-[10%] right-[10%] h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.55), transparent)",
              boxShadow: "none",
            }}
            animate={{ top: ["12%", "82%", "12%"], opacity: [0, 0.75, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
