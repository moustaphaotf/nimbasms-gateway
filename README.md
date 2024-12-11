# MTN SMS Administration Platform

Plateforme d'administration pour la gestion des services SMS MTN.

## 📱 Présentation

Cette plateforme permet aux administrateurs MTN de :
- Suivre l'utilisation des services SMS en temps réel
- Gérer les clés API et webhooks des clients
- Valider les noms d'expéditeur
- Administrer les comptes utilisateurs
- Exporter les données d'utilisation

## 🛠️ Prérequis

- Node.js 18+
- npm ou yarn
- Variables d'environnement configurées

## ⚙️ Configuration

1. Installez les dépendances :
```bash
npm install
```

2. Configurez les variables d'environnement :
```bash
cp .env.example .env.local
```

Variables requises :
```env
NEXT_PUBLIC_API_URL=https://app.mtn.nimbasms.com
NEXT_PUBLIC_API_V1_PREFIX=https://app.mtn.nimbasms.com/v1
NEXT_PUBLIC_COMPANY_URL=https://nimbasms.com
NEXT_PUBLIC_DEVELOPERS_URL=http://developers.mtn.nimbasms.com
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

## 📁 Structure du projet

```
├── app/               # Routes et pages Next.js
├── components/        # Composants React
│   ├── ui/            # Composants UI génériques
│   └── features/      # Composants métier
├── hooks/             # Hooks React personnalisés
├── lib/               # Logique métier et utilitaires
│   ├── api/           # Services API
│   ├── schemas/       # Validation des données
│   └── utils/         # Fonctions utilitaires
└── providers/         # Contextes React
```

## 🔧 Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Tanstack Query
- Zod
- Framer Motion

## 📝 Conventions de code

- Utilisez TypeScript strict mode
- Suivez les règles ESLint configurées
- Créez des composants atomiques et réutilisables
- Documentez les props des composants
- Utilisez les hooks personnalisés pour la logique réutilisable

## 🚀 Déploiement

1. Construisez l'application :
```bash
npm run build
```

2. Vérifiez la construction :
```bash
npm run start
```

## 📞 Support

Pour toute question ou problème :
- Contactez l'équipe technique
- Consultez la documentation interne
- Ouvrez un ticket dans le système de suivi interne

## 🔒 Sécurité

En cas de découverte d'une faille de sécurité :
1. Ne divulguez pas publiquement l'information
2. Contactez immédiatement l'équipe sécurité
3. Documentez précisément le problème
4. Suivez le protocole de sécurité interne

## ⚖️ Licence

Propriétaire - Tous droits réservés © Nimba Solution