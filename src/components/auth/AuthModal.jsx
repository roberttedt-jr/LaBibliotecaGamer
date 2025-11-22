import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GlassPanel, GlassButton } from '../ui/Glass';

export const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { signIn, signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <GlassPanel className="relative w-full max-w-md p-8 rounded-[2rem] bg-black/60">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/40 hover:text-white transition"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold text-white text-center mb-2">
                    {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
                </h2>
                <p className="text-white/40 text-center mb-8 text-sm">
                    {isLogin ? 'Inicia sesión para continuar' : 'Únete a la comunidad de Flicker'}
                </p>

                {error && (
                    <div className="mb-6 p-3 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center gap-3 text-red-200 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-2">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <GlassButton
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl font-bold text-lg mt-6"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                    </GlassButton>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </GlassPanel>
        </div>
    );
};
