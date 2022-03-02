const { body, param, validationResult } = require("express-validator");

exports.validateCreateRequest = [
  body("sitterId").isMongoId(),
  body("start").toDate().isAfter(),
  body("end")
    .toDate()
    .isAfter()
    .bail()
    .custom((end, { req }) => {
      if (req.body.start.getTime() >= end.getTime())
        throw new Error("End date must be after start date");
      return end;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    next();
  },
];

exports.validateHandleRequest = [
  body("status")
    .toLowerCase()
    .trim()
    .isIn(["pending", "accepted", "declined", "completed"]),
  param("requestId").isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    next();
  },
];
