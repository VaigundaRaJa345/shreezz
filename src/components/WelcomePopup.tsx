"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
                <div
                    className="relative max-w-lg w-full bg-[#f4e4bc] p-8 md:p-12 rounded-3xl shadow-2xl text-center border-4 border-[#7c525f]/20"
                    style={{
                        boxShadow: "0 0 40px rgba(0,0,0,0.2), inset 0 0 40px rgba(0,0,0,0.05)"
                    }}
                >
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none rounded-3xl" />

                    {/* Floral Decorations */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 text-primary/40 pointer-events-none transform -rotate-12">
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z M50 90 C30 90 10 70 10 50 C10 30 30 10 50 10 C70 10 90 30 90 50 C90 70 70 90 50 90 Z" opacity="0.1" />
                            <path d="M50 20 Q60 5 80 20 T100 50 Q90 80 50 80 Q20 80 0 50 Q10 20 50 20" />
                            <circle cx="50" cy="50" r="5" />
                            <path d="M50 20 L50 10 M50 80 L50 90 M20 50 L10 50 M80 50 L90 50" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 text-primary/40 pointer-events-none transform rotate-180">
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 20 Q60 5 80 20 T100 50 Q90 80 50 80 Q20 80 0 50 Q10 20 50 20" />
                            <circle cx="50" cy="50" r="5" />
                            <path d="M50 20 L50 10 M50 80 L50 90 M20 50 L10 50 M80 50 L90 50" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="relative z-10 space-y-8">
                        {/* Decorative Icon */}
                        <div className="flex justify-center mb-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="text-primary/60"
                            >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </motion.div>
                        </div>

                        <p className="font-handwriting text-3xl md:text-4xl text-primary leading-relaxed">
                            "Thank you, Shree.<br />
                            Just wanted you to know—you’ve meant more to my life than you realised."
                        </p>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="px-8 py-3 bg-primary text-[#f4e4bc] font-serif text-lg rounded-full hover:bg-[#8e6370] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
                        >
                            Okay
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
