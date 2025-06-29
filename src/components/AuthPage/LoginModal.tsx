import { useState } from 'react'
import { X, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup: () => void
}

export function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const { signIn, resetPassword, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Veuillez entrer un email valide')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await signIn(email, password)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        onClose()
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      toast.error('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  // Gestion de la réinitialisation du mot de passe
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Veuillez entrer votre email')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Veuillez entrer un email valide')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await resetPassword(email)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        setShowResetPassword(false)
      }
    } catch (error) {
      console.error('Erreur de reset:', error)
      toast.error('Erreur lors de l\'envoi de l\'email')
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour fermer le modal
  const handleClose = () => {
    if (!isLoading && !loading) {
      onClose()
      setEmail('')
      setPassword('')
      setShowResetPassword(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-yellow-500 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {showResetPassword ? 'Mot de passe oublié' : 'Se connecter'}
            </h2>
            <button
              onClick={handleClose}
              disabled={isLoading || loading}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showResetPassword ? (
            /* Formulaire de connexion */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="votre.email@exemple.com"
                    required
                    disabled={isLoading || loading}
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                    disabled={isLoading || loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading || loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Mot de passe oublié */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="text-sm text-green-600 hover:text-green-700 transition-colors"
                  disabled={isLoading || loading}
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading || loading}
                className="w-full bg-gradient-to-r from-green-600 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-yellow-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading || loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>
          ) : (
            /* Formulaire de réinitialisation */
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-gray-600 text-sm mb-4">
                Entrez votre email pour recevoir un lien de réinitialisation de mot de passe.
              </p>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="votre.email@exemple.com"
                    required
                    disabled={isLoading || loading}
                  />
                </div>
              </div>

              {/* Boutons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowResetPassword(false)}
                  disabled={isLoading || loading}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isLoading || loading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-yellow-600 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Envoi...' : 'Envoyer'}
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          {!showResetPassword && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>

              {/* Lien vers inscription */}
              <div className="text-center">
                <p className="text-gray-600">
                  Pas encore de compte ?{' '}
                  <button
                    onClick={onSwitchToSignup}
                    disabled={isLoading || loading}
                    className="text-green-600 hover:text-green-700 font-semibold transition-colors disabled:opacity-50"
                  >
                    Créer un compte
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 