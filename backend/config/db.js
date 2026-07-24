// Import mongoose for MongoDB connection
const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    // If connection fails, log error and rethrow so the server can fail fast
    console.error('❌ MongoDB Connection Error:', error.message);
    throw error;
  }
};

// Export the connection function
module.exports = connectDB;