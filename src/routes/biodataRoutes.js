const express = require("express");
const router = express.Router();
const {
  createBiodata,
  getAllBiodata,
  getSingleBiodata,
} = require("../controllers/biodataController");
const { protect } = require("../middleware/authMiddleware");

// --Add protection for all routes--
router.use(protect);

// --Create new biodata route--
router.post("/create", createBiodata);

// --Get all biodata list--
router.get("/", getAllBiodata);

// --Get single biodata by ID route--
router.get("/:id", getSingleBiodata);

module.exports = router;
