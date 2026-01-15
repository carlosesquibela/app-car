import { supabase } from '../supabase'
import auditoriaService from './auditoria'

const agregarItem = async ({ remito, articulo, cantidad }) => {
  const { error } = await supabase
    .from('remito_items')
    .insert({
      id_remito: remito.id_remito,
      id_articulo: articulo.id_articulo,
      cantidad
    })

  if (error) throw error

  auditoriaService.registrarAuditoria({
    id_usuario: remito.id_usuario,
    accion: 'AGREGAR_ITEM',
    entidad: 'REMITO',
    referencia: remito.id_remito,
    detalle: `${articulo.nombre} x ${cantidad}`
  })
}

const eliminarItem = async ({ item, remito }) => {
  const { error } = await supabase
    .from('remito_items')
    .delete()
    .eq('id', item.id)

  if (error) throw error

  auditoriaService.registrarAuditoria({
    id_usuario: remito.id_usuario,
    accion: 'ELIMINAR_ITEM',
    entidad: 'REMITO',
    referencia: remito.id_remito,
    detalle: `item ${item.id}`
  })
}

const getItemsPorRemito = async idRemito => {
  const { data } = await supabase
    .from('remito_items')
    .select(`
      id,
      cantidad,
      articulos ( nombre )
    `)
    .eq('id_remito', idRemito)

  return data || []
}

export default {
  agregarItem,
  eliminarItem,
  getItemsPorRemito
}
