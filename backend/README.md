# API Hotel Booking — Express MVC

## Démarrage

1. Copiez `.env.example` vers `.env`.
2. Créez une base gratuite MongoDB Atlas et renseignez `MONGODB_URI`.
3. Lancez `npm.cmd install`, puis `npm run dev`.

Architecture :

```text
src/config       connexion MongoDB
src/models       User, Room, Reservation
src/controllers  logique métier
src/routes       routes Express
src/middlewares  JWT, rôles et erreurs
```

## Routes API

| Méthode | Route | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter |
| GET | `/api/auth/me` | Profil connecté |
| PATCH | `/api/auth/me` | Modifier son profil |
| PATCH | `/api/auth/password` | Modifier le mot de passe |
| DELETE | `/api/auth/me` | Supprimer son compte |
| GET | `/api/rooms` | Liste des chambres |
| POST | `/api/rooms` | Créer une chambre (admin) |
| GET | `/api/reservations` | Mes réservations |
| POST | `/api/reservations` | Créer une réservation |
| PATCH | `/api/reservations/:id/cancel` | Annuler une réservation |
| GET | `/api/dashboard` | Statistiques client |

Les routes protégées exigent `Authorization: Bearer VOTRE_JETON`.
