const ClientHandler = require('../Controllers/ClientControllers')
const express= require('express')

const router = express.Router();

router.route('/generate')
    .get(ClientHandler.generateLeaderboard)

    
module.exports = router