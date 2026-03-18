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

  const biodata = await Biodata.findById(req.params.biodataId);

  if (!biodata) {
    res.status(404);
    throw new Error("Biodata not found.");
  }

  if (biodata.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized.");
  }

  biodata.template.name === name;
  biodata.template.font === font || biodata.template.font;
  biodata.template.color === color || biodata.template.color;

  await biodata.save();

  res.status(200).json({
    success: true,
    message: "Template applied successfully",
    data: biodata.template,
  });
});

module.exports = { getAllTemplates, getSingleTemplate, applyTemplate };
