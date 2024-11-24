const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signin - Authenticate user and generate JWT token
const signin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await foundUser.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: foundUser._id, firstname: foundUser.firstname, lastname: foundUser.lastname },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({ msg: "User logged in successfully", token });
  } catch (error) {
    console.error("Signin error:", error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Signup - Create a new user
const signup = async (req, res) => {
  const { firstname, lastname, email, password, contactMode, contactNo } = req.body;

  if (!firstname || !lastname || !email || !password || !contactMode) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    if (contactMode === "phone" && !contactNo) {
      return res.status(400).json({ msg: "Contact number is required for phone contact mode" });
    }

    const newUser = new User({ firstname, lastname, email, password, contactMode, contactNo });
    await newUser.save();

    return res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Dashboard - Protected route
const dashboard = async (req, res) => {
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${req.user.firstname} ${req.user.lastname}`,
      secret: `Your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all users (Admin feature)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Get user data - Fetch details of the authenticated user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("firstname lastname email");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  signin,
  signup,
  dashboard,
  getAllUsers,
  getUser,
};
