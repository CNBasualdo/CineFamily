import jsPDF from "jspdf"


export const generarTicketPDF = (ticket)=>{
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(20);
    doc.text("CINE FAMILY",70, y);
    
    y +=15;
    doc.setFontSize(14);
    doc.text("Compobante de compra",60, y);

    y +=10;
    doc.setFontSize(10);
    doc.text(`Codigo: ${ticket.codigo}`,20, y);

    y +=20;
    doc.setFontSize(14);
    doc.text("Entradas",20, y);

    y +=10;
    ticket.entradas.forEach((entrada) => {
        doc.setFontSize(11);
        doc.text(`${entrada.pelicula}`, 20, y);
        y += 8;
        doc.text(
            `Fila ${entrada.fila} - Asiento ${entrada.columna}`,
            20,
            y
        );
        y += 8;
        doc.text(`$${entrada.precio}`, 20, y);
        y += 12;
    });

    if (ticket.productos.length > 0) {
        doc.setFontSize(14);
        doc.text("Productos", 20, y);
        y += 10;

        ticket.productos.forEach((producto) => {
            doc.setFontSize(11);
            doc.text(`${producto.nombre}`, 20, y);
            y += 8;
            doc.text(`Cantidad: ${producto.cantidad}`, 20, y);
            y += 8;
            doc.text(`$${producto.precio}`, 20, y);
            y += 12;
        });
    }

    doc.setFontSize(16);
    doc.text(`Total: $${ticket.total}`, 20, y + 10);

    doc.save(`ticket-${ticket.codigo}.pdf`);

}