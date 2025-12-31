# 🚀 Guide de Déploiement Rapide

## Étapes pour mettre en ligne votre portfolio sur GitHub Pages

### 1. Préparer votre repository

```bash
# Si vous n'avez pas encore initialisé Git
git init

# Ajouter tous les fichiers
git add .

# Faire le commit initial
git commit -m "Initial commit - Portfolio Aymeric PIHERY"
```

### 2. Créer le repository sur GitHub

1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite > **"New repository"**
3. Nommez votre repository (ex: `aymeric-pihery-portfolio`)
4. Choisissez **Public** (ou Private si vous avez GitHub Pro)
5. **Ne cochez pas** "Initialize with README" (vous avez déjà un README)
6. Cliquez sur **"Create repository"**

### 3. Connecter votre repository local à GitHub

```bash
# Remplacez [votre-username] et [nom-du-repo] par vos valeurs
git remote add origin https://github.com/[votre-username]/[nom-du-repo].git

# Pousser votre code
git branch -M main
git push -u origin main
```

### 4. Activer GitHub Pages

1. Allez dans votre repository sur GitHub
2. Cliquez sur **Settings** (en haut du repository)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous **Source**, sélectionnez :
   - Branch: `main`
   - Folder: `/ (root)`
5. Cliquez sur **Save**

### 5. Accéder à votre site

Votre site sera disponible à l'adresse :
```
https://[votre-username].github.io/[nom-du-repo]/
```

**Note** : Il peut falloir quelques minutes (jusqu'à 10 minutes) pour que le site soit accessible après l'activation.

## 🔄 Mettre à jour votre site

Chaque fois que vous modifiez votre portfolio :

```bash
# Ajouter les modifications
git add .

# Faire un commit
git commit -m "Description de vos modifications"

# Pousser vers GitHub
git push
```

Les modifications seront automatiquement déployées sur GitHub Pages.

## ✅ Vérification

Pour vérifier que tout fonctionne :
- Votre site devrait être accessible à l'URL GitHub Pages
- Toutes les pages devraient se charger correctement
- Les animations devraient fonctionner
- Les liens externes devraient s'ouvrir dans un nouvel onglet

## 🐛 Problèmes courants

### Le site ne s'affiche pas
- Vérifiez que GitHub Pages est activé dans Settings > Pages
- Attendez quelques minutes (le déploiement peut prendre du temps)
- Vérifiez que votre repository est public (ou que vous avez GitHub Pro)

### Les styles ne s'appliquent pas
- Vérifiez que tous les fichiers CSS et JS sont bien dans le repository
- Vérifiez les chemins dans les balises `<link>` et `<script>`
- Videz le cache de votre navigateur (Ctrl+F5)

### Les liens ne fonctionnent pas
- Vérifiez que les noms de fichiers correspondent exactement (case-sensitive)
- Vérifiez que tous les fichiers HTML sont dans le même dossier

---

**Besoin d'aide ?** Consultez la [documentation GitHub Pages](https://docs.github.com/en/pages)


