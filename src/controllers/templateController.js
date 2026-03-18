const asyncHandler = require("express-async-handler");
const Biodata = require("../models/BioData");
const Template = require("../models/Template");

// --Get all templates--
const getAllTemplates = asyncHandler(async (req, res) => {
  const template = await Template.find({ isActive: true });
  if (!template) {
    res.status(404);
    throw new Error("No template found");
  }
  res.status(200).json({
    success: true,
    message: "All templates fetched.",
    count: template.length,
    data: template,
  });
});

module.exports = { getAllTemplates };
