/**
 * MAIN SERVER FILE
 * This is the entry point of the backend application
 * It sets up Express, connects to MongoDB, and defines routes
 */

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

// Import database connection function
const connectDB = require('./config/db');

// Import project routes
const projectRoutes = require('./routes/projectRoutes');

// Create Express application
const app = express();

// ==================== MIDDLEWARE ====================

// CORS - Allow frontend to make requests
app.use(cors());

// JSON Parser - Parse incoming JSON requests
app.use(express.json());

// URL Encoded Parser - Parse form data
app.use(express.urlencoded({ extended: true }));

// ==================== DATABASE CONNECTION ====================

// Connect to MongoDB
connectDB();

// ==================== ROUTES ====================

// Use project routes for /api/projects endpoint
app.use('/api/projects', projectRoutes);

// Home route - testing
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API is running',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects'
    }
  });
});

// 404 Route - Handle undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ==================== ERROR HANDLER ====================

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// ==================== START SERVER ====================

// Get port from environment or use default
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});