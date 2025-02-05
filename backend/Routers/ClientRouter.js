const ClientHandler = require('../Controllers/ClientControllers')
const express= require('express')

const router = express.Router();

// Get all projects associated with a specific client
router.route('/getProjectsByClient/:clientID')
    .get(ClientHandler.getProjectsByClientID);

// Get all sprints associated with a specific project
router.route('/getSprintsByProject/:projectID')
    .get(ClientHandler.getSprintsByProjectID);

// Get scope file for a specific sprint
router.route('/getScopeFile/:sprintID')
    .get(ClientHandler.getScopeFileBySprintID);

// // Update scope file for a specific sprint
// router.route('/addScopeFile')
//     .put(ClientHandler.insertScopeFile);

// Create new project with initial sprint
router.route('/createProject')
    .post(ClientHandler.createProjectWithSprint);

// Create new sprint for a specific project
router.route('/createSprint')
    .post(ClientHandler.createSprint);
    
module.exports = router