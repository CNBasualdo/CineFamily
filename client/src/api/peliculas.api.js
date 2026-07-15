import axios from "axios";

const TMDB_API= import.meta.env.VITE_TMDB_API;
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        "Content-Type": "application/json",
    },
});

export const getAllPeliculas = () => {
    return api.get("/movie/now_playing", {
        params: {
            language: "es-ES",
            page: 1,
        },
    });
};

export const getPeliculaById = (id) => {
    return api.get(`/movie/${id}`, {
        params: {
            language: "es-ES",
        },
    });
};
