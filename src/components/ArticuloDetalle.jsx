import { useEffect, useState } from 'react'
import unidadesService from '../services/articulosUnidades'

export default function ArticuloDetalle({ articulo, onBack }) {
  const [unidades, setUnidades] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)

    // 🔧 genera unidades si faltan
    await unidadesService.prepararUnidadesArticulo(
      articulo.id_articulo,
      articulo.stock_total
    )

    const data =
      await unidadesService.getUnidadesPorArticulo(
        articulo.id_articulo
      )

    setUnidades(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Cargando unidades…</p>

  return (
    <div>
      <h2>
        {articulo.nombre} – Unidades
      </h2>

      <button onClick={onBack}>⬅ Volver</button>

      <hr />

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Estado</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {unidades.map(u => {
            let color = 'green'
            if (u.estado === 'EN_TALLER') color = 'red'
            if (u.estado === 'INACTIVO') color = 'gray'
            if (u.estado === 'EN_USO') color = 'orange'

            return (
              <tr key={u.id_unidad}>
                <td>{u.numero_interno}</td>

                <td style={{ color, fontWeight: 'bold' }}>
                  {u.estado}
                </td>

                <td>{u.observaciones}</td>

                <td>
                  {u.estado !== 'EN_TALLER' && (
                    <button
                      onClick={async () => {
                        const obs = prompt(
                          'Motivo del envío a taller'
                        )
                        if (!obs) return

                        await unidadesService.actualizarEstadoUnidad(
                          u.id_unidad,
                          'EN_TALLER',
                          obs
                        )
                        load()
                      }}
                    >
                      Enviar a taller
                    </button>
                  )}

                  {u.estado === 'EN_TALLER' && (
                    <button
                      onClick={async () => {
                        await unidadesService.actualizarEstadoUnidad(
                          u.id_unidad,
                          'DISPONIBLE',
                          'Reparado'
                        )
                        load()
                      }}
                      style={{ marginLeft: 5 }}
                    >
                      Marcar disponible
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
