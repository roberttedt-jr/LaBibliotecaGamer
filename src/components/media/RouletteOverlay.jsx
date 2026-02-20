import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Sparkles } from 'lucide-react';

const RouletteOverlay = ({ movies, onComplete, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSpinning, setIsSpinning] = useState(true);
    const [winner, setWinner] = useState(null);

    // Refs to maintain state across renders without resetting the loop
    const indexRef = useRef(0);
    const counterRef = useRef(0);
    const speedRef = useRef(50);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!isSpinning || movies.length === 0) return;

        const spin = () => {
            // Update index
            indexRef.current = (indexRef.current + 1) % movies.length;
            setCurrentIndex(indexRef.current);

            counterRef.current++;

            // Slow down logic
            if (counterRef.current > 20) {
                speedRef.current += 30;
            }

            // Stop condition
            if (counterRef.current >= 30) {
                setIsSpinning(false);
                setWinner(movies[indexRef.current]);
            } else {
                timeoutRef.current = setTimeout(spin, speedRef.current);
            }
        };

        timeoutRef.current = setTimeout(spin, speedRef.current);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isSpinning, movies]); // Removed currentIndex dependency to prevent infinite loop

    const handleWatch = () => {
        if (winner) {
            onComplete(winner);
        }
    };

    const currentMovie = movies[currentIndex];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 touch-none">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
            >
                <X size={24} />
            </button>

            <div className="flex flex-col items-center w-full max-w-md max-h-[90vh]">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        {isSpinning ? "Eligiendo para ti..." : "¡Tenemos una ganadora!"}
                    </h2>
                    <p className="text-white/60 text-sm md:text-base">
                        {isSpinning ? "Explorando el catálogo..." : "Creemos que te encantará esta opción."}
                    </p>
                </div>

                <div className="relative w-full max-w-[280px] aspect-[2/3] rounded-3xl p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
                    <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-black relative flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                            <motion.img
                                key={currentMovie?.id}
                                initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.1 }}
                                src={`https://image.tmdb.org/t/p/w500${currentMovie?.poster_path}`}
                                alt="Movie Cover"
                                className="w-full h-full object-contain"
                            />
                        </AnimatePresence>

                        {!isSpinning && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight drop-shadow-lg line-clamp-2">
                                    {currentMovie?.title || currentMovie?.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500/30">
                                        ★ {currentMovie?.vote_average?.toFixed(1)}
                                    </span>
                                    <span className="text-white/60 text-xs">
                                        {currentMovie?.release_date?.split('-')[0] || currentMovie?.first_air_date?.split('-')[0]}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {!isSpinning && (
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWatch}
                        className="mt-8 px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg shadow-xl flex items-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                        <Play size={20} fill="black" /> Ver Ahora
                    </motion.button>
                )}

                {isSpinning && (
                    <div className="mt-8 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RouletteOverlay;
