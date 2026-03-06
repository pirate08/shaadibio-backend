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

module.exports = { createBiodata, getAllBiodata };
