import React, { useState, useEffect } from 'react';
import { Star, Send, User, Trash2, Loader2 } from 'lucide-react';
import { GlassButton, GlassPanel } from '../ui/Glass';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export const ReviewsSection = ({ movieId, movieTitle }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetchReviews();
    }, [movieId]);

    const fetchReviews = async () => {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('movie_id', movieId.toString())
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReviews(data || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReview.trim() || rating === 0 || !user) return;

        setSubmitting(true);
        try {
            const { data, error } = await supabase
                .from('reviews')
                .insert([
                    {
                        movie_id: movieId.toString(),
                        user_id: user.id,
                        user_email: user.email,
                        rating,
                        comment: newReview,
                    }
                ])
                .select();

            if (error) throw error;

            setReviews([data[0], ...reviews]);
            setNewReview('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error al enviar la reseña. Por favor, inténtalo de nuevo.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('reviews')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id); // Security check

            if (error) throw error;
            setReviews(reviews.filter(r => r.id !== id));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-6">Opiniones y Valoraciones</h3>

            {/* Formulario */}
            <GlassPanel className="p-6 rounded-2xl bg-white/5 mb-8">
                {!user ? (
                    <div className="text-center py-4">
                        <p className="text-white/60 mb-2">Inicia sesión para dejar tu opinión</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-white/60 text-sm">Tu calificación:</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            size={24}
                                            fill={star <= (hoverRating || rating) ? "#fbbf24" : "none"}
                                            className={star <= (hoverRating || rating) ? "text-yellow-400" : "text-white/20"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder={`¿Qué te pareció ${movieTitle}?`}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:border-white/30 focus:outline-none resize-none min-h-[100px]"
                        />

                        <div className="flex justify-end">
                            <GlassButton
                                onClick={handleSubmit}
                                disabled={!newReview.trim() || rating === 0 || submitting}
                                className={`px-6 py-2 rounded-xl font-bold text-sm ${(!newReview.trim() || rating === 0 || submitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {submitting ? <Loader2 className="animate-spin" size={16} /> : <><Send size={16} /> Publicar Opinión</>}
                            </GlassButton>
                        </div>
                    </div>
                )}
            </GlassPanel>

            {/* Lista de Reviews */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="animate-spin text-white/30" />
                    </div>
                ) : (
                    <AnimatePresence>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white/5 border border-white/5 rounded-2xl p-5"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm">{review.user_email?.split('@')[0] || 'Usuario'}</h4>
                                                <span className="text-white/30 text-xs">{new Date(review.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < review.rating ? "#fbbf24" : "none"}
                                                    className={i < review.rating ? "text-yellow-400" : "text-white/10"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-white/80 text-sm leading-relaxed pl-[52px]">
                                        {review.comment}
                                    </p>
                                    {user && user.id === review.user_id && (
                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={() => handleDelete(review.id)}
                                                className="text-white/20 hover:text-red-400 transition-colors p-2"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-white/30 italic">
                                Sé el primero en opinar sobre esta película.
                            </div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};
