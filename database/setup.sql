-- 🗄️ CONFIGURATION BASE DE DONNÉES - MANIOC GABON
-- Copiez et collez ce script dans l'éditeur SQL de Supabase

-- ========================================
-- 1. ACTIVATION DE LA SÉCURITÉ (RLS)
-- ========================================

-- Activer Row Level Security pour la sécurité
-- (Supabase l'active automatiquement sur auth.users)

-- ========================================
-- 2. TABLE PROFILS UTILISATEURS
-- ========================================

-- Créer la table des profils utilisateurs
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  avatar_url VARCHAR(500),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS sur la table profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 3. POLICIES DE SÉCURITÉ
-- ========================================

-- Policy: Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy: Insertion automatique lors de l'inscription
CREATE POLICY "Enable insert for users" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ========================================
-- 4. FONCTION AUTOMATIQUE PROFIL
-- ========================================

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour exécuter la fonction à chaque nouvel utilisateur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- 5. FONCTION MISE À JOUR TIMESTAMP
-- ========================================

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ========================================
-- 6. VÉRIFICATION DE SÉCURITÉ
-- ========================================

-- Vérifier que RLS est bien activé
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename = 'profiles';

-- Cette requête doit retourner rowsecurity = true

-- ========================================
-- ✅ CONFIGURATION TERMINÉE
-- ========================================

-- Votre base de données est maintenant configurée !
-- Prochaines étapes :
-- 1. Testez la connexion depuis votre application
-- 2. Créez votre premier utilisateur
-- 3. Vérifiez que le profil est créé automatiquement 