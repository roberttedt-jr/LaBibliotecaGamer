import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, Check, Star, Calendar, Globe } from 'lucide-react';
import { tmdb, IMAGE_URL, BACKDROP_URL } from '../../services/tmdb';
import { GlassPanel, GlassButton, Badge } from '../ui/Glass';
import { ReviewsSection } from './ReviewsSection';

export const MovieDetailModal = ({ movie, onClose, isListed, onToggleList }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const type = movie.media_type === 'tv' || !movie.title ? 'tv' : 'movie';
                const [providers, videos] = await Promise.all([
                    tmdb.getProviders(type, movie.id),
                    tmdb.getVideos(type, movie.id)
                ]);

                const trailer = videos.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
                const flatrate = providers.results?.ES?.flatrate || [];

                setDetails({ trailer, providers: flatrate });
            } catch (e) {
                console.error("Error fetching details", e);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [movie]);

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] bg-[#121212] shadow-2xl border border-white/10 scrollbar-hide"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/50 hover:bg-white text-white hover:text-black transition-all"
                >
                    <X size={24} />
                </button>

                <div className="relative h-[50vh]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10" />
                    <img
                        src={movie.backdrop_path ? `${BACKDROP_URL}${movie.backdrop_path}` : `${IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                        <h2 className="text-5xl font-black text-white mb-4 drop-shadow-xl">{movie.title || movie.name}</h2>
                        <div className="flex items-center gap-4 mb-6">
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                {Math.round(movie.vote_average * 10)}% Match
                            </Badge>
                            <span className="text-white/60">{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
                            <Badge className="border-white/20">HD</Badge>
                        </div>

                        <div className="flex gap-4">
                            <GlassButton className="px-8 py-3 rounded-xl font-bold text-lg bg-white text-black hover:bg-white/90 border-none">
                                <Play size={20} fill="black" /> Reproducir
                            </GlassButton>
                            <GlassButton
                                onClick={() => onToggleList(movie)}
                                className="px-8 py-3 rounded-xl font-bold text-lg bg-white/10 hover:bg-white/20"
                            >
                                {isListed ? <Check size={20} /> : <Plus size={20} />} Mi Lista
                            </GlassButton>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid md:grid-cols-[2fr_1fr] gap-12">
                    <div>
                        <p className="text-lg text-white/80 leading-relaxed font-light mb-8">
                            {movie.overview}
                        </p>

                        {details?.providers?.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-white/40 font-bold uppercase text-sm mb-4">Disponible en</h3>
                                <div className="flex gap-4">
                                    {details.providers.map(p => (
                                        <img
                                            key={p.provider_id}
                                            src={`${IMAGE_URL}${p.logo_path}`}
                                            alt={p.provider_name}
                                            className="w-12 h-12 rounded-xl shadow-lg"
                                            title={p.provider_name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span className="text-white/40 text-sm block mb-1">Géneros</span>
                            <div className="flex flex-wrap gap-2">
                                {/* Note: We don't have genre names here easily without mapping ids, keeping simple for now */}
                                {movie.genre_ids?.map(id => (
                                    <Badge key={id} className="bg-white/5 border-white/5 text-white/60">
                                        {id}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="text-white/40 text-sm block mb-1">Valoración</span>
                            <div className="flex items-center gap-2 text-yellow-500">
                                <Star fill="currentColor" size={18} />
                                <span className="text-white font-bold">{movie.vote_average?.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-12">
                    <ReviewsSection movieId={movie.id} movieTitle={movie.title || movie.name} />
                </div>

            </motion.div>
        </div>
    );
};
