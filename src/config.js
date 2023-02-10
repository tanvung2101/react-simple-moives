export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "7f6b99e3545a53bd76e1b58193b53d69";
// https://api.themoviedb.org/3/movie/${type}?api_key=7f6b99e3545a53bd76e1b58193b53d69
const tmdbEndponit = 'https://api.themoviedb.org/3/movie';
const tmdbEndponitSearch = 'https://api.themoviedb.org/3/search/movie';
export const tmdbApi = {
    getMovieList: (type, page = 1) => `${tmdbEndponit}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetails: (movieId) => `${tmdbEndponit}/${movieId}?api_key=${apiKey}`,
    getMeta: (movieId, type) => `${tmdbEndponit}/${movieId}/${type}?api_key=${apiKey}`,
    getMovieSearch: (filter, page) => `${tmdbEndponitSearch}?api_key=${apiKey}&query=${filter}&page=${page}`,
    imgOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    img500: (url) => `https://image.tmdb.org/t/p/w500/${url}`
}
