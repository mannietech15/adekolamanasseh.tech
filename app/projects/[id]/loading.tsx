export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated orb */}
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,255,136,0.4) 0%, transparent 70%)",
            boxShadow: "0 0 40px rgba(0,255,136,0.3)",
            animation: "pulse-glow 1.5s ease-in-out infinite",
          }}
        />
        <p
          className="text-[var(--text-secondary)] text-sm font-mono tracking-widest"
          style={{ animation: "pulse-glow 1.5s ease-in-out infinite" }}
        >
          Loading project...
        </p>
      </div>
    </div>
  );
}
