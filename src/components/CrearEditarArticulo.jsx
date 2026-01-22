import { useState } from 'react'
import articulosService from '../services/articulos'

export default function CrearEditarArticulo({
  articulo,
  onSaved
}) {
  const [form, setForm] = useState({
    nombre: articulo?.nombre || '',
    categoria: articulo?.categoria || '',
    stock_total: articulo?.stock_total || 0,
    observaciones: articulo?.observaciones || ''
  })

  const change = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async e => {
    e.preventDefault()

    if (articulo) {
      await articulosService.actualizarArticulo(
        articulo.id_articulo,
        form
      )
    } else {
      await articulosService.crearArticulo(form)
    }

    onSaved()
  }

  return (
    <form onSubmit={submit}>
      <h4>{articulo ? 'Editar' : 'Nuevo'} artículo</h4>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={change}
        required
      />

      <input
        name="categoria"
        placeholder="Categoría"
        value={form.categoria}
        onChange={change}
        required
        style={{ marginLeft: 10 }}
      />

      <input
        type="number"
        name="stock_total"
        value={form.stock_total}
        onChange={change}
        min="0"
        style={{ marginLeft: 10 }}
      />

      <br /><br />

      <input
        name="observaciones"
        placeholder="Observaciones"
        value={form.observaciones}
        onChange={change}
      />

      <br /><br />

      <button type="submit">Guardar</button>
    </form>
  )
}
