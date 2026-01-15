import { supabase } from '../supabase'

const registrarAuditoria = async ({
  id_usuario,
  accion,
  entidad,
  referencia,
  detalle
}) => {
  const { error } = await supabase
    .from('auditoria')
    .insert({
      id_usuario,
      accion,
      entidad,
      referencia,
      detalle
    })

  if (error) {
    console.error('Error auditoría:', error)
  }
}

export default {
  registrarAuditoria
}
