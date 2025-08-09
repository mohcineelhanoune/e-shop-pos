# Guide de Déploiement - Site E-Commerce

Ce guide détaille les étapes pour déployer le site e-commerce en production.

## 🌐 Options de Déploiement

### Option 1 : Déploiement Séparé (Recommandé)

#### Frontend (Vercel/Netlify)
- **Avantages** : CDN global, déploiement automatique, SSL gratuit
- **Coût** : Gratuit pour les projets personnels

#### Backend (Heroku/Railway/DigitalOcean)
- **Avantages** : Gestion simplifiée, scaling automatique
- **Coût** : À partir de 5-10€/mois

#### Base de données (MongoDB Atlas)
- **Avantages** : Gestion automatisée, backups, sécurité
- **Coût** : Gratuit jusqu'à 512MB, puis à partir de 9€/mois

### Option 2 : Déploiement VPS
- **Avantages** : Contrôle total, coût prévisible
- **Inconvénients** : Maintenance manuelle
- **Coût** : 5-20€/mois selon les ressources

## 🚀 Déploiement Frontend (Vercel)

### 1. Préparation
```bash
cd frontend/frontend
pnpm run build
```

### 2. Configuration Vercel
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement :
   ```
   VITE_API_URL=https://votre-backend.herokuapp.com/api
   VITE_WHATSAPP_NUMBER=33123456789
   ```
3. Définissez le dossier de build : `frontend/frontend/dist`

### 3. Déploiement
- Le déploiement se fait automatiquement à chaque push sur la branche main

## 🖥️ Déploiement Backend (Heroku)

### 1. Préparation
```bash
cd backend
# Créer un Procfile
echo "web: node server.js" > Procfile
```

### 2. Configuration Heroku
```bash
# Installer Heroku CLI
npm install -g heroku

# Se connecter
heroku login

# Créer l'application
heroku create votre-app-backend

# Configurer les variables d'environnement
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=votre_jwt_secret_production
heroku config:set JWT_EXPIRE=30d
heroku config:set MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
```

### 3. Déploiement
```bash
# Déployer
git add .
git commit -m "Deploy to production"
git push heroku main
```

## 🗄️ Configuration MongoDB Atlas

### 1. Création du Cluster
1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créez un nouveau cluster (gratuit M0)
3. Configurez l'accès réseau (0.0.0.0/0 pour tous les IPs)

### 2. Création de l'Utilisateur
1. Créez un utilisateur de base de données
2. Notez le nom d'utilisateur et mot de passe

### 3. Récupération de l'URI
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

## 🔧 Configuration de Production

### Variables d'Environnement Backend
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
JWT_SECRET=votre_jwt_secret_tres_securise_production
JWT_EXPIRE=30d
CORS_ORIGIN=https://votre-frontend.vercel.app
```

### Variables d'Environnement Frontend
```env
VITE_API_URL=https://votre-backend.herokuapp.com/api
VITE_WHATSAPP_NUMBER=33123456789
```

## 🛡️ Sécurité en Production

### 1. Variables d'Environnement
- Utilisez des secrets forts et uniques
- Ne jamais commiter les fichiers `.env`
- Utilisez des services de gestion de secrets

### 2. CORS
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

### 3. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par windowMs
});

app.use('/api/', limiter);
```

### 4. Helmet pour la Sécurité
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 📊 Monitoring et Logs

### 1. Logs Backend (Heroku)
```bash
heroku logs --tail
```

### 2. Monitoring d'Application
- **Heroku** : Heroku Metrics
- **Vercel** : Analytics intégrées
- **MongoDB Atlas** : Monitoring intégré

### 3. Alertes
Configurez des alertes pour :
- Erreurs 500
- Temps de réponse élevé
- Utilisation de la base de données

## 🔄 CI/CD (Optionnel)

### GitHub Actions pour le Backend
```yaml
# .github/workflows/deploy.yml
name: Deploy to Heroku

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "votre-app-backend"
        heroku_email: "votre@email.com"
        appdir: "backend"
```

## 🧪 Tests en Production

### 1. Tests de Fumée
- [ ] Page d'accueil se charge
- [ ] Catalogue de produits fonctionne
- [ ] Connexion admin fonctionne
- [ ] API répond correctement

### 2. Tests de Performance
```bash
# Test de charge avec Artillery
npm install -g artillery
artillery quick --count 10 --num 5 https://votre-backend.herokuapp.com/api/products
```

## 📈 Optimisations

### 1. Frontend
- Compression Gzip/Brotli (automatique sur Vercel)
- Lazy loading des images
- Code splitting

### 2. Backend
- Cache Redis pour les requêtes fréquentes
- Compression des réponses
- Optimisation des requêtes MongoDB

### 3. Base de Données
- Index sur les champs recherchés
- Pagination des résultats
- Nettoyage des données obsolètes

## 🔧 Maintenance

### 1. Mises à Jour
- Surveillez les vulnérabilités avec `npm audit`
- Mettez à jour régulièrement les dépendances
- Testez en staging avant la production

### 2. Backups
- MongoDB Atlas : Backups automatiques
- Code : Repository Git
- Variables d'environnement : Documentation sécurisée

### 3. Monitoring
- Surveillez les métriques de performance
- Configurez des alertes pour les erreurs
- Analysez les logs régulièrement

## 🆘 Dépannage Production

### Problèmes Courants

1. **Site inaccessible**
   - Vérifiez les logs du serveur
   - Vérifiez la configuration DNS
   - Vérifiez les variables d'environnement

2. **Erreurs 500**
   - Consultez les logs backend
   - Vérifiez la connexion à la base de données
   - Vérifiez les variables d'environnement

3. **Lenteur**
   - Analysez les métriques de performance
   - Vérifiez les requêtes de base de données
   - Considérez l'ajout de cache

## 📞 Support

Pour toute question sur le déploiement :
- Documentation Heroku : https://devcenter.heroku.com/
- Documentation Vercel : https://vercel.com/docs
- Documentation MongoDB Atlas : https://docs.atlas.mongodb.com/

