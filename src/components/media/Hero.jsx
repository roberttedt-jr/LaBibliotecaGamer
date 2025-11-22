import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { BACKDROP_URL, IMAGE_URL } from '../../services/tmdb';
import { GlassButton, Badge } from '../ui/Glass';

export const Hero = ({ movie, onClick }) => {
    if (!movie) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[70vh] w-full rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group cursor-pointer"
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

            <motion.img
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 20, ease: "linear" }}
                src={movie.backdrop_path ? `${BACKDROP_URL}${movie.backdrop_path}` : `${IMAGE_URL}${movie.poster_path}`}
                alt="Hero"
                className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 max-w-4xl">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30 backdrop-blur-xl">
                        #1 en Tendencias
                    </Badge>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-[0.9] tracking-tight">
                        {movie.title || movie.name}
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl line-clamp-2 max-w-2xl drop-shadow-md font-light mb-8 backdrop-blur-sm rounded-xl p-2 -ml-2">
                        {movie.overview}
                    </p>
                    <div className="flex gap-4">
                        <GlassButton className="px-8 py-4 rounded-2xl font-bold text-lg bg-white text-black hover:bg-white/90 border-none">
                            <Play size={24} fill="black" /> Ver Ahora
                        </GlassButton>
                        <GlassButton variant="glass" className="px-8 py-4 rounded-2xl font-bold text-lg">
                            <Info size={24} /> Más Info
                        </GlassButton>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
