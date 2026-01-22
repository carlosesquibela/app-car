import { supabase } from '../supabase'
import auditoriaService from './auditoria'

const crearRemito = async ({ id_evento, tipo, usuario_id }) => {
  const { data, error } = await supabase
    .from('remitos')
    .insert({
      id_evento,
      tipo,
      id_usuario: usuario_id,
      estado: 'PARCIAL'
    })
    .select()
    .single()

  if (error) throw error

  auditoriaService.registrarAuditoria({
    id_usuario: usuario_id,
    accion: 'CREAR_REMITO',
    entidad: 'REMITO',
    referencia: data.id_remito
  })

  return data
}

const cerrarRemito = async idRemito => {
  const { data, error } = await supabase
    .from('remitos')
    .update({
      estado: 'COMPLETO',
      closed_at: new Date()
    })
    .eq('id_remito', idRemito)
    .select()
    .single()

  if (error) throw error

  auditoriaService.registrarAuditoria({
    id_usuario: data.id_usuario,
    accion: 'CERRAR_REMITO',
    entidad: 'REMITO',
    referencia: idRemito
  })
}

const getRemitosPorEvento = async idEvento => {
  const { data } = await supabase
    .from('remitos')
    .select('*')
    .eq('id_evento', idEvento)
    .order('created_at', { ascending: false })

  return data || []
}

/* 🆕 NUEVO */
const getRemitosGlobales = async ({ estado, tipo }) => {
  let query = supabase
    .from('remitos')
    .select(`
      id_remito,
      tipo,
      estado,
      created_at,
      eventos (
        id_evento,
        nombre_evento
      )
    `)
    .order('created_at', { ascending: false })

  if (estado) query = query.eq('estado', estado)
  if (tipo) query = query.eq('tipo', tipo)

  const { data, error } = await query
  if (error) return []

  return data
}

export default {
  crearRemito,
  cerrarRemito,
  getRemitosPorEvento,
  getRemitosGlobales
}
