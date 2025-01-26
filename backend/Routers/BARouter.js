const BAHandler = require('../Controllers/BAControllers')
const express= require('express')

const router = express.Router();

router.route('/generate')
    .get(BAHandler.generateLeaderboard)

    
module.exports = router