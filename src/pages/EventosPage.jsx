import { useEffect, useState } from 'react'
import eventosService from '../services/eventos'
import EventoDetalle from '../components/EventoDetalle'
import CrearEvento from '../components/CrearEvento'

export default function EventosPage() {
  const [eventos, setEventos] = useState([])
  const [activo, setActivo] = useState(null)

  const load = async () => {
    const data = await eventosService.getEventos()
    setEventos(data)
  }

  useEffect(() => {
    load()
  }, [])

  if (activo) {
    return (
      <EventoDetalle
        evento={activo}
        onBack={() => {
          setActivo(null)
          load()
        }}
      />
    )
  }

  return (
    <div>
      <h2>Eventos</h2>

      <CrearEvento onCreated={load} />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Evento</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(e => (
            <tr
              key={e.id_evento}
              style={{ cursor: 'pointer' }}
              onClick={() => setActivo(e)}
            >
              <td>{e.nombre_evento}</td>
              <td>{e.cliente}</td>
              <td>
                {new Date(e.fecha_inicio).toLocaleDateString()}
              </td>
              <td>{e.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
