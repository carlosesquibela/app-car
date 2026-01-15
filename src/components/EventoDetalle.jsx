import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import CrearRemito from './CrearRemito'
import RemitosList from './RemitosList'
import RemitoItemsModal from './RemitoItemsModal'
import StockEvento from './StockEvento'

export default function EventoDetalle({ evento, onBack }) {
  const { loading } = useAuth()

  const [remitoActivo, setRemitoActivo] = useState(null)
  const [reloadRemitos, setReloadRemitos] = useState(0)

  if (loading) return <p>Cargando usuario…</p>
  if (!evento?.id_evento) return <p>Cargando evento…</p>

  return (
    <div>
      <h2>{evento.nombre_evento}</h2>

      <button onClick={onBack}>⬅ Volver</button>

      <hr />

      <CrearRemito
        evento={evento}
        onCreated={() => {
          setReloadRemitos(r => r + 1)
        }}
      />

      <hr />

      <RemitosList
        eventoId={evento.id_evento}
        reloadKey={reloadRemitos}
        onSelect={remito => setRemitoActivo(remito)}
      />

      <hr />

      <RemitoItemsModal
        remito={remitoActivo}
        evento={evento}
        onClosed={() => {
          // 🔥 cierre real
          setRemitoActivo(null)
          setReloadRemitos(r => r + 1)
        }}
        onClose={() => setRemitoActivo(null)}
      />

      <hr />

      <StockEvento eventoId={evento.id_evento} />
    </div>
  )
}
