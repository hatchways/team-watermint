const Conversation = require("../models/Conversation");
const asyncHandler = require("express-async-handler");

// @route POST /conversations
// @desc Create new conversation
// @access Public
exports.createConversation = asyncHandler(async (req, res, next) => {
  const { dogOwnerId, dogSitterId } = req.body;

  try {
    const conversation = await Conversation.create({
      dogOwnerId,
      dogSitterId
    });
    if (conversation)
      res.status(201).json({ success: "Successfully created conversation" });
    else
      res.status(400).json({ error: "Could not make a conversation" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route GET /conversations
// @desc Get all conversations
// @access Public
exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const allConversations = await Conversation.find({
    $or: [{ "petSitter": userId }, { "petOwner": userId }]
  }).populate("recentMessage");

  if (allConversations) {
    res.status(200).json({
      success: {
        conversations: allConversations
      }
    });
  } else {
    res.status(400).json({ error: "Could not get user's conversations" })
  }
});

// @route GET /conversations/:conversationId/messages
// @desc Get all messages from a conversation
// @access Public
exports.getMessages = asyncHandler(async (req, res, next) => {
  const conversationId = req.params.conversationId;

  try {
    const conversation = await Conversation.findById(conversationId, "_id")
      .populate("messages");

    if (conversation) {
      res.status(200).json({
        success: {
          messages: conversation.messages
        }
      });
    } else {
      res.status(400).json({ error: "Could not get messages from a conversation" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});
