import { supabase } from '../supabase'

const getMovimientos = async ({ tipo }) => {
  let query = supabase
    .from('remito_items')
    .select(`
      id,
      cantidad,
      remitos (
        id_remito,
        tipo,
        created_at,
        eventos (
          nombre_evento
        )
      ),
      articulos (
        nombre
      )
    `)
    .order('created_at', { ascending: false })

  if (tipo) {
    query = query.eq('remitos.tipo', tipo)
  }

  const { data, error } = await query
  if (error) return []

  return data
}

export default {
  getMovimientos
}
