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

// --Change Password--
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("New password consists at least 6 characters. ");
  }

  if (newPassword !== confirmNewPassword) {
    res.status(400);
    throw new Error("New password and ConfirmPassword must match.");
  }

  const user = await User.findById(req.user.id);

  //   --Check if currentPassword matches--
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    res.status(401);
    throw new Error("Current Password doesnot match");
  }

  // Set new password — pre-save hook will hash it
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully...",
  });
});

module.exports = { getUserProfile, updateUserProfile, changePassword };
