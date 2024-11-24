const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
    // process.exit(1); 
  }
};

module.exports = connectDB;
