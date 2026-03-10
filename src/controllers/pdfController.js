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

  //   --Check the User authorized or not--
  if (biodata.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  const user = await User.findById(req.user._id).select("isPremium");
  const html = buildBiodataHTML(biodata, user.isPremium, biodata.template);
});

module.exports = { generatePDF };
