const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
} = require("../controllers/userController");

const router = express.Router();

// --Get User Route--
router.get("/get-profile", protect, getUserProfile);

// --Update User Route--
router.patch("/update-profile", protect, updateUserProfile);

// --Change password Route--
router.patch("/change-password", protect, changePassword);

module.exports = router;
