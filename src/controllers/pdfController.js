const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Biodata = require("../models/BioData");
const { buildBiodataHTML } = require("../utils/pdfTemplate");
const puppeteer = require("puppeteer");
