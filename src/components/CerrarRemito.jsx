import remitosService from '../services/remitos'

export default function CerrarRemito({ remito, onClosed }) {
  if (!remito || remito.estado !== 'PARCIAL') return null

  const handleClose = async () => {
    const ok = confirm(
      '¿Cerrar remito? No se podrá modificar luego.'
    )
    if (!ok) return

    try {
      await remitosService.cerrarRemito(remito.id_remito)
      onClosed?.()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button onClick={handleClose} style={{ marginLeft: 10 }}>
      🔒 Cerrar remito
    </button>
  )
}
