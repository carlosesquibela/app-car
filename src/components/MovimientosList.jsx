import { useEffect, useState } from 'react'
import movimientosService from '../services/movimientos'

export default function MovimientosList() {
  const [tipo, setTipo] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const movs = await movimientosService.getMovimientos({
      tipo
    })
    setData(movs)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [tipo])

  if (loading) return <p>Cargando movimientos…</p>

  return (
    <div>
      <h2>Movimientos de stock</h2>

      {/* FILTRO */}
      <select
        value={tipo}
        onChange={e => setTipo(e.target.value)}
        style={{ marginBottom: 10 }}
      >
        <option value="">Todos</option>
        <option value="SALIDA">Salida</option>
        <option value="INGRESO">Ingreso</option>
      </select>

      {/* TABLA */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Artículo</th>
            <th>Cantidad</th>
            <th>Evento</th>
            <th>Remito</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id}>
              <td>
                {new Date(
                  m.remitos.created_at
                ).toLocaleString()}
              </td>
              <td>{m.remitos.tipo}</td>
              <td>{m.articulos?.nombre}</td>
              <td>{m.cantidad}</td>
              <td>{m.remitos.eventos?.nombre_evento}</td>
              <td>{m.remitos.id_remito}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
