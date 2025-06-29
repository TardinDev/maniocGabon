# 🛡️ Guide Création Admin Supabase - Manioc Gabon

## 📋 **Création d'un administrateur via Supabase (Méthode recommandée)**

---

### **🔥 ÉTAPE 1 : Accéder à votre projet Supabase**

1. **Ouvrez votre navigateur** et allez sur : https://app.supabase.com
2. **Connectez-vous** avec votre compte Supabase
3. **Sélectionnez votre projet** "Manioc Gabon"

---

### **🗄️ ÉTAPE 2 : Créer la structure de base de données**

1. **Dans le menu de gauche, cliquez sur "SQL Editor"**
2. **Cliquez sur "+ New query"**
3. **Copiez et collez** le code suivant :

```sql
-- Configuration des rôles utilisateur pour Manioc Gabon
-- Créer la table des rôles utilisateur
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Créer des index pour les performances
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- Politique de sécurité RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leur propre rôle
CREATE POLICY "Users can view their own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Seuls les admins peuvent modifier les rôles
CREATE POLICY "Only admins can manage roles" ON user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Trigger pour assigner automatiquement le rôle 'user' aux nouveaux comptes
CREATE OR REPLACE FUNCTION assign_default_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION assign_default_role();
```

4. **Cliquez sur "RUN"** (bouton vert en bas à droite)
5. ✅ **Vous devriez voir "Success. No rows returned"**

---

### **👤 ÉTAPE 3 : Créer le compte administrateur**

1. **Dans le menu de gauche, cliquez sur "Authentication"**
2. **Cliquez sur l'onglet "Users"**
3. **Cliquez sur le bouton vert "Add user"**

4. **Remplissez le formulaire :**
   - **Email** : `admin@maniocgabon.com` (ou votre email préféré)
   - **Password** : Choisissez un mot de passe sécurisé (ex: `Admin2024!Manioc`)
   - **Confirm password** : Répétez le même mot de passe
   - ✅ **Cochez "Auto Confirm User"** (important !)

5. **Cliquez sur "Create user"**

6. ✅ **L'utilisateur apparaît maintenant dans la liste**

---

### **🔑 ÉTAPE 4 : Attribuer le rôle admin**

1. **Retournez dans "SQL Editor"**
2. **Créez une nouvelle requête** ("+ New query")
3. **Copiez et collez** (en remplaçant l'email par le vôtre) :

```sql
-- Promouvoir un utilisateur en admin
UPDATE user_roles 
SET role = 'admin' 
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'admin@maniocgabon.com'  -- ⚠️ REMPLACEZ par votre email
);

-- Si l'utilisateur n'existe pas encore dans user_roles, l'insérer
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users 
WHERE email = 'admin@maniocgabon.com'  -- ⚠️ REMPLACEZ par votre email
AND id NOT IN (SELECT user_id FROM user_roles);
```

4. **Remplacez** `admin@maniocgabon.com` par l'email que vous avez utilisé
5. **Cliquez sur "RUN"**
6. ✅ **Vous devriez voir "Success" avec 1 ou 2 lignes affectées**

---

### **✅ ÉTAPE 5 : Vérifier la configuration**

1. **Dans SQL Editor, exécutez cette requête de vérification :**

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

2. **Résultat attendu :**
```
email                    | role  | created_at
admin@maniocgabon.com   | admin | 2024-01-21 10:30:00+00
```

---

### **🧪 ÉTAPE 6 : Tester l'accès admin**

1. **Ouvrez votre site Manioc Gabon** dans un nouvel onglet
2. **Connectez-vous** avec le compte admin que vous venez de créer :
   - Email : `admin@maniocgabon.com` (ou votre email)
   - Mot de passe : celui que vous avez défini

3. **Une fois connecté, cliquez sur votre avatar** (en haut à droite)
4. ✅ **Vous devriez voir la section "Administration"** avec :
   - 📊 Tableau de bord
   - 📦 Gérer les produits  
   - 👥 Gérer les utilisateurs
   - 🛒 Gérer les commandes

---

## 🎉 **Félicitations ! Votre admin est configuré !**

### **🔐 Informations de connexion admin :**
- **Email** : `admin@maniocgabon.com` (ou votre email)
- **Mot de passe** : celui que vous avez défini
- **Rôle** : Administrateur avec tous les privilèges

---

## 🛠️ **Actions admin disponibles :**

- ✅ **Ajouter/Modifier/Supprimer** des produits
- ✅ **Suspendre/Réactiver** des utilisateurs
- ✅ **Gérer les commandes** et changer leur statut
- ✅ **Voir les statistiques** globales
- ✅ **Accès protégé** aux pages d'administration

---

## 🚨 **En cas de problème :**

### **Problème : Je ne vois pas la section "Administration"**
1. Vérifiez que vous êtes bien connecté avec le bon email
2. Déconnectez-vous et reconnectez-vous
3. Videz le cache de votre navigateur (Ctrl+Shift+R)

### **Problème : "Privilèges insuffisants"**
1. Retournez dans Supabase → SQL Editor
2. Exécutez la requête de vérification de l'ÉTAPE 5
3. Assurez-vous que votre email apparaît avec le rôle 'admin'

### **Problème : Erreur lors de la création de la table**
1. Vérifiez que vous avez bien copié tout le code SQL
2. Assurez-vous d'être dans le bon projet Supabase
3. Consultez les logs d'erreur en bas de l'éditeur SQL

---

**🎯 Votre système d'administration est maintenant opérationnel !**

Vous pouvez maintenant gérer votre plateforme Manioc Gabon avec tous les privilèges administrateur ! 🇬🇦✨ 