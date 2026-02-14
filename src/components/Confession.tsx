"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Confession() {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">

            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 100, transition: { duration: 0.5 } }}
                        className="relative cursor-pointer group"
                        onClick={() => setIsRevealed(true)}
                    >
                        {/* Vintage Envelope */}
                        <div className="w-80 h-52 bg-[#e6cece] shadow-2xl relative flex items-center justify-center transform transition-transform group-hover:scale-105 duration-500 rounded-sm">
                            <div className="absolute inset-0 border-2 border-[#dcd0ff] m-2 border-dashed opacity-50" />

                            {/* Wax Seal with Heartbeat */}
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-16 h-16 rounded-full bg-[#7c525f] shadow-lg flex items-center justify-center z-20 border-4 border-[#967bb6]/30 relative"
                            >
                                <div className="text-[#f4e4bc] font-serif text-2xl italic">V</div>
                            </motion.div>
                        </div>

                        <p className="mt-8 text-center font-serif text-ink/60 tracking-widest text-sm uppercase group-hover:text-primary transition-colors">
                            Tap the seal to open
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="message"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-2xl bg-paper p-12 md:p-16 shadow-2xl relative transform rotate-1"
                    >
                        {/* Paper Texture Overlay for message */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none" />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <div className="text-center space-y-8">
                                <h2 className="font-handwriting text-5xl md:text-6xl text-primary mb-6">
                                    Not a Proposal
                                </h2>

                                <div className="text-lg md:text-xl font-serif text-ink italic leading-relaxed space-y-4">
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
                                    <p>And, unkitta neraiya sollanum nu thonudhu dhaan, but solla varala 😝<br />
                                        And also, this is not a melting, sad, polambifying message.<br />
                                        I just want to tell things to you…</p>
                                </div>

                                <div className="w-32 h-[1px] bg-ink/20" />
                            </div>

                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => window.open("https://www.instagram.com/astro_raja03/", "_blank")}
                                    className="px-8 py-3 bg-primary text-[#f4e4bc] font-serif text-xl rounded-full hover:bg-[#8e6370] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 flex items-center gap-2"
                                >
                                    <span>Thanks</span>
                                    <span className="text-sm">↗</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
}
