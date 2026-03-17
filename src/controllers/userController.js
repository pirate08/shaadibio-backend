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

// --Update User Profile--
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  // --Check User Exsitence--
  if (!user) {
    res.status(404);
    throw new Error("User not exists");
  }

  //   --Validation--
  if (!name && !email) {
    res.status(400);
    throw new Error("Name and email both are required fields.");
  }

  //   --Check if the new email has been taken--
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      res.status(400);
      throw new Error("Email already in use");
    }

    user.email = email;
  }

  if (name) user.name = name;

  const updated = await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfullyl...",
    data: {
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      isPremium: updated.isPremium,
    },
  });
});

module.exports = { getUserProfile, updateUserProfile };
