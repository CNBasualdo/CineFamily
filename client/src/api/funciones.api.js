import axios from "axios";


export const getFunciones = () => {
    return axios.get("http://127.0.0.1:8000/api/funciones/");
};
