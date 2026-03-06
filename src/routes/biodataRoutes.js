const express = require("express");
const router = express.Router();
const {
  createBiodata,
  getAllBiodata,
} = require("../controllers/biodataController");
const { protect } = require("../middleware/authMiddleware");

// --Add protection for all routes--
router.use(protect);

// --Create new biodata route--
router.post("/create", createBiodata);

// --Get all biodata list--
router.get("/", getAllBiodata);

module.exports = router;
