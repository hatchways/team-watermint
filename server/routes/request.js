const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  loadRequests,
  createRequest,
  approveRequest,
} = require("../controllers/request");

router.route("/").get(protect, loadRequests);

router.route("/create").post(protect, createRequest);

router.route("/approval").put(protect, approveRequest);

module.exports = router;
