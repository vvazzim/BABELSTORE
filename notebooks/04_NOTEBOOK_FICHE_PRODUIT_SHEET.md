# 📓 NOTEBOOK 04 — FICHE PRODUIT & GOOGLE SHEETS (27 COLONNES)
> **Objectif : Transformer n'importe quel produit brut en une ligne parfaite prête à coller dans votre Google Sheet (onglet `Produits`) en 30 secondes.**

---

## 📊 Comment Fonctionne Votre Catalogue BUBLE STORE DZ ?

Votre boutique lit directement les lignes de l'onglet **`Produits`** de votre Google Sheet :
- Si une ligne a `published = TRUE`, elle apparaît automatiquement sur le site.
- Si une ligne a `published = FALSE`, elle disparaît du site sans supprimer les données.
- Chaque produit possède **27 colonnes obligatoires**.

---

## 🤖 Le Prompt Maître à Utiliser dans une Nouvelle Discussion

Collez ce prompt avec les informations brutes de votre fournisseur (Alibaba, AliExpress, grossiste local ou fiche technique) :

```markdown
Tu es le gestionnaire de catalogue expert de "BUBLE STORE DZ".
Ta tâche est de transformer les informations d'un nouveau produit en une ligne de données parfaitement formatée pour les 27 colonnes de notre Google Sheet.

RÈGLES IMPORTANTES :
- Le slug doit être en minuscules avec des tirets (ex: lampe-led-bois).
- Les points forts (features) et (featuresAr) doivent être séparés par le symbole barre verticale " | " (exactement 4 ou 5 puces).
- Les prix doivent être exprimés avec l'unité DA (ex: 1 600 DA).
- La colonne collection doit être : Buble Collection (et تشكيلة بابل ستور en arabe).
- La colonne published doit être : TRUE.

INFOS BRUTES FOURNIES SUR LE PRODUIT :
- Nom : [NOM DU PRODUIT]
- Prix de vente prévu : [PRIX EN DA, ex: 3 900 DA]
- Prix barré d'origine : [ANCIEN PRIX, ex: 5 500 DA]
- Variantes couleurs : [EX: Noir / Argent]
- Quantité en stock : [EX: 25]
- Description brute ou caractéristiques : [COLLEZ LE TEXTE DU FOURNISSEUR ICI]

GÉNÈRE :
1. La liste numérotée des 27 colonnes avec les valeurs exactes prêtes à copier.
2. Une ligne de texte unique avec tabulation (TSV) prête à être collée d'un seul coup (Ctrl+V) directement sur une nouvelle ligne dans Google Sheets.
```

---

## 📋 Le Guide des 27 Colonnes (Fiche Réflexe)

| N° | Colonne | Exemple | Explication |
| :--- | :--- | :--- | :--- |
| **1** | `id` | `p2` | Identifiant unique court (`p1`, `p2`, `p3`...). |
| **2** | `slug` | `montre-smart-pro` | URL du produit sur le site (sans accents ni espaces). |
| **3** | `name` | `Montre Connectée Pro V2` | Nom complet et commercial en Français. |
| **4** | `nameAr` | `ساعة ذكية متطورة الجيل الثاني` | Nom en Arabe élégant. |
| **5** | `baseName` | `Montre Connectée Pro` | Nom court pour les variantes. |
| **6** | `baseNameAr` | `ساعة ذكية متطورة` | Nom court Arabe. |
| **7** | `color` | `Noir Titane` | Nom de la couleur/variante de cette ligne. |
| **8** | `colorAr` | `أسود تيتانيوم` | Couleur en Arabe. |
| **9** | `variantGroup`| `montre-smart-pro` | Le même slug pour regrouper les différentes couleurs ensemble. |
| **10**| `category` | `High-Tech & Accessoires` | Maison & Déco, High-Tech, Confort, etc. |
| **11**| `collection` | `Buble Collection` | Valeur standard Buble Collection. |
| **12**| `collectionAr`| `تشكيلة بابل ستور` | Valeur standard Arabe. |
| **13**| `price` | `3 900 DA` | Prix de vente final. |
| **14**| `oldPrice` | `5 500 DA` | Prix barré pour montrer la réduction. |
| **15**| `quantity` | `25` | Quantité physique disponible. |
| **16**| `image` | `https://drive.google.com/drive/folders/...` | Lien de partage Google Drive avec accès public. |
| **17**| `shortDescription` | `Montre étanche avec écran AMOLED et suivi santé.` | Une phrase d'accroche résumant le bénéfice. |
| **18**| `shortDescriptionAr`| `ساعة ذكية مقاومة للماء مع شاشة عالية الدقة وتتبع صحي.` | Phrase d'accroche en Arabe. |
| **19**| `features` | `Écran AMOLED \| Étanche 50m \| Batterie 10 jours` | 4 ou 5 puces séparées par le symbole `\|`. |
| **20**| `featuresAr` | `شاشة أموليد \| مقاومة للماء \| بطارية 10 أيام` | Puces en Arabe séparées par `\|`. |
| **21**| `availability`| `Disponible (25 restants)` | Mention de stock. |
| **22**| `availabilityAr`| `متوفر (متبقي 25 قطعة)` | Mention stock Arabe. |
| **23**| `featured` | `TRUE` | `TRUE` pour afficher en vedette sur l'accueil, sinon `FALSE`. |
| **24**| `published` | `TRUE` | `TRUE` pour afficher le produit sur le site, `FALSE` pour masquer. |
| **25**| `tags` | `montre,smart,sport,connectee` | Mots-clés séparés par des virgules pour la recherche. |
| **26**| `reasons` | `Garantie 1 an \| Livraison 58 wilayas \| Paiement à la réception` | Raisons de choisir avec `\|`. |
| **27**| `reasonsAr` | `ضمان سنة \| توصيل 58 ولاية \| دفع عند الاستلام` | Raisons en Arabe avec `\|`. |

---

## 📷 La Règle d'Or des Photos Google Drive

Pour que les photos s'affichent instantanément sur le site :
1. Créez un dossier dans votre Google Drive pour le produit (ex: `Photos Lampe Bois`).
2. Faites un clic droit sur le dossier > **Partager**.
3. Sous *Accès général*, sélectionnez impérativement : **« Tous les utilisateurs disposant du lien »** (Lecteur).
4. Cliquez sur **Copier le lien**.
5. Collez ce lien dans la colonne **`image`** (colonne 16). Le site extrait automatiquement toutes les photos du dossier !
