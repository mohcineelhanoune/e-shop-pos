# Site E-Commerce Full-Stack

Un site e-commerce moderne et complet avec intégration WhatsApp, système POS, génération de factures PDF et tableau de bord administrateur.

## 🚀 Fonctionnalités

### Frontend (Client)
- ✅ **Design moderne et responsive** - Interface utilisateur optimisée pour mobile et desktop
- ✅ **Catalogue de produits** - Affichage avec catégories, recherche et filtres
- ✅ **Pages de détail produit** - Images, descriptions, prix et options
- ✅ **Système de panier** - Ajout, modification et suppression d'articles
- ✅ **Intégration WhatsApp** - Commande directe via WhatsApp avec message pré-rempli
- ✅ **Authentification** - Inscription et connexion utilisateur

### Backend (Admin)
- ✅ **API REST complète** - Gestion des produits, catégories, commandes et utilisateurs
- ✅ **Tableau de bord administrateur** - Interface de gestion complète
- ✅ **Système POS (Point de Vente)** - Saisie manuelle des commandes en magasin
- ✅ **Gestion des produits** - CRUD complet avec catégories et stock
- ✅ **Gestion des commandes** - Suivi et mise à jour des statuts
- ✅ **Génération de factures PDF** - Factures professionnelles téléchargeables
- ✅ **Authentification JWT** - Sécurisation des routes admin

## 🛠️ Technologies Utilisées

### Frontend
- **React.js** - Framework JavaScript moderne
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Axios** - Client HTTP pour les API
- **React Router** - Navigation côté client

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimaliste
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par tokens
- **bcryptjs** - Hachage des mots de passe
- **PDFKit** - Génération de PDF

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- MongoDB (version 5 ou supérieure)
- npm ou pnpm

## 🚀 Installation et Configuration

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd e-commerce
```

### 2. Configuration du Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` dans le dossier `backend` :
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=votre_jwt_secret_tres_securise
JWT_EXPIRE=30d
```

### 3. Configuration du Frontend

```bash
cd frontend/frontend
pnpm install
```

Créer un fichier `.env` dans le dossier `frontend/frontend` :
```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=33123456789
```

### 4. Démarrage des Services

#### Démarrer MongoDB
```bash
sudo systemctl start mongod
```

#### Démarrer le Backend
```bash
cd backend
npm run dev
```
Le serveur backend sera accessible sur `http://localhost:5000`

#### Démarrer le Frontend
```bash
cd frontend/frontend
pnpm run dev
```
Le site sera accessible sur `http://localhost:5173`

### 5. Initialiser les Données de Test

```bash
cd backend
node seedData.js
```

Cela créera :
- Un utilisateur administrateur : `admin@ecommerce.com` / `admin123`
- 4 catégories de produits
- 8 produits d'exemple

## 📱 Utilisation

### Interface Client
1. Accédez à `http://localhost:5173`
2. Parcourez le catalogue de produits
3. Consultez les détails des produits
4. Ajoutez des articles au panier
5. Commandez via WhatsApp en un clic

### Interface Administrateur
1. Connectez-vous avec `admin@ecommerce.com` / `admin123`
2. Accédez au tableau de bord admin
3. Gérez les produits et catégories
4. Utilisez le système POS pour les ventes en magasin
5. Consultez les commandes et générez des factures

## 🏗️ Structure du Projet

```
e-commerce/
├── backend/                    # API Backend
│   ├── controllers/           # Contrôleurs des routes
│   ├── middleware/            # Middlewares (auth, erreurs)
│   ├── models/               # Modèles MongoDB
│   ├── routes/               # Définition des routes
│   ├── config/               # Configuration DB
│   ├── server.js             # Point d'entrée
│   ├── seedData.js           # Script de données de test
│   └── package.json
├── frontend/frontend/          # Application React
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   ├── context/         # Contextes React (Auth, Cart)
│   │   ├── lib/             # Utilitaires et configuration API
│   │   └── App.jsx          # Composant principal
│   └── package.json
└── README.md
```

## 🔧 Configuration Avancée

### Variables d'Environnement Backend
- `NODE_ENV` : Environnement (development/production)
- `PORT` : Port du serveur (défaut: 5000)
- `MONGO_URI` : URI de connexion MongoDB
- `JWT_SECRET` : Clé secrète pour JWT
- `JWT_EXPIRE` : Durée d'expiration des tokens

### Variables d'Environnement Frontend
- `VITE_API_URL` : URL de l'API backend
- `VITE_WHATSAPP_NUMBER` : Numéro WhatsApp pour les commandes

## 📊 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détail d'un produit
- `POST /api/products` - Créer un produit (admin)
- `PUT /api/products/:id` - Modifier un produit (admin)
- `DELETE /api/products/:id` - Supprimer un produit (admin)

### Catégories
- `GET /api/categories` - Liste des catégories
- `POST /api/categories` - Créer une catégorie (admin)

### Commandes
- `GET /api/orders` - Liste des commandes (admin)
- `POST /api/orders` - Créer une commande
- `GET /api/orders/:id` - Détail d'une commande
- `PUT /api/orders/:id` - Modifier une commande (admin)

### Factures
- `GET /api/invoices/:orderId` - Télécharger une facture PDF (admin)

## 🎨 Personnalisation

### Modifier les Informations de l'Entreprise
Éditez le fichier `backend/controllers/invoiceController.js` :
```javascript
const COMPANY_INFO = {
  name: 'Votre Entreprise',
  address: 'Votre Adresse',
  city: 'Votre Ville',
  phone: 'Votre Téléphone',
  email: 'votre@email.com',
  // ...
};
```

### Modifier le Numéro WhatsApp
Mettez à jour la variable `VITE_WHATSAPP_NUMBER` dans le fichier `.env` du frontend.

## 🚀 Déploiement

### Préparation pour la Production

1. **Backend** : Configurez les variables d'environnement de production
2. **Frontend** : Buildez l'application
   ```bash
   cd frontend/frontend
   pnpm run build
   ```
3. **Base de données** : Utilisez MongoDB Atlas ou une instance MongoDB dédiée

### Déploiement Recommandé
- **Backend** : Heroku, DigitalOcean, AWS
- **Frontend** : Vercel, Netlify, AWS S3
- **Base de données** : MongoDB Atlas

## 🐛 Dépannage

### Problèmes Courants

1. **Erreur de connexion MongoDB**
   - Vérifiez que MongoDB est démarré
   - Vérifiez l'URI dans le fichier `.env`

2. **Erreur CORS**
   - Vérifiez que l'URL du frontend est autorisée dans le backend

3. **Erreur d'authentification**
   - Vérifiez que JWT_SECRET est défini
   - Vérifiez que l'utilisateur admin existe

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

## 📞 Support

Pour toute question ou support, contactez-nous à : support@ecommerce.com

