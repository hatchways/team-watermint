const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

// @route POST /notifications
// @desc Create a notification
// @access Private
exports.createNotification = asyncHandler(async (req, res, next) => {
  const { userId, title, description, type, link } = req.body;

  const notification = await Notification.create({
    user: userId,
    title,
    description,
    type,
    link,
  });

  if (notification) {
    res.status(201).json({
      success: {
        notification,
      },
    });
  }
});

// @route Put /notifications/:notificationId
// @desc Mark an unread notification as read
// @access Private
exports.markNotificationAsRead = asyncHandler(async (req, res, next) => {
  const { notificationId } = req.params;

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  if (notification.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Permission denied");
  }

  notification.status = "read";
  const saved = await notification.save();

  if (saved) {
    res.status(200).json({
      success: {
        notification,
      },
    });
  }
});

// @route Get /notifications
// @desc Get all user's read/unread notifications
// @access Private
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({
    user: req.user.id,
  })
    .populate({
      path: "user",
      model: "user",
      select: "name email",
    })
    .sort({ date: "desc" });

  if (!notifications) {
    res.status(404).json({
      error: {
        notifications,
      },
    });
  }

  res.status(200).json({
    success: {
      notifications,
    },
  });
});

// @route GET /notifications/unread
// @desc Get all user's unread notifications
// @access Private
exports.getUnreadNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({
    user: req.user.id,
    status: "unread",
  })
    .populate({
      path: "user",
      model: "user",
      select: "name email",
    })
    .sort({ date: "desc" });

  if (!notifications) {
    res.status(404).json({
      error: {
        notifications,
      },
    });
  }

  res.status(200).json({
    success: {
      notifications,
    },
  });
});
