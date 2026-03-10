const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  generateBio,
  generateHoroscope,
} = require("../controllers/aiController");

const router = express.Router();

// --Generate Bio Route--
router.post("/generative-bio", protect, generateBio);

// --Generate Horoscope summary--
router.post("/generative-horoscope", protect, generateHoroscope);

module.exports = router;
