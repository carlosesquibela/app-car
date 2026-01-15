import { useAuth } from '../context/AuthContext'
import exportRemitoPdfService from '../services/exportRemitoPdf'

export default function ExportarRemitoPdf({ remito, evento }) {
  const { perfil } = useAuth()

  if (!remito || !evento) return null

  const handleExport = async () => {
    try {
      await exportRemitoPdfService.exportarRemitoPdf({
        remito,
        evento,
        usuario: perfil
      })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button onClick={handleExport} style={{ marginLeft: 10 }}>
      📄 Exportar PDF
    </button>
  )
}
