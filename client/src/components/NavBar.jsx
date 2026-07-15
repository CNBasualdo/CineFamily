import "../styles/navbar.css";
import { BsCartCheckFill } from "react-icons/bs";
import { FaVideo, FaTrash } from "react-icons/fa";

function NavBar({
    carrito,
    setCarrito,
    aumentarCantProduct,
    disminuirCantProduct,
    finalizarCompra,
    loadingCompra,
}) {
    const total = carrito.reduce((acc, item) => {
        if (item.tipo === "producto") {
            return acc + Number(item.precio) * Number(item.cantidad || 1);
        }
        return acc + Number(item.precio);
    }, 0);

    const entradas = carrito.filter((item) => item.tipo !== "producto");
    const productos = carrito.filter((item) => item.tipo === "producto");

    const entradasAgrupadas = entradas.reduce((acc, item) => {
        const pelicula = item.pelicula;
        if (!acc[pelicula]) {
            acc[pelicula] = [];
        }
        acc[pelicula].push(item);
        return acc;
    }, {});

    const productosAgrupados = productos.reduce((acc, item) => {
        if (!acc[item.nombre]) {
            acc[item.nombre] = {
                ...item,
                cantidad: item.cantidad || 1,
            };
        } else {
            acc[item.nombre].cantidad += item.cantidad || 1;
        }
        return acc;
    }, {});

    const eliminarItem = (itemEliminar) => {
        setCarrito((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.id === itemEliminar.id &&
                        item.funcionId === itemEliminar.funcionId
                    ),
            ),
        );
    };
    const irASeccion = (id) => {
        const seccion = document.getElementById(id);
        if (seccion) {
            seccion.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const cantidadTotal = carrito.reduce((acc,item) =>{
        if(item.tipo === "producto"){
            return acc + Number(item.cantidad || 1);
        }
        return acc + 1;
    }, 0);

    return (
        <>
            <nav className='navbar  bg-body-tertiary '>
                <div
                    className='container-fluid d-flex
                    justify-content-between
                    align-items-center'
                >
                    <div className='logo-container'>
                        <FaVideo />
                        <span className='logo-cine'>Cine</span>
                        <span className='logo-family'>Family</span>
                    </div>

                    <div className='links'>
                        <span
                            className='nav-links'
                            onClick={() => irASeccion("productos")}
                        >
                            Productos
                        </span>
                        <span
                            className='nav-links'
                            onClick={() => irASeccion("funciones")}
                        >
                            Funciones
                        </span>
                    </div>

                    <button
                        className='btn-carrito'
                        type='button'
                        data-bs-toggle='offcanvas'
                        data-bs-target='#carritoCanvas'
                    >
                        <BsCartCheckFill />
                        {carrito.length > 0 && (
                            <span className='badge-carrito'>
                                {cantidadTotal}
                            </span>
                        )}
                    </button>
                </div>
            </nav>
            <div
                className='offcanvas offcanvas-end carrito-offcanvas'
                tabIndex='-1'
                id='carritoCanvas'
            >
                <div className='offcanvas-header carrito-header'>
                    <h5>Tu Carrito</h5>
                    <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='offcanvas'
                    />
                </div>
                <div className='offcanvas-body carrito-body'>
                    {carrito.length === 0 ? (
                        <p>Carrito vacio</p>
                    ) : (
                        <>
                            {" "}
                            <h5>Entradas</h5>
                            {Object.entries(entradasAgrupadas).map(
                                ([pelicula, items]) => (
                                    <div
                                        key={pelicula}
                                        className='pelicula-carrito'
                                    >
                                        <h5 className='titulo-pelicula'>
                                            {pelicula}
                                        </h5>
                                        <p className='cantidad-entradas'>
                                            {items.length} entradas
                                        </p>
                                        {items.map((item) => (
                                            <div
                                                key={`${item.funcionId}-${item.id}`}
                                                className='card-carrito'
                                            >
                                                <div className='datos-asiento'>
                                                    Fila {item.fila} - Asiento{" "}
                                                    {item.columna}
                                                </div>
                                                <button
                                                    className='btn-eliminar'
                                                    onClick={() =>
                                                        eliminarItem(item)
                                                    }
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}
                                        <div className="subtotal-line">
                                            <span>Subtotal entradas</span>
                                            <strong>
                                                $
                                                {items.reduce(
                                                    (acc, item) =>
                                                        acc + item.precio,
                                                    0,
                                                )}
                                            </strong>
                                        </div>
                                    </div>
                                ),
                            )}
                            {Object.values(productosAgrupados).length > 0 && (
                                <div className='products-carrito'>
                                    <h5>Productos</h5>
                                    {Object.values(productosAgrupados).map(
                                        (producto) => (
                                            <div
                                                key={producto.id}
                                                className='product-carrito-item'
                                            >
                                                <div className='product-info'>
                                                    <span className='producto-nombre'>
                                                        {producto.nombre}
                                                    </span>
                                                    <div className='cantidad-controls'>
                                                        <button
                                                            className='btn-cantidad btn-restar'
                                                            onClick={() =>
                                                                disminuirCantProduct(
                                                                    producto.id,
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <span className='cantidad-num'>
                                                            {producto.cantidad}
                                                        </span>
                                                        <button
                                                            className='btn-cantidad btn-sumar'
                                                            onClick={() =>
                                                                aumentarCantProduct(
                                                                    producto.id,
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    className='btn-eliminar'
                                                    onClick={() =>
                                                        eliminarItem(producto)
                                                    }
                                                >
                                                    
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ),
                                    )}

                                    <div className='subtotal-line'>
                                        <span>Subtotal Productos:</span>
                                        <strong>
                                            $
                                            {Object.values(
                                                productosAgrupados,
                                            ).reduce(
                                                (acc, item) =>
                                                    acc +
                                                    Number(item.precio) *
                                                        Number(item.cantidad),
                                                0,
                                            )}
                                        </strong>
                                    </div>
                                </div>
                            )}
                            <div className='footer-carrito'>
                                <div className="total-line">
                                    <h4 className='total-carrito'>
                                        Total ${total}
                                    </h4>
                                </div>
                                <button
                                    className='btn-finalizar'
                                    onClick={finalizarCompra}
                                    disabled={loadingCompra}
                                >
                                    {loadingCompra ? "Procesando" : "Finalizar compra"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default NavBar;
