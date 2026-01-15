import exportRemitoService from '../services/exportRemito'

export default function ExportarRemito({ remito, evento }) {
  if (!remito || !evento) return null

  const handleExport = async () => {
    try {
      await exportRemitoService.exportarRemitoExcel({
        remito,
        evento
      })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button onClick={handleExport}>
      📤 Exportar remito (Excel)
    </button>
  )
}
