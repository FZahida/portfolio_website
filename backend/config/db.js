// Import mongoose for MongoDB connection
const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * This function handles the connection to MongoDB
 * Uses environment variable for connection string
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    // process.env.MONGODB_URI comes from .env file
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    // If connection fails, log error and exit
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Exit with failure code
  }
};

// Export the connection function
module.exports = connectDB;