const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  editProfile,
  loadProfile,
  searchProfiles,
  loadProfileById,
} = require("../controllers/profile");

router.route("/edit").put(protect, editProfile);

router.route("/load").get(protect, loadProfile);

router.route("/search").get(searchProfiles);

router.route("/:id").get(protect, loadProfileById);

module.exports = router;
