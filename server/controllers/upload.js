const Profile = require('../models/Profile')
const asyncHandler = require("express-async-handler");

// @route POST /upload/profile
// @desc Update user's profile photo
// @access Public
exports.updateProfilePhoto = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  if (!req.file) {
    res.status(400).json({ error: "Couldn't upload photo" });
  } else {
    const profile = await Profile.findOneAndUpdate({ userId: userId }, { photo: req.file.location }, { new: true });
    if (!profile) {
      res.status(404).json({ error: "Couldn't find profile" });
    } else {
      res.status(200).json({ success: "Successfully uploaded profile photo" });
    }
  }
});
