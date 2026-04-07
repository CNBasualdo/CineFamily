import { useEffect, useState } from "react";
import "../styles/funciones.css";
import { getFunciones } from "../api/funciones.api.js";




function Funciones({ seleccionarFuncion }) {
    const [funciones, setFunciones] = useState([]);

    useEffect(() => {
        getFunciones()
            .then((res) => {
                setFunciones(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const funcionesPorSala = funciones.reduce((acc, f) => {
        if (!acc[f.sala]) {
            acc[f.sala] = [];
        }
        acc[f.sala].push(f);
        return acc;
    }, {});
    console.log(funciones)


    
    
    return (
        <div className='funciones'>
            <h2>Disponibles hoy</h2>

            <div className='salas'>
                {Object.entries(funcionesPorSala).map(([sala, funcs]) => (
                    <div className='sala-card ' key={sala}>
                        <h3>{sala}</h3>
                        <p>Funciones Disponibles {funcs.length}</p>
                        <div className='horarios'>
                            {funcs.map((f) => (
                                <button
                                    key={f.id}
                                    className='horario-btn'
                                    onClick={() => seleccionarFuncion(f)}
                                    
                                >
                                    {new Date(f.horario).toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        },
                                    )}
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
