import { supabase } from '../supabase'

const getResumenMaterialEvento = async id_evento => {
  const { data, error } = await supabase
    .from('remito_items')
    .select(`
      cantidad,
      articulos ( nombre ),
      remitos (
        tipo,
        id_evento
      )
    `)
    .eq('remitos.id_evento', id_evento)

  if (error) return []

  const resumen = {}

  data.forEach(i => {
    const nombre = i.articulos.nombre
    const cant = i.cantidad
    const tipo = i.remitos.tipo

    if (!resumen[nombre]) {
      resumen[nombre] = { salida: 0, ingreso: 0 }
    }

    if (tipo === 'SALIDA') resumen[nombre].salida += cant
    if (tipo === 'INGRESO') resumen[nombre].ingreso += cant
  })

  return Object.entries(resumen).map(([articulo, v]) => ({
    articulo,
    salida: v.salida,
    ingreso: v.ingreso,
    diferencia: v.salida - v.ingreso
  }))
}

export default {
  getResumenMaterialEvento
}
