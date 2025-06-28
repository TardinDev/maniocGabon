# 🚀 Instructions de Démarrage - Manioc Gabon

## 📋 **Étapes de Configuration (5 minutes)**

### 1. **Créer un Projet Supabase**
```
1. Allez sur https://supabase.com
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez votre URL et clé ANON (Project Settings > API)
```

### 2. **Configuration Locale**
```bash
# Dans votre terminal :
cp .env.example .env

# Éditez .env avec vos vraies valeurs Supabase :
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. **Initialiser la Base de Données**
```
1. Dans Supabase, allez dans SQL Editor
2. Copiez tout le contenu de database/setup.sql
3. Collez et exécutez le script
4. Vérifiez qu'il n'y a pas d'erreurs
```

### 4. **Lancer l'Application**
```bash
npm install
npm run dev
```

## ✅ **Test de Fonctionnement**

### 1. **Créer un Compte**
- Ouvrez http://localhost:5173
- Cliquez sur "Inscription" 
- Créez un compte avec un vrai email
- Vérifiez votre email et confirmez

### 2. **Se Promouvoir Admin**
```sql
-- Dans Supabase SQL Editor :
UPDATE public.profiles 
SET role = 'super_admin' 
WHERE email = 'votre@email.com';
```

### 3. **Test de Sécurité**
```
1. Ouvrez F12 > Console
2. Tapez : console.log(user)
3. Vérifiez qu'aucune donnée sensible n'apparaît
4. Seulement : id, email, role, status doivent être visibles
```

## 🔐 **Vérifications de Sécurité**

### ✅ **Ce qui DOIT fonctionner :**
- Connexion/déconnexion
- Création de compte avec confirmation email
- Rôles utilisateur visibles dans l'interface
- Menus admin visibles pour les admins

### ❌ **Ce qui NE DOIT PAS être visible :**
- Mots de passe en clair
- Adresses IP
- Tokens de session
- Données d'autres utilisateurs

## 🚨 **En Cas de Problème**

### Erreur "Variables d'environnement manquantes"
```bash
# Vérifiez votre fichier .env
cat .env

# Assurez-vous qu'il contient :
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Erreur "Row Level Security"
```sql
-- Dans Supabase, vérifiez que RLS est activé :
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- Toutes les tables doivent avoir rowsecurity = true
```

### Interface d'authentification ne s'affiche pas
```bash
# Redémarrez le serveur de développement
npm run dev
```

## 🎯 **Fonctionnalités Disponibles**

### Pour les Utilisateurs Normaux :
- ✅ Inscription/Connexion sécurisée
- ✅ Navigation entre les pages
- ✅ Consultation des produits
- ✅ Profil utilisateur

### Pour les Administrateurs :
- ✅ Tout ce qui précède
- ✅ Badge admin visible
- ✅ Menu administration
- ✅ Gestion des utilisateurs (à implémenter)
- ✅ Gestion des produits (à implémenter)

## 📞 **Support**

Si vous rencontrez des problèmes :
1. Vérifiez les logs de la console
2. Consultez README-SECURITY.md
3. Vérifiez que Supabase est correctement configuré

---
🎉 **Félicitations !** Votre site Manioc Gabon est maintenant sécurisé et professionnel !
