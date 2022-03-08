const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route PUT /profile/edit
// @desc edit user profile
// @access Public
exports.editProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  profile.set(req.body);
  const updatedProfile = await profile.save();
  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
});

// @route GET /profile/load
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id, "profile");

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile: profile,
    },
  });
});

// @route GET /profile
// @desc Get list of pet sitter profiles by location or get all
// @access Public
exports.searchProfiles = asyncHandler(async (req, res, next) => {
  if (req.query.location) {
    const profiles = await Profile.find({
      accountType: "pet_sitter",
      address: { $regex: req.query.location, $options: "i" },
      pay: { $ne: null },
    });

    res.status(200).json({
      profiles: profiles,
    });
  } else if (req.query.location === "") {
    const profiles = await Profile.find({
      accountType: "pet_sitter",
      address: { $ne: null | "" },
      pay: { $ne: null },
    });

    res.status(200).json({
      profiles: profiles,
    });
  } else {
    res.status(400).json({
      error: {
        message: "Bad Request",
      },
    });
  }
});

// @route GET /profile/:id
// @desc Get user profile data
// @access Private
exports.loadProfileById = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ _id: req.params.id });

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile,
    },
  });
});
