const PMHandler = require('../Controllers/PMControllers')
const express= require('express')

const router = express.Router();

// Get all projects associated with a specific PM
router.route('/getProjectsByPm/:pmID')
    .get(PMHandler.getProjectsByPmID);

   
module.exports = router