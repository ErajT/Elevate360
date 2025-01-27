const ClientHandler = require('../Controllers/ClientControllers')
const express= require('express')

const router = express.Router();

// Get all projects associated with a specific client
// @route   GET /getProjectsByClient/:clientID
// @desc    Retrieves all projects for a given client ID
// @access  Private
router.route('/getProjectsByClient/:clientID')
    .get(ClientHandler.getProjectsByClientID);

// Get all sprints associated with a specific project
// @route   GET /getSprintsByProject/:projectID
// @desc    Retrieves all sprints for a given project ID
// @access  Private
router.route('/getSprintsByProject/:projectID')
    .get(ClientHandler.getSprintsByProjectID);

// Get scope file for a specific sprint
// @route   GET /getScopeFile/:sprintID
// @desc    Retrieves the scope file associated with a given sprint ID
// @access  Private
router.route('/getScopeFile/:sprintID')
    .get(ClientHandler.getScopeFileBySprintID);

// Update scope file for a specific sprint
// @route   PUT /updateScopeFile/:sprintID
// @desc    Updates/Inserts the scope file for a given sprint ID
// @param   req.body.scopeFile - The scope file content to be updated
// @access  Private
router.route('/updateScopeFile/:sprintID')
    .put(ClientHandler.insertScopeFile);
    
module.exports = router