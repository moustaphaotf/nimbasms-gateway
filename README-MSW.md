# Configuration MSW pour MTN Gateway

Ce projet utilise Mock Service Worker (MSW) pour mocker les appels API pendant le développement et les tests.

## Structure des fichiers

```
src/
  mocks/
    handlers/
      auth.handlers.ts          # Authentification et gestion des utilisateurs
      account.handlers.ts       # Informations du compte
      messages.handlers.ts      # Gestion des messages SMS
      senders.handlers.ts       # Gestion des expéditeurs
      statistics.handlers.ts    # Statistiques et rapports
      membership.handlers.ts    # Gestion des membres
      exports.handlers.ts       # Gestion des exports
      users.handlers.ts         # Utilisateurs (référence vers auth)
      index.ts                  # Export de tous les handlers
    browser.ts                  # Configuration MSW pour le navigateur
    node.ts                     # Configuration MSW pour Node.js (tests)
    init.ts                     # Initialisation automatique
    setupTests.ts               # Configuration pour les tests
```

## Installation

```bash
npm install msw --save-dev
```

## Configuration

### 1. Pour le développement (navigateur)

Ajoutez dans votre `app/layout.tsx` ou point d'entrée principal :

```typescript
// En mode développement uniquement
if (process.env.NODE_ENV === "development") {
  import("../src/mocks/init").then(({ initMocks }) => {
    initMocks();
  });
}
```

### 2. Pour les tests

Ajoutez dans votre configuration de test (vitest.config.ts ou jest.config.js) :

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./src/mocks/setupTests.ts"],
  },
});
```

### 3. Générer le Service Worker (une seule fois)

```bash
npx msw init public/ --save
```

## Utilisation

### Endpoints mockés

Tous les endpoints définis dans `lib/api/endpoints.ts` sont mockés :

#### Authentification

- `POST /auth/email-token` - Demander un OTP par email
- `POST /auth/mobile-token` - Demander un OTP par SMS
- `POST /auth/email-token/validate` - Valider OTP email
- `POST /auth/mobile-token/confirm` - Valider OTP mobile
- `POST /auth/revoke-token` - Rafraîchir le token
- `GET /auth/profile-info` - Informations du profil
- `PATCH /auth/profile-info` - Mettre à jour le profil
- `GET /auth/user-list/` - Liste des utilisateurs
- `POST /auth/create` - Créer un utilisateur

#### Compte

- `GET /account/info/` - Informations du compte
- `POST /account/regenerate-key/` - Régénérer la clé API
- `PATCH /account/webhook/` - Mettre à jour l'URL webhook

#### Messages

- `GET /messages/` - Liste des messages (avec pagination et filtres)
- `GET /messages/:id/` - Détails d'un message
- `POST /messages/` - Créer un message
- `POST /messages/csv_bulk_message/` - Envoi en masse via CSV
- `POST /messages/groups_message/` - Envoi groupé
- `POST /messages/export/` - Demander un export

#### Expéditeurs

- `GET /senders/` - Liste des expéditeurs
- `POST /senders/` - Créer un expéditeur
- `PATCH /senders/:id/` - Mettre à jour le statut

#### Statistiques

- `GET /statistics/` - Statistiques générales
- `GET /statistics/reporting/` - Rapports d'utilisation

#### Membres

- `GET /auth/v1/memberships` - Liste des membres
- `POST /auth/v1/memberships` - Créer un membre
- `PATCH /auth/v1/memberships/:id/change_role` - Changer le rôle

#### Exports

- `GET /exports/` - Liste des exports
- `POST /exports/` - Créer un export

### Données de test

Les mocks génèrent des données réalistes :

- **OTP de test** : Utilisez `123456` comme code OTP pour la validation
- **Pagination** : Supporte les paramètres `limit` et `offset`
- **Filtres** : Supporte les paramètres de recherche et de statut
- **Données aléatoires** : Messages, utilisateurs, statistiques générés dynamiquement

### Personnalisation

Pour modifier les données mockées, éditez les fichiers dans `src/mocks/handlers/`.

Exemple pour ajouter un nouveau endpoint :

```typescript
// Dans le fichier handler approprié
http.get(`${BASE_URL}/nouveau-endpoint`, () => {
  return HttpResponse.json({
    data: "votre réponse",
  });
});
```

### Désactiver les mocks

Pour désactiver temporairement les mocks :

```typescript
// Dans votre code
if (process.env.DISABLE_MOCKS !== "true") {
  // Initialiser MSW
}
```

Ou définir la variable d'environnement :

```bash
DISABLE_MOCKS=true npm run dev
```

## Dépannage

1. **Erreur "Cannot find module 'msw'"** : Installez MSW avec `npm install msw --save-dev`
2. **Service Worker non trouvé** : Exécutez `npx msw init public/ --save`
3. **Requêtes non interceptées** : Vérifiez que l'URL de base correspond à votre configuration API

## Variables d'environnement

- `NEXT_PUBLIC_API_URL` : URL de base de l'API (par défaut : `http://localhost:8000`)
- `NODE_ENV` : Les mocks ne s'activent qu'en mode `development`
