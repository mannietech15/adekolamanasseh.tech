// Seeded pseudo-random number generator for consistent SSR/CSR values
// Uses a simple mulberry32 algorithm
export function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Pre-generate particles with a fixed seed so SSR and CSR match
export function generateParticles(
  count: number,
  seed: number = 42
): Array<{
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}> {
  const rng = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 100,
    size: rng() * 2 + 1,
    duration: rng() * 15 + 10,
    delay: rng() * 5,
    opacity: rng() * 0.15 + 0.05,
  }));
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
