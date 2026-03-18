require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Template = require("../models/Template");

const templates = [
  {
    name: "traditional",
    label: "Traditional",
    description:
      "Classic Indian biodata with elegant borders and formal layout",
    category: "Traditional",
    defaultFont: "georgia",
    defaultColor: "#8B1A4A",
    colorOptions: ["#8B1A4A", "#6B0F0F", "#1A3A8B", "#1A7A2E", "#8B6A1A"],
    isActive: true,
  },
];
