import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Zap, Skull, Bot, Eye, Rocket, Crown, Wand2, Ghost, X } from 'lucide-react';
import { GlassPanel, GlassButton } from '../ui/Glass';

export const PROFILE_AVATARS = [
    { id: 'hero', icon: <Zap size={32} />, gradient: 'from-blue-500 to-cyan-400', label: 'Héroe' },
    { id: 'villain', icon: <Skull size={32} />, gradient: 'from-purple-600 to-pink-500', label: 'Villano' },
    { id: 'robot', icon: <Bot size={32} />, gradient: 'from-slate-500 to-slate-300', label: 'Sci-Fi' },
    { id: 'detective', icon: <Eye size={32} />, gradient: 'from-amber-500 to-orange-600', label: 'Misterio' },
    { id: 'alien', icon: <Rocket size={32} />, gradient: 'from-emerald-500 to-teal-400', label: 'Explorador' },
    { id: 'king', icon: <Crown size={32} />, gradient: 'from-yellow-500 to-amber-400', label: 'Realeza' },
    { id: 'wizard', icon: <Wand2 size={32} />, gradient: 'from-indigo-500 to-violet-500', label: 'Fantasía' },
    { id: 'zombie', icon: <Ghost size={32} />, gradient: 'from-lime-500 to-green-600', label: 'Terror' },
];

export const ProfileSelector = ({ profiles, onSelect, onCreate, onDelete, onClose }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAvatar, setNewAvatar] = useState(PROFILE_AVATARS[0]);

    const handleCreate = () => {
        if (newName) {
            onCreate(newName, newAvatar);
            setIsCreating(false);
            setNewName('');
        }
    };

    if (isCreating) {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl">
                <GlassPanel className="w-full max-w-lg p-10 rounded-[3rem] relative">
                    <button onClick={() => setIsCreating(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition"><X size={24} /></button>
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Nuevo Perfil</h2>

                    <div className="flex justify-center mb-10">
                        <div className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center text-white text-7xl bg-gradient-to-br ${newAvatar.gradient} shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-4 ring-white/10`}>
                            {newAvatar.icon}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-10">
                        {PROFILE_AVATARS.map(av => (
                            <button
                                key={av.id}
                                onClick={() => setNewAvatar(av)}
                                className={`aspect-square rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 bg-gradient-to-br ${av.gradient} ${newAvatar.id === av.id ? 'ring-4 ring-white shadow-lg scale-110' : 'opacity-40 hover:opacity-100'}`}
                            >
                                <div className="scale-75">{av.icon}</div>
                            </button>
                        ))}
                    </div>

                    <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        className="w-full p-5 rounded-2xl text-center text-xl font-bold mb-8 bg-black/20 border border-white/10 text-white focus:border-white/50 outline-none"
                        placeholder="Nombre del perfil"
                        autoFocus
                    />

                    <GlassButton onClick={handleCreate} disabled={!newName} className="w-full py-4 rounded-2xl font-bold text-lg">
                        Crear Perfil
                    </GlassButton>
                </GlassPanel>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl">
            <GlassPanel className="w-full max-w-5xl p-12 md:p-24 rounded-[3rem] flex flex-col items-center relative bg-black/40">
                {profiles.length > 0 && (
                    <button onClick={onClose} className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
                        <X size={24} />
                    </button>
                )}

                <h2 className="text-3xl font-light text-white/80 mt-4 mb-16 tracking-wide">¿Quién está viendo?</h2>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {profiles.map(profile => (
                        <div key={profile.id} className="group flex flex-col items-center gap-4 relative">
                            <motion.button
                                whileHover={{ scale: 1.1, y: -10 }}
                                onClick={() => onSelect(profile)}
                                className={`w-24 h-24 md:w-40 md:h-40 rounded-[2rem] flex items-center justify-center text-white shadow-2xl ring-4 ring-transparent hover:ring-white/50 bg-gradient-to-br ${profile.avatar.gradient}`}
                            >
                                {profile.avatar.icon}
                            </motion.button>
                            <span className="text-lg md:text-xl font-medium text-white/60 group-hover:text-white transition-colors">{profile.name}</span>
                            <button onClick={() => onDelete(profile.id)} className="absolute -top-2 -right-2 p-2 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}

                    {profiles.length < 5 && (
                        <div className="flex flex-col items-center gap-4 group">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setIsCreating(true)}
                                className="w-24 h-24 md:w-40 md:h-40 rounded-[2rem] flex items-center justify-center bg-white/5 border-2 border-dashed border-white/20 text-white/40 hover:text-white hover:border-white hover:bg-white/10"
                            >
                                <Plus size={40} />
                            </motion.button>
                            <span className="text-lg md:text-xl font-medium text-white/40 group-hover:text-white transition-colors">Crear</span>
                        </div>
                    )}
                </div>
            </GlassPanel>
        </div>
    );
};
