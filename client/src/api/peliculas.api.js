import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTZkYjQ5MjFjMzRmNTgzNjRjMDU0YzQ0MWIxMzFiMiIsIm5iZiI6MTc2NTMzNDQ5MC43MDgsInN1YiI6IjY5MzhkZGRhYmQ2YzU3MmU2ZTEzNGM0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q95R1jTOOCsNvJGX9gNUbVvGPKa6oMH2UyandpHMbac`,
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
