# Capitales des pays du monde

Quiz de géographie full-stack : devinez la capitale de **193 pays**, continent par continent, avec trois niveaux de difficulté, des points bonus, un système de déblocage progressif et un classement des joueurs.

**Démo en ligne : https://capitale-du-monde.vercel.app/**

> L'API est hébergée sur l'offre gratuite de Render

## Technologies

| Partie | Outils |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS 4, Zustand, React Router, Axios |
| Backend | Node.js, Express 5, MongoDB (Mongoose) |
| Authentification | JWT , mots de passe hachés avec bcrypt |
| Sécurité | helmet, limitation de requêtes sur la connexion et l'inscription, taille des requêtes limitée |
| Déploiement | Vercel (frontend), Render (API), MongoDB Atlas (base de données) |

## Fonctionnalités

- Inscription, connexion et déconnexion.
- 5 continents (Afrique, Amérique, Asie, Europe, Océanie) plus un mode « Monde », chacun en 3 niveaux : facile, moyen, difficile.
- 193 pays et capitales, avec 4 choix par question.
- Déblocage progressif : un niveau s'ouvre quand on atteint un score dans un niveau précédent (règles dans `backend/src/data/levels.js`).
- Meilleur score enregistré par niveau, total des points et classement des 20 meilleurs joueurs.
- Page « Mon compte » avec la progression et le rang du joueur.

## Règles du jeu

- Jusqu'à 10 questions par partie. Les continents qui comptent peu de pays, comme l'Océanie, en proposent moins.
- 10 secondes par question.
- 3 points par bonne réponse, plus 3 points de bonus toutes les 3 bonnes réponses d'affilée.
- Seul le meilleur score de chaque niveau est conservé.

## Installation en local

Prérequis : Node.js 20 ou plus, et MongoDB en local (ou une URI MongoDB Atlas).

```bash
# Backend
cd backend
npm install
cp .env.example .env     # puis renseigner les variables
npm run seed             # importe les 193 questions (peut être relancé sans risque)
npm run dev
```

```bash
# Frontend
cd Frontend
npm install
npm run dev
```

Le backend tourne sur `http://localhost:3000` et le frontend sur `http://localhost:5173`.

### Variables d'environnement

Backend (`backend/.env`) :

| Variable | Rôle |
| --- | --- |
| `MONGODB_URI` | Adresse de la base MongoDB |
| `TOKEN_SECRET` | Clé secrète pour signer les JWT (longue chaîne aléatoire) |
| `FRONTEND_URL` | Origine autorisée par le CORS |
| `PORT` | Port du serveur (3000 par défaut) |
| `NODE_ENV` | `production` active les cookies `secure` |

Frontend (`Frontend/.env`, facultatif) : `VITE_API_URL`, l'adresse de l'API (`http://localhost:3000/api` par défaut).

## API

| Méthode | Route | Rôle |
| --- | --- | --- |
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter |
| POST | `/api/auth/logout` | Se déconnecter |
| GET | `/api/auth` | Utilisateur connecté |
| GET | `/api/level` | Niveaux avec état de verrouillage et meilleur score |
| GET | `/api/question/random` | Questions d'un continent et d'un niveau |
| POST | `/api/question/check` | Vérifie une réponse |
| PUT | `/api/question/applyPoint` | Calcule et enregistre le score d'une partie |
| GET | `/api/leaderboard` | Classement et rang du joueur |

