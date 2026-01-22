import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'

export default function Header() {
  const { perfil } = useAuth()

  const logout = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <header
      style={{
        padding: 10,
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <span>{perfil?.nombre}</span>
      <button onClick={logout}>Cerrar sesión</button>
    </header>
  )
}
