const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

// --Get User Route--
router.get("/get-profile", protect, getUserProfile);

// --Update User Route--
router.patch("/update-profile", protect, updateUserProfile);

module.exports = router;
