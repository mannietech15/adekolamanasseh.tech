"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import { TopNav } from "@/components/ui/TopNav";

// Lazy load the cursor for performance — no SSR needed
const SplashCursor = dynamic(
  () => import("@/components/ui/SplashCursor"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <TopNav />
      <SplashCursor COLOR="#046824" RAINBOW_MODE={false} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />

    </>
  );
}
