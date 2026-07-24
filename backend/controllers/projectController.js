// Import the Project model
const Project = require('../models/Project');

/**
 * CONTROLLER FUNCTIONS
 * These functions handle the business logic for project operations
 */

/**
 * GET - Get all projects
 * Route: GET /api/projects
 * Returns: Array of all projects (newest first)
 */
const getProjects = async (req, res) => {
  try {
    // Find all projects and sort by createdAt (newest first)
    const projects = await Project.find().sort({ createdAt: -1 });
    
    // Send success response with projects
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

/**
 * POST - Create a new project
 * Route: POST /api/projects
 * Body: { title, description, technologies, githubLink, imageUrl }
 * Returns: Created project
 */
const createProject = async (req, res) => {
  try {
    // Create new project with request body data
    const project = new Project(req.body);
    
    // Save to database
    const savedProject = await project.save();
    
    // Send success response with created project
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: savedProject
    });
  } catch (error) {
    // Handle validation errors or other issues
    res.status(400).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

/**
 * PUT - Update a project
 * Route: PUT /api/projects/:id
 * Params: id (project ID)
 * Body: { title, description, technologies, githubLink, imageUrl }
 * Returns: Updated project
 */
const updateProject = async (req, res) => {
  try {
    // Get project ID from URL parameters
    const { id } = req.params;
    
    // Find project and update, return the updated version
    const project = await Project.findByIdAndUpdate(
      id, 
      req.body, // New data
      {
        new: true, // Return updated document
        runValidators: true // Run validators on update
      }
    );
    
    // If project doesn't exist
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Send success response with updated project
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

/**
 * DELETE - Delete a project
 * Route: DELETE /api/projects/:id
 * Params: id (project ID)
 * Returns: Success message
 */
const deleteProject = async (req, res) => {
  try {
    // Get project ID from URL parameters
    const { id } = req.params;
    
    // Find and delete the project
    const project = await Project.findByIdAndDelete(id);
    
    // If project doesn't exist
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Send success response
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

/**
 * GET - Get a single project by ID
 * Route: GET /api/projects/:id
 * Params: id (project ID)
 * Returns: Single project
 */
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// Export all controller functions
module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById
};