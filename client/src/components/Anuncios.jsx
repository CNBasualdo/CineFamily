import { useEffect, useState } from "react"
import { getAnuncios } from "../api/anuncios.api"
import "../styles/anuncios.css"

function Anuncios({posicion}) {

    const [anuncios, setAnuncios] = useState([])

    useEffect (() => {
        async function cargarAnuncios(){
            const res = await getAnuncios();
            const filtrados = res.data.filter(
            (anuncio) => anuncio.posicion === posicion
            );
            setAnuncios(filtrados)
        }
        cargarAnuncios();
    }, [posicion]);

    if (anuncios.length === 0) return null;


    return (
        <div className="anuncios-container">
            {anuncios.map((anuncio) =>(
                <div key={anuncio.id} className="anuncio-card">
                    <img src={anuncio.imagen} alt={anuncio.titulo} />
                </div>
            ))}
        </div>
    )
}

export default Anuncios