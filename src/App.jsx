import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Login from './pages/Login'
import Layout from './layout/Layout'

// páginas
import EventosPage from './pages/EventosPage'
import RemitosPage from './pages/RemitosPage'
import StockPage from './pages/StockPage'
import MovimientosPage from './pages/MovimientosPage'
import TallerPage from './pages/TallerPage'

export default function App() {
  const { session, loading } = useAuth()

  if (loading) return <p>Cargando…</p>

  return (
    <BrowserRouter>
      {!session ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/eventos" />} />
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/remitos" element={<RemitosPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/movimientos" element={<MovimientosPage />} />
            <Route path="/taller" element={<TallerPage />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}
