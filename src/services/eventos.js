import { supabase } from '../supabase'

export async function getEventos() {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .order('fecha_inicio', { ascending: false })

  if (error) {
    console.error('Error cargando eventos:', error)
    return []
  }

  return data
}

export async function createEvento(payload) {
  const { data, error } = await supabase
    .from('eventos')
    .insert(payload)
    .select()
    .single()

  if (error) {
    console.error('Error creando evento:', error)
    throw error
  }

  return data
}
