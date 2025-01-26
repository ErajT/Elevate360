const ClientHandler = require('../Controllers/ClientControllers')
const express= require('express')

const router = express.Router();

router.route('/getProjectsByClient/:clientID')
    .get(ClientHandler.getProjectsByClientID);
 
module.exports = router