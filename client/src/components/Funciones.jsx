import { useEffect, useState } from "react";
import "../styles/funciones.css";
import { getFunciones } from "../api/funciones.api.js";
import { getPeliculaById } from "../api/peliculas.api.js";

function Funciones({ seleccionarFuncion }) {
    const [funciones, setFunciones] = useState([]);

    useEffect(() => {
        getFunciones()
            .then(async (res) => {
                const funcionesData = res.data;

                const funcionesConPeli = await Promise.all(
                    funcionesData.map(async (f) => {
                        try {
                            const peli = await getPeliculaById(f.pelicula_id);

                            return {
                                ...f,
                                pelicula: peli.data,
                            };
                        } catch (error) {
                            console.error("Error cargando película:", error);

                            return {
                                ...f,
                                pelicula: null,
                            };
                        }
                    }),
                );

                setFunciones(funcionesConPeli);
            })
            .catch((error) => {
                console.error("Error cargando funciones:", error);
            });
    }, []);

    const funcionesPorSala = funciones.reduce((acc, f) => {
        if (!acc[f.sala]) {
            acc[f.sala] = [];
        }

        acc[f.sala].push(f);

        return acc;
    }, {});

    if (funciones.length === 0) {
        return <p>Cargando funciones...</p>;
    }


    return (
        <div className='funciones'>
            <h2>Funciones Disponibles</h2>

            <div className='salas'>
                {Object.entries(funcionesPorSala)
                    .sort(([a], [b]) => {
                        const numA = parseInt(a.replace("Sala ", ""));
                        const numB = parseInt(b.replace("Sala ", ""));
                        return numA - numB;
                    })
                    .map(([sala, funcs]) => (
                        <div className='sala-card' key={sala}>
                            <h3>{sala}</h3>

                            <p>Funciones Disponibles: {funcs.length}</p>

                            <div className='horarios'>
                                {funcs.map((f) => (
                                    <button
                                        key={f.id}
                                        className='horario-btn'
                                        onClick={() => seleccionarFuncion(f)}
                                    >
                                        <div className='info-pelicula'>
                                            <span className='titulo-pelicula'>
                                                {f.pelicula?.title ||
                                                    "Película no encontrada"}
                                            </span>

                                            <div className='fecha-container'>
                                                <span className='fecha'>
                                                    {new Date(
                                                        f.fecha_hora,
                                                    ).toLocaleDateString(
                                                        "es-AR",
                                                        {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                        },
                                                    )}
                                                </span>

                                                <span className='hora'>
                                                    {new Date(
                                                        f.fecha_hora,
                                                    ).toLocaleTimeString(
                                                        "es-AR",
                                                        {
                                                            hour: "2-digit",
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Funciones;
