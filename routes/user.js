const express = require("express");
const router = express.Router();

const {
  signin,
  signup,
  dashboard,
  getAllUsers,
  getUser,
} = require("../controllers/user");
const authenticationMiddleware = require("../middleware/auth");

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/dashboard", authenticationMiddleware, dashboard);
router.get("/user", authenticationMiddleware, getUser);

router.get("/users", authenticationMiddleware, getAllUsers);

module.exports = router;
