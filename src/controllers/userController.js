const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Biodata = require("../models/BioData");
const { cloudinary } = require("../config/cloudinary");

// --Get User Profile--
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User account not found");
  }

  res.status(200).json({
    success: true,
    message: "User profile fetched",
    data: user,
  });
});
