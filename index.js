
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const userRoutes = require("./routes/user");
require("express-async-errors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    res.status(200).send("Server is running and MongoDB is connected.");
  } catch (error) {
    res.status(500).send("Server is running, but failed to connect to MongoDB.");
  }
});

app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully.");

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1); 
  }
};

startServer();
