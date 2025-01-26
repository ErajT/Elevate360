const EmployeeHandler = require('../Controllers/EmployeeControllers')
const express= require('express')

const router = express.Router();

router.route('/generate')
    .get(EmployeeHandler.generateLeaderboard)

    
module.exports = router