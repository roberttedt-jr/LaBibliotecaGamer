import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, Play, X, Share2, Plus, Check, Film, Tv, Star, Loader2, Video, Trash2, User, AlertTriangle, ChevronRight, WifiOff, ExternalLink, List } from 'lucide-react';

// ==========================================
// 1. CONFIGURACIÓN
// ==========================================

const API_KEY = 'e342997caa7411d20122efbf21285b51'.trim(); 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';
const LOGO_URL = 'https://image.tmdb.org/t/p/w92'; 

const PROFILE_AVATARS = [
  { id: 'hero', icon: '🦸', gradient: 'from-blue-400 to-blue-600', label: 'Héroe' },
  { id: 'villain', icon: '🦹', gradient: 'from-purple-500 to-indigo-600', label: 'Villano' },
  { id: 'robot', icon: '🤖', gradient: 'from-gray-300 to-gray-500', label: 'Sci-Fi' },
  { id: 'detective', icon: '🕵️', gradient: 'from-amber-600 to-yellow-600', label: 'Misterio' },
  { id: 'alien', icon: '👽', gradient: 'from-emerald-400 to-green-600', label: 'Alien' },
  { id: 'king', icon: '👑', gradient: 'from-red-500 to-orange-500', label: 'Realeza' },
  { id: 'wizard', icon: '🧙', gradient: 'from-indigo-400 to-purple-500', label: 'Fantasía' },
  { id: 'zombie', icon: '🧟', gradient: 'from-lime-600 to-green-800', label: 'Terror' },
];

const POPULAR_MOVIE_GENRES = [
    { id: 28, name: "Acción" },
    { id: 35, name: "Comedia" },
    { id: 878, name: "Ciencia Ficción" },
    { id: 18, name: "Drama" },
    { id: 53, name: "Thriller" },
];

const POPULAR_TV_GENRES = [
    { id: 10759, name: "Acción y Aventura" },
    { id: 18, name: "Drama" },
    { id: 35, name: "Comedia" },
    { id: 80, name: "Crimen" },
    { id: 99, name: "Documental" },
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
  { 
    id: 103, title: "Stranger Things", name: "Stranger Things", overview: "A raíz de la desaparición de un niño, un pueblo desvela un misterio...", poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", backdrop_path: "/56v2KjBlU4XaOv9rVYkJu64COQN.jpg", vote_average: 8.6, first_air_date: "2016-07-15", media_type: "tv", genre_ids: [10759],
    providers: [{ provider_id: 8, provider_name: "Netflix", logo_path: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg" }],
    trailer: { key: "b9EkMc79ZSU" }
  },
];

// ==========================================
// 2. ESTILOS "LIQUID GLASS"
// ==========================================

const GLASS_PANEL = "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]";
const GLASS_BUTTON = "bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/10 transition-all duration-300 shadow-lg";
const GLASS_INPUT = "bg-black/20 backdrop-blur-md border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all outline-none text-white placeholder-white/30";

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

const AppContainer = ({ children }) => (
    <div className="relative min-h-screen bg-[#050505] font-sans text-gray-100 overflow-hidden selection:bg-blue-500/30 selection:text-white">
        <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {children}
    </div>
);

// ==========================================
// 3. APP PRINCIPAL
// ==========================================

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [view, setView] = useState('loading'); 
  const [notification, setNotification] = useState(null); 
  const [profileToDelete, setProfileToDelete] = useState(null); 

  const [activeTab, setActiveTab] = useState('movies');
  const [movies, setMovies] = useState([]); 
  const [genreSections, setGenreSections] = useState({}); 
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [myList, setMyList] = useState([]);
  const [usingBackup, setUsingBackup] = useState(false);
  const searchInputRef = useRef(null);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const savedProfiles = localStorage.getItem('flickerProfiles');
    fetchContent('movies'); 

    if (savedProfiles) {
      const parsed = JSON.parse(savedProfiles);
      setProfiles(parsed);
      if (parsed.length > 0) {
        setView('profiles');
      } else {
        setView('create-profile');
      }
    } else {
      setView('create-profile');
    }
  }, []);

  useEffect(() => {
    if (profiles.length > 0) localStorage.setItem('flickerProfiles', JSON.stringify(profiles));
  }, [profiles]);

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

  useEffect(() => {
    if (activeTab === 'search') {
      setMovies([]);
      setGenreSections({});
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else if (activeTab === 'movies' || activeTab === 'series') {
      fetchContent(activeTab);
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
    setLoading(true);
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
        setFeaturedMovie(null);
        return;

      } else {
        const genresToFetch = category === 'movies' ? POPULAR_MOVIE_GENRES : POPULAR_TV_GENRES;
        
        const trendRes = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=es-ES`);
        const trendData = await trendRes.json();
        const featuredItem = trendData.results.filter(m => m.poster_path).sort((a, b) => b.popularity - a.popularity)[0];
        setFeaturedMovie(featuredItem);

        const popularGeneralRes = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=es-ES`);
        const popularGeneralData = await popularGeneralRes.json();
        
        const sectionsMap = {};
        
        sectionsMap[9000] = { 
            name: "Populares del Día", 
            data: popularGeneralData.results?.filter(m => m.poster_path && (category === 'movies' ? m.media_type !== 'tv' : m.media_type !== 'movie')) || []
        };
        
        const promises = genresToFetch.map(genre => 
            fetch(`${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc&with_genres=${genre.id}`)
                .then(res => res.json())
                .then(data => ({
                    genreId: genre.id,
                    genreName: genre.name,
                    results: data.results?.filter(m => m.poster_path) || []
                }))
                .catch(() => ({ genreId: genre.id, genreName: genre.name, results: [] }))
        );

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
      
      const featuredMock = MOCK_DB.sort((a, b) => b.vote_average - a.vote_average)[0];
      setFeaturedMovie(featuredMock);

      const mockSections = {
        9000: { name: "Populares del Día (Demo)", data: MOCK_DB }, 
        1000: { name: "Recomendado (Demo)", data: MOCK_DB.filter(m => m.media_type === mediaType || m.media_type === 'movie') },
        1001: { name: "Visto Recientemente (Demo)", data: MOCK_DB.filter(m => m.media_type === mediaType || m.media_type === 'movie').reverse() },
      };
      setGenreSections(mockSections);
      setMovies([]);

      if (!usingBackup) showToast("Modo Offline Activado");
    } finally { 
      setLoading(false); 
    }
  };

  const handleCreateProfile = (name, avatar) => {
    if (profiles.length >= 10) {
      showToast("Límite de perfiles alcanzado");
      return;
    }
    const newProfile = { id: Date.now(), name, avatar };
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    if (profiles.length === 0) setCurrentProfile(newProfile);
    else setView('profiles');
  };

  const initiateDeleteProfile = (id) => setProfileToDelete(id);

  const confirmDeleteProfile = () => {
    if (profileToDelete) {
      const updated = profiles.filter(p => p.id !== profileToDelete);
      setProfiles(updated);
      localStorage.removeItem(`flickerList_${profileToDelete}`);
      setProfileToDelete(null);
      if (updated.length === 0) setView('create-profile');
    }
  };

  return (
    <AppContainer>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-1000" />
         <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-emerald-600/5 blur-[150px]" />
      </div>

      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className={`px-6 py-3 rounded-full ${GLASS_PANEL} flex items-center gap-3 bg-black/60`}>
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-bold text-white">{notification}</span>
        </div>
      </div>

      <div className={`relative z-10 transition-all duration-700 ease-out ${view !== 'app' ? 'scale-95 blur-xl opacity-40 pointer-events-none grayscale-[0.3]' : 'scale-100 blur-0 opacity-100'}`}>
        
        <header className="fixed top-6 left-4 right-4 md:left-8 md:right-8 h-16 rounded-2xl z-40 flex items-center justify-between px-6 transition-all duration-300 bg-black/20 backdrop-blur-xl border border-white/5 shadow-lg">
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

          <button onClick={() => setView('profiles')} className="flex items-center gap-3 pl-4 pr-1 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
             <span className="hidden md:block text-xs font-bold text-gray-300 group-hover:text-white">{currentProfile?.name || 'Invitado'}</span>
             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gradient-to-br ${currentProfile?.avatar.gradient || 'from-gray-700 to-gray-900'} shadow-inner`}>
               {currentProfile?.avatar.icon || <User size={14}/>}
             </div>
          </button>
        </header>

        <main className="pt-32 pb-32 px-4 md:px-12 max-w-[1600px] mx-auto min-h-screen">
          
          {usingBackup && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 backdrop-blur-md">
              <WifiOff size={18} />
              Modo Demo: Fallo al conectar con la API, usando datos de respaldo.
            </div>
          )}
          
          {activeTab === 'search' && (
            <div className="flex flex-col items-center pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="relative w-full max-w-3xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
                <div className={`relative flex items-center px-6 py-5 rounded-3xl ${GLASS_PANEL} transition-all group-focus-within:border-white/30`}>
                  <Search className="text-white/50 mr-4" size={24} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Escribe para buscar..."
                    className="bg-transparent border-none outline-none text-white text-xl w-full placeholder-white/20 font-light"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {loading && <Loader2 className="animate-spin text-white/50" size={24} />}
                </div>
              </div>
              <div className="mt-16 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                 {movies.map(movie => <LiquidCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} usingBackup={usingBackup} />)}
              </div>
              {movies.length === 0 && searchQuery.length > 2 && !loading && (
                 <p className="text-xl text-white/40 mt-12">No se encontraron resultados para "{searchQuery}".</p>
              )}
            </div>
          )}

          {(activeTab === 'movies' || activeTab === 'series') && (
            <div className="animate-in fade-in duration-700">
              
              {!loading && featuredMovie && (
                <div 
                  onClick={() => setSelectedMovie(featuredMovie)}
                  className="relative h-[55vh] md:h-[70vh] w-full rounded-[3rem] overflow-hidden cursor-pointer group mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                  <img 
                    src={featuredMovie.backdrop_path ? `${BACKDROP_URL}${featuredMovie.backdrop_path}` : `${IMAGE_URL}${featuredMovie.poster_path}`} 
                    alt="Hero" 
                    className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 max-w-4xl">
                    <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30 backdrop-blur-xl">
                      Top Tendencia {featuredMovie.media_type === 'movie' ? 'Cine' : 'Serie'}
                    </Badge>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-[0.9] tracking-tight">
                      {featuredMovie.title || featuredMovie.name}
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl line-clamp-2 max-w-2xl drop-shadow-md font-light mb-8 backdrop-blur-sm rounded-xl p-2 -ml-2">
                      {featuredMovie.overview}
                    </p>
                    <button className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 text-lg ${GLASS_BUTTON} bg-white text-black hover:bg-white/90 hover:text-black border-none`}>
                      <Play size={24} fill="black" /> Ver Ahora
                    </button>
                  </div>
                </div>
              )}
              
              {loading ? (
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
                    />
                )}

                <ContentRow 
                    key='mylist-row'
                    section={{ 
                        name: "Mi Lista", 
                        data: myList, 
                        isEmpty: myList.length === 0
                    }}
                    myList={myList}
                    setSelectedMovie={setSelectedMovie}
                    usingBackup={usingBackup}
                    icon={myList.length > 0 ? <Check size={20} className="text-green-400" /> : <List size={20} className="text-white/40" />}
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
                                icon={<span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"/>}
                            />
                        );
                    })
                }
                </>
              )}
            </div>
          )}

          {activeTab === 'mylist' && (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Mi Colección</h1>
                {myList.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {myList.map(movie => <LiquidCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} isListed={true} usingBackup={usingBackup} />)}
                  </div>
                ) : (
                  <div className={`flex flex-col items-center justify-center py-32 rounded-[3rem] ${GLASS_PANEL} border-dashed border-white/20`}>
                    <Plus size={64} className="mb-6 opacity-20" />
                    <p className="text-xl text-white/40 font-light">Tu colección está vacía. Añade tus favoritas explorando Cine y Series.</p>
                  </div>
                )}
             </div>
          )}
        </main>

        <div className="md:hidden fixed bottom-6 left-6 right-6 h-20 rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 z-50 flex items-center justify-between px-8 shadow-2xl">
          {['search', 'movies', 'series', 'mylist'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`p-3 rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-white/20 text-white shadow-lg' : 'text-white/40'}`}>
              {tab === 'search' && <Search size={24} />}
              {tab === 'movies' && <Film size={24} />}
              {tab === 'series' && <Tv size={24} />}
              {tab === 'mylist' && <Heart size={24} fill={activeTab === 'mylist' ? 'currentColor' : 'none'} />}
            </button>
          ))}
        </div>
      </div>

      {profileToDelete && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
          <div className={`w-full max-w-sm p-8 rounded-[2rem] ${GLASS_PANEL} bg-black/80 flex flex-col items-center text-center`}>
             <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-6">
               <AlertTriangle size={32} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">¿Borrar perfil?</h3>
             <p className="text-white/60 mb-8 text-sm">Esta acción eliminará el historial y la lista de favoritos.</p>
             <div className="flex gap-3 w-full">
               <button onClick={() => setProfileToDelete(null)} className={`flex-1 py-3 rounded-xl font-bold text-sm ${GLASS_BUTTON}`}>Cancelar</button>
               <button onClick={confirmDeleteProfile} className="flex-1 py-3 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 shadow-lg">Borrar</button>
             </div>
          </div>
        </div>
      )}

      {view === 'profiles' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center animate-in fade-in duration-500">
           <div className={`w-full max-w-5xl p-12 md:p-24 rounded-[3rem] flex flex-col items-center relative ${GLASS_PANEL} bg-black/40`}>
              {currentProfile && (
                <button 
                  onClick={() => setView('app')}
                  className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <X size={24} />
                </button>
              )}
              <Logo size="large" />
              <h2 className="text-3xl font-light text-white/80 mt-12 mb-16 tracking-wide">¿Quién está viendo?</h2>
              <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                {profiles.map(profile => (
                  <div key={profile.id} className="group flex flex-col items-center gap-4 relative">
                      <button 
                        onClick={() => setCurrentProfile(profile)}
                        className={`w-28 h-28 md:w-40 md:h-40 rounded-[2rem] flex items-center justify-center text-6xl shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 ring-4 ring-transparent hover:ring-white/50 bg-gradient-to-br ${profile.avatar.gradient}`}
                      >
                        {profile.avatar.icon}
                      </button>
                      <span className="text-xl font-medium text-white/60 group-hover:text-white transition-colors">{profile.name}</span>
                      <button onClick={() => initiateDeleteProfile(profile.id)} className="absolute -top-2 -right-2 p-2 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                         <Trash2 size={16} />
                      </button>
                  </div>
                ))}
                {profiles.length < 10 && (
                  <div className="flex flex-col items-center gap-4 group">
                    <button onClick={() => setView('create-profile')} className="w-28 h-28 md:w-40 md:h-40 rounded-[2rem] flex items-center justify-center bg-white/5 border-2 border-dashed border-white/20 text-white/40 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-110">
                      <Plus size={48} />
                    </button>
                    <span className="text-xl font-medium text-white/40 group-hover:text-white transition-colors">Crear</span>
                  </div>
                )}
              </div>
           </div>
        </div>
      )}

      {view === 'create-profile' && (
        <CreateProfileOverlay onSave={handleCreateProfile} onCancel={() => profiles.length > 0 && setView('profiles')} />
      )}

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
    </AppContainer>
  );
}

// ==========================================
// 4. SUB-COMPONENTES
// ==========================================

const LiquidCard = ({ movie, onClick, isListed, usingBackup }) => (
  <div onClick={onClick} className="group relative aspect-[2/3] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/10">
    <div className="absolute inset-0 bg-[#1a1a1a]" /> 
    <img 
      src={movie.poster_path ? (usingBackup ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://image.tmdb.org/t/p/w500${movie.poster_path}`) : 'https://via.placeholder.com/500x750'} 
      alt={movie.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 z-20">
      <div className={`absolute inset-0 backdrop-blur-sm bg-black/30 transition-opacity duration-500 ${isListed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
      <div className="relative z-10">
        <p className="text-white font-bold text-lg leading-tight mb-2 drop-shadow-lg line-clamp-2">{movie.title || movie.name}</p>
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-500/80 text-black border-none flex items-center gap-1">
            <Star size={8} fill="black" /> {movie.vote_average?.toFixed(1)}
          </Badge>
          <span className="text-xs text-white/80 font-medium">{movie.release_date?.split('-')[0]}</span>
        </div>
      </div>
    </div>
    {isListed && (
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.6)] z-30">
        <Check size={16} strokeWidth={3} className="text-black" />
      </div>
    )}
  </div>
);

const ContentRow = ({ section, myList, setSelectedMovie, usingBackup, icon }) => (
    <div className="mb-12 animate-in slide-in-from-right duration-700">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 px-2">
            {icon}
            {section.name}
            <ChevronRight size={16} className="text-white/40" />
        </h3>
        {section.isEmpty ? (
            <div className={`flex flex-col items-center justify-center h-48 rounded-[2rem] ${GLASS_PANEL} border-dashed border-white/20 mx-auto w-[90%] md:w-full`}>
                <List size={48} className="mb-4 opacity-20" />
                <p className="text-lg text-white/40 font-light">
                  Tu lista está vacía. ¡Empieza a añadir tus favoritos!
                </p>
            </div>
        ) : (
            <div className="flex gap-4 overflow-x-scroll pb-8 -mx-4 px-4 md:-mx-12 md:px-12 scrollbar-hide">
                {section.data.map(movie => (
                    <div key={`section-${movie.id}`} className="min-w-[160px] w-[160px] md:min-w-[220px] md:w-[220px]">
                        <LiquidCard 
                            movie={movie} 
                            onClick={() => setSelectedMovie(movie)} 
                            isListed={myList.some(m => m.id === movie.id)} 
                            usingBackup={usingBackup} 
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
);


const CreateProfileOverlay = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PROFILE_AVATARS[0]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-in zoom-in-95 duration-300">
      <div className={`relative w-full max-w-lg p-10 rounded-[3rem] ${GLASS_PANEL} bg-black/60`}>
        <button onClick={onCancel} className="absolute top-8 right-8 text-white/40 hover:text-white transition"><X size={24} /></button>
        <h2 className="text-3xl font-bold text-white text-center mb-10">Nuevo Perfil</h2>
        <div className="flex justify-center mb-10">
          <div className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center text-7xl bg-gradient-to-br ${selectedAvatar.gradient} shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-4 ring-white/10 animate-in zoom-in duration-300`}>
            {selectedAvatar.icon}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {PROFILE_AVATARS.map(av => (
            <button 
              key={av.id}
              onClick={() => setSelectedAvatar(av)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110 bg-gradient-to-br ${av.gradient} ${selectedAvatar.id === av.id ? 'ring-4 ring-white shadow-lg scale-110' : 'opacity-40 hover:opacity-100'}`}
            >
              {av.icon}
            </button>
          ))}
        </div>
        <input 
          type="text" 
          value={name}
          onChange={e => setName(e.target.value)}
          className={`w-full p-5 rounded-2xl text-center text-xl font-bold mb-8 ${GLASS_INPUT}`}
          placeholder="Nombre del perfil"
          autoFocus
        />
        <button 
          onClick={() => name && onSave(name, selectedAvatar)}
          disabled={!name}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${name ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
        >
          Crear Perfil
        </button>
      </div>
    </div>
  );
};

const MovieDetailModal = ({ movie, onClose, isListed, onToggleList, usingBackup }) => {
  const [trailer, setTrailer] = useState(null);
  const [providers, setProviders] = useState([]);
  const [watchLink, setWatchLink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (usingBackup) {
        const mock = MOCK_DB.find(m => m.id === movie.id);
        if (mock) {
            setProviders(mock.providers || []);
            setTrailer(mock.trailer || null);
        }
        return;
      }
      try {
        const type = movie.media_type === 'tv' || !movie.title ? 'tv' : 'movie';
        
        const pRes = await fetch(`${BASE_URL}/${type}/${movie.id}/watch/providers?api_key=${API_KEY}`);
        const pData = await pRes.json();
        setProviders(pData.results?.ES?.flatrate || []);
        setWatchLink(pData.results?.ES?.link); 

        const vResES = await fetch(`${BASE_URL}/${type}/${movie.id}/videos?api_key=${API_KEY}&language=es-ES`);
        const vDataES = await vResES.json();
        let officialTrailer = vDataES.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');

        if (!officialTrailer) {
           const vResEN = await fetch(`${BASE_URL}/${type}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`);
           const vDataEN = await vResEN.json();
           officialTrailer = vDataEN.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');
        }
        setTrailer(officialTrailer || null);

      } catch (e) {}
    };
    fetchData();
  }, [movie, usingBackup]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-500" onClick={onClose} />
      <div className={`relative w-full max-w-7xl h-full md:h-[90vh] ${GLASS_PANEL} md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-12 duration-500`}>
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition"><X size={24}/></button>
        
        <div className="w-full md:w-[65%] bg-black relative group">
          {trailer ? (
             <iframe 
               src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=1&rel=0`} 
               className="w-full h-full min-h-[300px] md:min-h-full object-cover" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen 
             />
          ) : (
             <img src={movie.backdrop_path ? `${BACKDROP_URL}${movie.backdrop_path}` : ''} className="w-full h-full object-cover opacity-70" />
          )}
          
          {providers.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-md">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                Ver ahora en <ExternalLink size={12}/>
              </p>
              <div className="flex gap-4 overflow-x-scroll pb-2 scrollbar-hide">
                {providers.map(p => (
                  <a 
                    key={p.provider_id} 
                    href={watchLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110 hover:rotate-3 cursor-pointer"
                    title={`Ver en ${p.provider_name}`}
                  >
                    <img src={`${LOGO_URL}${p.logo_path}`} className="w-12 h-12 rounded-xl shadow-lg" alt={p.provider_name} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-gradient-to-b from-transparent to-black/40 scrollbar-hide">
           <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{movie.title || movie.name}</h2>
           <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20 flex gap-1"><Star size={10} fill="currentColor"/> {movie.vote_average?.toFixed(1)}</Badge>
              <Badge className="bg-white/10">{movie.release_date || movie.first_air_date}</Badge>
           </div>
           <p className="text-white/80 text-lg leading-relaxed font-light mb-12">{movie.overview || "Sin descripción."}</p>
           <div className="flex gap-4 mt-auto">
              <button onClick={onToggleList} className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isListed ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' : GLASS_BUTTON}`}>
                 {isListed ? <Check size={20}/> : <Plus size={20}/>} {isListed ? 'Guardado' : 'Mi Lista'}
              </button>
              <button onClick={() => navigator.share({title:movie.title, url:window.location.href})} className={`p-4 rounded-2xl ${GLASS_BUTTON}`}><Share2 size={20}/></button>
           </div>
        </div>
      </div>
    </div>
  );
};