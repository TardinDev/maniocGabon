import { useState } from 'react'
import { X, Eye, EyeOff, Mail, Lock, User, Check } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const { signUp, loading } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Validation du mot de passe
  const validatePassword = (password: string) => {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    
    const strength = Object.values(checks).filter(Boolean).length
    return { checks, strength }
  }

  const passwordValidation = validatePassword(formData.password)

  // Gestion des changements de formulaire
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Validation des noms (lettres uniquement)
  const validateName = (name: string) => {
    return /^[a-zA-ZÀ-ÿ\s]{2,30}$/.test(name)
  }

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validations
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    if (!validateName(formData.firstName)) {
      toast.error('Le prénom doit contenir uniquement des lettres (2-30 caractères)')
      return
    }

    if (!validateName(formData.lastName)) {
      toast.error('Le nom doit contenir uniquement des lettres (2-30 caractères)')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Veuillez entrer un email valide')
      return
    }

    if (passwordValidation.strength < 4) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    if (!agreedToTerms) {
      toast.error('Veuillez accepter les conditions d\'utilisation')
      return
    }

    setIsLoading(true)
    
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`
      const result = await signUp(formData.email, formData.password, fullName)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        onClose()
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        setAgreedToTerms(false)
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      toast.error('Erreur lors de la création du compte')
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour fermer le modal
  const handleClose = () => {
    if (!isLoading && !loading) {
      onClose()
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      setAgreedToTerms(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-yellow-500 px-6 py-4 text-white sticky top-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Créer un compte</h2>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Jean"
                    required
                    disabled={isLoading || loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Dupont"
                    required
                    disabled={isLoading || loading}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="jean.dupont@exemple.com"
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
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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

              {/* Indicateur de force du mot de passe */}
              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded ${
                          level <= passwordValidation.strength
                            ? passwordValidation.strength <= 2
                              ? 'bg-red-500'
                              : passwordValidation.strength <= 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className={`flex items-center ${passwordValidation.checks.length ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className="w-3 h-3 mr-1" />
                      Au moins 8 caractères
                    </div>
                    <div className={`flex items-center ${passwordValidation.checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className="w-3 h-3 mr-1" />
                      Une minuscule
                    </div>
                    <div className={`flex items-center ${passwordValidation.checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className="w-3 h-3 mr-1" />
                      Une majuscule
                    </div>
                    <div className={`flex items-center ${passwordValidation.checks.number ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className="w-3 h-3 mr-1" />
                      Un chiffre
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  required
                  disabled={isLoading || loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading || loading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Les mots de passe ne correspondent pas</p>
              )}
            </div>

            {/* Conditions d'utilisation */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                disabled={isLoading || loading}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                J'accepte les{' '}
                <a href="#" className="text-green-600 hover:text-green-700 underline">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-green-600 hover:text-green-700 underline">
                  politique de confidentialité
                </a>
              </label>
            </div>

            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={isLoading || loading || passwordValidation.strength < 4 || !agreedToTerms}
              className="w-full bg-gradient-to-r from-green-600 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-yellow-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading || loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Création du compte...
                </div>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Lien vers connexion */}
          <div className="text-center">
            <p className="text-gray-600">
              Déjà un compte ?{' '}
              <button
                onClick={onSwitchToLogin}
                disabled={isLoading || loading}
                className="text-green-600 hover:text-green-700 font-semibold transition-colors disabled:opacity-50"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 