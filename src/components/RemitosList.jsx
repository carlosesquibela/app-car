import { useEffect, useState } from 'react'
import remitosService from '../services/remitos'

export default function RemitosList({ eventoId, reloadKey, onSelect }) {
  const [remitos, setRemitos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🔒 si no hay evento, no cargamos nada
    if (!eventoId) {
      setRemitos([])
      setLoading(false)
      return
    }

    const load = async () => {
      setLoading(true)

      const data = await remitosService.getRemitosPorEvento(eventoId)

      setRemitos(data ?? [])
      setLoading(false)
    }

    load()
  }, [eventoId, reloadKey])

  if (loading) {
    return <p>Cargando remitos…</p>
  }

  if (remitos.length === 0) {
    return <p>No hay remitos para este evento</p>
  }

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {remitos.map(r => (
          <tr
            key={r.id_remito}
            onClick={() => onSelect?.(r)}
            style={{ cursor: 'pointer' }}
          >
            <td>{r.id_remito}</td>
            <td>{r.tipo}</td>
            <td>{r.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
