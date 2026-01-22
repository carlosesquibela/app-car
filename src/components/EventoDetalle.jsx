import { useEffect, useState } from 'react'
import eventosService from '../services/eventos'
import resumenService from '../services/eventoResumen'

import RemitosList from './RemitosList'
import CrearRemito from './CrearRemito'
import EditarEvento from './EditarEvento'

export default function EventoDetalle({ evento, onBack }) {
  const [resumen, setResumen] = useState([])
  const [recargando, setRecargando] = useState(false)

  const cargarResumen = async () => {
    const data =
      await resumenService.getResumenMaterialEvento(
        evento.id_evento
      )
    setResumen(data)
  }

  useEffect(() => {
    cargarResumen()
  }, [])

  const cerrarEvento = async () => {
    const ok = confirm(
      '¿Cerrar evento? No se podrán crear nuevos remitos.'
    )
    if (!ok) return

    setRecargando(true)
    await eventosService.cerrarEvento(evento.id_evento)
    setRecargando(false)
    onBack()
  }

  return (
    <div>
      {/* HEADER */}
      <h2>{evento.nombre_evento}</h2>

      <p>
        <strong>Cliente:</strong> {evento.cliente}
      </p>
      <p><strong>Dirección:</strong> {evento.direccion}</p>
      <p><strong>Localidad:</strong> {evento.localidad}</p>
      <p><strong>Provincia:</strong> {evento.provincia}</p>
      <p><strong>Teléfono:</strong> {evento.telefono_cliente}</p>

      <p>
        <strong>Estado:</strong>{' '}
        {evento.estado}
      </p>

      <button onClick={onBack}>⬅ Volver</button>

      {evento.estado === 'ACTIVO' && (
        <button
          onClick={cerrarEvento}
          style={{ marginLeft: 10 }}
          disabled={recargando}
        >
          {recargando
            ? 'Cerrando…'
            : 'Cerrar evento'}
        </button>
      )}

      <hr />

      {/* EDICIÓN DE EVENTO */}
      {evento.estado === 'ACTIVO' && (
        <>
          <EditarEvento
            evento={evento}
            onSaved={onBack}
          />
          <hr />
        </>
      )}

      {/* CREAR REMITO */}
      {evento.estado === 'ACTIVO' && (
        <>
          <CrearRemito
            evento={evento}
            onCreated={cargarResumen}
          />
          <hr />
        </>
      )}

      {/* REMITOS */}
      <h3>Remitos del evento</h3>

      <RemitosList
        eventoId={evento.id_evento}
        onChanged={cargarResumen}
      />

      <hr />

      {/* RESUMEN DE MATERIAL */}
      <h3>Material utilizado</h3>

      {resumen.length === 0 ? (
        <p>No hay movimientos registrados.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Salidas</th>
              <th>Ingresos</th>
              <th>Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {resumen.map(r => (
              <tr key={r.articulo}>
                <td>{r.articulo}</td>
                <td>{r.salida}</td>
                <td>{r.ingreso}</td>
                <td>{r.diferencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
