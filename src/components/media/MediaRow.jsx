import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, List } from 'lucide-react';
import { MediaCard } from './MediaCard';

export const MediaRow = ({ title, items, myList, onMovieClick, onToggleList, icon }) => {
    const rowRef = useRef(null);

    if (!items || items.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
        >
            <div className="group flex items-center gap-2 mb-6 px-2 text-2xl font-bold text-white hover:text-blue-400 transition-colors cursor-pointer">
                {icon}
                <span>{title}</span>
                <div className="flex items-center text-sm font-normal text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all ml-2">
                    Ver todo <ChevronRight size={16} />
                </div>
            </div>

            <div
                ref={rowRef}
                className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 md:-mx-12 md:px-12 scrollbar-hide snap-x snap-mandatory"
            >
                {items.map((movie) => (
                    <div key={movie.id} className="min-w-[160px] w-[160px] md:min-w-[220px] md:w-[220px] snap-start">
                        <MediaCard
                            movie={movie}
                            onClick={() => onMovieClick(movie)}
                            isListed={myList?.some(m => m.id === movie.id)}
                            onToggleList={onToggleList}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
