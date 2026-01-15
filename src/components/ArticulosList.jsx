import { useEffect, useState } from 'react'
import articulosService from '../services/articulos'

export default function ArticulosList({ reloadKey }) {
  const [articulos, setArticulos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await articulosService.getArticulos()
      setArticulos(data)
      setLoading(false)
    }

    load()
  }, [reloadKey])

  if (loading) return <p>Cargando artículos…</p>

  if (articulos.length === 0) {
    return <p>No hay artículos cargados</p>
  }

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Total</th>
          <th>En uso</th>
          <th>Disponible</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map(a => (
          <tr key={a.id_articulo}>
            <td>{a.nombre}</td>
            <td>{a.categoria}</td>
            <td>{a.stock_total}</td>
            <td>{a.stock_en_uso}</td>
            <td>{a.stock_total - a.stock_en_uso}</td>
            <td>{a.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
