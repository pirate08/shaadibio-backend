const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { uploadPhoto } = require("../controllers/uploadController");
const { upload } = require("../config/cloudinary");

const router = express.Router();

// --Upload photo — with or without biodataId--
router.post("/photo/:biodataId", protect, upload.single("photo"), uploadPhoto);

module.exports = router;
