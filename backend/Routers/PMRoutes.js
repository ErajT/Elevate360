const PMHandler = require('../Controllers/PMControllers')
const express= require('express')

const router = express.Router();

router.route('/generate')
    .get(PMHandler.generateLeaderboard)

    
module.exports = router