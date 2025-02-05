const BAHandler = require('../Controllers/BAControllers')
const express= require('express')

const router = express.Router();

// Get all projects associated with a specific ba
router.route('/getProjectsByBa/:baID')
    .get(BAHandler.getProjectsByBaID);

// Assign the selected project to the specific BA and update the status to new
router.route('/assignProjectToBa')
    .post(BAHandler.assignProjectToBA);
    
module.exports = router