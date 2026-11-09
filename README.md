# 🚀 BABEL STORE DZ - E-Commerce Storefront Template (Astro + Tailwind)

Template e-commerce ultra-rapide, moderne, bilingue (Français & Arabe avec RTL natif), conçu sur-mesure pour le marché algérien (COD - Cash On Delivery, 58 Wilayas, Google Sheets en guise de backend sans frais d'hébergement). Inspiré de l'univers luxe & généraliste chic BABEL STORE.

---

## 🌟 Points Forts de la Solution

- ⚡ **Performance Maximale** : Construit avec **Astro 5** (génération statique SSG + composants Tailwind CSS ultra-légers).
- 🌐 **100% Bilingue (FR & AR)** : Navigation complète en Français et en Arabe avec inversion automatique de la direction du texte (`dir="rtl"`).
- 📊 **Google Sheets en Back-Office Gratuit** :
  - **Onglet Produits** : ajoutez/modifiez vos produits, prix, photos, promos directement depuis votre Google Sheet.
  - **Onglet Commandes** : chaque commande passée sur le site arrive instantanément dans votre Google Sheet avec l'heure d'Algérie !
  - **Zéro Base de Données Payante** : pas de serveur SQL, pas de coût mensuel.
- 🛍️ **Tunnel de Commande Optimisé E-commerce DZ** :
  - Modal et formulaire intégré sur chaque fiche produit.
  - Validation du numéro de téléphone algérien (05/06/07).
  - Gestion des variantes (couleurs, tailles).
  - Calcul de réduction / prix barré automatique.
  - Support mode local (enregistre les commandes de test dans `src/data/dev-orders.json` même sans connexion).
- 🚀 **Déploiement Universel** : Compatible Cloudflare Pages, Netlify, Vercel ou serveur Node/Nginx.

---

## 🛠️ Installation & Lancement Local

```bash
# 1. Se placer dans le dossier
cd C:\career\babel-store

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur local de développement
npm run dev

# 4. Lancer la suite de tests automatisée
npm test
```

Le site est accessible sur `http://localhost:4321`.

---

## 📋 Configuration de Google Sheets (En 3 Minutes)

Le fichier `google-apps-script.js` inclus dans ce projet contient la version **v2.0.0** qui gère automatiquement les produits, les commandes et crée les onglets manquants si votre feuille est neuve !

### Étape 1 : Créer votre Google Sheet
1. Ouvrez [Google Sheets](https://sheets.new) et nommez votre classeur : `BABEL STORE DZ`.
2. Allez dans le menu : **Extensions** > **Apps Script**.

### Étape 2 : Coller le Script v2.0.0
1. Effacez le code existant dans Apps Script.
2. Ouvrez le fichier `google-apps-script.js` de ce projet, copiez TOUT son contenu et collez-le.
3. Cliquez sur **Enregistrer** (icône disquette).

### Étape 3 : Déployer comme Web App
1. Cliquez sur le bouton bleu **Déployer** (Deploy) en haut à droite > **Nouveau déploiement** (New deployment).
2. Sélectionnez le type : **Application Web** (Web App).
3. Paramétrez :
   - **Description** : `Ace Store DZ v2`
   - **Exécuter en tant que** : `Moi` (Me)
   - **Qui a accès** : `Tout le monde` (Anyone)  <-- *CRUCIAL*
4. Cliquez sur **Déployer**.
5. Autorisez les accès Google si demandé.
6. Copiez l'**URL de l'application Web** obtenue (se termine par `/exec`).

### Étape 4 : Renseigner les Variables d'Environnement
Dans votre fichier `.env` (ou dans les paramètres d'environnement de votre hébergeur) :

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/VOTRE_ID_OBTENU/exec
PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/VOTRE_ID_OBTENU/exec
PRODUCTS_FEED_URL=https://script.google.com/macros/s/VOTRE_ID_OBTENU/exec
```

---

## 🧪 Tester Votre Boutique

Vous pouvez exécuter à tout moment :
```bash
npm test
```
Ce test vérifie :
1. Que toutes les pages (FR et AR) répondent en code 200.
2. Que le parsing des images Google Drive et des variantes fonctionne.
3. Qu'une commande test en local est bien traitée et archivée.
4. Que votre script Google Apps Script répond correctement.

---

## 📁 Personnalisation Rapide

| Fichier | Ce que vous pouvez modifier |
|---|---|
| `src/data/site.ts` | Nom de la marque, slogan, description, liens réseaux sociaux, badges de confiance |
| `src/data/categories.ts` | Familles de produits et icônes |
| `src/data/products.ts` | Catalogue produit de secours (fallback hors-ligne) |
| `public/images/brand/` | Votre logo (`logo-cozy-space.jpg`) et bannière (`banner-cozy-space.jpg`) |
| `src/styles/global.css` | Couleurs de la charte graphique et polices |

---

## 🚢 Déploiement en Production

### Option 1 : Cloudflare Pages (Recommandé - 100% Gratuit)
1. Poussez ce dossier sur un repo GitHub (`ace-store-dz`).
2. Sur Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > Connectez votre GitHub.
3. Paramètres de build :
   - **Framework preset** : `Astro`
   - **Build command** : `npm run build`
   - **Output directory** : `dist`
   - **Environment variables** : ajoutez `GOOGLE_SCRIPT_URL`, `PUBLIC_GOOGLE_SCRIPT_URL`, `PRODUCTS_FEED_URL`.
4. Cliquez sur **Save and Deploy**.

### Option 2 : Netlify
1. Connectez le repo GitHub à Netlify.
2. La configuration `netlify.toml` et la fonction `netlify/functions/submit-order.mjs` sont déjà prêtes.
3. Ajoutez les variables d'environnement dans les paramètres Netlify.
