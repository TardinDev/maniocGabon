import { createContext } from 'react'
import type { User, Session } from '@supabase/supabase-js'

// Types pour l'authentification
export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string }>
}

// Créer le contexte
export const AuthContext = createContext<AuthContextType | undefined>(undefined) 