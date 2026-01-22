import { useEffect, useState } from 'react'
import remitosService from '../services/remitos'
import RemitoItemsModal from './RemitoItemsModal'

export default function RemitosGlobalList() {
  const [estado, setEstado] = useState('')
  const [tipo, setTipo] = useState('')
  const [remitos, setRemitos] = useState([])
  const [activo, setActivo] = useState(null)
  const [evento, setEvento] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await remitosService.getRemitosGlobales({
      estado,
      tipo
    })
    setRemitos(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [estado, tipo])

  if (loading) return <p>Cargando remitos…</p>

  return (
    <div>
      <h2>Remitos</h2>

      {/* FILTROS */}
      <div style={{ marginBottom: 10 }}>
        <select
          value={estado}
          onChange={e => setEstado(e.target.value)}
        >
          <option value="">Estado</option>
          <option value="PARCIAL">Parcial</option>
          <option value="COMPLETO">Completo</option>
        </select>

        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="">Tipo</option>
          <option value="SALIDA">Salida</option>
          <option value="INGRESO">Ingreso</option>
        </select>
      </div>

      {/* TABLA */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Remito</th>
            <th>Evento</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {remitos.map(r => (
            <tr
              key={r.id_remito}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setActivo(r)
                setEvento(r.eventos)
              }}
            >
              <td>{r.id_remito}</td>
              <td>{r.eventos?.nombre_evento}</td>
              <td>{r.tipo}</td>
              <td>{r.estado}</td>
              <td>
                {new Date(r.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      <RemitoItemsModal
        remito={activo}
        evento={evento}
        onClose={() => {
          setActivo(null)
          setEvento(null)
          load()
        }}
        onClosed={() => {
          setActivo(null)
          setEvento(null)
          load()
        }}
      />
    </div>
  )
}
