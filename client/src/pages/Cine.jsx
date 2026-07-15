import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Principal.css";
import Funciones from "../components/Funciones";
import Cartelera from "../components/Cartelera";
import NavBar from "../components/NavBar";
import Asientos from "../components/Asientos";
import Productos from "../components/Productos";
import Anuncios from "../components/Anuncios";
import { comprarProductos } from "../api/productos.api";
import { reservarAsiento } from "../api/reservas.api";

function Cine() {
    const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);
    const [loadingCompra, setLoadingCompra] = useState(false);
    const [carrito, setCarrito] = useState([]);

    const agregarProducto = (productos) => {
        setCarrito((prev) => [
            ...prev,
            ...productos.map((producto) => ({
                tipo: "producto",
                ...producto,
            })),
        ]);
    };

    const navigate = useNavigate();

    const aumentarCantProduct = (productoId) => {
        setCarrito((prev) =>
            prev.map((item) => {
                if (item.tipo === "producto" && item.id === productoId) {
                    return {
                        ...item,
                        cantidad: Number(item.cantidad || 1) + 1,
                    };
                }
                return item;
            }),
        );
    };

    const disminuirCantProduct = (productoId) => {
        setCarrito((prev) =>
            prev
                .map((item) => {
                    if (item.tipo === "producto" && item.id === productoId) {
                        return {
                            ...item,
                            cantidad: Number(item.cantidad || 1) - 1,
                        };
                    }
                    return item;
                })
                .filter(
                    (item) =>
                        item.tipo !== "producto" || Number(item.cantidad) > 0,
                ),
        );
    };
    const finalizarCompra = async () => {
        if (loadingCompra) return;
        setLoadingCompra(true);

        try {
            const entradas = carrito.filter((item) => item.tipo !== "producto");

            const productos = carrito.filter(
                (item) => item.tipo === "producto",
            );

            // Reservar asientos
            for (const entrada of entradas) {
                await reservarAsiento({
                    funcion_id: entrada.funcionId,
                    asiento_id: entrada.id,
                });
            }

            // Comprar productos
            if (productos.length > 0) {
                await comprarProductos(productos);
            }

            // Calcular total
            const total = carrito.reduce((acc, item) => {
                if (item.tipo === "producto") {
                    return (
                        acc + Number(item.precio) * Number(item.cantidad || 1)
                    );
                }
                return acc + Number(item.precio);
            }, 0);

            // Código ticket
            const codigo = `CINE-${Date.now()}`;

            // Navegar al ticket
            navigate("/ticket", {
                state: {
                    compra: carrito,
                    total,
                    codigo,
                },
            });

            // Vaciar carrito
            setCarrito([]);
        } catch (error) {
            console.error(error);
            alert("Error al finalizar la compra");
        } finally {
            setLoadingCompra(false);
        }
    };

    return (
        <div className='Cine'>
            <NavBar
                carrito={carrito}
                setCarrito={setCarrito}
                aumentarCantProduct={aumentarCantProduct}
                disminuirCantProduct={disminuirCantProduct}
                finalizarCompra={finalizarCompra}
                loadingCompra={loadingCompra}
            />
            <Cartelera />

            <Anuncios posicion="top"/>

            <div id='funciones'>
                <Funciones seleccionarFuncion={setFuncionSeleccionada} />
            </div>
            
            <Anuncios posicion="middle"/>

            <Asientos
                funcion={funcionSeleccionada}
                carrito={carrito}
                setCarrito={setCarrito}
            />

            <div id='productos'>
                <Productos agregarAlCarrito={agregarProducto} />
            </div>
            
            <Anuncios posicion="bottom" />
        </div>

        
    );
}

export default Cine;
