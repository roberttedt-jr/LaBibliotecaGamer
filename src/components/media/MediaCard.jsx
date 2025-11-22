import React from 'react';
import { motion } from 'framer-motion';
import { Star, PlayCircle, PlusCircle, CheckCircle } from 'lucide-react';
import { IMAGE_URL } from '../../services/tmdb';
import { Badge } from '../ui/Glass';

export const MediaCard = ({ movie, onClick, isListed, onToggleList }) => {
    return (
        <motion.div
            layoutId={`card-${movie.id}`}
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
            className="group relative aspect-[2/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl ring-1 ring-white/10 bg-[#1a1a1a]"
        >
            <img
                src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg leading-tight mb-2 drop-shadow-lg line-clamp-2">
                        {movie.title || movie.name}
                    </h3>

                    <div className="flex items-center justify-between">
                        <Badge className="bg-yellow-500/80 text-black border-none flex items-center gap-1">
                            <Star size={10} fill="black" /> {movie.vote_average?.toFixed(1)}
                        </Badge>

                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleList?.(movie); }}
                                className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors backdrop-blur-md"
                            >
                                {isListed ? <CheckCircle size={18} /> : <PlusCircle size={18} />}
                            </button>
                            <button className="p-2 rounded-full bg-white text-black hover:scale-110 transition-transform">
                                <PlayCircle size={18} fill="black" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
