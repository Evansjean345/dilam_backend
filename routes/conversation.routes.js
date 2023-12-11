const express = require("express");
const router = express.Router();
const conversationCtrl = require("../controllers/conversation.controller");

router.post("/conversation", conversationCtrl.NewConversation);
router.get("/conversation/:userId", conversationCtrl.UserConversation);
router.get(
  "/conversation/:firstUserId/:secondUserId",
  conversationCtrl.TwoUserConversation
);
router.get(
  "/lastmessage/:firstUserId/:secondUserId",
  conversationCtrl.conversationLastMessage
);

module.exports = router;
