# 🛡️ Guide de Configuration Admin - Manioc Gabon

## 📋 **Étapes pour configurer l'administration dans Supabase**

### **1. Créer la structure de base de données**

1. **Ouvrez votre projet Supabase** : https://app.supabase.com
2. **Allez dans l'onglet "SQL Editor"**
3. **Copiez et exécutez** le contenu du fichier `database/admin_setup.sql`

### **2. Créer votre compte administrateur**

#### **Méthode A : Via l'interface de votre site**
1. **Allez sur votre site Manioc Gabon**
2. **Créez un compte** avec l'email que vous voulez utiliser comme admin
   - Par exemple : `admin@maniocgabon.com`
3. **Confirmez votre email** si nécessaire

#### **Méthode B : Via Supabase Auth**
1. **Dans Supabase, allez dans "Authentication" > "Users"**
2. **Cliquez sur "Add user"**
3. **Remplissez les informations :**
   - Email : `admin@maniocgabon.com`
   - Password : (votre mot de passe sécurisé)
   - Auto Confirm User : ✅ (coché)

### **3. Attribuer le rôle admin**

1. **Retournez dans "SQL Editor"**
2. **Exécutez cette requête** (remplacez l'email par le vôtre) :

```sql
-- Promouvoir un utilisateur en admin
UPDATE user_roles 
SET role = 'admin' 
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'admin@maniocgabon.com'  -- Remplacez par votre email
);

-- Si l'utilisateur n'existe pas encore dans user_roles, l'insérer
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users 
WHERE email = 'admin@maniocgabon.com'  -- Remplacez par votre email
AND id NOT IN (SELECT user_id FROM user_roles);
```

### **4. Vérifier la configuration**

1. **Exécutez cette requête pour vérifier :**

```sql
-- Voir tous les admins
SELECT 
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin';
```

### **5. Tester l'accès admin**

1. **Déconnectez-vous** de votre site si vous êtes connecté
2. **Connectez-vous** avec votre compte admin
3. **Cliquez sur votre avatar** → Vous devriez voir la section "Administration"
4. **Testez l'accès** aux différentes pages admin

---

## 🔧 **Gestion des admins**

### **Ajouter un nouvel admin :**
```sql
-- Étape 1: L'utilisateur doit d'abord créer son compte normalement
-- Étape 2: Promouvoir l'utilisateur
UPDATE user_roles 
SET role = 'admin' 
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'nouvel-admin@exemple.com'
);
```

### **Rétrograder un admin :**
```sql
UPDATE user_roles 
SET role = 'user' 
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'ancien-admin@exemple.com'
);
```

### **Voir tous les utilisateurs et leurs rôles :**
```sql
SELECT 
  u.email,
  u.created_at as inscription,
  COALESCE(ur.role, 'user') as role,
  u.last_sign_in_at as derniere_connexion
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
ORDER BY u.created_at DESC;
```

---

## 🛡️ **Sécurité**

- ✅ **RLS activé** : Seuls les admins peuvent modifier les rôles
- ✅ **Trigger automatique** : Nouveaux utilisateurs = rôle 'user' par défaut  
- ✅ **Validation côté client** : Pages admin protégées
- ✅ **Logs d'accès** : Supabase enregistre toutes les connexions

---

## 🚨 **Dépannage**

### **Problème : "Privilèges insuffisants"**
1. Vérifiez que l'utilisateur existe dans `user_roles`
2. Vérifiez que le rôle est bien 'admin'
3. Déconnectez-vous et reconnectez-vous

### **Problème : Section admin non visible**
1. Videz le cache du navigateur
2. Vérifiez la console pour les erreurs
3. Assurez-vous que `user_roles` table existe

### **Problème : Erreur de base de données**
1. Vérifiez que toutes les requêtes SQL ont été exécutées
2. Vérifiez les permissions RLS
3. Consultez les logs Supabase

---

## 📊 **Fonctionnalités Admin Disponibles**

Une fois configuré, l'admin aura accès à :

- 📈 **Tableau de bord** avec statistiques
- 📦 **Gestion des produits** (ajouter/modifier/supprimer)
- 👥 **Gestion des utilisateurs** (suspendre/réactiver)
- 🛒 **Gestion des commandes** (suivi des statuts)
- 🛡️ **Interface sécurisée** avec protection par rôles

---

**🎉 Félicitations ! Votre système d'administration est maintenant opérationnel !** 