import { useState } from 'react'
import eventosService from '../services/eventos'

export default function CrearEvento({ onCreated }) {
  const [form, setForm] = useState({
    nombre_evento: '',
    cliente: '',
    fecha_inicio: '',
    localidad: '',
    provincia: '',
    direccion: '',
    telefono_cliente: ''
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const change = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await eventosService.crearEvento(form)
      setForm({
        nombre_evento: '',
        cliente: '',
        fecha_inicio: '',
        localidad: '',
        provincia: '',
        direccion: '',
        telefono_cliente: ''
      })
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <h4>Nuevo evento</h4>

      <input
        name="nombre_evento"
        placeholder="Nombre del evento"
        value={form.nombre_evento}
        onChange={change}
        required
      />

      <input
        name="cliente"
        placeholder="Cliente"
        value={form.cliente}
        onChange={change}
        required
        style={{ marginLeft: 10 }}
      />

      <input
        type="date"
        name="fecha_inicio"
        value={form.fecha_inicio}
        onChange={change}
        required
        style={{ marginLeft: 10 }}
      />

      <br /><br />

      <input
        name="localidad"
        placeholder="Localidad"
        value={form.localidad}
        onChange={change}
      />

      <input
        name="provincia"
        placeholder="Provincia"
        value={form.provincia}
        onChange={change}
        style={{ marginLeft: 10 }}
      />

      <input
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={change}
        style={{ marginLeft: 10 }}
      />

      <input
        name="telefono_cliente"
        placeholder="Teléfono"
        value={form.telefono_cliente}
        onChange={change}
        style={{ marginLeft: 10 }}
      />

      <br /><br />

      <button type="submit" disabled={loading}>
        {loading ? 'Creando…' : 'Crear evento'}
      </button>

      {error && (
        <p style={{ color: 'red' }}>Error: {error}</p>
      )}
    </form>
  )
}
