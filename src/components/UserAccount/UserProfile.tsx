import { useState, useEffect } from 'react'
import { Camera, Save, Mail, User, Calendar } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

export function UserProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: ''
  })

  // Charger les données du profil au montage
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(' ')
      setFormData({
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || '',
        phone: user.user_metadata.phone || '',
        address: user.user_metadata.address || '',
        city: user.user_metadata.city || ''
      })
    }
  }, [user])

  // Sauvegarder les modifications
  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('Le prénom et le nom sont obligatoires')
      return
    }

    setIsLoading(true)
    
    try {
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`
      
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim()
        }
      })

      if (error) {
        toast.error('Erreur lors de la mise à jour du profil')
        console.error('Erreur update:', error)
      } else {
        toast.success('Profil mis à jour avec succès !')
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Erreur de sauvegarde:', error)
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Restaurer les données originales
    if (user?.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(' ')
      setFormData({
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || '',
        phone: user.user_metadata.phone || '',
        address: user.user_metadata.address || '',
        city: user.user_metadata.city || ''
      })
    }
    setIsEditing(false)
  }

  // Obtenir les initiales
  const getInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.email?.charAt(0).toUpperCase() || 'U'
  }

  // Formatage de la date d'inscription
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            <p className="text-gray-600">Gérez vos informations personnelles</p>
          </div>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Modifier
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading || !formData.firstName.trim() || !formData.lastName.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Sauvegarder
              </button>
            </div>
          )}
        </div>

        {/* Photo de profil */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Photo de Profil</h2>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {getInitials()}
              </div>
              <button className="absolute -bottom-1 -right-1 bg-white border-2 border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Avatar personnalisé</h3>
              <p className="text-sm text-gray-500 mb-2">Votre avatar est généré automatiquement à partir de vos initiales</p>
              <button className="text-sm text-green-600 hover:text-green-700">
                Changer la photo (prochainement)
              </button>
            </div>
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations Personnelles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Votre prénom"
                  disabled={isLoading}
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.firstName || 'Non renseigné'}</p>
              )}
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Votre nom"
                  disabled={isLoading}
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.lastName || 'Non renseigné'}</p>
              )}
            </div>

            {/* Email (non modifiable) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <p className="text-gray-600 py-2 bg-gray-50 px-3 rounded-lg">{user?.email}</p>
              <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+241 XX XX XX XX"
                  disabled={isLoading}
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.phone || 'Non renseigné'}</p>
              )}
            </div>

            {/* Ville */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Libreville, Port-Gentil..."
                  disabled={isLoading}
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.city || 'Non renseigné'}</p>
              )}
            </div>

            {/* Adresse */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse
              </label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Votre adresse complète"
                  disabled={isLoading}
                />
              ) : (
                <p className="text-gray-900 py-2 min-h-[60px]">{formData.address || 'Non renseigné'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Informations du compte */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations du Compte</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Membre depuis</p>
                  <p className="text-sm text-gray-500">Date de création du compte</p>
                </div>
              </div>
              <p className="text-gray-900">{user?.created_at ? formatDate(user.created_at) : 'Inconnue'}</p>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Email vérifié</p>
                  <p className="text-sm text-gray-500">Statut de vérification</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user?.email_confirmed_at 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {user?.email_confirmed_at ? 'Vérifié' : 'En attente'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 