"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const phrases = [
    "It started with a glance...",
    "Then a smile that refused to fade...",
    "And now, every thought leads back to you.",
];

export function Story() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative w-full py-40 px-4 space-y-64 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

            {phrases.map((phrase, index) => (
                <Phrase key={index} text={phrase} index={index} />
            ))}
        </div>
    );
}

function Phrase({ text, index }: { text: string; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50, rotate: isEven ? -2 : 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: isEven ? -1 : 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex ${isEven ? 'justify-start md:ml-20' : 'justify-end md:mr-20'} relative`}
        >
            <div className="relative max-w-xl bg-paper p-8 md:p-12 shadow-md transform transition-transform hover:scale-[1.02] duration-500">
                {/* Tape effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 rotate-1 backdrop-blur-[1px] shadow-sm transform -skew-x-12" />

                <p className="text-2xl md:text-4xl font-handwriting text-ink leading-relaxed text-center">
                    {text}
                </p>

                {/* Ink blot decoration */}
                <div className={`absolute -bottom-4 ${isEven ? '-right-4' : '-left-4'} w-12 h-12 bg-primary/10 rounded-full blur-md`} />
            </div>
        </motion.div>
    );
}
