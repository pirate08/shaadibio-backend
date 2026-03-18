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

// --Get single template--
const getSingleTemplate = asyncHandler(async (req, res) => {
  const singleTemplate = await Template.findById(req.params.id);

  if (!singleTemplate) {
    res.status(404);
    throw new Error("Template not found");
  }

  res.status(200).json({
    success: true,
    message: "Single Template fetched.",
    data: singleTemplate,
  });
});

// --Apply Template to Biodata--
const applyTemplate = asyncHandler(async (req, res) => {
  const { name, font, color } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Template name is required.");
  }
});

module.exports = { getAllTemplates, getSingleTemplate };
