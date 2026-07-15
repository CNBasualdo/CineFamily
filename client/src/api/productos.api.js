import axios from "axios";

const productosApi = axios.create({
    baseURL: "http://localhost:8000/api/productos/"
});
export const getProductos = () => productosApi.get("/");

export const comprarProductos = (productos) =>
    axios.post("http://localhost:8000/api/comprar-productos/", {productos});