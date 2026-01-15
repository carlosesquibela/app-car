import { useState } from 'react'
import { createEvento } from '../services/eventos'

export default function CrearEvento({ onCreated }) {
  const [nombre, setNombre] = useState('')
  const [cliente, setCliente] = useState('')
  const [inicio, setInicio] = useState('')
  const [fin, setFin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const nuevo = await createEvento({
        nombre_evento: nombre,
        cliente,
        fecha_inicio: inicio,
        fecha_fin: fin
      })

      // limpiar
      setNombre('')
      setCliente('')
      setInicio('')
      setFin('')

      // avisar al padre
      onCreated?.(nuevo)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Crear evento</h3>

      <input
        placeholder="Nombre del evento"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />
      <br />

      <input
        placeholder="Cliente"
        value={cliente}
        onChange={e => setCliente(e.target.value)}
        required
      />
      <br />

      <label>
        Inicio:
        <input
          type="date"
          value={inicio}
          onChange={e => setInicio(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Fin:
        <input
          type="date"
          value={fin}
          onChange={e => setFin(e.target.value)}
          required
        />
      </label>
      <br />

      <button disabled={loading}>
        {loading ? 'Creando…' : 'Crear'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
