const jwt = require("jsonwebtoken");

// Middleware for authenticating JWT tokens
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized. Token missing or malformed." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ msg: "Unauthorized. Invalid or expired token." });
  }
};

module.exports = authenticationMiddleware;
