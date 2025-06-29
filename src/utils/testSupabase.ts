import { supabase } from '../lib/supabase'

// 🧪 Fonction de test de connexion Supabase
export async function testSupabaseConnection() {
  try {
    console.log('🔄 Test de connexion Supabase...')
    
    // Test simple : récupérer la session actuelle
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Erreur de connexion Supabase:', error.message)
      return false
    }
    
    console.log('✅ Connexion Supabase réussie!')
    console.log('📊 Statut:', data.session ? 'Utilisateur connecté' : 'Aucun utilisateur connecté')
    
    return true
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
    return false
  }
}

// 🗄️ Test de la base de données
export async function testDatabase() {
  try {
    console.log('🔄 Test de la base de données...')
    
    // Test : compter les profils (devrait retourner 0 si aucun utilisateur)
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.error('❌ Erreur base de données:', error.message)
      console.log('💡 Avez-vous exécuté le script database/setup.sql ?')
      return false
    }
    
    console.log('✅ Base de données accessible!')
    console.log(`📊 Nombre d'utilisateurs: ${count || 0}`)
    
    return true
  } catch (error) {
    console.error('❌ Erreur test base de données:', error)
    return false
  }
} 