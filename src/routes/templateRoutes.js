const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getAllTemplates,
  getSingleTemplate,
  applyTemplate,
} = require("../controllers/templateController");

const router = express.Router();

// --Get all templates route--
router.get("/", protect, getAllTemplates);

// --Get single template route--
router.get("/:id", protect, getSingleTemplate);

// --Apply biodata template route--
router.patch("/apply/:biodataId", protect, applyTemplate);

module.exports = router;
