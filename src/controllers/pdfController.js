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

  //   --Launch puppeteer--
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  l;
  await page.setContent(html, { waitUntil: "networkidle0" });

  //   --Generate and save the PDF locally--
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
  });

  // --Close the browser--
  await browser.close();

  // Increment download count
  biodata.downloadCount += 1;
  await biodata.save();
  await User.findByIdAndUpdate(req.user._id, { $inc: { downloadCount: 1 } });

  // Send PDF as response
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="shaadibio-${biodata.personal?.fullName || "biodata"}.pdf"`,
    "Content-Length": pdfBuffer.length,
  });

  res.send(pdfBuffer);
});

module.exports = { generatePDF };
