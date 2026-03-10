const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { generatePDF } = require("../controllers/pdfController");

const router = express.Router();

// --Api for downloading pdf--
router.get(":/id", protect, generatePDF);

module.exports = router;
