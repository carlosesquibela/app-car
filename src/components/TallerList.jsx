import { useEffect, useState } from 'react'
import tallerService from '../services/taller'

export default function TallerList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const d = await tallerService.getPendientes()
    setData(d)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Cargando taller…</p>

  return (
    <div>
      <h2>Taller</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Artículo</th>
            <th>Evento</th>
            <th>Estado</th>
            <th>Falla</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map(t => (
            <tr key={t.id_taller}>
              <td>{t.articulos?.nombre}</td>
              <td>{t.eventos?.nombre_evento}</td>
              <td>{t.estado}</td>
              <td>{t.falla}</td>
              <td>
                {t.estado === 'EN_REVISION' && (
                  <>
                    <button
                      onClick={async () => {
                        await tallerService.cerrarTaller({
                          id_taller: t.id_taller,
                          estado: 'REPARADO'
                        })
                        load()
                      }}
                    >
                      Reparado
                    </button>

                    <button
                      onClick={async () => {
                        await tallerService.cerrarTaller({
                          id_taller: t.id_taller,
                          estado: 'BAJA'
                        })
                        load()
                      }}
                      style={{ marginLeft: 5 }}
                    >
                      Baja
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
