"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, SkipForward, ListMusic, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Diary } from "./Diary";

const PLAYLIST = [
    { title: "Ordinary", src: "/audio/ordinary.mp3", caption: "Because with you, nothing is ordinary." },
    { title: "Theethiriyaai", src: "/audio/theethiriyaai.mp3", caption: "This is how i fell for you in 7th STD." },
    { title: "Nallaru Po", src: "/audio/nallaru_po.mp3", caption: "Then, Master the art of \"Watching you from the far\"." },
    { title: "Mudhal nee mudivum nee", src: "/audio/background.mp3", caption: "My timeless confusion." },
];

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
    const [isDiaryOpen, setIsDiaryOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Randomize start track
        const randomIndex = Math.floor(Math.random() * PLAYLIST.length);
        setCurrentTrackIndex(randomIndex);

        // Initialize audio with random track
        const audio = new Audio(PLAYLIST[randomIndex].src);
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
        <>
            <Diary isOpen={isDiaryOpen} onClose={() => setIsDiaryOpen(false)} />

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 w-max">
                <motion.div
                    key={currentTrackIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs md:text-sm text-amber-200 whitespace-normal md:whitespace-nowrap text-center mb-2 shadow-lg max-w-[90vw]"
                >
                    <span className="font-medium mr-2 text-white/80">Now Playing:</span>
                    <span className="italic">{PLAYLIST[currentTrackIndex].caption}</span>
                </motion.div>

                <div className="flex items-center gap-2 p-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10 shadow-2xl relative">
                    <AnimatePresence>
                        {isPlaylistOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-2xl"
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

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        onClick={() => setIsDiaryOpen(true)}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/20 text-amber-100 transition-colors border border-white/5"
                        aria-label="Open Diary"
                        title="Open Diary"
                    >
                        <BookOpen size={20} />
                    </motion.button>

                    <div className="w-px h-6 bg-white/10 mx-1"></div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                        className={`p-3 rounded-full border border-white/5 text-foreground transition-colors ${isPlaylistOpen ? "bg-white/20 text-white" : "bg-white/5 hover:bg-white/20 text-white/90"
                            }`}
                        aria-label="Playlist"
                        title="Playlist"
                    >
                        <ListMusic size={20} />
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 }}
                        onClick={nextTrack}
                        className="p-3 rounded-full bg-white/5 border border-white/5 text-white/90 hover:bg-white/20 transition-colors"
                        aria-label="Next song"
                        title="Next Song"
                    >
                        <SkipForward size={20} />
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        onClick={togglePlay}
                        className="p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/25 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        aria-label={isPlaying ? "Mute music" : "Play music"}
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </motion.button>
                </div>
            </div>
        </>
    );
}
