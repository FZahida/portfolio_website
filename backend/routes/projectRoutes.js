// Import express and create router
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById
} = require('../controllers/projectController');

/**
 * API ROUTES
 * Define endpoints for project operations
 */

// GET all projects
router.get('/', getProjects);

// GET a single project by ID
router.get('/:id', getProjectById);

// POST create a new project
router.post('/', createProject);

// PUT update a project by ID
router.put('/:id', updateProject);

// DELETE a project by ID
router.delete('/:id', deleteProject);

// Export the router
module.exports = router;