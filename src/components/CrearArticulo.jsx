import { useState } from 'react'
import articulosService from '../services/articulos'

export default function CrearArticulo({ onCreated }) {
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [stock, setStock] = useState(0)
  const [obs, setObs] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await articulosService.crearArticulo({
        nombre,
        categoria,
        stock_total: Number(stock),
        observaciones: obs
      })

      setNombre('')
      setCategoria('')
      setStock(0)
      setObs('')
      onCreated?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear artículo</h3>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />

      <input
        placeholder="Categoría"
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
      />

      <input
        type="number"
        min="0"
        value={stock}
        onChange={e => setStock(e.target.value)}
      />

      <textarea
        placeholder="Observaciones"
        value={obs}
        onChange={e => setObs(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? 'Guardando…' : 'Crear'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
