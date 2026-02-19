"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomePopupProps {
    onComplete?: () => void;
}

export function WelcomePopup({ onComplete }: WelcomePopupProps) {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <AnimatePresence mode="wait" onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    key="welcome-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                >
                    <div
                        className="relative max-w-lg w-full bg-[#f4e4bc] p-8 md:p-12 rounded-3xl shadow-2xl text-center border-4 border-[#7c525f]/20"
                        style={{
                            boxShadow: "0 0 40px rgba(0,0,0,0.2), inset 0 0 40px rgba(0,0,0,0.05)"
                        }}
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none rounded-3xl" />

                        <div className="relative z-10 space-y-8">


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
            )}
        </AnimatePresence>
    );
}
