import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, FileText, LogOut, Heart, Code, Moon, Sun, Check, Monitor } from 'lucide-react';

// Reusing the PROVIDERS constant here for the preferences editor
const PROVIDERS = [
    { id: 8, name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
    { id: 337, name: "Disney+", logo: "https://logo.clearbit.com/disneyplus.com" },
    { id: 119, name: "Amazon Prime", logo: "https://logo.clearbit.com/primevideo.com" },
    { id: 384, name: "HBO Max", logo: "https://logo.clearbit.com/hbomax.com" },
    { id: 350, name: "Apple TV+", logo: "https://logo.clearbit.com/tv.apple.com" },
];

const SettingsModal = ({ user, onClose, onLogout, theme, toggleTheme, currentProfile, onUpdateProfile }) => {
    const [activeTab, setActiveTab] = useState('account'); // 'account', 'settings', 'legal'
    const [selectedProviders, setSelectedProviders] = useState(currentProfile?.providers || []);

    const handleProviderToggle = (id) => {
        const updated = selectedProviders.includes(id)
            ? selectedProviders.filter(p => p !== id)
            : [...selectedProviders, id];
        setSelectedProviders(updated);
        onUpdateProfile({ ...currentProfile, providers: updated });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`relative w-full max-w-4xl h-[80vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-black/10'}`}
            >
                {/* Sidebar */}
                <div className={`w-full md:w-1/3 p-6 flex flex-col border-b md:border-b-0 md:border-r transition-colors duration-300 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                    <h2 className={`text-2xl font-bold mb-8 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${currentProfile?.avatar?.gradient || 'from-blue-600 to-blue-400'}`}>
                            {currentProfile?.avatar?.icon || <User size={18} />}
                        </div>
                        {currentProfile?.name || 'Mi Cuenta'}
                    </h2>

                    <nav className="space-y-2 flex-1">
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'account' ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-black') : (theme === 'dark' ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-black/60 hover:text-black hover:bg-black/5')}`}
                        >
                            <User size={18} /> Perfil
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings' ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-black') : (theme === 'dark' ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-black/60 hover:text-black hover:bg-black/5')}`}
                        >
                            <Monitor size={18} /> Configuración
                        </button>
                        <button
                            onClick={() => setActiveTab('legal')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'legal' ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-black') : (theme === 'dark' ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-black/60 hover:text-black hover:bg-black/5')}`}
                        >
                            <FileText size={18} /> Legal
                        </button>
                    </nav>

                    <div className={`mt-auto pt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                        >
                            <LogOut size={18} /> Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className={`flex-1 p-8 overflow-y-auto relative ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-all z-10 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
                    >
                        <X size={20} />
                    </button>

                    <div className="max-w-xl mx-auto">
                        <AnimatePresence mode="wait">
                            {activeTab === 'account' && (
                                <motion.div key="account" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <section className="mb-12">
                                        <h3 className="text-xl font-bold mb-6">Información Personal</h3>
                                        <div className="space-y-6">
                                            <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                                                <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Email</label>
                                                <div className="font-medium text-lg">{user?.email}</div>
                                            </div>
                                            <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                                                <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>ID de Usuario</label>
                                                <div className={`font-mono text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{user?.id}</div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="mb-12">
                                        <h3 className="text-xl font-bold mb-6">Suscripción</h3>
                                        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30 flex items-center justify-between">
                                            <div>
                                                <div className="text-blue-500 font-bold mb-1">Plan Premium</div>
                                                <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Próxima facturación: 22 Dic 2025</div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-bold">ACTIVO</span>
                                        </div>
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <section className="mb-12">
                                        <h3 className="text-xl font-bold mb-6">Apariencia</h3>
                                        <div className={`p-5 rounded-2xl border flex items-center justify-between ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                                            <div className="flex items-center gap-3">
                                                {theme === 'dark' ? <Moon size={24} className="text-purple-400" /> : <Sun size={24} className="text-orange-400" />}
                                                <div>
                                                    <div className="font-bold">Modo {theme === 'dark' ? 'Oscuro' : 'Claro'}</div>
                                                    <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Ajusta el tema de la aplicación</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={toggleTheme}
                                                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'}`}
                                            >
                                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
                                            </button>
                                        </div>
                                    </section>

                                    <section className="mb-12">
                                        <h3 className="text-xl font-bold mb-6">Mis Plataformas</h3>
                                        <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Selecciona los servicios que tienes contratados para personalizar tu catálogo.</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {PROVIDERS.map(provider => (
                                                <button
                                                    key={provider.id}
                                                    onClick={() => handleProviderToggle(provider.id)}
                                                    className={`relative p-3 rounded-xl border transition-all flex items-center gap-3 ${selectedProviders.includes(provider.id) ? 'bg-blue-500/10 border-blue-500' : (theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-black/10 hover:bg-gray-100')}`}
                                                >
                                                    <div className="w-auto h-8 flex items-center justify-center flex-shrink-0">
                                                        <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain" />
                                                    </div>
                                                    <span className={`text-sm font-medium ${selectedProviders.includes(provider.id) ? (theme === 'dark' ? 'text-white' : 'text-black') : (theme === 'dark' ? 'text-white/60' : 'text-black/60')}`}>{provider.name}</span>
                                                    {selectedProviders.includes(provider.id) && (
                                                        <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                            <Check size={12} className="text-white" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'legal' && (
                                <motion.div key="legal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <section className="mb-8">
                                        <h3 className="text-xl font-bold mb-4">Términos de Uso</h3>
                                        <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                                            Bienvenido a Flicker. Al utilizar nuestra plataforma, aceptas cumplir con estos términos.
                                            El contenido mostrado es propiedad de sus respectivos dueños y se utiliza aquí con fines demostrativos.
                                        </p>
                                    </section>
                                    <section className="mb-8">
                                        <h3 className="text-xl font-bold mb-4">Política de Privacidad</h3>
                                        <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                                            Nos tomamos muy en serio tu privacidad. Solo recopilamos la información necesaria para gestionar tu cuenta y mejorar tu experiencia.
                                            No compartimos tus datos con terceros sin tu consentimiento explícito.
                                        </p>
                                    </section>
                                    <section>
                                        <h3 className="text-xl font-bold mb-4">Licencias</h3>
                                        <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                                            Esta aplicación utiliza la API de TMDB pero no está avalada ni certificada por TMDB.
                                            Iconos por Lucide React. Fuentes por Google Fonts.
                                        </p>
                                    </section>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer Credit */}
                        <div className={`mt-12 pt-8 border-t flex flex-col items-center text-center ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                                <Code size={24} className="text-white" />
                            </div>
                            <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Diseñado y Desarrollado por</p>
                            <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 tracking-tight mb-6">
                                Roberto
                            </h4>
                            <div className={`flex gap-4 text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
                                <span>v2.5.0</span>
                                <span>•</span>
                                <span>Madrid, ES</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SettingsModal;
