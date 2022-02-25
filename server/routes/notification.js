const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createNotification,
  markNotificationAsRead,
  getAllNotifications,
  getUnreadNotifications,
} = require("../controllers/notification");

router.route("/").post(protect, createNotification);

router.route("/:notificationId").put(protect, markNotificationAsRead);

router.route("/").get(protect, getAllNotifications);

router.route("/unread").get(protect, getUnreadNotifications);

module.exports = router;
