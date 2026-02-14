"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
            {/* Collage Elements */}
            <motion.div
                initial={{ rotate: -5, x: -100, opacity: 0 }}
                animate={{ rotate: -5, x: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-20 left-10 md:left-32 w-48 h-64 bg-paper shadow-lg border border-stone-300 p-4 transform -rotate-6 z-0 hidden md:block"
            >
                <div className="w-full h-full border-2 border-dashed border-stone-300 flex items-center justify-center opacity-50">
                    <span className="font-handwriting text-2xl text-ink/40">Feb 14</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ rotate: 10, x: 100, opacity: 0 }}
                animate={{ rotate: 10, x: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                className="absolute bottom-32 right-10 md:right-32 w-56 h-40 bg-[#f0e6d2] shadow-xl p-2 transform rotate-12 z-0 hidden md:block"
            >
                <div className="w-full h-full border border-stone-400 flex items-center justify-center">
                    {/* Placeholder for a vintage stamp or image */}
                    <div className="w-16 h-16 rounded-full border border-ink/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-ink/40" />
                    </div>
                </div>
            </motion.div>

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
                <FloatingParticles />
            </div>
        </section>
    );
}

function FloatingParticles() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent/30 rounded-full"
                    initial={{
                        x: Math.random() * 1000,
                        y: Math.random() * 1000
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </>
    );
}
