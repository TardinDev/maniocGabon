import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { AuthContext, type AuthContextType, type UserRole } from './AuthContext'

// Provider du contexte
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<UserRole>('user')

  // Vérifier si l'utilisateur est admin
  const isAdmin = userRole === 'admin'

  // Fonction de connexion
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          return { error: 'Email ou mot de passe incorrect' }
        }
        return { error: error.message }
      }

      if (data.user) {
        toast.success('Connexion réussie !')
      }

      return {}
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return { error: 'Erreur de connexion' }
    } finally {
      setLoading(false)
    }
  }

  // Fonction d'inscription
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim()
          }
        }
      })

      if (error) {
        if (error.message.includes('already registered')) {
          return { error: 'Un compte existe déjà avec cet email' }
        }
        return { error: error.message }
      }

      if (data.user) {
        toast.success('Compte créé ! Vérifiez votre email pour confirmer.')
      }

      return {}
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      return { error: 'Erreur lors de la création du compte' }
    } finally {
      setLoading(false)
    }
  }

  // Fonction de déconnexion
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        toast.error('Erreur lors de la déconnexion')
      } else {
        toast.success('Déconnexion réussie')
        setUser(null)
        setSession(null)
      }
    } catch (authError) {
      console.error('Erreur de déconnexion:', authError)
    } finally {
      setLoading(false)
    }
  }

  // Fonction de réinitialisation de mot de passe
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        return { error: 'Erreur lors de l\'envoi de l\'email' }
      }

      toast.success('Email de réinitialisation envoyé !')
      return {}
    } catch (resetError) {
      console.error('Erreur de reset:', resetError)
      return { error: 'Erreur lors de l\'envoi de l\'email' }
    }
  }

  // Écouter les changements d'authentification
  useEffect(() => {
    // Fonction pour récupérer le rôle depuis Supabase (table profiles)
    const fetchUserRole = async (userId: string): Promise<UserRole> => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single()

        if (error) {
          console.warn('Erreur lors de la récupération du rôle:', error)
          return 'user' // Rôle par défaut en cas d'erreur
        }

        return (data?.role as UserRole) || 'user'
      } catch (error) {
        console.warn('Erreur lors de la récupération du rôle:', error)
        return 'user'
      }
    }

    // Récupérer la session initiale
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      // Récupérer le rôle si l'utilisateur est connecté
      if (session?.user?.id) {
        const role = await fetchUserRole(session.user.id)
        setUserRole(role)
      } else {
        setUserRole('user')
      }
      
      setLoading(false)
    })

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        // Récupérer le rôle si l'utilisateur est connecté
        if (session?.user?.id) {
          const role = await fetchUserRole(session.user.id)
          setUserRole(role)
        } else {
          setUserRole('user')
        }

        setLoading(false)

        if (event === 'SIGNED_IN') {
          console.log('✅ Utilisateur connecté')
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 Utilisateur déconnecté')
          setUserRole('user') // Reset le rôle à la déconnexion
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value: AuthContextType = {
    user,
    session,
    loading,
    isAdmin,
    userRole,
    signIn,
    signUp,
    signOut,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 