const utils = require("../utils");
const channelController = require("../controllers/channelController");
const express = require("express");
const router = express.Router();
const config = require('../config/configVars');
/*
  Input Body - 
      userId: String,
      workspaceId: UUID(String),
      channelId: UUID(String),
*/
router.get('/addUserToChannel', async (req, res) => {
    const token = req.query.token;
    let data = await utils.jwtToken.verifyToken(token, process.env.JWT_SECRET);
    try {
        data = {...data, userId: data.userIdToAdd} ;  
        let obj = await channelController.addUserToChannel(data);
        // console.log(obj);
        res.redirect(config.frontendURL);
    } catch (error) {
      console.log("Error in addUserToChannel. Error = ", error);
      res.json({'error': error.message});  
    } 
});

module.exports = router;