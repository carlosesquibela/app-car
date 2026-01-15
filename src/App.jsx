import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  const { session, loading } = useAuth()

  if (loading) return <p>Cargando…</p>

  return session ? <Dashboard /> : <Login />
}
