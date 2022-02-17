const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  loadRequests,
  createRequest,
  handleRequest,
} = require("../controllers/request");

router.route("/").get(protect, loadRequests);

router.route("/").post(protect, createRequest);

router.route("/:requestId").put(protect, handleRequest);

module.exports = router;
