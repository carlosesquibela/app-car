import { supabase } from '../supabase'

const prepararUnidadesArticulo = async (
  id_articulo,
  stock_total
) => {
  const { error } = await supabase.rpc(
    'generar_unidades_articulo',
    {
      articulo_id: id_articulo,
      total: stock_total
    }
  )

  if (error) throw error
}

const getUnidadesPorArticulo = async id_articulo => {
  const { data, error } = await supabase
    .from('articulos_unidades')
    .select('*')
    .eq('id_articulo', id_articulo)
    .order('numero_interno')

  if (error) throw error
  return data
}

const actualizarEstadoUnidad = async (
  id_unidad,
  estado,
  observaciones
) => {
  const { error } = await supabase
    .from('articulos_unidades')
    .update({ estado, observaciones })
    .eq('id_unidad', id_unidad)

  if (error) throw error
}

export default {
  prepararUnidadesArticulo,
  getUnidadesPorArticulo,
  actualizarEstadoUnidad
}
