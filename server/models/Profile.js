const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  accountType: {
    type: String,
    default: "pet_owner",
    enum: ['pet_owner', 'pet_sitter'],
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  address: {
    type: String,
    default: "",
  },
  telephone: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    default: null
  },
  photo: {
    type: String,
    default: "",
  },
  headline: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: null,
  },
  pay: {
    type: Number,
    default: null,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
