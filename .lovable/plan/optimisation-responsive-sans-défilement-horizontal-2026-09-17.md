# Optimisation responsive sans défilement horizontal

## Objectif
Garantir une mise en page fluide de 320 px aux grands écrans, sans aucun défilement horizontal sur toutes les pages.

## Modifications
- Renforcer les fondations globales : largeur à 100 %, débordement horizontal bloqué, calcul des dimensions uniforme, médias et contenus intégrés limités à leur conteneur.
- Sécuriser le conteneur principal, les sections, grilles et éléments animés avec des largeurs minimales nulles et des limites adaptées à l’écran.
- Adapter les titres, boutons, formulaires, coordonnées, liens longs, pied de page et menu WhatsApp aux petits écrans.
- Faire passer à la ligne les rangées flexibles pertinentes et conserver les contrôles fixes sans écraser le texte.
- Réduire les espacements verticaux et latéraux sur mobile sans modifier l’identité visuelle.

## Validation
- Contrôler les pages Accueil, Portfolio, Hommage, Rental, Réservation et Contact à 320 px, 375 px, tablette et bureau.
- Mesurer la largeur du document et vérifier qu’elle ne dépasse jamais celle de la fenêtre.
- Vérifier le menu mobile, le panneau WhatsApp, les formulaires, images, vidéos et la carte.
- Confirmer l’absence d’erreurs après les changements.

## Détails techniques
- Utiliser les règles globales comme filet de sécurité, puis corriger les causes locales plutôt que de seulement masquer les débordements.
- Préserver les largeurs maximales existantes lorsqu’elles cadrent le contenu, tout en imposant `width: 100%` et `min-width: 0` aux descendants de grilles et flexbox.
