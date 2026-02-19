
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Heart, Gift } from "lucide-react";

export function Confession() {
    const [activeLetter, setActiveLetter] = useState<"confession" | "birthday" | null>(null);
    const [topLetter, setTopLetter] = useState<"confession" | "birthday">("confession");

    useEffect(() => {
        if (activeLetter !== null) return;

        const interval = setInterval(() => {
            setTopLetter((prev) => (prev === "confession" ? "birthday" : "confession"));
        }, 7000);

        return () => clearInterval(interval);
    }, [activeLetter]);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden space-y-8">

            <AnimatePresence mode="wait">
                {activeLetter === null ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-lg h-[300px] md:h-[400px] flex items-center justify-center z-10 perspective-1000"
                    >
                        {/* Birthday Envelope */}
                        <motion.div
                            key="envelope-birthday"
                            animate={{
                                rotate: topLetter === "birthday" ? -5 : -15,
                                x: topLetter === "birthday" ? 0 : -20,
                                y: topLetter === "birthday" ? 0 : 20,
                                scale: topLetter === "birthday" ? 1 : 0.9,
                                zIndex: topLetter === "birthday" ? 20 : 10,
                            }}
                            whileHover={{ scale: 1.05, zIndex: 30 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute cursor-pointer group flex flex-col items-center transition-all duration-300 transform-style-3d"
                            onClick={() => setActiveLetter("birthday")}
                        >
                            <div className="w-64 h-44 md:w-72 md:h-48 bg-[#f4e4bc] shadow-xl relative flex items-center justify-center rounded-sm border border-[#d4c5a5]">
                                {/* Paper Texture */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply" />
                                <div className="absolute inset-0 border-2 border-[#885A89] m-2 border-dashed opacity-30" />

                                {/* Label on Envelope */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max bg-white/60 backdrop-blur-[2px] px-3 py-1 rounded-sm border border-[#d4c5a5]/50 group-hover:bg-white/90 transition-colors">
                                    <p className="font-serif text-ink/70 tracking-widest text-[10px] uppercase">Birthday Wish</p>
                                </div>

                                {/* Wax Seal */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#B08D55] shadow-md flex items-center justify-center z-20 border-2 border-[#f4e4bc]/30">
                                    <Gift size={18} className="text-[#f4e4bc]" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Confession Envelope */}
                        <motion.div
                            key="envelope-confession"
                            animate={{
                                rotate: topLetter === "confession" ? 5 : 15,
                                x: topLetter === "confession" ? 0 : 20,
                                y: topLetter === "confession" ? 0 : 20,
                                scale: topLetter === "confession" ? 1 : 0.9,
                                zIndex: topLetter === "confession" ? 20 : 10,
                            }}
                            whileHover={{ scale: 1.05, zIndex: 30 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute cursor-pointer group flex flex-col items-center transition-all duration-300 transform-style-3d"
                            onClick={() => setActiveLetter("confession")}
                        >
                            <div className="w-64 h-44 md:w-72 md:h-48 bg-[#e6cece] shadow-2xl relative flex items-center justify-center rounded-sm border border-[#dcd0ff]">
                                {/* Paper Texture */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply" />
                                <div className="absolute inset-0 border-2 border-[#dcd0ff] m-2 border-dashed opacity-50" />

                                {/* Label on Envelope */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max bg-white/60 backdrop-blur-[2px] px-3 py-1 rounded-sm border border-[#dcd0ff]/50 group-hover:bg-white/90 transition-colors">
                                    <p className="font-serif text-ink/70 tracking-widest text-[10px] uppercase">A Letter for You</p>
                                </div>

                                {/* Wax Seal */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#7c525f] shadow-lg flex items-center justify-center z-20 border-2 border-[#967bb6]/30">
                                    <div className="text-[#f4e4bc] font-serif text-lg md:text-xl italic">V</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl w-full bg-paper p-8 md:p-12 shadow-2xl relative transform rotate-1 rounded-sm mx-4"
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none" />

                        {/* Close Button */}
                        <button
                            onClick={() => setActiveLetter(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-ink/40 hover:text-primary transition-colors p-2 z-10"
                            aria-label="Close letter"
                        >
                            <X size={24} />
                        </button>

                        {/* Content Container */}
                        <div className="relative z-10">
                            {activeLetter === "confession" ? (
                                <div className="text-center space-y-6 md:space-y-8">
                                    <h2 className="font-handwriting text-4xl md:text-5xl text-primary mb-2">
                                        of course, Not a Proposal
                                    </h2>

                                    <div className="text-base md:text-lg font-serif text-ink italic leading-relaxed space-y-4 text-left md:text-center">
                                        <p>Hii,</p>
                                        <p>I want to tell you something.</p>
                                        <p>Yeah, it started with a glance… back in June 2016 🕢<br />
                                            I’m still stuck with that cute little girl 🤌 sitting in the corner of the class, in the last row.</p>
                                        <p>Okay, past things apart, naanum ethana naal dhaan sollama irukkuradhu.<br />
                                            Nee committed aa, single aa nu therila.<br />
                                            Idha sollalama, solla koodaadha nu kooda therila 🤷</p>
                                        <p>Unna paatha first day la irundhu I’m struck with you, girl—that’s it 👊<br />
                                            I just like you, avalodha.</p>
                                        <p>And don’t feel down, you have a lot of potential 💯<br />
                                            Keep growing 💗✨</p>
                                        <p>And, unkitta neraiya sollanum nu thonudhu dhaan, but ethalam intha message la solradu nu therila 😝<br />
                                            And also, this is not a melting, sad, polambifing message.<br />
                                            I just want to tell things to you…</p>
                                        <p className="font-handwriting text-3xl md:text-4xl text-primary mt-6 text-center">Happy Valentine’s, girl 🤍✨</p>
                                    </div>

                                    <div className="flex justify-center mt-8">
                                        <button
                                            onClick={() => window.open("https://www.instagram.com/astro_raja03/", "_blank")}
                                            className="px-6 py-2 bg-primary text-[#f4e4bc] font-serif text-lg rounded-full hover:bg-[#8e6370] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center gap-2"
                                        >
                                            <span>Thanks</span>
                                            <span className="text-xs">↗</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-6 md:space-y-8">
                                    <h2 className="font-handwriting text-4xl md:text-5xl text-secondary mb-2">
                                        Happy Birthday!
                                    </h2>

                                    <div className="text-base md:text-lg font-serif text-ink italic leading-relaxed space-y-4 text-left md:text-center">
                                        <p>My Dearest,</p>
                                        <p>On this special day, I just want to remind you how incredibly amazing you are.</p>
                                        <p>May your year be filled with as much joy, laughter, and magic as you bring into the world just by being you.</p>
                                        <p>Wishing you all the love and happiness you deserve.</p>
                                        <p className="font-handwriting text-3xl md:text-4xl text-secondary mt-6 text-center">Have a blast! 🎉✨</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
