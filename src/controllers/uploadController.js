const asyncHandler = require("express-async-handler");
const Biodata = require("../models/BioData");
const { cloudinary } = require("../config/cloudinary");

// --Upload new profile photo--
const uploadPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image file provided");
  }

  const { biodataId } = req.params;

  if (biodataId) {
    const biodata = await Biodata.findById(biodataId);

    if (!biodata) {
      res.status(404);
      throw new Error("Biodata not found");
    }

    if (biodata.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }

    // --Delete old photo from Cloudinary--
    if (biodata.photo?.publicId) {
      await cloudinary.uploader.destroy(biodata.photo.publicId);
    }

    // --Update biodata with new photo--
    biodata.photo.photoUrl = req.file.path;
    biodata.photo.publicId = req.file.filename;

    await biodata.save();
  }

  res.status(200).json({
    success: true,
    message: "Photo uploaded successfully",
    data: {
      photoUrl: req.file.path,
      publicId: req.file.filename,
    },
  });
});

// --Delete existing photo--
const deletePhoto = asyncHandler(async (req, res) => {
  const biodata = await Biodata.findById(req.params.biodataId);

  // 1. Check if biodata exists
  if (!biodata) {
    res.status(404); // Use 404 for Not Found
    throw new Error("Biodata not found");
  }

  // 2. Check Ownership
  if (biodata.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  // 3. Check if there is actually a photo to delete (FIXED LOGIC)
  if (!biodata.photo?.publicId) {
    res.status(400);
    throw new Error("No photo found to delete");
  }

  // 4. Delete from Cloudinary
  await cloudinary.uploader.destroy(biodata.photo.publicId);

  // 5. Clear from biodata
  biodata.photo.photoUrl = "";
  biodata.photo.publicId = "";

  await biodata.save();

  res.status(200).json({
    success: true,
    message: "Photo deleted successfully",
  });
});

module.exports = { uploadPhoto, deletePhoto };
