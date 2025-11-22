const API_KEY = 'e342997caa7411d20122efbf21285b51'.trim();
const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';
export const LOGO_URL = 'https://image.tmdb.org/t/p/w92';

export const POPULAR_MOVIE_GENRES = [
    { id: 28, name: "Acción" },
    { id: 35, name: "Comedia" },
    { id: 878, name: "Ciencia Ficción" },
    { id: 18, name: "Drama" },
    { id: 53, name: "Thriller" },
    { id: 27, name: "Terror" },
];

export const POPULAR_TV_GENRES = [
    { id: 10759, name: "Acción y Aventura" },
    { id: 18, name: "Drama" },
    { id: 35, name: "Comedia" },
    { id: 80, name: "Crimen" },
    { id: 99, name: "Documental" },
    { id: 10765, name: "Sci-Fi & Fantasía" },
];

export const MOCK_DB = [
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

export const tmdb = {
    async getTrending() {
        const res = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=es-ES`);
        return res.json();
    },

    async getPopular(type = 'movie', page = 1) {
        const res = await fetch(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=es-ES&page=${page}`);
        return res.json();
    },

    async getByGenre(type, genreId, page = 1) {
        const res = await fetch(`${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`);
        return res.json();
    },

    async search(query) {
        const res = await fetch(`${BASE_URL}/search/multi?query=${query}&api_key=${API_KEY}&language=es-ES&include_adult=false`);
        return res.json();
    },

    async getProviders(type, id) {
        const res = await fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`);
        return res.json();
    },

    async getVideos(type, id) {
        const res = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=es-ES`);
        return res.json();
    }
};
