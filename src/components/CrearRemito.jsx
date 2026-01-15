import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import remitosService from '../services/remitos'

export default function CrearRemito({ evento, onCreated }) {
  const { loading, isAdmin, perfil } = useAuth()
  const [tipo, setTipo] = useState('SALIDA')
  const [creating, setCreating] = useState(false)

  if (loading) return <p>Cargando usuario…</p>
  if (!isAdmin) return null
  if (!evento?.id_evento) return null

  const handleSubmit = async e => {
    e.preventDefault()
    setCreating(true)

    try {
      await remitosService.crearRemito({
        id_evento: evento.id_evento,
        tipo,
        usuario_id: perfil.id_usuario   // ✅ CORRECTO
      })
      onCreated?.()
    } catch (err) {
      alert(err.message)
    } finally {
      setCreating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo remito</h3>

      <select
        value={tipo}
        onChange={e => setTipo(e.target.value)}
        disabled={creating}
      >
        <option value="SALIDA">Salida</option>
        <option value="INGRESO">Ingreso</option>
      </select>

      <button type="submit" disabled={creating}>
        {creating ? 'Creando…' : 'Crear remito'}
      </button>
    </form>
  )
}
