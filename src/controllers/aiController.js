const asyncHandler = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildBioPrompt, horoscopePrompt } = require("../utils/promptBuilder");

// --Key and Model--
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// --Generate About Bio--
const generateBio = asyncHandler(async (req, res) => {
  const { name, profession, education, religion, city } = req.body;

  if (!name || !profession || !education) {
    res.status(400);
    throw new Error("Name, profession and education are required fields.");
  }

  const prompt = buildBioPrompt({
    name,
    profession,
    education,
    religion,
    city,
  });

  const result = await model.generateContent(prompt);
  const bio = result.response.text().trim();

  if (!bio) {
    res.status(500);
    throw new Error("AI failed to generate a bio. Please try again.");
  }

  res.status(200).json({
    success: true,
    data: { bio },
  });
});

// --Generate Horoscope Summary--
const generateHoroscope = asyncHandler(async (req, res) => {
  const { rashi, nakshatra, gotra, mangalik } = req.body;

  if (!rashi || !nakshatra) {
    res.status(400);
    throw new Error("Rashi and Nakshatra are required fields.");
  }

  const prompt = horoscopePrompt({ rashi, nakshatra, gotra, mangalik });

  const result = await model.generateContent(prompt);
  const summary = result.response.text().trim();

  if (!summary) {
    res.status(500);
    throw new Error(
      "AI failed to generate a horoscope summary. Please try again.",
    );
  }

  res.status(200).json({
    success: true,
    message: "Horoscope summarized successfully",
    data: { summary },
  });
});

module.exports = { generateBio, generateHoroscope };
