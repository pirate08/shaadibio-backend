require("dotenv").config();
const mongoose = require("mongoose");
const Template = require("../models/Template");
const connectDb = require("./db");

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
  {
    name: "modern",
    label: "Modern",
    description: "Clean two-column layout with sidebar for a professional look",
    category: "Modern",
    defaultFont: "helvetica",
    defaultColor: "#1A3A8B",
    colorOptions: ["#1A3A8B", "#8B1A4A", "#0D6E6E", "#4A1A8B", "#1A5C1A"],
    isActive: true,
  },
  {
    name: "minimal",
    label: "Minimal",
    description: "Simple and elegant design with clean typography",
    category: "Minimal",
    defaultFont: "helvetica",
    defaultColor: "#2D2D2D",
    colorOptions: ["#2D2D2D", "#8B1A4A", "#1A3A8B", "#1A6B3A", "#6B4A1A"],
    isActive: true,
  },
];

const seedTemplates = async () => {
  try {
    await connectDb();
    // --Delete existing templates--
    await Template.deleteMany();
    console.log("Deleting Existing Template stored in database.");

    // --Insert new templates--
    await Template.insertMany(templates);
    console.log("Templates seeded successfully");

    process.exit();
  } catch (error) {
    console.log(`Seeder Error ${error.message}`);
    process.exit(1);
  }
};

seedTemplates();
