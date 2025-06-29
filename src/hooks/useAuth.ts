import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.ts'

// Hook pour utiliser le contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
} 