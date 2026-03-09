const asyncHandler = require("express-async-handler");
const Biodata = require("../models/BioData");
const User = require("../models/User");

// --Handling all the --Stats--

const getStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // --Total Biodata--
  const totalBiodata = await Biodata.countDocuments({ user: userId });

  //   --Total Downloads--
  const user = await User.findById(userId).select("downloadCount");

  // --Last edited — most recently updated biodata--
  const lastEdited = await Biodata.findOne(userId)
    .sort({ updatedAt: -1 })
    .select("updatedAt personal.fullName");

  res.status(200).json({
    success: true,
    message: "Stats fetched successfully",
    totalBiodata: totalBiodata,
    totalDownloads: user.downloadCount,
    lastEdited: lastEdited
      ? {
          time: lastEdited.updatedAt,
          biodataName: lastEdited.personal?.fullName || "Untitled",
        }
      : null,
  });
});

module.exports = { getStats };
