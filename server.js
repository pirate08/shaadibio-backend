require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./src/config/db");

const app = express();

// ── Connect Database ──
connectDB();

// ── Middleware ──
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes (will be added one by one) ──
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/biodata", require("./src/routes/biodataRoutes"));
app.use("/api/stats", require("./src/routes/statsRoutes"));
app.use("/api/upload", require("./src/routes/uploadRoutes"));
app.use("/api/ai", require("./src/routes/aiRoutes"));
app.use("/api/pdf", require("./src/routes/pdfRoutes"));
app.use("/api/user", require("./src/routes/userRoutes"));
// app.use('/api/templates', require('./routes/templateRoutes'))
// app.use('/api/admin', require('./routes/adminRoutes'))

// ── Health Check ──
app.get("/", (req, res) => {
  res.json({ message: "ShaadiBio API is running" });
});

// ── 404 Handler ──
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ── Error Handler ──
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
});

// ── Start Server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
