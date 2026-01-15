import * as XLSX from 'xlsx'
import remitoItemsService from './remitoItems'

/**
 * Exportar remito a Excel
 */
const exportarRemitoExcel = async ({ remito, evento }) => {
  if (!remito || !evento) {
    throw new Error('Datos incompletos')
  }

  const items = await remitoItemsService.getItemsPorRemito(
    remito.id_remito
  )

  // 🧾 Hoja 1 — Info general
  const info = [
    ['Evento', evento.nombre_evento],
    ['Remito', remito.id_remito],
    ['Tipo', remito.tipo],
    ['Estado', remito.estado],
    ['Fecha creación', remito.created_at],
    [],
    ['Artículo', 'Cantidad']
  ]

  // 🧾 Ítems
  items.forEach(i => {
    info.push([
      i.articulos?.nombre || 'Sin nombre',
      i.cantidad
    ])
  })

  const ws = XLSX.utils.aoa_to_sheet(info)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, 'Remito')

  XLSX.writeFile(
    wb,
    `Remito_${remito.id_remito}.xlsx`
  )
}

export default {
  exportarRemitoExcel
}
