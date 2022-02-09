const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");

// @route POST /messages/:conversationId
// @desc Create message under conversation
// @access Public
exports.createMessage = asyncHandler(async (req, res, next) => {
  const conversationId = req.params.conversationId;
  const userId = req.user.id;
  const message = req.body.message;

  try {
    const newMessage = await Message.create({
      conversationId,
      userId,
      message
    });

    const updatedConversation = await Conversation.findOneAndUpdate(
      { "_id": conversationId },
      {
        $push: { messages: newMessage._id },
        $set: { recentMessage: newMessage._id }
      }, { new: true });
    if (updatedConversation) {
      res.status(201).json({ success: "Successfully created message" });
    } else {
      res.status(404).json({ error: "Conversation not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
