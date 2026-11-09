# 🎓 GUIDE DE FORMATION - GESTIONNAIRE BABEL STORE
> **Document officiel à l'attention du gestionnaire de la boutique Babel Store**  
> *Dernière mise à jour : Novembre 2026*

---

## 📌 1. Vue d'ensemble du système

Babel Store fonctionne avec une architecture simple, robuste et autonome :
- **Boutique en ligne (Frontend)** : Site rapide optimisé pour mobile en Algérie (français et arabe RTL).
- **Base de données centrale** : Un seul classeur **Google Sheets** dédié.
- **Moteur d'automatisation** : Une passerelle **Google Apps Script** qui connecte le site au Google Sheet.
- **Stockage des photos** : Vos dossiers **Google Drive**.

```
[Visiteur sur le Site]
       │
       ├─ (1) Consulte le catalogue  ──►  Données du Google Sheet (Onglet "Produits")
       │
       └─ (2) Passe une commande     ──►  Instantané (0s) vers Google Sheet (Onglet "Commandes")
```

---

## ⏱️ 2. À quelle fréquence les données sont-elles actualisées ?

### A. Les Commandes clients : **TEMPS RÉEL (0 seconde de délai)** ⚡
- Dès qu'un client valide son panier sur le site, les informations (Nom, Téléphone, Wilaya, Adresse, Produit, Prix) sont envoyées **instantanément** dans votre Google Sheet dans l'onglet `Commandes`.
- **Aucun délai, aucune manipulation requise** : votre tableau se met à jour en direct.

### B. Les Produits (Ajouts, Modifications de prix, Stocks) :
Le site Babel Store est un site statique ultra-performant (temps de chargement < 0.3s sur mobile 4G en Algérie). Les pages sont générées à partir du Google Sheet :
- **En environnement local / test** : **Temps réel immédiat** à chaque actualisation de page.
- **En production (site en ligne public)** : Les produits sont récupérés **à chaque déploiement (Build)** de l'hébergeur.
  - **Délai après modification** : ~30 à 60 secondes une fois le déploiement lancé.
  - **Comment actualiser le site en ligne après avoir modifié le Sheet ?**
    1. **Option 1 (Recommandée - 1 clic)** : Allez sur le tableau de bord de votre hébergeur (Render / Netlify) et cliquez sur **"Deploy latest commit"** ou **"Trigger Deploy"**.
    2. **Option 2 (Automatique par Webhook)** : Si un *Deploy Hook* est configuré dans Apps Script, chaque modification d'une ligne du Sheet relance automatiquement la mise à jour du site.

---

## 📋 3. Structure du Google Sheet

Votre classeur Google Sheet contient **deux onglets obligatoires** :

| Onglet | Rôle |
|---|---|
| **`Produits`** | Votre catalogue : chaque ligne représente un article avec son prix, sa description et ses photos. |
| **`Commandes`** | Le registre de vos ventes : chaque ligne est une commande passée par un client sur le site. |

---

## 🛍️ 4. Comment ajouter ou modifier un produit (Onglet `Produits`)

Chaque ligne de l'onglet `Produits` correspond à une référence. Voici la signification exacte des colonnes :

### Tableau explicatif des colonnes

| Colonne | Exemple | Rôle & Conseils |
|---|---|---|
| **`id`** | `p1`, `p2`, `p3` | **Identifiant unique**. Ne mettez jamais deux fois le même id. |
| **`slug`** | `lampe-led-bois` | **Identifiant de l'URL** (ex: `babelstore.com/produit/lampe-led-bois`). En minuscules, sans espaces, sans accents, avec des tirets `-`. |
| **`name`** | `Lampe LED Détecteur de Mouvement en Bois` | Nom complet en **français** affiché sur la fiche produit. |
| **`nameAr`** | `مصباح ذكي استشعار بالحركة LED بتصميم خشبي أنيق` | Nom complet en **arabe**. |
| **`baseName`** | `Lampe LED Intelligente en Bois` | Nom court pour les cartes du catalogue en français. |
| **`baseNameAr`** | `مصباح ذكي خشب` | Nom court pour les cartes en arabe. |
| **`color`** | `Noyer Foncé` | Couleur(s) disponible(s). Si plusieurs, séparez par `/` (ex: `Noyer / Blanc`). |
| **`colorAr`** | `خشب الجوز الداكن` | Couleur(s) en arabe. |
| **`variantGroup`** | `lampe-led-bois` | Permet de regrouper les variantes d'un même article (ex: si vous avez la même lampe en plusieurs coloris). |
| **`category`** | `Maison & Déco` | Famille du produit (ex: `High-Tech`, `Beauté & Soin`, `Maison & Déco`, `Auto`). |
| **`collection`** | `Éclairage Intelligent` | Sous-collection en français. |
| **`collectionAr`** | `إضاءة ذكية وعصرية` | Sous-collection en arabe. |
| **`price`** | `1 600 DA` | **Prix de vente actuel**. Indiquez toujours l'unité `DA`. |
| **`oldPrice`** | `2 500 DA` | **Ancien prix barré** si le produit est en promotion. Laissez vide si pas de réduction. |
| **`quantity`** | `15` | **Quantité en stock** (chiffre entier). Si `0`, le site affiche "Rupture de stock". |
| **`image`** | `https://drive.google.com/drive/folders/...` | **Lien du dossier Google Drive** contenant les photos de l'article (ou lien d'image direct). |
| **`shortDescription`** | `Éclairage sans fil avec détecteur...` | Résumé accrocheur (1 à 2 phrases) en français. |
| **`shortDescriptionAr`** | `إضاءة ذكية مع مستشعر حركة وشحن...` | Résumé accrocheur en arabe. |
| **`features`** | `Bois naturel noble \| Fixation magnétique 2 en 1 \| Batterie USB` | Points forts en français, **séparés par une barre verticale `\|`**. |
| **`featuresAr`** | `خشب طبيعي فاخر \| تثبيت مغناطيسي \| شحن USB` | Points forts en arabe, séparés par `\|`. |
| **`availability`** | `Disponible (15 restants)` | Texte de disponibilité en français. |
| **`availabilityAr`** | `متوفر (متبقي 15 قطعة فقط)` | Texte de disponibilité en arabe. |
| **`featured`** | `TRUE` ou `FALSE` | Mettre `TRUE` pour mettre le produit en avant sur la page d'accueil. |
| **`published`** | `TRUE` ou `FALSE` | Mettre `TRUE` pour publier le produit sur le site, ou `FALSE` pour le masquer temporairement. |
| **`tags`** | `lampe,bois,led,mouvement,usb` | Mots-clés pour la recherche sur le site (séparés par des virgules). |

---

## 📸 5. Guide pour les photos (Google Drive)

Pour que les photos s'affichent parfaitement sur le site :

1. **Créer un dossier sur Google Drive** pour chaque produit (ex: "Photos Lampe LED").
2. **Déposer les images** au format standard (`.jpg`, `.jpeg`, `.png`, `.webp`).
   - *Conseil qualité* : Idéalement des photos carrées ou 4:3 nettes avec un bon éclairage.
3. **Régler le partage du dossier** :
   - Clic droit sur le dossier Drive > **Partager** > **Accès général** :
   - Sélectionner impérativement : **"Tous les utilisateurs disposant du lien"** avec le rôle **"Lecteur"**.
   - *(Si l'accès reste privé, le site ne pourra pas afficher les images !)*
4. **Copier le lien du dossier** et collez-le dans la colonne `image` de votre Google Sheet :
   ```text
   https://drive.google.com/drive/folders/1hcbUYsHjZOEk1SRRgV8nZ9ow6wO1P5Lp?usp=sharing
   ```
5. Le moteur de Babel Store extrait automatiquement toutes les images du dossier et crée une galerie photo interactive avec zoom sur la fiche produit.

---

## 📦 6. Traitement des commandes (Onglet `Commandes`)

Dès qu'un visiteur passe une commande, une nouvelle ligne apparaît dans l'onglet `Commandes` :

### Colonnes enregistrées automatiquement :
1. **Date & Heure** : Horodatage précis (heure d'Algérie).
2. **Prénom & Nom** : Coordonnées du client.
3. **Numéro de Téléphone** : Numéro au format algérien (ex: `+213550123456`).
4. **Produit & Couleur** : Nom de l'article commandé et déclinaison choisie.
5. **Quantité** : Nombre de pièces demandées.
6. **Prix** : Montant unitaire en DA.
7. **Adresse & Wilaya** : Destination de livraison (ex: `16 - Alger - Bab Ezzouar`).
8. **Statut** : Initialisé à `Nouvelle`.

### Routine de traitement conseillée pour le gestionnaire :
1. **Étape 1 : Confirmation téléphonique** (Obligatoire avant envoi) :
   - Appeler le client au numéro indiqué pour confirmer la commande, l'adresse exacte et la disponibilité.
2. **Étape 2 : Mise à jour du statut dans le Sheet** :
   - Changez la colonne statut au fur et à mesure :
     - `Nouvelle` ➔ `Confirmée` ➔ `Expédiée (ZR Express / Yalidine)` ➔ `Livrée & Encaissée` (ou `Annulée`).
3. **Étape 3 : Ajustement du stock** :
   - Dans l'onglet `Produits`, réduisez la `quantity` du stock restant.

---

## ⚠️ 7. Checklist anti-erreurs (En cas de problème)

| Problème constaté | Cause fréquente | Solution immédiate |
|---|---|---|
| **Les photos ne s'affichent pas sur le site** | Le dossier Google Drive est en accès restreint / privé. | Ouvrez Google Drive > Clic droit sur le dossier > Partager > Choisir **"Tous les utilisateurs disposant du lien"**. |
| **Un produit n'apparaît pas sur le site** | La colonne `published` est à `FALSE` ou le site n'a pas été reconstruit. | Mettez `published` à `TRUE`, puis déclenchez un nouveau build sur votre hébergeur. |
| **Caractères bizarres dans les textes** | Présence de caractères de tableaux copiés-collés (ex: `│`). | Ne copiez que du texte simple sans barres verticales décoratives non prévues. |
| **Le formulaire de commande échoue** | L'Apps Script a été modifié sans re-déploiement. | Dans Google Sheets > Extensions > Apps Script > Déployer > Gérer les déploiements > Modifier > Version : **Nouvelle version** > Déployer. |

---

## 📞 8. Contacts & Identifiants du Store

- **Boutique** : BABEL STORE Algérie
- **Email officiel du service client** : `babel.store.off@gmail.com`
- **Dépôt du code source** : `https://github.com/vvazzim/BABELSTORE.git`
- **Politique commerciale** : Livraison rapide 58 Wilayas | Paiement à la livraison (COD) | Vérification du colis avant paiement.
