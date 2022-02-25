const { check, body, param, validationResult } = require("express-validator");

exports.validateCreateNotification = [
  body("title").trim(),
  body("description").trim(),
  body("link").trim(),
  body("type").toLowerCase().trim().isIn(["booking", "payment", "system"]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    next();
  },
];

exports.validateMarkNotificationAsRead = [
  param("notificationId").isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    next();
  },
];
