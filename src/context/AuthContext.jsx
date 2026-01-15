import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const loadPerfil = async () => {
      if (!session?.user) {
        setPerfil(null)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('auth_id', session.user.id)
        .single()

      if (error) {
        console.error('Error cargando usuario:', error)
        setPerfil(null)
      } else {
        setPerfil(data)
      }

      setLoading(false)
    }

    loadPerfil()
  }, [session])

  const isAdmin = perfil?.rol === 'ADMIN'
  const isLectura = perfil?.rol === 'LECTURA'

  return (
    <AuthContext.Provider
      value={{
        session,
        perfil,
        loading,
        isAdmin,
        isLectura
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
