const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('Existing data cleared');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Électronique',
        description: 'Appareils électroniques et gadgets',
        isActive: true
      },
      {
        name: 'Vêtements',
        description: 'Mode et accessoires',
        isActive: true
      },
      {
        name: 'Maison & Jardin',
        description: 'Articles pour la maison et le jardin',
        isActive: true
      },
      {
        name: 'Sports & Loisirs',
        description: 'Équipements sportifs et de loisirs',
        isActive: true
      }
    ]);

    console.log('Categories created');

    // Create products
    const products = await Product.insertMany([
      {
        name: 'Smartphone Samsung Galaxy',
        description: 'Smartphone dernière génération avec écran AMOLED 6.5 pouces, appareil photo 108MP et batterie longue durée.',
        price: 699.99,
        comparePrice: 799.99,
        category: categories[0]._id,
        stock: 25,
        sku: 'PHONE-SAM-001',
        tags: ['smartphone', 'samsung', 'android'],
        isFeatured: true,
        isActive: true
      },
      {
        name: 'MacBook Pro 13"',
        description: 'Ordinateur portable Apple avec puce M2, 8GB RAM, 256GB SSD. Parfait pour le travail et la créativité.',
        price: 1299.99,
        comparePrice: 1399.99,
        category: categories[0]._id,
        stock: 15,
        sku: 'LAPTOP-APPLE-001',
        tags: ['laptop', 'apple', 'macbook'],
        isFeatured: true,
        isActive: true
      },
      {
        name: 'T-shirt Premium Coton Bio',
        description: 'T-shirt en coton biologique, coupe moderne et confortable. Disponible en plusieurs couleurs.',
        price: 29.99,
        comparePrice: 39.99,
        category: categories[1]._id,
        stock: 50,
        sku: 'TSHIRT-BIO-001',
        tags: ['t-shirt', 'coton', 'bio'],
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Casque Audio Bluetooth',
        description: 'Casque sans fil avec réduction de bruit active, autonomie 30h et son haute qualité.',
        price: 149.99,
        comparePrice: 199.99,
        category: categories[0]._id,
        stock: 30,
        sku: 'HEADPHONE-BT-001',
        tags: ['casque', 'bluetooth', 'audio'],
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Chaise de Bureau Ergonomique',
        description: 'Chaise de bureau avec support lombaire, accoudoirs réglables et roulettes silencieuses.',
        price: 199.99,
        category: categories[2]._id,
        stock: 20,
        sku: 'CHAIR-OFFICE-001',
        tags: ['chaise', 'bureau', 'ergonomique'],
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Montre Connectée Sport',
        description: 'Montre intelligente avec GPS, moniteur cardiaque et résistance à l\'eau. Idéale pour le sport.',
        price: 249.99,
        comparePrice: 299.99,
        category: categories[3]._id,
        stock: 35,
        sku: 'WATCH-SPORT-001',
        tags: ['montre', 'sport', 'gps'],
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Cafetière Expresso Automatique',
        description: 'Machine à café expresso avec broyeur intégré, écran tactile et système de mousse de lait.',
        price: 599.99,
        category: categories[2]._id,
        stock: 12,
        sku: 'COFFEE-AUTO-001',
        tags: ['café', 'expresso', 'automatique'],
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Vélo Électrique Urbain',
        description: 'Vélo électrique avec autonomie 80km, moteur silencieux et design moderne pour la ville.',
        price: 1299.99,
        comparePrice: 1499.99,
        category: categories[3]._id,
        stock: 8,
        sku: 'BIKE-ELEC-001',
        tags: ['vélo', 'électrique', 'urbain'],
        isFeatured: true,
        isActive: true
      }
    ]);

    console.log('Products created');
    console.log(`Seeded ${categories.length} categories and ${products.length} products`);
    console.log('Admin credentials: admin@ecommerce.com / admin123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();

