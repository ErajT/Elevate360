const AdminHandler = require('../Controllers/AdminController')
const express= require('express')

const router = express.Router();

router.route('/generate')
    .get(AdminHandler.generateLeaderboard)

    
module.exports = router