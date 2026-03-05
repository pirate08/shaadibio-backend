const asyncHandler = require("express-async-handler");
const User = require("../models/User"); // 1. Capital 'U' for the Model
const generateToken = require("../utils/generateToken");

// --Register User Function--
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // --Validation--
  if (!name || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  // --Check if user already exists--
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // --Create new user--
  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isPremium: newUser.isPremium,
        token: generateToken(newUser._id),
      },
    });
  } else {
    // 3. Fallback error handling
    res.status(400);
    throw new Error("Invalid user data received");
  }
});

module.exports = { registerUser };
