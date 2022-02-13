const express = require('express');
const upload = require('../middleware/upload');
const protect = require('../middleware/auth');
const router = express.Router();
const {
  updateProfilePhoto,
  deleteProfilePhoto,
} = require('../controllers/upload');

router.route('/profile-photo').post(protect, upload.single('photo'), updateProfilePhoto);

router.route('/profile-photo').delete(protect, deleteProfilePhoto);

module.exports = router;
