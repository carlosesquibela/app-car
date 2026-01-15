import { useEffect, useState } from 'react'
import remitoItemsService from '../services/remitoItems'

export default function RemitoItemsList({ remito, reloadKey, onReload }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!remito?.id_remito) return

    const load = async () => {
      setLoading(true)
      const data = await remitoItemsService.getItemsPorRemito(
        remito.id_remito
      )
      setItems(data)
      setLoading(false)
    }

    load()
  }, [remito, reloadKey])

  if (loading) return <p>Cargando ítems…</p>

  if (items.length === 0) {
    return <p>No hay artículos cargados</p>
  }

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Artículo</th>
          <th>Cantidad</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map(i => (
          <tr key={i.id}>
            <td>{i.articulos?.nombre}</td>
            <td>{i.cantidad}</td>
            <td>
              <button
                onClick={() =>
                  onReload && onReload(i)
                }
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
