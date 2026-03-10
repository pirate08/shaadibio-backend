const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Biodata = require("../models/BioData");
const { buildBiodataHTML } = require("../utils/pdfTemplate");
const puppeteer = require("puppeteer");

// --Generate & Download Pdf--
const generatePDF = asyncHandler(async (req, res) => {
  const biodata = await Biodata.findById(req.params.id);

  if (!biodata) {
    res.status(404);
    throw new Error("Biodata not found");
  }
});

module.exports = { generatePDF };
