const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("MongoDB connection failed");

    // process.exit(1);
  }
};

module.exports = connectDB;
