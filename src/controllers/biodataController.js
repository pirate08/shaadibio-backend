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

module.exports = { createBiodata };
