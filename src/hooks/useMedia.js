import { useState, useEffect } from 'react';
import { tmdb } from '../services/tmdb';

export function useMedia(activeTab, searchQuery) {
    const [movies, setMovies] = useState([]);
    const [genreSections, setGenreSections] = useState({});
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (activeTab === 'search') {
                    if (searchQuery.length > 2) {
                        const data = await tmdb.search(searchQuery);
                        if (mounted) {
                            setMovies(data.results.filter(m => m.media_type !== 'person' && m.poster_path));
                            setGenreSections({});
                        }
                    } else {
                        if (mounted) setMovies([]);
                    }
                } else if (activeTab === 'movies' || activeTab === 'series') {
                    const type = activeTab === 'movies' ? 'movie' : 'tv';
                    const genres = activeTab === 'movies' ? tmdb.POPULAR_MOVIE_GENRES : tmdb.POPULAR_TV_GENRES;

                    // Fetch Trending for Hero
                    const trending = await tmdb.getTrending();
                    if (mounted) setFeaturedMovies(trending.results.filter(m => m.backdrop_path).slice(0, 6));

                    // Fetch Popular Row
                    const popular = await tmdb.getPopular(type);
                    const sections = {
                        9000: { name: "Populares del Día", data: popular.results }
                    };

                    // Fetch Genres
                    const genrePromises = genres.map(async (g) => {
                        const data = await tmdb.getByGenre(type, g.id);
                        return { id: g.id, name: g.name, data: data.results };
                    });

                    const genreResults = await Promise.all(genrePromises);
                    genreResults.forEach(g => {
                        if (g.data.length > 0) sections[g.id] = { name: g.name, data: g.data };
                    });

                    if (mounted) setGenreSections(sections);
                }
            } catch (err) {
                console.error("Failed to fetch media", err);
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchData();
        }, activeTab === 'search' ? 500 : 0);

        return () => {
            mounted = false;
            clearTimeout(debounce);
        };
    }, [activeTab, searchQuery]);

    return { movies, genreSections, featuredMovies, loading, error };
}
