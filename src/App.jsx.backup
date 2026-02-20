import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Heart, Play, X, Share2, Plus, Check, Film, Tv, Star, Loader2, Video,
  Trash2, User, AlertTriangle, ChevronRight, WifiOff, ExternalLink, List,
  Zap, Skull, Bot, Eye, Rocket, Crown, Wand2, Ghost, ArrowLeft, Info, PlayCircle, CheckCircle, PlusCircle, LogIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MovieDetailModal } from './components/media/MovieDetailModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthModal } from './components/auth/AuthModal';

// ==========================================
// 1. CONFIGURACIÓN & UTILS
// ==========================================

const API_KEY = 'e342997caa7411d20122efbf21285b51'.trim();
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';

const PROFILE_AVATARS = [
  { id: 'hero', icon: <Zap size={32} />, gradient: 'from-slate-900 via-blue-900 to-slate-900', label: 'Héroe' },
  { id: 'villain', icon: <Skull size={32} />, gradient: 'from-slate-900 via-purple-900 to-slate-900', label: 'Villano' },
  { id: 'futurist', icon: <Bot size={32} />, gradient: 'from-slate-900 via-cyan-900 to-slate-900', label: 'Futurista' },
  { id: 'explorer', icon: <Rocket size={32} />, gradient: 'from-slate-900 via-emerald-900 to-slate-900', label: 'Explorador' },
  { id: 'royal', icon: <Crown size={32} />, gradient: 'from-slate-900 via-amber-900 to-slate-900', label: 'Premium' },
  { id: 'mystic', icon: <Wand2 size={32} />, gradient: 'from-slate-900 via-indigo-900 to-slate-900', label: 'Místico' },
];

const POPULAR_MOVIE_GENRES = [
  { id: 28, name: "Acción" },
  { id: 35, name: "Comedia" },
  { id: 878, name: "Ciencia Ficción" },
  { id: 18, name: "Drama" },
  { id: 53, name: "Thriller" },
  { id: 27, name: "Terror" },
];

const POPULAR_TV_GENRES = [
  { id: 10759, name: "Acción y Aventura" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedia" },
  { id: 80, name: "Crimen" },
  { id: 99, name: "Documental" },
  { id: 10765, name: "Sci-Fi & Fantasía" },
];

const MOCK_DB = [
  {
    id: 101, title: "Inception", overview: "Cobb, un ladrón experto en el arte de la extracción peligrosa...", poster_path: "/9gk7admal44GcmOwCkACI26rYGh.jpg", backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg", vote_average: 8.8, release_date: "2010-07-15", media_type: "movie", genre_ids: [878, 28],
    providers: [{ provider_id: 8, provider_name: "Netflix", logo_path: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg" }],
    trailer: { key: "8hP9D6kZseM" }
  },
  {
    id: 102, title: "Interstellar", overview: "Un equipo de exploradores viaja a través de un agujero de gusano...", poster_path: "/gEU2QniL6C8z1dY4kdNON4RSmMn.jpg", backdrop_path: "/xBKGJQsAIeweesB79KC89FpBrVr.jpg", vote_average: 8.6, release_date: "2014-11-05", media_type: "movie", genre_ids: [878, 18],
    providers: [{ provider_id: 384, provider_name: "HBO Max", logo_path: "/zxrVdFj0zSKNutwwNoISAHmnEFF.jpg" }],
    trailer: { key: "zSWdZVtXT7E" }
  },
];

// ==========================================
// 2. COMPONENTES UI (GLASS)
// ==========================================

const GlassPanel = ({ children, className, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className={`bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const GlassButton = ({ children, className, variant = 'primary', ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`backdrop-blur-md border transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${variant === 'primary' ? "bg-white text-black hover:bg-white/90 border-white/20" :
      variant === 'glass' ? "bg-white/10 text-white hover:bg-white/20 border-white/10" :
        variant === 'danger' ? "bg-red-500/80 text-white hover:bg-red-600 border-red-500/50" : ""
      } ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

const Badge = ({ children, className = "" }) => (
  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/10 border border-white/10 backdrop-blur-md ${className}`}>
    {children}
  </span>
);

const Logo = ({ size = "normal" }) => (
  <div className={`flex items-center group relative ${size === 'large' ? 'scale-150' : 'scale-100'} transition-transform duration-500`}>
    <div className="relative z-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
      <Video size={28} strokeWidth={2.5} className="fill-white/10" />
    </div>
    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-16 w-40 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-transparent blur-xl -z-0 opacity-80" />
    <span className="ml-3 font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 text-2xl drop-shadow-2xl">
      FLICKER
    </span>
  </div>
);

// ==========================================
// 3. APP PRINCIPAL
// ==========================================

function FlickerApp() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [view, setView] = useState('loading'); // 'loading', 'landing', 'profiles', 'create-profile', 'app'
  const [notification, setNotification] = useState(null);
  const [profileToDelete, setProfileToDelete] = useState(null);

  const [activeTab, setActiveTab] = useState('movies');
  const [movies, setMovies] = useState([]);
  const [genreSections, setGenreSections] = useState({});

  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const [loadingContent, setLoadingContent] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [myList, setMyList] = useState([]);
  const [usingBackup, setUsingBackup] = useState(false);
  const searchInputRef = useRef(null);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Efecto Carrusel
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredMovies]);

  // Inicialización y Control de Flujo
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setView('landing');
      setCurrentProfile(null);
      return;
    }

    // Usuario logueado: Cargar perfiles
    const savedProfiles = localStorage.getItem('flickerProfiles');
    let restoredProfiles = [];

    if (savedProfiles) {
      const parsed = JSON.parse(savedProfiles);
      restoredProfiles = parsed.map(p => ({
        ...p,
        avatar: PROFILE_AVATARS.find(a => a.id === p.avatarId) || PROFILE_AVATARS[0]
      }));
      setProfiles(restoredProfiles);
    }

    // Decidir vista basada en perfiles
    if (restoredProfiles.length > 0) {
      if (!currentProfile) {
        setView('profiles');
      }
    } else {
      setView('create-profile');
    }

    // Cargar contenido en segundo plano
    fetchContent('movies');

  }, [user, authLoading]);

  // Persistencia de perfiles
  useEffect(() => {
    if (profiles.length > 0) {
      const toSave = profiles.map(p => ({ ...p, avatarId: p.avatar.id, avatar: null }));
      localStorage.setItem('flickerProfiles', JSON.stringify(toSave));
    }
  }, [profiles]);

  // Persistencia de lista de usuario
  useEffect(() => {
    if (currentProfile) {
      const savedList = localStorage.getItem(`flickerList_${currentProfile.id}`);
      setMyList(savedList ? JSON.parse(savedList) : []);
      setView('app');
      setActiveTab('movies');
    }
  }, [currentProfile]);

  useEffect(() => {
    if (currentProfile) localStorage.setItem(`flickerList_${currentProfile.id}`, JSON.stringify(myList));
  }, [myList, currentProfile]);

  // Fetching
  useEffect(() => {
    if (activeTab === 'search') {
      setMovies([]);
      setGenreSections({});
      setSelectedGenre(null);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else if (activeTab === 'movies' || activeTab === 'series') {
      fetchContent(activeTab);
      setSelectedGenre(null);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'search') {
      const delayDebounceFn = setTimeout(() => {
        if (searchQuery.length > 2) {
          fetchContent('search', searchQuery);
        } else if (searchQuery.length === 0) {
          setMovies([]);
        }
      }, 600);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery, activeTab]);

  const fetchContent = async (category, query = '') => {
    setLoadingContent(true);
    setUsingBackup(false);

    try {
      const mediaType = category === 'movies' ? 'movie' : (category === 'series' ? 'tv' : 'multi');

      if (category === 'search') {
        const endpoint = `/search/multi?query=${query}&api_key=${API_KEY}&language=es-ES&include_adult=false`;
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (!res.ok) throw new Error("API Response Not OK");
        const data = await res.json();
        const filtered = data.results.filter(m => m.media_type !== 'person' && m.poster_path);
        setMovies(filtered);
        setGenreSections({});
        setFeaturedMovies([]);
        return;

      } else {
        const genresToFetch = category === 'movies' ? POPULAR_MOVIE_GENRES : POPULAR_TV_GENRES;

        const trendRes = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=es-ES`);
        const trendData = await trendRes.json();
        const topTrends = trendData.results
          .filter(m => m.backdrop_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6);

        setFeaturedMovies(topTrends);
        setFeaturedIndex(0);

        const popularGeneralRes = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=es-ES`);
        const popularGeneralData = await popularGeneralRes.json();

        const sectionsMap = {};
        sectionsMap[9000] = {
          name: "Populares del Día",
          data: popularGeneralData.results?.filter(m => m.poster_path && (category === 'movies' ? m.media_type !== 'tv' : m.media_type !== 'movie')) || []
        };

        const promises = genresToFetch.map(async (genre) => {
          try {
            const [page1, page2] = await Promise.all([
              fetch(`${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc&with_genres=${genre.id}&page=1`).then(r => r.json()),
              fetch(`${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc&with_genres=${genre.id}&page=2`).then(r => r.json())
            ]);
            const combined = [...(page1.results || []), ...(page2.results || [])];
            const unique = Array.from(new Map(combined.map(item => [item.id, item])).values()).filter(m => m.poster_path);
            return { genreId: genre.id, genreName: genre.name, results: unique };
          } catch (err) {
            return { genreId: genre.id, genreName: genre.name, results: [] };
          }
        });

        const genreSectionsData = await Promise.all(promises);
        genreSectionsData.forEach(section => {
          if (section.results.length > 0) {
            sectionsMap[section.genreId] = { name: section.genreName, data: section.results };
          }
        });

        setGenreSections(sectionsMap);
        setMovies([]);
      }

    } catch (e) {
      console.log("Fallo API, usando modo respaldo:", e);
      setUsingBackup(true);
      setFeaturedMovies([MOCK_DB[0]]);
      const mockSections = {
        9000: { name: "Populares del Día (Demo)", data: MOCK_DB },
      };
      setGenreSections(mockSections);
      setMovies([]);
      if (!usingBackup) showToast("Modo Offline Activado");
    } finally {
      setLoadingContent(false);
    }
  };

  const handleCreateProfile = (name, avatar) => {
    if (profiles.length >= 8) {
      showToast("Límite de perfiles alcanzado");
      return;
    }
    const newProfile = { id: Date.now(), name, avatar };
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);

    // FIX: Ensure we transition correctly
    if (profiles.length === 0) {
      setCurrentProfile(newProfile);
      setView('app');
    } else {
      setView('profiles');
      setCurrentProfile(null);
    }
  };

  const initiateDeleteProfile = (id) => setProfileToDelete(id);

  const confirmDeleteProfile = () => {
    if (profileToDelete) {
      const updated = profiles.filter(p => p.id !== profileToDelete);
      setProfiles(updated);
      localStorage.removeItem(`flickerList_${profileToDelete}`);
      setProfileToDelete(null);

      // FIX: Explicitly set view to avoid black screen
      if (updated.length === 0) {
        setView('create-profile');
      } else {
        setView('profiles');
      }
    }
  };

  const handleGenreClick = (sectionId, sectionName, sectionData) => {
    setSelectedGenre({ id: sectionId, name: sectionName, data: sectionData });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      setFeaturedIndex((prev) => (prev + 1) % featuredMovies.length);
    } else if (info.offset.x > 50) {
      setFeaturedIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
    }
  };

  const featuredMovie = featuredMovies[featuredIndex];

  return (
    <div className="relative min-h-screen bg-[#050505] font-sans text-gray-100 overflow-hidden selection:bg-blue-500/30 selection:text-white pb-24 md:pb-0">

      {/* FONDO ANIMADO */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-emerald-600/5 blur-[150px]" />
      </div>

      {/* NOTIFICACIONES */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-bold text-white">{notification}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LANDING PAGE */}
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
          >
            <Logo size="large" />
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mt-12 mb-6 leading-tight">
              Tu cine, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">sin límites</span>.
            </h1>
            <p className="text-lg md:text-xl text-white/60 text-center max-w-2xl mb-12">
              Disfruta de miles de películas y series. Crea perfiles para toda la familia y comparte tus opiniones con el mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <GlassButton onClick={() => setShowAuthModal(true)} className="flex-1 py-4 rounded-2xl font-bold text-lg">
                <LogIn size={20} /> Iniciar Sesión / Registrarse
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VISTA PRINCIPAL */}
      <AnimatePresence mode="wait">
        {view === 'app' && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 md:top-6 md:left-8 md:right-8 h-20 md:h-16 md:rounded-2xl z-40 flex items-center justify-between px-6 transition-all duration-300 bg-black/60 md:bg-black/20 backdrop-blur-xl border-b md:border border-white/5 shadow-lg">
              <div onClick={() => setActiveTab('movies')} className="cursor-pointer"><Logo /></div>

              <nav className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                {['movies', 'series', 'search', 'mylist'].map(id => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${activeTab === id ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {id === 'movies' ? 'CINE' : id === 'series' ? 'SERIES' : id === 'search' ? 'EXPLORAR' : 'MI LISTA'}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                {user && (
                  <div className="flex items-center gap-3">
                    <button onClick={() => { setView('profiles'); setCurrentProfile(null); }} className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                      <span className="text-[10px] md:text-xs font-bold text-gray-300 group-hover:text-white max-w-[60px] md:max-w-none truncate">
                        {currentProfile?.name || 'Perfil'}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gradient-to-br ${currentProfile?.avatar.gradient || 'from-gray-700 to-gray-900'} shadow-inner text-white`}>
                        {currentProfile?.avatar.icon || <User size={14} />}
                      </div>
                    </button>
                    <button
                      onClick={() => { signOut(); setView('landing'); }}
                      className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-500 transition-all"
                      title="Cerrar Sesión"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>
                )}
              </div>
            </header>

            {/* CONTENIDO */}
            <main className="pt-24 md:pt-32 px-4 md:px-12 max-w-[1600px] mx-auto min-h-screen">

              {usingBackup && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 backdrop-blur-md">
                  <WifiOff size={18} />
                  Modo Demo: Fallo al conectar con la API.
                </div>
              )}

              {/* BUSCADOR */}
              {activeTab === 'search' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center pt-8">
                  <div className="relative w-full max-w-3xl group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
                    <div className="relative flex items-center px-6 py-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all group-focus-within:border-white/30">
                      <Search className="text-white/50 mr-4" size={24} />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Escribe para buscar..."
                        className="bg-transparent border-none outline-none text-white text-xl w-full placeholder-white/20 font-light"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {loadingContent && <Loader2 className="animate-spin text-white/50" size={24} />}
                    </div>
                  </div>
                  <div className="mt-16 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {movies.map(movie => <MediaCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} usingBackup={usingBackup} />)}
                  </div>
                </motion.div>
              )}

              {/* GÉNERO */}
              {selectedGenre && (activeTab === 'movies' || activeTab === 'series') && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                  <button onClick={() => setSelectedGenre(null)} className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition">
                    <ArrowLeft size={20} /> Volver
                  </button>
                  <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                    {selectedGenre.name}
                  </h1>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {selectedGenre.data.map(movie => (
                      <MediaCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} isListed={myList.some(m => m.id === movie.id)} usingBackup={usingBackup} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* HOME */}
              {!selectedGenre && (activeTab === 'movies' || activeTab === 'series') && (
                <div className="animate-in fade-in duration-700">

                  {/* HERO */}
                  {!loadingContent && featuredMovie && (
                    <motion.div
                      key={featuredMovie.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      className="relative mb-16 group touch-pan-y"
                    >
                      <div
                        onClick={() => setSelectedMovie(featuredMovie)}
                        className="relative h-[55vh] md:h-[70vh] w-full rounded-[3rem] overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                        <motion.img
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 10 }}
                          src={featuredMovie.backdrop_path ? `${BACKDROP_URL}${featuredMovie.backdrop_path}` : `${IMAGE_URL}${featuredMovie.poster_path}`}
                          alt="Hero"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 max-w-4xl pointer-events-none">
                          <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30 backdrop-blur-xl">
                            #{featuredIndex + 1} en Tendencias
                          </Badge>
                          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-[0.9] tracking-tight">
                            {featuredMovie.title || featuredMovie.name}
                          </h1>
                          <p className="text-white/80 text-lg md:text-xl line-clamp-2 max-w-2xl drop-shadow-md font-light mb-8 backdrop-blur-sm rounded-xl p-2 -ml-2">
                            {featuredMovie.overview}
                          </p>
                          <div className="flex gap-4 pointer-events-auto">
                            <GlassButton className="px-8 py-4 rounded-2xl font-bold text-lg">
                              <Play size={24} fill="black" /> Ver Ahora
                            </GlassButton>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                        {featuredMovies.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setFeaturedIndex(idx); }}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === featuredIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {loadingContent ? (
                    <div className="flex items-center justify-center h-40">
                      <Loader2 size={48} className="animate-spin text-white/50" />
                    </div>
                  ) : (
                    <>
                      {Object.keys(genreSections).includes('9000') && (
                        <ContentRow
                          key='9000'
                          section={genreSections[9000]}
                          myList={myList}
                          setSelectedMovie={setSelectedMovie}
                          usingBackup={usingBackup}
                          icon={<Star size={20} className="text-yellow-400" />}
                          onTitleClick={() => handleGenreClick(9000, genreSections[9000].name, genreSections[9000].data)}
                        />
                      )}

                      <ContentRow
                        key='mylist-row'
                        section={{ name: "Mi Lista", data: myList, isEmpty: myList.length === 0 }}
                        myList={myList}
                        setSelectedMovie={setSelectedMovie}
                        usingBackup={usingBackup}
                        icon={myList.length > 0 ? <Check size={20} className="text-green-400" /> : <List size={20} className="text-white/40" />}
                        onTitleClick={() => setActiveTab('mylist')}
                      />

                      {Object.keys(genreSections)
                        .filter(id => id !== '9000')
                        .map(genreId => {
                          const section = genreSections[genreId];
                          if (!section || section.data.length === 0) return null;
                          return (
                            <ContentRow
                              key={genreId}
                              section={section}
                              myList={myList}
                              setSelectedMovie={setSelectedMovie}
                              usingBackup={usingBackup}
                              icon={<span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />}
                              onTitleClick={() => handleGenreClick(genreId, section.name, section.data)}
                            />
                          );
                        })
                      }
                    </>
                  )}
                </div>
              )}

              {/* MI LISTA */}
              {activeTab === 'mylist' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h1 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Mi Colección</h1>
                  {myList.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {myList.map(movie => <MediaCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} isListed={true} usingBackup={usingBackup} />)}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] bg-white/5 border border-dashed border-white/20">
                      <Plus size={64} className="mb-6 opacity-20" />
                      <p className="text-xl text-white/40 font-light">Tu colección está vacía.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </main>

            {/* NAVEGACIÓN MÓVIL REDISEÑADA */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-[90]">
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex items-center justify-around py-3 px-2">
                {['search', 'movies', 'series', 'mylist'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${activeTab === tab ? 'text-black bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                  >
                    {tab === 'search' && <Search size={20} />}
                    {tab === 'movies' && <Film size={20} />}
                    {tab === 'series' && <Tv size={20} />}
                    {tab === 'mylist' && <Heart size={20} fill={activeTab === 'mylist' ? 'currentColor' : 'none'} />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODALS */}
      <AnimatePresence>
        {profileToDelete && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <GlassPanel className="w-full max-w-sm p-8 rounded-[2rem] bg-black/80 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">¿Borrar perfil?</h3>
              <p className="text-white/60 mb-8 text-sm">Esta acción eliminará el historial y la lista de favoritos.</p>
              <div className="flex gap-3 w-full">
                <GlassButton onClick={() => setProfileToDelete(null)} variant="glass" className="flex-1 py-3 rounded-xl font-bold text-sm">Cancelar</GlassButton>
                <GlassButton onClick={confirmDeleteProfile} variant="danger" className="flex-1 py-3 rounded-xl font-bold text-sm">Borrar</GlassButton>
              </div>
            </GlassPanel>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === 'profiles' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl">
            <GlassPanel className="w-full max-w-5xl p-8 md:p-24 rounded-[3rem] flex flex-col items-center relative bg-black/40 overflow-y-auto max-h-screen">
              {profiles.length > 0 && (
                <button
                  onClick={() => currentProfile ? setView('app') : null}
                  className={`absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all ${!currentProfile && 'hidden'}`}
                >
                  <X size={24} />
                </button>
              )}
              <Logo size="large" />
              <h2 className="text-3xl font-light text-white/80 mt-12 mb-16 tracking-wide text-center">¿Quién está viendo?</h2>
              <div className="flex flex-wrap justify-center gap-6 md:gap-16">
                {profiles.map(profile => (
                  <div key={profile.id} className="group flex flex-col items-center gap-4 relative">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -10 }}
                      onClick={() => { setCurrentProfile(profile); setView('app'); }}
                      className={`w-24 h-24 md:w-40 md:h-40 rounded-[2rem] flex items-center justify-center text-white shadow-2xl ring-4 ring-transparent hover:ring-white/50 bg-gradient-to-br ${profile.avatar.gradient}`}
                    >
                      {profile.avatar.icon}
                    </motion.button>
                    <span className="text-lg md:text-xl font-medium text-white/60 group-hover:text-white transition-colors">{profile.name}</span>
                    <button onClick={() => initiateDeleteProfile(profile.id)} className="absolute -top-2 -right-2 p-2 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {profiles.length < 8 && (
                  <div className="flex flex-col items-center gap-4 group">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setView('create-profile')}
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === 'create-profile' && (
          <CreateProfileOverlay onSave={handleCreateProfile} onCancel={() => profiles.length > 0 && setView('profiles')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMovie && (
          <MovieDetailModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            isListed={myList.some(m => m.id === selectedMovie.id)}
            onToggleList={() => {
              const exists = myList.some(m => m.id === selectedMovie.id);
              setMyList(exists ? myList.filter(m => m.id !== selectedMovie.id) : [...myList, selectedMovie]);
            }}
            usingBackup={usingBackup}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </AnimatePresence>
    </div >
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FlickerApp />
    </AuthProvider>
  );
}

// ==========================================
// 4. SUB-COMPONENTES
// ==========================================

const MediaCard = ({ movie, onClick, isListed, usingBackup }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.05, zIndex: 10 }}
    className="group relative aspect-[2/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg ring-1 ring-white/10 bg-[#1a1a1a]"
  >
    <img
      src={movie.poster_path ? (usingBackup ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://image.tmdb.org/t/p/w500${movie.poster_path}`) : 'https://via.placeholder.com/500x750'}
      alt={movie.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-bold text-lg leading-tight mb-2 drop-shadow-lg line-clamp-2">{movie.title || movie.name}</p>
        <div className="flex items-center justify-between">
          <Badge className="bg-yellow-500/80 text-black border-none flex items-center gap-1">
            <Star size={8} fill="black" /> {movie.vote_average?.toFixed(1)}
          </Badge>
          {isListed && <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"><Check size={14} className="text-black" /></div>}
        </div>
      </div>
    </div>
  </motion.div>
);

const ContentRow = ({ section, myList, setSelectedMovie, usingBackup, icon, onTitleClick }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="mb-12"
  >
    <button
      onClick={onTitleClick}
      className="group flex items-center gap-2 mb-6 px-2 text-2xl font-bold text-white hover:text-blue-400 transition-colors"
    >
      {icon}
      <span>{section.name}</span>
      <div className="flex items-center text-sm font-normal text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all ml-2">
        Ver todo <ChevronRight size={16} />
      </div>
    </button>

    {section.isEmpty ? (
      <div className="flex flex-col items-center justify-center h-48 rounded-[2rem] bg-white/5 border border-dashed border-white/20 mx-auto w-[90%] md:w-full">
        <List size={48} className="mb-4 opacity-20" />
        <p className="text-lg text-white/40 font-light">
          Tu lista está vacía.
        </p>
      </div>
    ) : (
      <div
        className="flex gap-4 overflow-x-scroll pb-8 -mx-4 px-4 md:-mx-12 md:px-12 scrollbar-hide snap-x snap-mandatory"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
      >
        {section.data.map(movie => (
          <div key={`section-${movie.id}`} className="min-w-[160px] w-[160px] md:min-w-[220px] md:w-[220px] snap-start">
            <MediaCard
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
              isListed={myList.some(m => m.id === movie.id)}
              usingBackup={usingBackup}
            />
          </div>
        ))}
      </div>
    )}
  </motion.div>
);

const CreateProfileOverlay = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PROFILE_AVATARS[0]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <GlassPanel className="relative w-full max-w-lg p-10 rounded-[3rem] bg-black/60">
        <button onClick={onCancel} className="absolute top-8 right-8 text-white/40 hover:text-white transition"><X size={24} /></button>
        <h2 className="text-3xl font-bold text-white text-center mb-10">Nuevo Perfil</h2>
        <div className="flex justify-center mb-10">
          <div className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center text-white text-7xl bg-gradient-to-br ${selectedAvatar.gradient} shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-4 ring-white/10`}>
            {selectedAvatar.icon}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {PROFILE_AVATARS.map(av => (
            <button
              key={av.id}
              onClick={() => setSelectedAvatar(av)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 bg-gradient-to-br ${av.gradient} ${selectedAvatar.id === av.id ? 'ring-4 ring-white shadow-lg scale-110' : 'opacity-40 hover:opacity-100'}`}
            >
              <div className="scale-75">{av.icon}</div>
            </button>
          ))}
        </div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-5 rounded-2xl text-center text-xl font-bold mb-8 bg-black/20 border border-white/10 text-white focus:border-white/50 outline-none"
          placeholder="Nombre del perfil"
          autoFocus
        />
        <GlassButton
          onClick={() => name && onSave(name, selectedAvatar)}
          disabled={!name}
          className="w-full py-4 rounded-2xl font-bold text-lg"
        >
          Crear Perfil
        </GlassButton>
      </GlassPanel>
    </div>
  );
};