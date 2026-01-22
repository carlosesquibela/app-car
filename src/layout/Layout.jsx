import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: 20 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
