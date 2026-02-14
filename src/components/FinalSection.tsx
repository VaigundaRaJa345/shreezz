"use client";

import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";

export function FinalSection() {
    return (
        <footer className="w-full py-20 flex flex-col items-center justify-center relative overflow-hidden bg-primary/5">

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center z-10 space-y-4"
            >
                <p className="font-serif text-sm uppercase tracking-[0.2em] text-ink/40">
                    Until next time
                </p>
                <p className="font-handwriting text-4xl md:text-5xl text-primary transform -rotate-2">
                    Yours truly.
                </p>
            </motion.div>

            <div className="mt-12 flex space-x-6 z-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <a href="#" className="text-ink hover:text-primary transition-colors">
                    <Twitter size={18} />
                </a>
                <a href="#" className="text-ink hover:text-primary transition-colors">
                    <Github size={18} />
                </a>
            </div>
        </footer>
    );
}
