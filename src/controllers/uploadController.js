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

module.exports = { uploadPhoto };
