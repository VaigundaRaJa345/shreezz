"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { FloatingHearts } from "./FloatingHearts";

// 📸 CONFIGURATION: Add your photo URLs here!
// 1. Place your photos in the 'public/photos' folder (create it if it doesn't exist).
// 2. Update the 'src' below to '/photos/your-image.jpg'.
const photos = [
    {
        id: 1,
        src: "/photos/photo1.jpeg",
        caption: "First sight",
        rotate: -6,
        x: -50,
        delay: 0.2,
        position: "top-8 left-4 md:top-12 md:left-20",
        size: "w-40 h-52 md:w-56 md:h-72",
        color: "bg-[#efe6d5]"
    },
    {
        id: 2,
        src: "/photos/photo2.jpeg",
        caption: "Sweet memories",
        rotate: 5,
        x: 50,
        delay: 0.4,
        position: "top-8 right-4 md:top-12 md:right-20",
        size: "w-36 h-48 md:w-52 md:h-64",
        color: "bg-[#e6cece]"
    },
    {
        id: 3,
        src: "/photos/photo3.jpeg",
        caption: "Adventures",
        rotate: 3,
        x: -50,
        delay: 0.6,
        position: "bottom-32 left-4 md:bottom-24 md:left-20",
        size: "w-32 h-44 md:w-48 md:h-64",
        color: "bg-[#dcd0ff]"
    },
    {
        id: 4,
        src: "/photos/photo4.jpeg",
        caption: "Forever",
        rotate: -4,
        x: 50,
        delay: 0.8,
        position: "bottom-32 right-4 md:bottom-24 md:right-20",
        size: "w-40 h-52 md:w-56 md:h-72",
        color: "bg-[#b08d55]/20"
    }
];

export function Hero() {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
            {/* Collage Elements - Configurable Photos */}
            {photos.map((photo) => (
                <motion.div
                    key={photo.id}
                    initial={{ rotate: photo.rotate, x: photo.x, opacity: 0 }}
                    animate={{ rotate: photo.rotate, x: 0, opacity: 1 }}
                    transition={{ duration: 1.5, delay: photo.delay }}
                    className={`absolute ${photo.position} ${photo.size} bg-paper shadow-xl p-3 transform z-0`}
                    style={{ rotate: `${photo.rotate}deg` }}
                >
                    <div className={`w-full h-[85%] ${photo.color} border border-ink/10 flex items-center justify-center overflow-hidden relative group`}>
                        <img
                            src={photo.src}
                            alt={photo.caption}
                            className="w-full h-full object-cover sepia-[0.3] contrast-[0.9] opacity-80 hover:opacity-100 transition-opacity duration-500"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerText = 'Add Photo';
                            }}
                        />
                    </div>
                    <div className="mt-2 text-center font-handwriting text-ink/60 text-sm">{photo.caption}</div>
                </motion.div>
            ))}

            <div className="z-10 text-center px-4 relative">
                {/* Decorative flourish top */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-4 text-primary opacity-80"
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-ink mb-2 tracking-tight"
                >
                    For You
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="font-handwriting text-2xl md:text-4xl text-primary mt-4 transform -rotate-2"
                >
                    A timeless confession
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-12 z-10"
            >
                <ChevronDown className="w-6 h-6 text-ink/40 animate-bounce" />
            </motion.div>

            {/* Floating particles/dust */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <FloatingHearts />
            </div>
        </section>
    );
}


