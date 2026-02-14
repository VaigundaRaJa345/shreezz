"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio("/audio/background.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((err) => {
                    console.error("Audio playback failed:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={togglePlay}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-foreground hover:bg-white/10 transition-colors"
            aria-label={isPlaying ? "Mute music" : "Play music"}
        >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>
    );
}
