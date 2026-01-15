import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function AuditoriaList({ referencia }) {
  const [data, setData] = useState([])

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('auditoria')
        .select('*')
        .eq('referencia', referencia)
        .order('created_at', { ascending: false })

      setData(data || [])
    }

    load()
  }, [referencia])

  if (data.length === 0) {
    return <p>No hay acciones registradas</p>
  }

  return (
    <div>
      <h4>Historial de acciones</h4>
      <ul>
        {data.map(a => (
          <li key={a.id_auditoria}>
            [{new Date(a.created_at).toLocaleString()}] {a.accion}
            {a.detalle && ` – ${a.detalle}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
