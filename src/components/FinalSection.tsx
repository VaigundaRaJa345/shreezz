"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export function FinalSection() {
    return (
        <footer className="w-full py-20 flex flex-col items-center justify-center relative overflow-hidden bg-primary/5">

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center z-10 space-y-6 px-4"
            >
                <div className="space-y-2">
                    <p className="font-serif text-sm uppercase tracking-[0.2em] text-ink/40">
                        Until next time
                    </p>
                    <p className="font-handwriting text-4xl md:text-5xl text-primary transform -rotate-2">
                        Yours truly.
                    </p>
                </div>

                <p className="font-handwriting text-xl md:text-2xl text-ink/60 max-w-md mx-auto leading-relaxed italic border-t border-primary/10 pt-6">
                    "I love You, I don't want anything from you, Even your love"
                </p>
            </motion.div>

            <div className="mt-12 flex space-x-6 z-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <a
                    href="https://www.instagram.com/astro_raja03/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-primary transition-colors hover:scale-110 transform duration-300"
                    aria-label="Instagram"
                >
                    <Instagram size={24} />
                </a>
            </div>
        </footer>
    );
}
