const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createConversation,
  getAllConversations,
  getMessages,
} = require('../controllers/conversation');
const { validateConversation, validateGetMessages } = require('../validate');

router.route('/')
  .post(protect, validateConversation, createConversation)
  .get(protect, getAllConversations);
;

router.route('/:conversationId/messages')
  .get(protect, validateGetMessages, getMessages);

module.exports = router;
