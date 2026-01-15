import { supabase } from '../supabase'

const getMateriales = async () => {
  const { data, error } = await supabase
    .from('materiales')
    .select('id_material, id_articulo, nombre, stock_actual')
    .order('nombre')

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export default {
  getMateriales
}
