import { useEffect, useState } from 'react'
import articulosService from '../services/articulos'
import CrearEditarArticulo from './CrearEditarArticulo'
import ArticuloDetalle from './ArticuloDetalle'

export default function StockGlobal() {
  const [articulos, setArticulos] = useState([])
  const [editando, setEditando] = useState(null)
  const [detalle, setDetalle] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await articulosService.getArticulos()
    setArticulos(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  if (detalle) {
    return (
      <ArticuloDetalle
        articulo={detalle}
        onBack={() => {
          setDetalle(null)
          load()
        }}
      />
    )
  }

  if (loading) return <p>Cargando stock…</p>

  return (
    <div>
      <h2>Stock</h2>

      <CrearEditarArticulo onSaved={load} />

      <hr />

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Artículo</th>
            <th>Categoría</th>
            <th>Total</th>
            <th>En uso</th>
            <th>Disponible</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {articulos.map(a => {
            const disponible =
              a.stock_total - a.stock_en_uso

            let color = 'green'
            let label = 'OK'

            if (a.estado === 'EN_TALLER') {
              color = 'red'
              label = 'EN TALLER'
            } else if (a.estado === 'INACTIVO') {
              color = 'gray'
              label = 'INACTIVO'
            } else if (a.stock_en_uso > 0) {
              color = 'orange'
              label = 'EN USO'
            }

            return (
              <tr key={a.id_articulo}>
                <td>{a.nombre}</td>
                <td>{a.categoria}</td>
                <td>{a.stock_total}</td>
                <td>{a.stock_en_uso}</td>
                <td>{disponible}</td>

                <td style={{ color, fontWeight: 'bold' }}>
                  {label}
                </td>

                <td>
                  <button
                    onClick={() => setEditando(a)}
                  >
                    Editar
                  </button>

                  <button
                    style={{ marginLeft: 5 }}
                    onClick={() => setDetalle(a)}
                  >
                    Ver todos
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {editando && (
        <>
          <hr />
          <CrearEditarArticulo
            articulo={editando}
            onSaved={() => {
              setEditando(null)
              load()
            }}
          />
        </>
      )}
    </div>
  )
}
