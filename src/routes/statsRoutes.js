const express = require("express");
const { getStats } = require("../controllers/statsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// --Stats route--
router.get("/", protect, getStats);

module.exports = router;
