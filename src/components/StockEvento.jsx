import { useEffect, useState } from 'react'
import stockEventoService from '../services/stockEvento'

export default function StockEvento({ eventoId }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventoId) return

    const load = async () => {
      setLoading(true)
      const result = await stockEventoService.getStockPorEvento(
        eventoId
      )
      setData(result)
      setLoading(false)
    }

    load()
  }, [eventoId])

  if (loading) return <p>Cargando stock del evento…</p>

  if (data.length === 0) {
    return <p>No hay stock comprometido en este evento</p>
  }

  return (
    <div>
      <h3>Stock comprometido en el evento</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Artículo</th>
            <th>Cantidad en uso</th>
          </tr>
        </thead>
        <tbody>
          {data.map(i => (
            <tr key={i.id_articulo}>
              <td>{i.nombre}</td>
              <td>{i.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
