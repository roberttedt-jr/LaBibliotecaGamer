import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Video } from 'lucide-react';
import { GlassButton } from '../ui/Glass';

export const Navbar = ({ activeTab, setActiveTab, currentProfile, onViewProfile }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'}`}
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('movies')}>
                    <div className="relative text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <Video size={32} strokeWidth={2.5} className="fill-white/10" />
                    </div>
                    <span className="font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 text-2xl drop-shadow-2xl">
                        FLICKER
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                    {['movies', 'series', 'search', 'mylist'].map(id => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${activeTab === id ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {id === 'movies' ? 'CINE' : id === 'series' ? 'SERIES' : id === 'search' ? 'EXPLORAR' : 'MI LISTA'}
                        </button>
                    ))}
                </nav>

                {/* Profile Button */}
                <GlassButton
                    variant="glass"
                    onClick={onViewProfile}
                    className="rounded-full pl-4 pr-2 py-1.5 flex items-center gap-3 border-white/10"
                >
                    <span className="text-xs font-bold text-gray-300 hidden sm:block">
                        {currentProfile?.name || 'Invitado'}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gradient-to-br ${currentProfile?.avatar?.gradient || 'from-gray-700 to-gray-900'} shadow-inner text-white`}>
                        {currentProfile?.avatar?.icon || <User size={14} />}
                    </div>
                </GlassButton>
            </div>
        </motion.header>
    );
};
