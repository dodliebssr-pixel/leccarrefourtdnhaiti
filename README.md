# LeCarrefour: Elegance Defined

"Crée un site web d'exception pour 'LeCarrefour', un complexe événementiel de prestige situé à Trou-du-Nord, Haïti. L'esthétique doit incarner le 'Quiet Luxury' : une palette de couleurs blanc cassé, gris charbon et or champagne, avec une typographie Serif raffinée (ex: Playfair Display) pour les titres et Sans-Serif moderne pour le corps.

Structure & Sections :

Accueil Immersif : Hero section avec un message fort sur l'élégance et la discrétion.

Portfolio Interactif : Galerie triable par types d'événements : 'Célébrations' (Mariage, Fiançailles, Anniversaire) et 'Business' (Formation, Réunion d'affaires).

Hommage & Dignité : Une section sobre et respectueuse dédiée aux services de funérailles.

Rental Collection : Vitrine haut de gamme pour la location d'articles de décoration.

Paiement & Réservation : Intégration d'un tunnel de paiement sécurisé multi-devises (Stripe/PayPal et solutions locales haïtiennes) avec un design mobile-first fluide.

Contact & Accès : Carte interactive (Ravines Charles Roucou, Route Pillette), bouton WhatsApp flottant et liens vers les réseaux sociaux.

Expérience Utilisateur : Navigation fluide, animations au scroll délicates, et temps de chargement ultra-rapide."

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://lecarrefour-elegance-ha.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b2dd195e-5642-4f69-81ab-8556016a74bf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Administration et statistiques

Les routes privées sont `/admin/login` et `/admin/dashboard`. L'authentification utilise Supabase Auth; seuls les emails confirmés listés dans la variable serveur `ADMIN_EMAILS` sont autorisés. Définissez cette variable comme une liste d'emails séparés par des virgules dans l'environnement serveur, puis créez et confirmez les comptes correspondants dans Supabase Auth.

Le serveur doit également disposer de `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` et `SUPABASE_SERVICE_ROLE_KEY`. La clé service-role est strictement réservée au serveur et ne doit jamais être préfixée par `VITE_` ni exposée au navigateur.

La migration `supabase/migrations/20261001000000_site_analytics.sql` ne crée que les nouvelles tables de sessions anonymes et de pages vues, ainsi que leurs index et fonctions RPC. Appliquez-la au projet Supabase lié avant d'utiliser le tableau de bord, par exemple avec Supabase CLI (`supabase link`, puis `supabase db push`) ou via l'éditeur SQL Supabase. Aucune table préexistante n'est modifiée.

Le suivi stocke un identifiant aléatoire de visiteur et de session, les chemins sans paramètres, la technologie, la source et le pays lorsqu'un en-tête de géolocalisation est fourni par l'hébergeur. Il ne collecte ni adresse IP, ni nom, ni email, ni ville déduite. L'activité est calculée à partir des sessions vues dans les cinq dernières minutes.
