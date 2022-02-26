const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
    validate: {
      validator: function (end) {
        return this.start < end;
      },
      message: "End date must be after start date",
    },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "completed"],
    default: "pending",
    lowercase: true,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = Request = mongoose.model("Request", requestSchema);
