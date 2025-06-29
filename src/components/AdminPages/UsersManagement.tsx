import { useState } from 'react'
import { Search, Shield, ShieldOff, Mail, Calendar, MapPin, Phone, Eye, Ban, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface AdminUser {
  id: string
  email: string
  fullName: string
  phone?: string
  city?: string
  address?: string
  registrationDate: string
  status: 'active' | 'suspended' | 'pending'
  role: 'user' | 'admin'
  lastLogin?: string
  ordersCount: number
}

export function UsersManagement() {
  // Données simulées des utilisateurs
  const [usersList, setUsersList] = useState<AdminUser[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      fullName: 'John Doe',
      phone: '+241 01 23 45 67',
      city: 'Libreville',
      address: '123 Rue de la Paix',
      registrationDate: '2024-01-15',
      status: 'active',
      role: 'user',
      lastLogin: '2024-01-20',
      ordersCount: 3
    },
    {
      id: '2',
      email: 'marie.martin@example.com',
      fullName: 'Marie Martin',
      phone: '+241 02 34 56 78',
      city: 'Port-Gentil',
      registrationDate: '2024-01-10',
      status: 'active',
      role: 'user',
      lastLogin: '2024-01-19',
      ordersCount: 7
    },
    {
      id: '3',
      email: 'admin@maniocgabon.com',
      fullName: 'Administrateur Principal',
      phone: '+241 03 45 67 89',
      city: 'Libreville',
      registrationDate: '2023-12-01',
      status: 'active',
      role: 'admin',
      lastLogin: '2024-01-21',
      ordersCount: 0
    },
    {
      id: '4',
      email: 'pierre.dubois@example.com',
      fullName: 'Pierre Dubois',
      registrationDate: '2024-01-18',
      status: 'suspended',
      role: 'user',
      ordersCount: 1
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'pending'>('all')
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all')
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

  // Filtrer les utilisateurs
  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    
    return matchesSearch && matchesStatus && matchesRole
  })

  // Suspendre/Réactiver un utilisateur
  const toggleUserStatus = (userId: string) => {
    setUsersList(prev => prev.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'suspended' : 'active'
        const actionText = newStatus === 'suspended' ? 'suspendu' : 'réactivé'
        toast.success(`Utilisateur ${actionText} avec succès`)
        return { ...user, status: newStatus }
      }
      return user
    }))
  }

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Obtenir les initiales
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Obtenir la couleur du statut
  const getStatusColor = (status: AdminUser['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'suspended':
        return 'bg-red-100 text-red-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // Obtenir le libellé du statut
  const getStatusLabel = (status: AdminUser['status']) => {
    switch (status) {
      case 'active':
        return 'Actif'
      case 'suspended':
        return 'Suspendu'
      case 'pending':
        return 'En attente'
      default:
        return 'Inconnu'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Gestion des Utilisateurs</h1>
            <p className="text-xl text-green-100">
              Administrez les comptes utilisateurs et gérez les permissions
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-gray-900">{usersList.length}</p>
            <p className="text-sm text-gray-500">Total utilisateurs</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-green-600">
              {usersList.filter(u => u.status === 'active').length}
            </p>
            <p className="text-sm text-gray-500">Actifs</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-red-600">
              {usersList.filter(u => u.status === 'suspended').length}
            </p>
            <p className="text-sm text-gray-500">Suspendus</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {usersList.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-sm text-gray-500">Administrateurs</p>
          </div>
        </div>

        {/* Barre d'outils */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filtres */}
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="suspended">Suspendus</option>
                <option value="pending">En attente</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Tous les rôles</option>
                <option value="user">Utilisateurs</option>
                <option value="admin">Administrateurs</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commandes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(user.fullName)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Inscrit le {formatDate(user.registrationDate)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center mb-1">
                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                            {user.phone}
                          </div>
                        )}
                        {user.city && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            {user.city}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {user.status === 'suspended' && <Ban className="w-3 h-3 mr-1" />}
                        {getStatusLabel(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <ShieldOff className="w-3 h-3 mr-1" />}
                        {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.ordersCount} commande{user.ordersCount > 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`inline-flex items-center ${
                            user.status === 'active' 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {user.status === 'active' ? (
                            <>
                              <Ban className="w-4 h-4 mr-1" />
                              Suspendre
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Réactiver
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Message si aucun utilisateur */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm || statusFilter !== 'all' || roleFilter !== 'all' 
                  ? 'Aucun utilisateur ne correspond aux critères de recherche.'
                  : 'Aucun utilisateur trouvé.'
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails utilisateur */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Détails de l'utilisateur
                </h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Avatar et infos principales */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {getInitials(selectedUser.fullName)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedUser.fullName}</h4>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusColor(selectedUser.status)}`}>
                    {getStatusLabel(selectedUser.status)}
                  </span>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date d'inscription
                    </label>
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {formatDate(selectedUser.registrationDate)}
                    </div>
                  </div>

                  {selectedUser.lastLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dernière connexion
                      </label>
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {formatDate(selectedUser.lastLogin)}
                      </div>
                    </div>
                  )}

                  {selectedUser.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        {selectedUser.phone}
                      </div>
                    </div>
                  )}

                  {selectedUser.city && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ville
                      </label>
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        {selectedUser.city}
                      </div>
                    </div>
                  )}
                </div>

                {selectedUser.address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse
                    </label>
                    <p className="text-sm text-gray-900">{selectedUser.address}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statistiques
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{selectedUser.ordersCount}</p>
                        <p className="text-sm text-gray-500">Commandes passées</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{selectedUser.role === 'admin' ? 'Admin' : 'Client'}</p>
                        <p className="text-sm text-gray-500">Type de compte</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
              {selectedUser.role !== 'admin' && (
                <button
                  onClick={() => {
                    toggleUserStatus(selectedUser.id)
                    setSelectedUser(null)
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedUser.status === 'active'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {selectedUser.status === 'active' ? 'Suspendre' : 'Réactiver'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 