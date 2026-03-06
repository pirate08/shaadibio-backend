const mongoose = require("mongoose");

const bioDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //   --Personal Details--
    personal: {
      fullName: { type: String, required: true, trim: true },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      dob: { type: String, required: true },
      height: { type: String },
      caste: { type: String, required: true },
      motherTongue: { type: String, required: true },
      martialStatus: {
        type: String,
        enum: ["Never Married", "Divorced", "Widowed"],
        default: "Never Married",
        required: true,
      },
      nationality: { type: String, required: true, default: "Indian" },
      aboutMe: { type: String },
    },

    //   --Contact Details--
    contact: {
      phone: { type: Number },
      email: { type: String, trim: true },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      hideContact: { type: Boolean, default: false },
    },

    //   --Family Details--
    family: {
      fatherName: { type: String },
      fatherOccupation: { type: String },
      motherName: { type: String },
      motherOccupation: { type: String },
      brothers: { type: Number, default: 0 },
      sisters: { type: Number, default: 0 },
      familyType: { type: String, enum: ["Joint", "Nuclear"] },
      familyStatus: {
        type: String,
        enum: ["Middle Class", "Upper Middle", "Affluent"],
      },
      nativePlace: { type: String },
      familyValues: {
        type: String,
        enum: ["Traditional", "Moderate", "Liberal"],
      },
    },

    //   --Education & Career--
    education: {
      qualification: { type: String },
      college: { type: String },
      profession: { type: String },
      company: { type: String },
      annualIncome: { type: String },
      hideIncome: { type: Boolean, default: false },
      workingCity: { type: String },
      workingCountry: { type: string },
    },

    //   --Horoscope--
    horoscope: {
      enabled: { type: Boolean, default: false },
      rashi: { type: String },
      nakshatra: { type: String },
      gotra: { type: String },
      manglik: { type: String, enum: ["Yes", "No", "Partial"] },
      timeOfBirth: { type: String },
      placeOfBirth: { type: String },
      aiSummary: { type: String },
    },

    //   --Photo--
    photo: {
      photoUrl: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    //   --Templates--
    template: {
      name: {
        type: String,
        enum: ["traditional", "modern", "minimal"],
        default: "traditional",
      },
      font: { type: String, default: "playfair" },
      color: { type: String, default: "#8B1A4A" },
    },

    // ── Privacy ──
    privacy: {
      hideContact: { type: Boolean, default: false },
      hideIncome: { type: Boolean, default: false },
    },

    // ── Version History ──
    versions: [
      {
        savedAt: { type: Date, default: Date.now },
        snapshot: { type: mongoose.Schema.Types.Mixed }, // full biodata copy
      },
    ],

    // ── Meta ──
    downloadCount: { type: Number, default: 0 },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BioData", bioDataSchema);
