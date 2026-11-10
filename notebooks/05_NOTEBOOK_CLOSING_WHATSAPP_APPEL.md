# 📓 NOTEBOOK 05 — CLOSING WHATSAPP & CONFIRMATION DES COMMANDES (COD DZ)
> **Objectif : Valider les commandes passées sur le site en moins d'une minute, rassurer le client et diviser par 3 le taux de retours colis en Algérie.**

---

## 📞 Pourquoi la Confirmation Téléphonique & WhatsApp est Cruciale en Algérie ?

En Algérie, le modèle **Paiement à la Livraison (Cash On Delivery)** fonctionne à merveille si et seulement si vous appliquez cette règle :
- **Règle d'or** : N'expédiez **JAMAIS** un colis sans avoir parlé au client au téléphone ou sans avoir reçu sa confirmation explicite sur WhatsApp.
- Si le client confirme par téléphone : le taux de livraison dépasse **85%**.
- Si vous expédiez sans confirmation : le taux d'échec / retour dépasse souvent **40%**.

---

## 🤖 Le Prompt Maître à Utiliser dans une Nouvelle Discussion

Collez ce prompt dans une discussion dédiée au service client :

```markdown
Tu es le responsable du service client et des confirmations de commande chez "BUBLE STORE DZ" en Algérie.
Ton objectif est de créer les scripts de communication pour traiter les commandes entrantes du produit suivant :

INFOS SUR LE PRODUIT :
- Produit commandé : [NOM DU PRODUIT]
- Prix : [PRIX EN DA]
- Frais de livraison estimés : [EX: 400 DA Alger / 600 DA autres wilayas]
- Délai moyen d'expédition : [24h à 48h]

RÉDIGE POUR MOI :
1. LE MESSAGE WHATSAPP INSTANTANÉ (envoyé dès que la commande apparaît dans l'onglet Commandes) :
   - Ton très poli, professionnel et valorisant.
   - Récapitulatif : Nom du client, Produit, Montant total, Wilaya & Commune.
   - Réassurance clé : "Rappel : Vous inspectez votre colis avant de payer le livreur en espèces".
   - Demande claire : "Merci de répondre simplement 'CONFIRMER' pour expédier votre colis dès aujourd'hui".

2. LE SCRIPT DE L'APPEL TÉLÉPHONIQUE (Durée : 45 secondes chrono) :
   - Salutation naturelle en Darija / Français.
   - Validation de l'adresse précise (point de repère dans la commune).
   - Annonce du jour de livraison.
   - Rappel de garder le montant d'appoint pour le livreur.

3. LE MESSAGE WHATSAPP EN CAS D'ÉCHEC D'APPEL (Si le client ne décroche pas au 1er appel) :
   - Message court invitant à rappeler ou à confirmer par texte.

4. LE MESSAGE DE SUIVI LE JOUR DE LA LIVRAISON :
   - Prévenir le client que le livreur va l'appeler dans la journée.
```

---

## 💬 Exemples de Messages Prêts à l'Emploi

### 1. Message WhatsApp Instantané de Confirmation
> Salam **[Prénom du Client]** ! 👋  
> L'équipe **BUBLE STORE DZ** vous remercie pour votre commande sur notre boutique.  
>  
> 📦 **Récapitulatif de votre commande :**  
> • Article : **[Nom du Produit]**  
> • Quantité : **[Quantité]**  
> • Montant à régler : **[Prix Total] DA** (Paiement à la livraison)  
> • Destination : **[Commune], [Wilaya]**  
>  
> 🔍 *Rappel sécurité Buble Store : Vous avez le droit d'ouvrir et de vérifier votre colis en toute sérénité avant de payer le livreur.*  
>  
> 👉 Pour valider immédiatement l'expédition de votre colis pour demain, **répondez simplement "OUI" ou "CONFIRMER" à ce message**.  
>  
> Merci pour votre confiance !  
> *L'équipe BUBLE STORE DZ* 🇩🇿

---

### 2. Script de l'Appel Téléphonique (45 Secondes)

- **Vous** : *"Salam Alaykoum M. [Nom du Client], labès ? M3ak [Votre Prénom] de BUBLE STORE DZ concernant votre commande de la [Nom du Produit] sur notre site."*
- **Client** : *"Wa alaykoum salam, oui marhba."*
- **Vous** : *"Je vous appelle pour valider avec vous l'adresse de livraison. Vous êtes bien à [Nom de la Commune] dans la wilaya de [Nom de la Wilaya] ?"*
- **Client** : *"Oui exactement, près de [Point de repère : ex. la grande mosquée / le rond-point]."*
- **Vous** : *"Parfait ! Le colis part aujourd'hui, vous le recevrez d'ici [24h / 48h]. Le montant total est de [Prix Total] DA. Comme promis, vous ouvrez votre colis, vous vérifiez votre article et vous réglez ensuite le livreur en espèces. S'il vous plaît, gardez votre téléphone allumé le jour de la livraison."*
- **Client** : *"D'accord, parfait barak Allah fikoum."*
- **Vous** : *"Merci pour votre confiance et bonne journée !"*

---

### 3. Message si le Client ne Décroche Pas au Téléphone
> Salam **[Prénom du Client]** ! 👋  
> Nous avons essayé de vous joindre par téléphone concernant votre commande de **[Nom du Produit]** sur **BUBLE STORE DZ**.  
>  
> Votre colis est emballé et prêt à partir. Merci de nous confirmer votre disponibilité en répondant à ce message WhatsApp ou en nous rappelant au **[Votre Numéro]** afin de lancer l'expédition.  
>  
> Belle journée à vous !

---

## 📊 Gestion des Statuts dans Google Sheets (Onglet `Commandes`)

Pour garder une comptabilité parfaite, mettez à jour la colonne statut de votre Google Sheet :
1. `Nouvelle` : La commande vient d'arriver sur le site.
2. `Confirmée` : Le client a confirmé par appel ou WhatsApp.
3. `Expédiée` : Le colis est remis au bureau de livraison (Yalidine, Maystro, etc.).
4. `Livrée & Payée` : Le client a reçu son colis et l'argent est encaissé.
5. `Annulée` : Le client s'est trompé ou a annulé.
