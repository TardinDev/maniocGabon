# 🚀 Configuration de l'Authentification - Manioc Gabon

## ⚡ Démarrage Rapide (5 minutes)

### 1. 📋 Variables d'Environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Configuration Supabase
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. 🔑 Récupérer vos Clés Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous à votre projet
3. Allez dans **Settings > API**
4. Copiez :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 3. 🗄️ Configuration de la Base de Données

Le script SQL est déjà dans `database/setup.sql`. Il sera automatiquement exécuté lors de votre premier test de connexion.

### 4. ✅ Test de Fonctionnement

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Cliquez sur le bouton **"Connexion"** dans le header

3. Si tout fonctionne, vous verrez les messages de succès dans la console

4. Essayez de créer un compte avec le bouton **"Inscription"**

## 🎯 Fonctionnalités Disponibles

### ✨ Authentification Complète
- **Inscription** avec validation de mot de passe
- **Connexion** sécurisée
- **Déconnexion**
- **Mot de passe oublié** (réinitialisation par email)
- **Dropdown utilisateur** avec avatar personnalisé

### 🔒 Sécurité Professionnelle
- Validation côté client ET serveur
- Protection contre les injections SQL
- Chiffrement des mots de passe
- Sessions sécurisées
- Row Level Security (RLS) activé

### 📱 Interface Moderne
- Design responsive (mobile/desktop)
- Animations fluides
- Indicateur de force du mot de passe
- Notifications toast élégantes
- Avatar avec initiales automatiques

## 🛠️ Dépannage

### ❌ Erreur de Connexion Supabase
- Vérifiez vos variables d'environnement dans `.env`
- Redémarrez le serveur de développement
- Vérifiez que votre projet Supabase est actif

### ❌ Table 'profiles' n'existe pas
- Le script SQL sera automatiquement exécuté
- Ou exécutez manuellement le contenu de `database/setup.sql` dans l'éditeur SQL de Supabase

### ❌ Problème d'Email de Confirmation
- Vérifiez vos paramètres SMTP dans Supabase
- Pour les tests, désactivez la confirmation email dans **Authentication > Settings**

## 🎨 Personnalisation

Le système d'authentification utilise vos couleurs de marque :
- Vert émeraude pour les boutons principaux
- Jaune pour les accents
- Interface cohérente avec votre design existant

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez les logs de Supabase
3. Consultez la documentation Supabase

## 🔐 Notes de Sécurité

- ✅ Les mots de passe sont chiffrés automatiquement
- ✅ Les données sensibles ne sont JAMAIS exposées côté client
- ✅ Protection CSRF intégrée
- ✅ Validation stricte des données
- ✅ Sessions sécurisées avec expiration automatique

**Votre système d'authentification est prêt pour la production !** 🎉
