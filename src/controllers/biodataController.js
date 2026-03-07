const asyncHandler = require("express-async-handler");
const Biodata = require("../models/BioData");

// --Create new BioData--
const createBiodata = asyncHandler(async (req, res) => {
  const {
    personal,
    contact,
    family,
    education,
    horoscope,
    photo,
    template,
    privacy,
  } = req.body;

  const bioData = await Biodata.create({
    user: req.user._id,
    personal,
    contact,
    family,
    education,
    horoscope,
    photo,
    template,
    privacy,
  });

  res.status(201).json({
    success: true,
    message: "Biodata created successfully.",
    data: bioData,
  });
});

// --Get all Biodata List--
const getAllBiodata = asyncHandler(async (req, res) => {
  const biodatas = await Biodata.find({ user: req.user._id })
    .select(
      "personal.fullName template.name isComplete downloadCount updatedAt createdAt",
    )
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    message: "Fetched all biodata",
    count: biodatas.length,
    data: biodatas,
  });
});

// --Get single biodata by ID--
const getSingleBiodata = asyncHandler(async (req, res) => {
  const biodata = await Biodata.findById(req.params.id);

  if (!biodata) {
    res.status(404);
    throw new Error("Biodata not found");
  }

  // --Check biodata ownership--
  if (biodata.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized access to this biodata");
  }

  res.status(200).json({
    success: true,
    message: "Fetched biodata details",
    data: biodata,
  });
});

// --Edit Biodata--
const editBiodata = asyncHandler(async (req, res) => {
  const biodata = await Biodata.findById(req.params.id);

  if (!biodata) {
    res.status(404);
    throw new Error("Biodata not found");
  }

  // --Check biodata ownership--
  if (biodata.user.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("Unauthorized access to this biodata");
  }

  // Save current state as a version before updating
  const snapshot = {
    savedAt: new Date(),
    snapshot: {
      personal: biodata.personal,
      family: biodata.family,
      education: biodata.education,
      horoscope: biodata.horoscope,
      template: biodata.template,
    },
  };

  // Keep only last 3 versions
  if (biodata.versions.length >= 3) {
    biodata.versions.shift();
  }
  biodata.versions.push(snapshot);

  // Update fields
  const fields = [
    "personal",
    "contact",
    "family",
    "education",
    "horoscope",
    "photo",
    "template",
    "privacy",
    "isComplete",
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      biodata[field] = { ...biodata[field].toObject(), ...req.body[field] };
    }
  });

  const updated = await biodata.save();

  res.status(200).json({
    success: true,
    message: "Biodata updated successfully",
    data: updated,
  });
});

module.exports = {
  createBiodata,
  getAllBiodata,
  getSingleBiodata,
  editBiodata,
};
