# Projet Markdown - Gestionnaire de Documents Internes

**Groupe :** ORTIZ SANTA CRUZ Andres Enrique / JANSEN Mael

## 📋 Description du Projet

Cette application a été développée pour répondre aux besoins de gestion de documents internes de l'entreprise. Elle permet de créer, éditer et organiser des documents au format Markdown avec une prévisualisation HTML en temps réel.

### Fonctionnalités Principales

- **Gestion de fichiers Markdown** : Création, édition, suppression et organisation hiérarchique de documents
- **Éditeur Markdown** : Interface intuitive avec prévisualisation HTML en temps réel
- **Bibliothèque de blocs personnalisés** : Création et réutilisation de blocs HTML/Markdown personnalisés
- **Bibliothèque d'images** : Système de gestion centralisée des images avec upload et intégration facilitée
- **Système de profils** : Gestion de différents profils utilisateurs
- **Import/Export** : Sauvegarde et chargement de documents
- **Interface drag & drop** : Réorganisation intuitive de l'arborescence des fichiers

## 🛠️ Technologies Utilisées

### Framework et Bibliothèques Principales

- **React 19** : Framework JavaScript pour l'interface utilisateur
- **Redux Toolkit** : Gestion d'état centralisée de l'application
- **React Router** : Navigation entre les différentes pages
- **Vite** : Outil de build et serveur de développement rapide
- **Bootstrap 5** : Framework CSS pour le design responsive

### Dépendances Clés

- **@dnd-kit/core** : Bibliothèque pour le drag & drop de l'arborescence de fichiers
- **marked** : Conversion Markdown vers HTML
- **crypto-js** : Chiffrement et sécurité des données
- **uuid** : Génération d'identifiants uniques
- **sweetalert2** : Notifications et alertes utilisateur

## 🚀 Installation et Déploiement en Local

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'Installation

1. **Cloner le projet** (si applicable)
   ```bash
   git clone <url-du-repo>
   cd projet-markdown
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Accéder à l'application**
   
   Suivre le lien affiché dans le terminal (généralement `http://localhost:5173`)

### Commandes Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie la qualité du code

## 🤖 Utilisation de l'Intelligence Artificielle

L'intelligence artificielle a été utilisée de manière stratégique dans le développement de ce projet, notamment pour :

### Recherche et Sélection de Dépendances

L'IA a assisté dans l'identification et la sélection des bibliothèques les plus adaptées aux besoins du projet, en évaluant :
- La compatibilité avec React 19
- La maintenance active des packages
- Les performances et la taille des bundles
- La documentation et la communauté

### Implémentation des Dépendances

L'IA a facilité l'intégration de plusieurs dépendances complexes, notamment :

**Exemple : @dnd-kit/core (Drag & Drop)**

La bibliothèque `@dnd-kit/core` a été implémentée pour permettre la réorganisation intuitive de l'arborescence des fichiers. L'IA a aidé à :
- Comprendre l'architecture modulaire de @dnd-kit
- Implémenter les hooks `useDraggable` et `useDroppable`
- Gérer les collisions et les zones de dépôt
- Optimiser les performances lors du déplacement de fichiers
- Intégrer le système avec Redux pour la persistance de l'état

Cette approche a permis de réduire significativement le temps de développement tout en garantissant l'utilisation des meilleures pratiques.

## 📁 Structure du Projet

```
projet-markdown/
├── src/
│   ├── app/              # Configuration Redux et localStorage
│   ├── components/       # Composants React
│   │   ├── Block/        # Gestion des blocs personnalisés
│   │   ├── images/       # Bibliothèque d'images
│   │   ├── markdown/     # Éditeur et prévisualisation
│   │   ├── pages/        # Pages de l'application
│   │   ├── tree/         # Arborescence de fichiers
│   │   └── utils/        # Utilitaires (import/export, crypto)
│   ├── features/         # Slices Redux
│   └── main.jsx          # Point d'entrée de l'application
├── public/               # Fichiers statiques
└── package.json          # Dépendances et scripts
```

## 👥 Contributeurs

- ORTIZ SANTA CRUZ Andres Enrique
- JANSEN Mael

---

**Version :** 0.0.0  
**Licence :** Privé
