import axios from "axios";
import { API_URL } from "../config/api.config";

export const getAsientos = (funcionId) =>{
    return axios.get(`${API_URL}/funciones/${funcionId}/asientos/`);
};