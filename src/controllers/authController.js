const asyncHandler = require("express-async-handler");
const User = require("../models/User"); //
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
    res.status(400);
    throw new Error("Invalid user data received");
  }
});

// --Login User Function--
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // --Validation--
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  //   --Find User--
  const findUser = await User.findOne({ email });
  if (!findUser) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  //   --Check password--
  const isMatch = await findUser.comparePassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    success: true,
    message: "Login successfully",
    data: {
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      isPremium: findUser.isPremium,
      token: generateToken(findUser._id),
    },
  });
});

// ── Get Me ──
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = { registerUser, loginUser, getMe };
