# Cap Bon Explorer — mini-projet Web 1 (ISET Nabeul, 2026-2027)

Portail touristique fictif et interactif : HTML5, CSS3, JavaScript natif et Bootstrap 5.3.
Les prix, dates et coordonnées sont **fictifs** ; aucune donnée n'est envoyée nulle part.

## Lancer le site
Ouvrir `index.html` dans un navigateur moderne (double-clic). Aucun serveur n'est nécessaire.
Bootstrap est chargé depuis le CDN officiel (jsDelivr) : une connexion Internet est requise pour le style.
Pour travailler hors ligne, télécharger Bootstrap 5.3 (https://getbootstrap.com/docs/5.3/getting-started/download/)
et remplacer les deux liens CDN par des copies locales.

## Arborescence
```
cap-bon-explorer/
  index.html  activites.html  agenda.html  reservation.html  contact.html
  css/style.css          charte graphique personnelle (chargée après Bootstrap)
  js/data.js             tableau d'objets des 8 activités + fonctions utilitaires
  js/app.js              thème clair/sombre (localStorage), formulaire de contact
  js/activites.js        recherche, filtre combiné, tri, compteur, modale
  js/reservation.js      calcul du prix, remise 10 %, validation, récapitulatif
  images/                logo, bannière, carte, 8 illustrations d'activités
  docs/rapport.pdf       rapport du projet
```

## Fonctionnalités
- 5 pages, navbar Bootstrap responsive, page active repérée, pied de page avec retour à l'accueil.
- Catalogue de 8 activités : recherche instantanée (titre/lieu, sans accents), filtre par catégorie combiné à la recherche, compteur, message « Aucune activité trouvée », modale de détails.
- Agenda : tableau `table-responsive` de 6 événements.
- Simulateur de réservation : sous-total, remise de 10 % dès 4 participants, total en TND, validation complète, récapitulatif, réinitialisation.
- Contact : coordonnées fictives, horaires, carte schématique, FAQ en accordéon, mini-formulaire validé.
- Bonus : tri par prix, mode clair/sombre (seul le thème est mémorisé), présélection d'une activité par paramètre d'URL (`reservation.html?activite=A02`).

## Images
Les images sont des illustrations vectorielles originales créées pour ce projet (voir le rapport).
Pour utiliser de vraies photos libres de droits, remplacer les fichiers `images/a0X-*.jpg` en gardant le même nom
(ratio conseillé 16/10) et créditer l'auteur dans le rapport.
