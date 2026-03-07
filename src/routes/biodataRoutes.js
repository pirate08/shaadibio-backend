const express = require("express");
const router = express.Router();
const {
  createBiodata,
  getAllBiodata,
  getSingleBiodata,
  editBiodata,
  deleteBiodata,
  updatePrivacy,
  getVersionHistory,
  incrementDownload,
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

// --Edit biodata details--
router.patch("/:id", editBiodata);

// --Delete biodata--
router.delete("/:id", deleteBiodata);

// --Update Privacy setting--
router.patch("/:id/privacy", updatePrivacy);

// --Get Version history route--
router.get("/:id/versions", getVersionHistory);

// --Increment Download Route--
router.patch("/:id/download", incrementDownload);

module.exports = router;
