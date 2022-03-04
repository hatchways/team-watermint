const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const aws = require("aws-sdk");

// @route POST /uploads/profile
// @desc Update user's profile photo
// @access Public
exports.updateProfilePhoto = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  if (!req.file) {
    res.status(400).json({ error: { message: "Couldn't upload photo" } });
  } else {
    const profile = await Profile.findOneAndUpdate(
      { userId: userId },
      { photo: req.file.location },
      { new: true }
    );
    if (!profile) {
      res.status(404).json({ error: { message: "Couldn't find profile" } });
    } else {
      res.status(200).json({
        success: {
          profile,
        },
      });
    }
  }
});

// @route DELETE /uploads/profile
// @desc Delete user's profile photo
// @access Public
exports.deleteProfilePhoto = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const profile = await Profile.findOne({ userId: userId });

  if (!profile) {
    res.status(404).json({ error: { message: "Couldn't find profile" } });
  } else {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const key = profile.photo.split(`amazonaws.com/`).pop();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    };

    s3.deleteObject(params, (error) => {
      if (error) {
        throw res
          .status(500)
          .json({
            error: {
              message: "An unexpected error occurred. Please try again",
            },
          });
      }
    });

    if (!res.headersSent) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: userId },
        { photo: "" },
        { new: true }
      );

      res.status(200).json({
        success: {
          profile: updatedProfile,
          message: "Successfully deleted profile photo",
        },
      });
    }
  }
});
