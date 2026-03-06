const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      enum: ["traditional", "modern", "minimal"],
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["Traditional", "Modern", "Minimal"],
    },
    defaultFont: {
      type: String,
      default: "playfair",
    },
    defaultColor: {
      type: String,
      default: "#8B1A4A",
    },
    colorOptions: {
      type: [String], // preset color palette
      default: ["#8B1A4A", "#1A3A8B", "#1A7A2E", "#8B6A1A", "#4A1A8B"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Template", templateSchema);
