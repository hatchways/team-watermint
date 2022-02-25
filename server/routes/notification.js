const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createNotification,
  markNotificationAsRead,
  getAllNotifications,
  getUnreadNotifications,
} = require("../controllers/notification");
const {
  validateCreateNotification,
  validateMarkNotificationAsRead,
} = require("../middleware/notification.validate");

router.route("/").post(protect, validateCreateNotification, createNotification);

router
  .route("/:notificationId")
  .put(protect, validateMarkNotificationAsRead, markNotificationAsRead);

router.route("/").get(protect, getAllNotifications);

router.route("/unread").get(protect, getUnreadNotifications);

module.exports = router;
