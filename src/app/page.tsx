"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Confession } from "@/components/Confession";
import { FinalSection } from "@/components/FinalSection";
import { WelcomePopup } from "@/components/WelcomePopup";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <WelcomePopup onComplete={() => setShowContent(true)} />

      {showContent && (
        <>
          <AudioPlayer />

          <Hero />

          <div className="relative z-10">
            <Story />
          </div>

          <Confession />

          <FinalSection />
        </>
      )}
    </main>
  );
}
