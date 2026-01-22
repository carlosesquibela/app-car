import { supabase } from '../supabase'

const agregarUnidadARemito = async ({
  id_remito,
  unidad
}) => {
  // 1. Insertar item
  const { error } = await supabase
    .from('remito_items')
    .insert({
      id_remito,
      id_articulo: unidad.id_articulo,
      id_unidad: unidad.id_unidad,
      cantidad: 1
    })

  if (error) throw error

  // 2. Marcar unidad EN_USO
  await supabase
    .from('articulos_unidades')
    .update({ estado: 'EN_USO' })
    .eq('id_unidad', unidad.id_unidad)

  // 3. Incrementar stock_en_uso
  await supabase.rpc('incrementar_stock_en_uso', {
    articulo_id: unidad.id_articulo
  })
}

const devolverUnidad = async ({
  id_remito,
  unidad,
  aTaller
}) => {
  // borrar item
  await supabase
    .from('remito_items')
    .delete()
    .eq('id_remito', id_remito)
    .eq('id_unidad', unidad.id_unidad)

  // actualizar unidad
  const nuevoEstado = aTaller
    ? 'EN_TALLER'
    : 'DISPONIBLE'

  await supabase
    .from('articulos_unidades')
    .update({ estado: nuevoEstado })
    .eq('id_unidad', unidad.id_unidad)

  // decrementar stock_en_uso
  await supabase.rpc('decrementar_stock_en_uso', {
    articulo_id: unidad.id_articulo
  })
}

export default {
  agregarUnidadARemito,
  devolverUnidad
}
