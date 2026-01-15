import { useEffect, useState } from 'react'
import { getEventos } from '../services/eventos'

export default function EventosList({ reloadKey, onSelect }) {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getEventos()
      setEventos(data)
      setLoading(false)
    }

    load()
  }, [reloadKey])

  if (loading) return <p>Cargando eventos…</p>

  if (eventos.length === 0) {
    return <p>No hay eventos cargados</p>
  }

  return (
    <div>
      <h2>Eventos</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Evento</th>
            <th>Cliente</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(evento => (
            <tr
              key={evento.id_evento}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect(evento)}
            >
              <td>{evento.nombre_evento}</td>
              <td>{evento.cliente}</td>
              <td>{evento.fecha_inicio?.slice(0, 10)}</td>
              <td>{evento.fecha_fin?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: 12 }}>
        Click en un evento para ver el detalle
      </p>
    </div>
  )
}
