// seed.js - Populates database with initial data
require('dotenv').config();
const mongoose = require('mongoose');
const Table = require('./models/Table');
const User = require('./models/User');

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Table.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create tables
    const tables = [
      { tableNumber: 1, capacity: 2 },
      { tableNumber: 2, capacity: 2 },
      { tableNumber: 3, capacity: 4 },
      { tableNumber: 4, capacity: 4 },
      { tableNumber: 5, capacity: 6 },
      { tableNumber: 6, capacity: 6 },
      { tableNumber: 7, capacity: 8 },
      { tableNumber: 8, capacity: 10 }
    ];

    await Table.insertMany(tables);
    console.log('✅ Created 8 tables');

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@restaurant.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Created admin user');
    console.log('   Email: admin@restaurant.com');
    console.log('   Password: admin123');

    // Create test customer
    const customer = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'customer123',
      role: 'customer'
    });
    await customer.save();
    console.log('✅ Created test customer');
    console.log('   Email: john@example.com');
    console.log('   Password: customer123');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 You can now:');
    console.log('   1. Start the server: npm run dev');
    console.log('   2. Login with the test accounts above');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();