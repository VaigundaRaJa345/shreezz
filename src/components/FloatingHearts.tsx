"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heartColors = [
    "#dcd0ff", // Lavender
    "#c4aead", // Dusty Rose
    "#885A89", // Plum/Mauve
    "#d8bfd8", // Thistle
];

export function FloatingHearts() {
    const [hearts, setHearts] = useState<{ id: number; x: number; size: number; color: string; duration: number }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = {
                id: Math.random(),
                x: Math.random() * 100, // Percentage
                size: 10 + Math.random() * 20, // 10px to 30px
                color: heartColors[Math.floor(Math.random() * heartColors.length)],
                duration: 10 + Math.random() * 10, // 10s to 20s
            };

            setHearts((prev) => [...prev.slice(-15), newHeart]); // Keep max 15 hearts
        }, 2000); // Add new heart every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 0, y: "100vh", x: `${heart.x}vw` }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            y: "-10vh",
                            x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`], // Slight drift
                            rotate: [0, Math.random() * 360],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: heart.duration, ease: "linear" }}
                        className="absolute"
                        style={{ color: heart.color }}
                    >
                        <svg
                            width={heart.size}
                            height={heart.size}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            className="drop-shadow-sm"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
