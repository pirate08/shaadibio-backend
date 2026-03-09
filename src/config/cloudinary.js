const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --Create storage in cloudinary--
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "shaadibio/profile-photo",
    allowed_formats: ["jpeg", "jpg", "png", "webp"],
    transformation: { width: 500, height: 500, crop: "fill", gravity: "face" },
  },
});

// --Upload photo in Cloudinary--
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

module.exports = { cloudinary, upload };
