import axios from "axios";
import { API_URL } from "../config/api.config";

export const getFunciones = () => {
    return axios.get(`${API_URL}/funciones/`);
};
