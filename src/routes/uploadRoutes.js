const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { uploadPhoto, deletePhoto } = require("../controllers/uploadController");
const { upload } = require("../config/cloudinary");

const router = express.Router();

// --Upload photo--
router.post("/photo/:biodataId", protect, upload.single("photo"), uploadPhoto);

// --Delete photo--
router.delete("/photo/:biodataId", protect, deletePhoto);

module.exports = router;
