const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { generateBio } = require("../controllers/aiController");

const router = express.Router();

// --Generate Bio Route--
router.post("/generative-bio", protect, generateBio);

module.exports = router;
