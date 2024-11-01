const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/adminRoutes");
const appInfoRoutes = require("./routes/appInfoRoutes");
const courseRoutes = require("./routes/courseRoutes");
const courseOfferRoutes = require("./routes/courseOfferRoutes");
const studentRoutes = require("./routes/studentRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const branchRoutes = require("./routes/branchRoutes");
const studentPaymentRoutes = require("./routes/studentPaymentRoutes");
const ErrorLog = require("./models/ErrorLog");
const errorLogRoutes = require("./routes/errorLog");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    apiStatus: "API is running successfully",
    author: "Chakrapani Upadhyaya",
    website: "https://lastbenchcoder.blogspot.com/",
  });
});

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/appInfo", appInfoRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/courseOffers", courseOfferRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/contactUs", contactUsRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/studentPayments", studentPaymentRoutes);
app.use("/api/errorlogs", errorLogRoutes);

// Database Details Route
app.get("/api/database-details", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.collections(); // Fetch all collections
    const dbDetails = {};

    // Iterate over each collection and fetch all documents
    for (const collection of collections) {
      const collectionName = collection.collectionName;
      const documents = await collection.find({}).toArray(); // Convert documents to array format
      dbDetails[collectionName] = documents; // Store in dbDetails with collection name as key
    }

    res.json(dbDetails); // Send complete database details as JSON
  } catch (error) {
    console.error("Error retrieving database details:", error);
    res.status(500).json({
      message: "Error retrieving database details",
      error: error.message,
    });
  }
});

// Collection Counts Route
app.get("/api/collection-counts", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.collections();
    const dbDetails = {};
    const totalCollections = collections.length;

    for (const collection of collections) {
      const collectionName = collection.collectionName;
      const documentCount = await collection.countDocuments();
      dbDetails[collectionName] = documentCount;
    }

    res.json({
      totalCollections: totalCollections,
      collections: dbDetails,
    });
  } catch (error) {
    console.error("Error retrieving collection counts:", error);
    res.status(500).json({
      message: "Error retrieving collection counts",
      error: error.message,
    });
  }
});

// Error logging middleware
app.use((err, req, res, next) => {
  const errorLog = new ErrorLog({ message: err.message, stack: err.stack });
  errorLog
    .save()
    .then(() => console.log("Error logged"))
    .catch((logErr) => console.error("Failed to log error:", logErr));
  res.status(500).json({ message: "An error occurred, it has been logged." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
