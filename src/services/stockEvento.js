import { supabase } from '../supabase'

/**
 * Stock consolidado por evento
 */
const getStockPorEvento = async idEvento => {
  if (!idEvento) return []

  const { data, error } = await supabase
    .from('remito_items')
    .select(`
      cantidad,
      id_articulo,
      remitos (
        tipo,
        id_evento
      ),
      articulos (
        nombre
      )
    `)

  if (error) {
    console.error(error)
    return []
  }

  // 🔥 filtrar solo el evento
  const itemsEvento = data.filter(
    i => i.remitos?.id_evento === idEvento
  )

  // 🔥 agrupar por artículo
  const map = {}

  itemsEvento.forEach(i => {
    const id = i.id_articulo
    const nombre = i.articulos?.nombre || 'Sin nombre'

    if (!map[id]) {
      map[id] = {
        id_articulo: id,
        nombre,
        cantidad: 0
      }
    }

    if (i.remitos.tipo === 'SALIDA') {
      map[id].cantidad += i.cantidad
    }

    if (i.remitos.tipo === 'INGRESO') {
      map[id].cantidad -= i.cantidad
    }
  })

  return Object.values(map)
}

export default {
  getStockPorEvento
}
