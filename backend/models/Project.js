// Import mongoose for schema creation
const mongoose = require('mongoose');

/**
 * Project Schema - Defines the structure of a project document
 * This is like a blueprint for each project stored in MongoDB
 */
const projectSchema = new mongoose.Schema({
  // Project title - required field
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true, // Removes extra spaces
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  
  // Project description - required field
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  // Technologies used - array of strings
  technologies: {
    type: [String], // Array of strings
    required: [true, 'At least one technology is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Please specify at least one technology'
    }
  },
  
  // GitHub link - optional field
  githubLink: {
    type: String,
    default: '',
    validate: {
      validator: function(v) {
        // If URL is provided, validate it's a proper URL
        if (v && v.length > 0) {
          return /^https?:\/\/.+\..+/.test(v);
        }
        return true; // Empty string is valid
      },
      message: 'Please provide a valid URL'
    }
  },
  
  // Project image URL - optional
  imageUrl: {
    type: String,
    default: '',
    validate: {
      validator: function(v) {
        if (v && v.length > 0) {
          return /^https?:\/\/.+\..+/.test(v);
        }
        return true;
      },
      message: 'Please provide a valid image URL'
    }
  },
  
  // Timestamp - automatically set when project is created
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Add timestamps for created_at and updated_at
  timestamps: true
});

// Create and export the Project model
// 'Project' will create a collection called 'projects' in MongoDB
module.exports = mongoose.model('Project', projectSchema);