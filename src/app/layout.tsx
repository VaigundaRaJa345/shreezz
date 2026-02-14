import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Timeless Confession",
  description: "A digital letter, preserved in time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased relative overflow-x-hidden",
          playfair.variable,
          montserrat.variable,
          dancingScript.variable
        )}
      >
        {/* Vintage Paper Texture Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20 mix-blend-multiply pointer-events-none">
          <svg className="w-full h-full opacity-100">
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
