import { UserProfile } from '../UserAccount/UserProfile'

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header de la page */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Mon Profil</h1>
            <p className="text-xl text-green-100">
              Gérez vos informations personnelles et votre compte
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <UserProfile />
      </div>
    </div>
  )
} 