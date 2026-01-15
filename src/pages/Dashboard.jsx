import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import CrearEvento from '../components/CrearEvento'
import EventosList from '../components/EventosList'
import EventoDetalle from '../components/EventoDetalle'

export default function Dashboard() {
  const { perfil } = useAuth()
  const [reloadKey, setReloadKey] = useState(0)
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null)

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Rol: {perfil?.rol}</p>

      {!eventoSeleccionado && (
        <CrearEvento onCreated={() => setReloadKey(k => k + 1)} />
      )}

      {!eventoSeleccionado && (
        <EventosList
          reloadKey={reloadKey}
          onSelect={evento => setEventoSeleccionado(evento)}
        />
      )}

      {eventoSeleccionado && (
        <EventoDetalle
          evento={eventoSeleccionado}
          onBack={() => setEventoSeleccionado(null)}
        />
      )}

      <hr />

      <button onClick={() => supabase.auth.signOut()}>
        🔒 Cerrar sesión
      </button>
    </div>
  )
}
