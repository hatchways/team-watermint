const Conversation = require("../models/Conversation");
const asyncHandler = require("express-async-handler");

// @route POST /conversations
// @desc Create new conversation
// @access Public
exports.createConversation = asyncHandler(async (req, res, next) => {
  const { dogOwnerId, dogSitterId } = req.body;

  const conversationExists = await Conversation.findOne({
    dogOwnerId,
    dogSitterId,
  });

  if (conversationExists) {
    res.status(400).json({ error: "Conversation already exists" });
  } else {
    await Conversation.create({ dogOwnerId, dogSitterId });
    res.status(201).json({ success: "Successfully created conversation" });
  }
});

// @route GET /conversations
// @desc Get all conversations
// @access Public
exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const allConversations = await Conversation.find({
    $or: [{ petSitter: userId }, { petOwner: userId }],
  }).populate("recentMessage");

  res.status(200).json({
    success: {
      conversations: allConversations,
    },
  });
});

// @route GET /conversations/:conversationId/messages
// @desc Get all messages from a conversation
// @access Public
exports.getMessages = asyncHandler(async (req, res, next) => {
  const conversationId = req.params.conversationId;

  const conversation = await Conversation.findById(
    conversationId,
    "_id"
  ).populate("messages");

  if (conversation) {
    res.status(200).json({
      success: {
        messages: conversation.messages,
      },
    });
  } else {
    res.status(404).json({ error: "No conversation found" });
  }
});
