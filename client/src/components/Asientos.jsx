import axios from "axios";
import { useEffect, useState } from "react";
import { getAsientos } from "../api/salas.api";
import "../styles/asientos.css";
import { PiArmchairFill } from "react-icons/pi";

function Asientos({ funcion, carrito, setCarrito }) {
    const [asientos, setAsientos] = useState([]);
    const [seleccionados,setSeleccionados] = useState([]);

    

    const toggleAsiento = (asiento) => {
        if (asiento.reservado) return;
        const existe= seleccionados.find((a)=> a.id === asiento.id);
        if(existe){
            setSeleccionados(seleccionados.filter((a)=> a.id !== asiento.id));
        }else{setSeleccionados([...seleccionados, asiento]);

        }
    };
    const agregarAlCarrito =()=>{
        const items = seleccionados.map((a)=>({
            tipo: "asiento",
            funcionId: funcion.id,
            pelicula: funcion.pelicula?.title,
            id: a.id,
            fila: a.fila,
            columna: a.columna,
            precio: Number(a.precio),
        }));
        setCarrito((prev)=> [...prev, ...items]);
        setSeleccionados([]);
    }

    const filas = {};
    asientos.forEach((a) => {
        if (!filas[a.fila]) filas[a.fila] = [];
        filas[a.fila].push(a);
    });
    const seleccionadosIds = seleccionados.map((a) => a.id);

    useEffect(() => {
        if (!funcion) return;
        setAsientos([]);
        getAsientos(funcion.id)
            .then((res) => {
              
                setAsientos(res.data);
            })
            .catch((error) => {
                console.error("error al cargar asientos", error);
            });
    }, [funcion]);

    if (!funcion) {
        return null;
    }


    return (
        <div className='Sala'>
            <div className='header-funcion'>
                <img
                    className='poster-pelicula'
                    src={`https://image.tmdb.org/t/p/w300${funcion.pelicula?.poster_path}`}
                    alt={funcion.pelicula?.title}
                />
                <div className='datos-funcion'>
                    <h1>{funcion.pelicula?.title}</h1>

                    <span className='badge-sala'>{funcion.sala}</span>
                    <div className='info-extra'>
                        <span className='badge-horario'>
                            {new Date(funcion.fecha_hora).toLocaleDateString(
                                "es-AR",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                },
                            )}
                        </span>
                        <span className='badge-asientos'>
                            
                            {seleccionados.length} seleccionados
                        </span>
                    </div>
                </div>
            </div>

            <div className='pantalla'>PANTALLA</div>
            <div className='grid'>
                {Object.values(filas).map((fila, i) => (
                    <div key={i} className='fila'>
                        {fila.map((a) => (
                            <div
                                key={a.id}
                                onClick={() => toggleAsiento(a)}
                                className={`asiento ${
                                    a.reservado
                                        ? "ocupado"
                                        : seleccionadosIds.includes(a.id)
                                        ? "seleccionado"
                                        : "libre"
                                }`}
                            >
                                <PiArmchairFill className='icono-butaca' />
                                <span className='asiento-numero'>
                                    {a.fila}-{a.columna}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className='carrito'>
                <h3>Asientos seleccionados</h3>
                <div className='lista-asientos'>
                    {seleccionados.length === 0 ? (
                        <p className='vacio'> no hay asientos seleccionados</p>
                    ) : (
                        seleccionados.map((a) => {
                            console.log("Asiento carrito:", a);

                            return (
                                <div key={a.id} className='item-asiento'>
                                    <div>
                                        Fila {a.fila} - Asiento {a.columna}
                                    </div>
                                    <span>$ {a.precio}</span>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className='total'>
                    <span>Total</span>
                    <h5>
                        $
                        {seleccionados.reduce(
                            (acc, asiento) => acc + Number(asiento.precio),
                            0,
                        )}
                    </h5>
                </div>
                <button
                    className='btn-comprar'
                    disabled={seleccionados.length === 0}
                    onClick={agregarAlCarrito}
                >
                    Continuar Compra
                </button>
            </div>
        </div>
    );
}

export default Asientos;
