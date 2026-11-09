# Manuel Produits & Commandes BABEL STORE

## Vue d'ensemble

Le site BABEL STORE utilise :

- Un seul Google Sheet dédié : `1BJ_lZmNtQKoo9nLGgSkZbgPmIeK19xGQfNJHQqc4KNw`
- Un seul Google Apps Script dédié : `https://script.google.com/macros/s/AKfycbx04iAg8nNppFp3grWFO5MfD7STZK759kW1XdfIjyqMViwkwzpRCD2J01alQq6s0hLt/exec`
- Une seule URL `/exec`

Le même script sert pour :

- La lecture des produits (onglet `Produits`)
- L'enregistrement instantané des commandes (onglet `Commandes`)
- Le rebuild automatique si un Webhook de build est configuré

## Onglets obligatoires dans le Google Sheet

Le classeur doit contenir deux onglets :

1. `Produits`
2. `Commandes`

## Fréquences de mise à jour

- **Commandes** : **Temps réel instantané (0 seconde)** dès que le client valide le formulaire.
- **Produits en local** : **Temps réel** à chaque rechargement de page.
- **Produits en production** : Récupérés à chaque déploiement (Build) sur l'hébergeur (Render, Netlify, Vercel). Cliquez sur "Deploy latest" pour réactualiser le site après avoir modifié le Google Sheet.

## Colonnes de l'onglet Produits

Collez exactement cette ligne d'en-têtes sur la première ligne :

```text
id	slug	name	nameAr	baseName	baseNameAr	color	colorAr	variantGroup	category	collection	collectionAr	price	oldPrice	quantity	image	shortDescription	shortDescriptionAr	features	featuresAr	reasons	reasonsAr	availability	availabilityAr	featured	published	tags
```

## Explication simple des colonnes

- `id` : identifiant unique du produit (ex: `p1`, `p2`)
- `slug` : URL du produit sur le site (ex: `lampe-led-bois`)
- `name` : nom complet en français
- `nameAr` : nom complet en arabe
- `baseName` : nom court en français (pour les cartes catalogue)
- `baseNameAr` : nom court en arabe
- `color` : couleur(s) en français (séparer par `/` si plusieurs)
- `colorAr` : couleur(s) en arabe
- `variantGroup` : groupe de variantes pour associer plusieurs couleurs
- `category` : catégorie du produit (ex: `Maison & Déco`, `High-Tech`)
- `collection` : collection en français (ex: `Éclairage Intelligent`)
- `collectionAr` : collection en arabe (ex: `إضاءة ذكية وعصرية`)
- `price` : prix actuel de vente (ex: `1 600 DA`)
- `oldPrice` : ancien prix barré si réduction (ex: `2 500 DA`)
- `quantity` : stock disponible (ex: `15`)
- `image` : lien du dossier Google Drive contenant les photos
- `shortDescription` : courte description en français
- `shortDescriptionAr` : courte description en arabe
- `features` : points forts en français, séparés par `|`
- `featuresAr` : points forts en arabe, séparés par `|`
- `reasons` : pourquoi choisir ce produit en français, séparés par `|`
- `reasonsAr` : pourquoi choisir ce produit en arabe, séparés par `|`
- `availability` : disponibilité en français (ex: `Disponible (15 restants)`)
- `availabilityAr` : disponibilité en arabe (ex: `متوفر (متبقي 15 قطعة فقط)`)
- `featured` : `TRUE` si affiché en vedette sur l'accueil, sinon `FALSE`
- `published` : `TRUE` pour publier sur le site, `FALSE` pour masquer
- `tags` : mots-clés séparés par des virgules pour la recherche

## Images Google Drive

Dans la colonne `image`, collez le lien de partage du dossier Google Drive :

```text
https://drive.google.com/drive/folders/1hcbUYsHjZOEk1SRRgV8nZ9ow6wO1P5Lp?usp=sharing
```

> **Attention** : Le dossier Google Drive doit impérativement être configuré sur **"Tous les utilisateurs disposant du lien"** (accès public en lecture).

## Colonnes de l'onglet Commandes

L'application Web enregistre automatiquement les colonnes suivantes :

```text
Date	Prenom	Nom	Telephone	Produit	Couleur	Quantite	Slug Produit	Prix	Adresse	Statut
```
