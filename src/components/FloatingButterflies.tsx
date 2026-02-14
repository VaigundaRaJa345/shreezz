"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const butterflyColors = [
    "#967bb6", // Lavender
    "#b08d55", // Gold
    "#7c525f", // Mauve
];

export function FloatingButterflies() {
    const [butterflies, setButterflies] = useState<any[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newButterfly = {
                id: Math.random(),
                top: Math.random() * 80 + 10, // 10% to 90% vertical
                size: 15 + Math.random() * 15,
                color: butterflyColors[Math.floor(Math.random() * butterflyColors.length)],
                duration: 15 + Math.random() * 10,
                delay: Math.random() * 5,
            };

            setButterflies((prev) => [...prev.slice(-5), newButterfly]); // Keep max 5 butterflies
        }, 4000); // Add new butterfly every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            <AnimatePresence>
                {butterflies.map((b) => (
                    <motion.div
                        key={b.id}
                        initial={{ opacity: 0, x: -50, top: `${b.top}%` }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            x: "110vw", // Fly across screen
                            y: [0, -20, 0, 20, 0], // Gentle wave
                        }}
                        transition={{
                            duration: b.duration,
                            ease: "linear",
                            delay: b.delay,
                        }}
                        className="absolute"
                        style={{ color: b.color }}
                    >
                        <motion.svg
                            width={b.size}
                            height={b.size}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            // Wing flapping animation
                            animate={{ scaleY: [1, 0.4, 1] }}
                            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path d="M12 2C11 2 10 2.5 10 3.5C10 4 10.5 4.5 11 4.5C11.5 4.5 12 4 12 3.5C12 2.5 11 2 12 2ZM8.5 5.5C7.5 5 6.5 5.5 6 6.5C5.5 7.5 6 8.5 7 9C8 9.5 9 9 9.5 8C10 7 9.5 6 8.5 5.5ZM15.5 5.5C16.5 5 17.5 5.5 18 6.5C18.5 7.5 18 8.5 17 9C16 9.5 15 9 14.5 8C14 7 14.5 6 15.5 5.5ZM5.5 10.5C4.5 10 3.5 10.5 3 11.5C2.5 12.5 3 13.5 4 14C5 14.5 6 14 6.5 13C7 12 6.5 11 5.5 10.5ZM18.5 10.5C19.5 10 20.5 10.5 21 11.5C21.5 12.5 21 13.5 20 14C19 14.5 18 14 17.5 13C17 12 17.5 11 18.5 10.5ZM8 12C7 12 6 12.5 6 13.5C6 14 6.5 14.5 7 14.5C7.5 14.5 8 14 8 13.5C8 12.5 7 12 8 12ZM16 12C15 12 14 12.5 14 13.5C14 14 14.5 14.5 15 14.5C15.5 14.5 16 14 16 13.5C16 12.5 15 12 16 12ZM12 15C11 15 10 15.5 10 16.5C10 17 10.5 17.5 11 17.5C11.5 17.5 12 17 12 16.5C12 15.5 11 15 12 15Z" />
                        </motion.svg>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
