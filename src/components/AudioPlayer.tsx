"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, SkipForward, Shuffle } from "lucide-react";
import { motion } from "framer-motion";

const PLAYLIST = [
    { title: "Theme", src: "/audio/background.mp3" },
    { title: "Melody", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Harmony", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        const audio = new Audio(PLAYLIST[0].src);
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        // Function to start playing
        const startAudio = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    // Remove listeners once playing
                    document.removeEventListener('scroll', startAudio);
                    document.removeEventListener('click', startAudio);
                }).catch((error) => {
                    console.log("Audio playback failed, possibly blocked:", error);
                });
            }
        };

        // Add listeners for scroll and click
        document.addEventListener('scroll', startAudio);
        document.addEventListener('click', startAudio);

        return () => {
            document.removeEventListener('scroll', startAudio);
            document.removeEventListener('click', startAudio);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Handle track changes
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            audioRef.current.src = PLAYLIST[currentTrackIndex].src;
            if (wasPlaying) {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
            }
        }
    }, [currentTrackIndex]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch((err) => {
                    console.error("Audio playback failed:", err);
                });
            }
        }
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const randomTrack = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * PLAYLIST.length);
        } while (newIndex === currentTrackIndex && PLAYLIST.length > 1);
        setCurrentTrackIndex(newIndex);
        setIsPlaying(true);
    };

    return (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                onClick={randomTrack}
                className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-foreground hover:bg-white/10 transition-colors"
                aria-label="Random song"
                title="Random Song"
            >
                <Shuffle size={20} />
            </motion.button>

            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                onClick={nextTrack}
                className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-foreground hover:bg-white/10 transition-colors"
                aria-label="Next song"
                title="Next Song"
            >
                <SkipForward size={20} />
            </motion.button>

            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-foreground hover:bg-white/10 transition-colors"
                aria-label={isPlaying ? "Mute music" : "Play music"}
                title={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </motion.button>
        </div>
    );
}
