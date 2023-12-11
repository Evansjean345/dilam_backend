const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message.controller");

router.post("/message", messageCtrl.NewMessage);
router.get("/message/:conversationId", messageCtrl.getMessage);

module.exports = router;
