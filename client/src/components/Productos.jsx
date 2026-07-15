import { useEffect, useState } from "react";
import "../styles/productos.css";
import { getProductos } from "../api/productos.api";

function Productos({ agregarAlCarrito }) {
    const [productos, setProductos] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);

    useEffect(() => {
        async function cargarProductos() {
            const res = await getProductos();
            setProductos(res.data);
        }
        cargarProductos();
    }, []);

    const seleccionarProductos = (producto) => {
        const existe = seleccionados.find((p) => p.id === producto.id);

        if (existe) {
            setSeleccionados(
                seleccionados.map((p) =>
                    p.id === producto.id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p,
                ),
            );
        } else {
            setSeleccionados([
                ...seleccionados,
                {
                    ...producto,
                    cantidad: 1,
                },
            ]);
        }
    };
    const confirmarProductos = () => {
        agregarAlCarrito(seleccionados);
        setSeleccionados([]);
    };

    return (
        <div className='product-section container'>
            <div className='product-header'>
                <h2>Snack Bar</h2>
                <p>Elegi algo para acompañar tu funcion o un coleccionable</p>
            </div>

            <div className='row'>
                {productos.map((producto) => (
                    <div className='col-md-4 col-lg-3 mb-4' key={producto.id}>
                        <div className='product-card h-100'>
                            <img
                                src={producto.imagen}
                                className='product-img'
                                alt={producto.nombre}
                            />
                            <div className='product-body'>
                                <h5>{producto.nombre}</h5>
                                <p>{producto.descripcion}</p>
                                <p className='product-precio'>
                                    ${producto.precio}
                                </p>

                                <button
                                    className={
                                        'btn-product ${seleccionados.find((p) => p.id === producto.id)? "seleccionado" : ""}'
                                    } onClick={()=> seleccionarProductos(producto)}
                                >
                                    {seleccionados.find((p) => p.id === producto.id) ? "Agregar mas" :" Seleccionar"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {seleccionados.length > 0 && (
                <div className='pedido-preview'>
                    <h4> Tu Pedido </h4>

                    {seleccionados.map((p) => (
                        <div key={p.id} className='pedido-item'>
                            <span>{p.nombre}</span>
                            <span>x {p.cantidad}</span>
                        </div>
                    ))}

                    <button
                        className='btn-confirmar-productos'
                        onClick={confirmarProductos}
                    >
                        Confimar Compra
                    </button>
                </div>
            )}
        </div>
    );
}

export default Productos;
