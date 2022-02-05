const express = require('express');
const upload = require('../middleware/upload');
const protect = require('../middleware/auth');
const router = express.Router();
const {
  updateProfilePhoto,
} = require('../controllers/upload');

router.route('/profile').post(protect, upload.single('photo'), updateProfilePhoto);

module.exports = router;