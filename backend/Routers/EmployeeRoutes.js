const EmployeeHandler = require('../Controllers/EmployeeControllers')
const express= require('express')

const router = express.Router();

router.route('/generate')
    .post(EmployeeHandler.generateLeaderboard)

    
module.exports = router