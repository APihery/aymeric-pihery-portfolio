# Portfolio - Aymeric PIHERY

Portfolio professionnel présentant mes compétences en développement C# .NET, modélisation 3D, animation et montage vidéo.

## 📋 À propos

Ce portfolio présente mes réalisations et compétences dans différents domaines :
- **Développement** : Projets C# .NET et technologies web
- **Création 3D** : Modélisation, texturing et rendu
- **Vidéo** : Montage et animation

## 🏗 Architecture

- **Pages** : HTML statique (index, about, dev, creations-3d, image-editing, video) pour SEO et hébergement GitHub Pages.
- **CSS** : `css/base.css` (reset, thème, nav, footer, boutons) + `css/common-components.css` (en-têtes, cartes, comparaisons avant/après) + feuilles par page.
- **JS** : `js/common.js` (i18n, thème, nav, smooth scroll, lien actif) ; scripts spécifiques par page (table-of-contents, before-after, timeline, etc.).
- **Ressources** : `ressources/` (images, logos SVG, sous-dossiers image, video, 3d_creations).

Ordre de chargement conseillé : `base.css` → `common-components.css` (si besoin) → CSS de la page ; puis `common.js` → scripts de la page.

## 🖼 Images (WebP uniquement)

Le site utilise **uniquement des images WebP**. Les originaux JPG/PNG ont été supprimés ; seuls les `.webp` sont conservés dans `ressources/image`, `ressources/video` et `ressources/3d_creations`.

Pour de **nouvelles images** : placez des JPG/PNG dans `ressources/`, puis exécutez `npm run optimize-images` pour générer les `.webp`. Mettez à jour le HTML pour pointer vers les `.webp`, puis supprimez les JPG/PNG si besoin.

## 🔗 Liens

- [LinkedIn](https://www.linkedin.com/in/aymeric-pihery/)
- [DeviantArt](https://www.deviantart.com/aymericpihery)
- [Instagram](https://www.instagram.com/aymeric_pihery/)
- [YouTube](https://www.youtube.com/@Aymeric_Pihery)
- [Displate](https://displate.com/aymericpihery)
- [GitHub](https://github.com/APihery)

## 📄 Licence

Ce portfolio est un projet personnel. Tous droits réservés.
