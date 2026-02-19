"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, SkipForward, ListMusic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PLAYLIST = [
    { title: "Ordinary", src: "/audio/ordinary.mp3", caption: "Because with you, nothing is ordinary." },
    { title: "Theethiriyaai", src: "/audio/theethiriyaai.mp3", caption: "The spark that started it all." },
    { title: "Nallaru Po", src: "/audio/nallaru_po.mp3", caption: "A melody for you." },
    { title: "Theme", src: "/audio/background.mp3", caption: "Our timeless background." },
];

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
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

    const selectTrack = (index: number) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
        setIsPlaylistOpen(false);
    };

    return (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
            <motion.div
                key={currentTrackIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="hidden md:block bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm text-amber-200 whitespace-nowrap"
            >
                <span className="font-medium mr-2 text-white/80">Now Playing:</span>
                <span className="italic">{PLAYLIST[currentTrackIndex].caption}</span>
            </motion.div>

            <AnimatePresence>
                {isPlaylistOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-14 right-0 w-48 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl"
                    >
                        {PLAYLIST.map((track, index) => (
                            <button
                                key={index}
                                onClick={() => selectTrack(index)}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/10 ${currentTrackIndex === index ? "text-amber-200 font-medium bg-white/5" : "text-white/80"
                                    }`}
                            >
                                {track.title}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-2">
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                    className={`p-3 rounded-full backdrop-blur-sm border border-white/10 text-foreground transition-colors ${isPlaylistOpen ? "bg-white/20" : "bg-white/5 hover:bg-white/10"
                        }`}
                    aria-label="Playlist"
                    title="Playlist"
                >
                    <ListMusic size={20} />
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
        </div>
    );
}
