import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import remitoItemsService from './remitoItems'

const exportarRemitoPdf = async ({ remito, evento, usuario }) => {
  if (!remito || !evento) {
    throw new Error('Datos incompletos')
  }

  const items = await remitoItemsService.getItemsPorRemito(
    remito.id_remito
  )

  const doc = new jsPDF()

  /* =====================
     ENCABEZADO
  ===================== */
  doc.setFontSize(16)
  doc.text('REMITO', 14, 20)

  doc.setFontSize(10)
  doc.text(`Evento: ${evento.nombre_evento}`, 14, 30)
  doc.text(`Remito Nº: ${remito.id_remito}`, 14, 36)
  doc.text(`Tipo: ${remito.tipo}`, 14, 42)
  doc.text(`Estado: ${remito.estado}`, 14, 48)
  doc.text(
    `Fecha: ${new Date(remito.created_at).toLocaleString()}`,
    14,
    54
  )

  /* =====================
     TABLA
  ===================== */
  const rows = items.map(i => [
    i.articulos?.nombre || 'Sin nombre',
    String(i.cantidad)
  ])

  autoTable(doc, {
    startY: 65,
    head: [['Artículo', 'Cantidad']],
    body: rows,
    styles: {
      fontSize: 10
    },
    headStyles: {
      fillColor: [40, 40, 40]
    }
  })

  /* =====================
     PIE
  ===================== */
  let y = doc.lastAutoTable.finalY + 10

  if (usuario?.nombre) {
    doc.text(`Responsable: ${usuario.nombre}`, 14, y)
    y += 6
  }

  if (remito.closed_at) {
    doc.text(
      `Cerrado el: ${new Date(remito.closed_at).toLocaleString()}`,
      14,
      y
    )
  }

  doc.save(`Remito_${remito.id_remito}.pdf`)
}

export default {
  exportarRemitoPdf
}
