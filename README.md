# PandaCourses 🐼🛒

PWA de **budget courses partagé** et de **liste de courses** pour Audrey & Tom.

Application web installable (PWA), 100 % front-end, sans build : un seul `index.html`
autonome + un manifeste, un service worker (hors-ligne) et les icônes. Les données
sont stockées localement dans le navigateur (`localStorage`).

## Fonctionnalités

- **Accueil** : total du mois, équilibre 50/50 (qui doit combien à qui), bloc
  « À ne pas oublier » (courses importantes), anneau de répartition Audrey/Tom,
  courbe d'évolution sur l'année, dépenses récentes.
- **Dépenses** : navigation mois par mois. Modification / suppression possibles
  uniquement sur le **mois en cours** (les mois passés sont en lecture seule).
- **Liste de courses** : ajout d'articles, tag magasin (couleur par enseigne),
  filtre par magasin, marquage « important » (★), coche des articles pris.
- **Année** : récap mensuel (Audrey / Tom / total / écart), lignes dépliables
  et suivi des virements de compensation (« virement fait »).

## Lancer en local

Servir le dossier avec n'importe quel serveur statique, par ex. :

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

Un service worker nécessite `http(s)` (ou `localhost`) pour s'activer.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | L'application complète (HTML + CSS + JS) |
| `manifest.webmanifest` | Métadonnées PWA (nom, couleurs, icônes) |
| `sw.js` | Service worker — cache hors-ligne |
| `icon.svg`, `icon-192.png`, `icon-512.png` | Icônes (logo panda + chariot) |
