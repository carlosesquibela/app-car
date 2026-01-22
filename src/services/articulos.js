import { supabase } from '../supabase'

const getArticulos = async () => {
  const { data, error } = await supabase
    .from('articulos')
    .select('*')
    .order('nombre')

  if (error) throw error
  return data
}

const crearArticulo = async articulo => {
  const { error } = await supabase
    .from('articulos')
    .insert({
      nombre: articulo.nombre,
      categoria: articulo.categoria,
      stock_total: articulo.stock_total,
      stock_en_uso: 0,
      estado: 'ACTIVO',
      observaciones: articulo.observaciones
    })

  if (error) throw error
}

const actualizarArticulo = async (id_articulo, cambios) => {
  const { error } = await supabase
    .from('articulos')
    .update(cambios)
    .eq('id_articulo', id_articulo)

  if (error) throw error
}

const enviarATaller = async ({ id_articulo, observaciones }) => {
  // cambia estado del artículo
  const { error } = await supabase
    .from('articulos')
    .update({
      estado: 'EN_TALLER',
      observaciones
    })
    .eq('id_articulo', id_articulo)

  if (error) throw error

  // crea registro en taller
  await supabase.from('taller').insert({
    id_articulo,
    estado: 'EN_REVISION',
    observaciones
  })
}

export default {
  getArticulos,
  crearArticulo,
  actualizarArticulo,
  enviarATaller
}
