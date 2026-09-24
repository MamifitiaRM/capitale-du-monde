# Capitales des pays du monde

Quiz de géographie : devinez la capitale de 193 pays, continent par continent, avec trois niveaux de difficulté, des points bonus, un système de déblocage et un classement.

## Prérequis

- Node.js 20 ou plus
- MongoDB en local (ou une URI MongoDB Atlas)

## Installation

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

```bash
cd Frontend
npm install
npm run dev
```

Le backend tourne sur `http://localhost:3000` et le frontend sur `http://localhost:5173`.

`npm run seed` importe (ou met à jour) les questions. Il peut être relancé sans risque.

Pour un autre serveur d'API, créer `Frontend/.env` à partir de `Frontend/.env.example`.

## Règles du jeu

- 10 questions par partie (5 pour les niveaux d'Océanie), 10 secondes par question.
- 3 points par bonne réponse, +3 points de bonus toutes les 3 bonnes réponses d'affilée.
- Un niveau se débloque en atteignant un score dans un niveau précédent (voir `backend/src/data/levels.js`).
- Le score est calculé côté serveur : les bonnes réponses ne sont jamais envoyées au navigateur avant que la question soit jouée.

## API

| Méthode | Route | Rôle |
| --- | --- | --- |
| POST | `/api/auth/register`, `/api/auth/login`, `/api/auth/logout` | Authentification |
| GET | `/api/auth` | Utilisateur connecté |
| GET | `/api/level` | Niveaux avec état de verrouillage et meilleur score |
| GET | `/api/question/random` | Questions d'un continent et d'un niveau |
| POST | `/api/question/check` | Vérifie une réponse |
| PUT | `/api/question/applyPoint` | Enregistre le score d'une partie |
| GET | `/api/leaderboard` | Classement |
