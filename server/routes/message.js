const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createMessage } = require("../controllers/message");
const { validateMessage } = require('../validate');

router.route('/:conversationId')
  .post(protect, validateMessage, createMessage);

module.exports = router;
