import { supabase } from '../supabase'

const getArticulos = async () => {
  const { data, error } = await supabase
    .from('articulos')
    .select('*')
    .order('nombre')

  if (error) {
    console.error(error)
    return []
  }

  return data
}

const crearArticulo = async articulo => {
  const { data, error } = await supabase
    .from('articulos')
    .insert({
      nombre: articulo.nombre,
      categoria: articulo.categoria,
      stock_total: articulo.stock_total,
      stock_en_uso: 0,
      estado: 'ACTIVO',
      observaciones: articulo.observaciones
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export default {
  getArticulos,
  crearArticulo
}
