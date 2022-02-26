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

  const conversationExists = await Conversation.findById(conversationId, "_id");

  if (conversationExists) {
    const newMessage = await Message.create({
      conversationId,
      userId,
      message
    });
    await Conversation.findOneAndUpdate(
      { "_id": conversationId },
      {
        $push: { messages: newMessage._id },
        $set: { recentMessage: newMessage._id }
      }, { new: true });
    res.status(201).json({ success: "Successfully created message" });
  } else {
    res.status(404).json({ error: "Conversation not found" });

  }
});
