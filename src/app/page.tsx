"use client";

import { AudioPlayer } from "@/components/AudioPlayer";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Confession } from "@/components/Confession";
import { FinalSection } from "@/components/FinalSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <AudioPlayer />

      <Hero />

      <div className="relative z-10">
        <Story />
      </div>

      <Confession />

      <FinalSection />
    </main>
  );
}
