import { useEffect, useState } from 'react'
import unidadesService from '../services/articulosUnidades'
import remitosUnidades from '../services/remitosUnidades'

export default function AgregarUnidadRemito({
  remito,
  articulo,
  onAdded
}) {
  const [unidades, setUnidades] = useState([])

  const load = async () => {
    const all =
      await unidadesService.getUnidadesPorArticulo(
        articulo.id_articulo
      )

    setUnidades(
      all.filter(u => u.estado === 'DISPONIBLE')
    )
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h4>{articulo.nombre}</h4>

      {unidades.map(u => (
        <button
          key={u.id_unidad}
          onClick={async () => {
            await remitosUnidades.agregarUnidadARemito(
              {
                id_remito: remito.id_remito,
                unidad: u
              }
            )
            onAdded()
            load()
          }}
          style={{ margin: 4 }}
        >
          #{u.numero_interno}
        </button>
      ))}
    </div>
  )
}
