import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

import articulosService from '../services/articulos'
import remitoItemsService from '../services/remitoItems'

import RemitoItemsList from './RemitoItemsList'
import ExportarRemito from './ExportarRemito'
import ExportarRemitoPdf from './ExportarRemitoPdf'
import CerrarRemito from './CerrarRemito'

export default function RemitoItemsModal({
  remito,
  evento,
  onClose,
  onClosed
}) {
  const { isAdmin } = useAuth()

  // 🔒 Guardas absolutas
  if (!remito || !remito.id_remito) return null
  if (!evento || !evento.id_evento) return null

  const cerrado = remito.estado === 'COMPLETO'
  const puedeEditar = isAdmin && !cerrado

  const [articulos, setArticulos] = useState([])
  const [articuloId, setArticuloId] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔹 Cargar artículos
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await articulosService.getArticulos()
        setArticulos(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const articulo = articulos.find(
    a => String(a.id_articulo) === String(articuloId)
  )

  const disponible = articulo
    ? articulo.stock_total - articulo.stock_en_uso
    : 0

  const handleAdd = async () => {
    if (!puedeEditar || !articulo) return
    setError(null)

    try {
      await remitoItemsService.agregarItem({
        remito,
        articulo,
        cantidad: Number(cantidad)
      })

      setCantidad(1)
      setReload(r => r + 1)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async item => {
    if (!puedeEditar) return

    try {
      await remitoItemsService.eliminarItem({
        item,
        remito
      })
      setReload(r => r + 1)
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p>Cargando artículos…</p>

  return (
    <div
      style={{
        background: '#fff',
        padding: 20,
        border: '1px solid #ccc',
        marginTop: 20
      }}
    >
      {/* HEADER */}
      <h3>
        Remito #{remito.id_remito} — {remito.tipo}
      </h3>

      <p>
        Evento: <strong>{evento.nombre_evento}</strong>
      </p>

      <p>
        Estado:{' '}
        <strong>
          {remito.estado}
          {cerrado && ' 🔒'}
        </strong>
      </p>

      {/* EXPORTACIONES */}
      <div style={{ marginBottom: 10 }}>
        <ExportarRemito remito={remito} evento={evento} />
        <ExportarRemitoPdf remito={remito} evento={evento} />
      </div>

      {/* CIERRE OPERATIVO */}
      <CerrarRemito
        remito={remito}
        onClosed={() => {
          if (onClosed) onClosed()
        }}
      />

      <hr />

      {/* FORMULARIO DE CARGA (solo ADMIN y PARCIAL) */}
      {puedeEditar && (
        <>
          <h4>Agregar artículo</h4>

          <select
            value={articuloId}
            onChange={e => setArticuloId(e.target.value)}
          >
            <option value="">Seleccionar artículo</option>
            {articulos.map(a => (
              <option key={a.id_articulo} value={a.id_articulo}>
                {a.nombre} (disp: {a.stock_total - a.stock_en_uso})
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            max={remito.tipo === 'SALIDA' ? disponible : undefined}
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
            style={{ marginLeft: 10 }}
          />

          <button
            onClick={handleAdd}
            disabled={!articulo || cantidad <= 0}
            style={{ marginLeft: 10 }}
          >
            Agregar
          </button>

          {error && (
            <p style={{ color: 'red', marginTop: 10 }}>
              ERROR: {error}
            </p>
          )}

          <hr />
        </>
      )}

      {/* LISTADO DE ÍTEMS */}
      <RemitoItemsList
        remito={remito}
        reloadKey={reload}
        onReload={puedeEditar ? handleDelete : null}
      />

      <hr />

      {/* CERRAR MODAL */}
      <button onClick={() => onClose && onClose()}>
        Cerrar
      </button>
    </div>
  )
}
