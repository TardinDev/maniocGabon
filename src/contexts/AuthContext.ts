import { createContext } from 'react'
import type { User, Session } from '@supabase/supabase-js'

// Types pour les rôles utilisateur
export type UserRole = 'user' | 'admin'

// Types pour l'authentification
export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  userRole: UserRole
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string }>
}

// Créer le contexte
export const AuthContext = createContext<AuthContextType | undefined>(undefined) 