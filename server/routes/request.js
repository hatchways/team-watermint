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

router.route("/").get(protect, loadRequests);

router.route("/").post(protect, validateCreateRequest, createRequest);

router.route("/:requestId").put(protect, validateHandleRequest, handleRequest);

module.exports = router;
