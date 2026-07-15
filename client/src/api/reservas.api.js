import axios from "axios";
import { API_URL } from "../config/api.config";

export const reservarAsiento= (data)=> {
    return axios.post(`${API_URL}/reservar/`, data);

};