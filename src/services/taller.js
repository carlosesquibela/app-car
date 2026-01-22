import { supabase } from '../supabase'

const getPendientes = async () => {
  const { data, error } = await supabase
    .from('taller')
    .select(`
      id_taller,
      estado,
      falla,
      observaciones,
      created_at,
      articulos (
        id_articulo,
        nombre
      ),
      eventos (
        nombre_evento
      )
    `)
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

const crearIngresoTaller = async ({
  id_articulo,
  id_evento,
  id_remito,
  falla,
  observaciones
}) => {
  const { error } = await supabase
    .from('taller')
    .insert({
      id_articulo,
      id_evento,
      id_remito,
      estado: 'EN_REVISION',
      falla,
      observaciones
    })

  if (error) throw error
}

const cerrarTaller = async ({ id_taller, estado }) => {
  const { data, error } = await supabase
    .from('taller')
    .update({
      estado,
      closed_at: new Date()
    })
    .eq('id_taller', id_taller)
    .select()
    .single()

  if (error) throw error

  // si se repara → vuelve a stock disponible
  if (estado === 'REPARADO') {
    await supabase.rpc('liberar_stock_taller', {
      articulo_id: data.id_articulo
    })
  }
}

export default {
  getPendientes,
  crearIngresoTaller,
  cerrarTaller
}
