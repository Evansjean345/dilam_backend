const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

exports.NewConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conversation of a user

exports.UserConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).sort({ createdAt: -1 });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conv includes two userId

exports.TwoUserConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    }).sort({ createdAt: -1 });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.conversationLastMessage = async (req, res) => {
  const user1Id = req.params.firstUserId;
  const user2Id = req.params.secondUserId;

  try {
    // Recherchez la conversation entre les deux utilisateurs
    const conversation = await Conversation.findOne({
      members: { $all: [user1Id, user2Id] },
    });

    if (!conversation) {
      // Si la conversation n'existe pas, il n'y a pas de dernier message
      return res.status(200).json({ message: "Aucune conversation trouvée" });
    }

    // Recherchez le dernier message de cette conversation
    const dernierMessage = await Message.findOne({
      conversationId: conversation._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(dernierMessage);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du dernier message" });
  }
};
