import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../utils/generarTicket"
import "../styles/ticket.css";
import { generarTicketPDF } from "../utils/generarTicket";

function Ticket() {
    const location = useLocation();
    const navigate = useNavigate();

    const { compra, total, codigo } = location.state || {
        compra: [],
        total: 0,
        codigo: "",
    };

    const entradas = compra.filter((item) => item.tipo !== "producto");
    const productos = compra.filter((item) => item.tipo === "producto");

    return (
        <div className='ticket-page'>
            <div className='ticket-container'>
                <h1 className='ticket-title'>Compra realizada con exito</h1>
                <p className='ticket-code'>
                    Codigo de compra: <strong>{codigo}</strong>
                </p>
                <div className='ticket-section'>
                    <h2>Entradas</h2>
                    {entradas.map((entrada) => (
                        <div
                            className='ticket-card'
                            key={`${entrada.funcionId}-${entrada.id}`}
                        >
                            <p>
                                <strong>{entrada.pelicula}</strong>
                            </p>
                            <p>
                                Fila{entrada.fila} - Asiento{" "}
                                {entrada.columna}{" "}
                            </p>
                            <p>${entrada.precio}</p>
                        </div>
                    ))}
                </div>

                <div className='ticket-section'>
                    <h2>Productos</h2>
                    {productos.map((producto) => (
                        <div className='ticket-card' key={producto.id}>
                            <p>
                                <strong>{producto.nombre}</strong>
                            </p>
                            <p>Cantidad:{producto.cantidad}</p>
                            <p>${producto.precio}</p>
                        </div>
                    ))}
                </div>

                <div className='ticket-total'>
                    <span>Total</span>
                    <span>${total}</span>
                </div>

                <div className='ticket-actions'>
                    <button
                        className='btn-ticket btn-home'
                        onClick={() => navigate("/cine")}
                    >
                        Volver al inicio
                    </button>
                    <button className='btn-ticket btn-download' onClick={generarTicketPDF({codigo,entradas,productos,total})}>
                        Descargar ticket
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
