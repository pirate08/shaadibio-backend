const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getAllTemplates } = require("../controllers/templateController");

const router = express.Router();

// --Get all templates route--
router.get("/", protect, getAllTemplates);

module.exports = router;
