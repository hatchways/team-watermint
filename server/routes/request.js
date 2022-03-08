const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  loadRequests,
  createRequest,
  handleRequest,
} = require("../controllers/request");
const {
  validateCreateRequest,
  validateHandleRequest,
} = require("../middleware/request.validate");

const { createNotification } = require("../controllers/notification");
const {
  validateCreateNotification,
} = require("../middleware/notification.validate");

router.route("/").get(protect, loadRequests);

router
  .route("/")
  .post(
    protect,
    validateCreateRequest,
    createRequest,
    validateCreateNotification,
    createNotification
  );

router.route("/:requestId").put(protect, validateHandleRequest, handleRequest);

module.exports = router;
