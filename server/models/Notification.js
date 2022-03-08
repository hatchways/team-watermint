const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["booking", "payment", "system"],
    lowercase: true,
    required: true,
  },
  link: {
    type: String,
    lowercase: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["read", "unread"],
    default: "unread",
    lowercase: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
