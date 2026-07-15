import axios from "axios";
import { API_URL } from "../config/api.config";

const anunciosApi = axios.create({
    baseURL: `${API_URL}/anuncios/`,
});

export const getAnuncios =()=> anunciosApi.get("/")