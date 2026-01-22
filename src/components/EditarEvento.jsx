import { useState } from 'react'
import eventosService from '../services/eventos'

export default function EditarEvento({ evento, onSaved }) {
  const [form, setForm] = useState({
    nombre_evento: evento.nombre_evento,
    cliente: evento.cliente,
    fecha_inicio: evento.fecha_inicio?.slice(0, 10),
    localidad: evento.localidad || '',
    provincia: evento.provincia || '',
    direccion: evento.direccion || '',
    telefono_cliente: evento.telefono_cliente || ''
  })

  const [loading, setLoading] = useState(false)

  const change = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const save = async e => {
    e.preventDefault()
    setLoading(true)
    await eventosService.actualizarEvento(evento.id_evento, form)
    setLoading(false)
    onSaved()
  }

  return (
    <form onSubmit={save}>
      <h4>Editar evento</h4>

      <input name="nombre_evento" value={form.nombre_evento} onChange={change} />
      <input name="cliente" value={form.cliente} onChange={change} style={{ marginLeft: 10 }} />
      <input type="date" name="fecha_inicio" value={form.fecha_inicio} onChange={change} style={{ marginLeft: 10 }} />

      <br /><br />

      <input name="localidad" value={form.localidad} onChange={change} />
      <input name="provincia" value={form.provincia} onChange={change} style={{ marginLeft: 10 }} />
      <input name="direccion" value={form.direccion} onChange={change} style={{ marginLeft: 10 }} />
      <input name="telefono_cliente" value={form.telefono_cliente} onChange={change} style={{ marginLeft: 10 }} />

      <br /><br />

      <button type="submit" disabled={loading}>
        Guardar cambios
      </button>
    </form>
  )
}
