# Documentation API - Site E-Commerce

Cette documentation décrit toutes les routes API disponibles pour le site e-commerce.

## 🔗 URL de Base

- **Développement** : `http://localhost:5000/api`
- **Production** : `https://votre-backend.herokuapp.com/api`

## 🔐 Authentification

L'API utilise l'authentification JWT (JSON Web Token). Pour accéder aux routes protégées, incluez le token dans l'en-tête :

```
Authorization: Bearer <votre_token_jwt>
```

## 📋 Codes de Statut

- `200` - Succès
- `201` - Créé avec succès
- `400` - Erreur de validation
- `401` - Non autorisé
- `403` - Accès interdit
- `404` - Ressource non trouvée
- `500` - Erreur serveur

## 🔑 Authentification

### Inscription
```http
POST /api/auth/register
```

**Corps de la requête :**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123"
}
```

**Réponse :**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Connexion
```http
POST /api/auth/login
```

**Corps de la requête :**
```json
{
  "email": "john@example.com",
  "password": "motdepasse123"
}
```

**Réponse :**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Profil Utilisateur
```http
GET /api/auth/me
```
*Requiert une authentification*

**Réponse :**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-07-02T10:30:00.000Z"
  }
}
```

## 📦 Produits

### Lister les Produits
```http
GET /api/products
```

**Paramètres de requête :**
- `page` (optionnel) - Numéro de page (défaut: 1)
- `limit` (optionnel) - Nombre d'éléments par page (défaut: 10)
- `category` (optionnel) - ID de catégorie pour filtrer
- `search` (optionnel) - Terme de recherche
- `sort` (optionnel) - Champ de tri (ex: 'price', '-createdAt')
- `minPrice` (optionnel) - Prix minimum
- `maxPrice` (optionnel) - Prix maximum

**Exemple :**
```http
GET /api/products?page=1&limit=12&category=64a1b2c3d4e5f6789012345&sort=-createdAt
```

**Réponse :**
```json
{
  "success": true,
  "count": 8,
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 8,
    "pages": 1
  },
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "Smartphone Samsung Galaxy",
      "description": "Smartphone dernière génération...",
      "price": 699.99,
      "comparePrice": 799.99,
      "category": {
        "_id": "64a1b2c3d4e5f6789012346",
        "name": "Électronique"
      },
      "images": [],
      "stock": 25,
      "sku": "PHONE-SAM-001",
      "tags": ["smartphone", "samsung", "android"],
      "isActive": true,
      "isFeatured": true,
      "createdAt": "2023-07-02T10:30:00.000Z"
    }
  ]
}
```

### Obtenir un Produit
```http
GET /api/products/:id
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "Smartphone Samsung Galaxy",
    "description": "Smartphone dernière génération avec écran AMOLED 6.5 pouces...",
    "price": 699.99,
    "comparePrice": 799.99,
    "category": {
      "_id": "64a1b2c3d4e5f6789012346",
      "name": "Électronique",
      "description": "Appareils électroniques et gadgets"
    },
    "images": [],
    "stock": 25,
    "sku": "PHONE-SAM-001",
    "tags": ["smartphone", "samsung", "android"],
    "isActive": true,
    "isFeatured": true,
    "createdAt": "2023-07-02T10:30:00.000Z",
    "updatedAt": "2023-07-02T10:30:00.000Z"
  }
}
```

### Créer un Produit
```http
POST /api/products
```
*Requiert une authentification admin*

**Corps de la requête :**
```json
{
  "name": "Nouveau Produit",
  "description": "Description du produit",
  "price": 99.99,
  "comparePrice": 129.99,
  "category": "64a1b2c3d4e5f6789012346",
  "stock": 50,
  "sku": "PROD-001",
  "tags": ["tag1", "tag2"],
  "isFeatured": true
}
```

### Modifier un Produit
```http
PUT /api/products/:id
```
*Requiert une authentification admin*

### Supprimer un Produit
```http
DELETE /api/products/:id
```
*Requiert une authentification admin*

### Rechercher des Produits
```http
GET /api/products/search?q=terme_recherche
```

## 🏷️ Catégories

### Lister les Catégories
```http
GET /api/categories
```

**Réponse :**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012346",
      "name": "Électronique",
      "description": "Appareils électroniques et gadgets",
      "isActive": true,
      "createdAt": "2023-07-02T10:30:00.000Z"
    }
  ]
}
```

### Obtenir une Catégorie
```http
GET /api/categories/:id
```

### Créer une Catégorie
```http
POST /api/categories
```
*Requiert une authentification admin*

**Corps de la requête :**
```json
{
  "name": "Nouvelle Catégorie",
  "description": "Description de la catégorie",
  "isActive": true
}
```

### Modifier une Catégorie
```http
PUT /api/categories/:id
```
*Requiert une authentification admin*

### Supprimer une Catégorie
```http
DELETE /api/categories/:id
```
*Requiert une authentification admin*

## 🛒 Commandes

### Lister les Commandes
```http
GET /api/orders
```
*Requiert une authentification admin*

**Paramètres de requête :**
- `page` (optionnel) - Numéro de page
- `limit` (optionnel) - Nombre d'éléments par page
- `status` (optionnel) - Filtrer par statut
- `orderType` (optionnel) - Filtrer par type (whatsapp, pos, online)
- `createdAt[gte]` (optionnel) - Date minimum (ISO string)

**Réponse :**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012347",
      "orderNumber": "ORD-2023-001",
      "customer": {
        "name": "John Doe",
        "phone": "+33123456789",
        "email": "john@example.com"
      },
      "orderItems": [
        {
          "product": "64a1b2c3d4e5f6789012345",
          "name": "Smartphone Samsung Galaxy",
          "quantity": 1,
          "price": 699.99
        }
      ],
      "subtotal": 699.99,
      "discount": 0,
      "tax": 139.99,
      "total": 839.98,
      "status": "pending",
      "orderType": "whatsapp",
      "paymentStatus": "pending",
      "createdAt": "2023-07-02T10:30:00.000Z"
    }
  ]
}
```

### Obtenir une Commande
```http
GET /api/orders/:id
```
*Requiert une authentification admin*

### Créer une Commande
```http
POST /api/orders
```

**Corps de la requête :**
```json
{
  "customer": {
    "name": "John Doe",
    "phone": "+33123456789",
    "email": "john@example.com",
    "address": {
      "street": "123 Rue de la Paix",
      "city": "Paris"
    }
  },
  "orderItems": [
    {
      "product": "64a1b2c3d4e5f6789012345",
      "name": "Smartphone Samsung Galaxy",
      "quantity": 1,
      "price": 699.99
    }
  ],
  "subtotal": 699.99,
  "discount": 0,
  "tax": 139.99,
  "total": 839.98,
  "orderType": "whatsapp",
  "notes": "Commande via WhatsApp"
}
```

### Modifier une Commande
```http
PUT /api/orders/:id
```
*Requiert une authentification admin*

**Corps de la requête (exemple - mise à jour du statut) :**
```json
{
  "status": "confirmed"
}
```

### Statistiques des Commandes
```http
GET /api/orders/stats
```
*Requiert une authentification admin*

**Réponse :**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalOrders": 25,
      "totalRevenue": 15750.50,
      "averageOrderValue": 630.02
    },
    "byStatus": {
      "pending": 5,
      "confirmed": 8,
      "delivered": 10,
      "cancelled": 2
    },
    "byType": {
      "whatsapp": 15,
      "pos": 8,
      "online": 2
    }
  }
}
```

## 🧾 Factures

### Générer une Facture PDF
```http
GET /api/invoices/:orderId
```
*Requiert une authentification admin*

**Réponse :**
- Type de contenu : `application/pdf`
- Nom du fichier : `facture-{orderNumber}.pdf`

## 🔍 Recherche

### Recherche Globale
```http
GET /api/search?q=terme_recherche&type=products
```

**Paramètres de requête :**
- `q` (requis) - Terme de recherche
- `type` (optionnel) - Type de recherche (products, categories)
- `limit` (optionnel) - Nombre de résultats

## 📊 Santé de l'API

### Vérifier le Statut
```http
GET /api/health
```

**Réponse :**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2023-07-02T10:30:00.000Z"
}
```

## ❌ Gestion des Erreurs

### Format des Erreurs
```json
{
  "success": false,
  "error": "Message d'erreur",
  "details": "Détails supplémentaires (optionnel)"
}
```

### Erreurs de Validation
```json
{
  "success": false,
  "error": "Validation Error",
  "details": {
    "name": "Le nom est requis",
    "email": "L'email doit être valide"
  }
}
```

## 🔒 Permissions

### Rôles Utilisateur
- **user** - Utilisateur standard (lecture seule)
- **admin** - Administrateur (accès complet)

### Routes Protégées
- `POST /api/products` - Admin uniquement
- `PUT /api/products/:id` - Admin uniquement
- `DELETE /api/products/:id` - Admin uniquement
- `GET /api/orders` - Admin uniquement
- `POST /api/categories` - Admin uniquement
- `GET /api/invoices/:orderId` - Admin uniquement

## 📝 Exemples d'Utilisation

### JavaScript (Axios)
```javascript
// Configuration de base
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajouter le token d'authentification
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Récupérer les produits
const products = await api.get('/products');

// Créer une commande
const order = await api.post('/orders', {
  customer: { name: 'John', phone: '+33123456789' },
  orderItems: [{ product: 'productId', quantity: 1, price: 99.99 }],
  total: 99.99
});
```

### cURL
```bash
# Connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ecommerce.com","password":"admin123"}'

# Récupérer les produits avec authentification
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"

# Créer un produit
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Nouveau Produit","price":99.99,"category":"categoryId"}'
```

## 🔄 Versioning

L'API utilise le versioning dans l'URL :
- Version actuelle : `v1` (implicite dans `/api/`)
- Futures versions : `/api/v2/`

## 📞 Support

Pour toute question sur l'API :
- Email : api-support@ecommerce.com
- Documentation : https://votre-site.com/api-docs

