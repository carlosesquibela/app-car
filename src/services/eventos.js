import { supabase } from '../supabase'

const getEventos = async () => {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .order('fecha_inicio', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }
  return data
}

const crearEvento = async evento => {
  const { data, error } = await supabase
    .from('eventos')
    .insert({
      nombre_evento: evento.nombre_evento,
      cliente: evento.cliente,
      fecha_inicio: evento.fecha_inicio,
      localidad: evento.localidad,
      provincia: evento.provincia,
      direccion: evento.direccion,
      telefono_cliente: evento.telefono_cliente,
      estado: 'ACTIVO'
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

const actualizarEvento = async (id_evento, cambios) => {
  const { error } = await supabase
    .from('eventos')
    .update(cambios)
    .eq('id_evento', id_evento)

  if (error) throw new Error(error.message)
}

const cerrarEvento = async id_evento => {
  const { error } = await supabase
    .from('eventos')
    .update({
      estado: 'CERRADO',
      fecha_fin: new Date()
    })
    .eq('id_evento', id_evento)

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export default {
  getEventos,
  crearEvento,
  actualizarEvento,
  cerrarEvento
}
