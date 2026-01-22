import { NavLink } from 'react-router-dom'

const linkStyle = ({ isActive }) => ({
  display: 'block',
  padding: 10,
  textDecoration: 'none',
  background: isActive ? '#ddd' : 'transparent'
})

export default function Sidebar() {
  return (
    <aside style={{ width: 220, background: '#f0f0f0' }}>
      <h3 style={{ padding: 10 }}>Control</h3>

      <NavLink to="/eventos" style={linkStyle}>📅 Eventos</NavLink>
      <NavLink to="/remitos" style={linkStyle}>📄 Remitos</NavLink>
      <NavLink to="/stock" style={linkStyle}>📦 Stock</NavLink>
      <NavLink to="/movimientos" style={linkStyle}>🔁 Movimientos</NavLink>
      <NavLink to="/taller" style={linkStyle}>🛠 Taller</NavLink>
    </aside>
  )
}
