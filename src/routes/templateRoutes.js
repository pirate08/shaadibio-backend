const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getAllTemplates,
  getSingleTemplate,
} = require("../controllers/templateController");

const router = express.Router();

// --Get all templates route--
router.get("/", protect, getAllTemplates);

// --Get single template route--
router.get("/:id", protect, getSingleTemplate);

module.exports = router;
