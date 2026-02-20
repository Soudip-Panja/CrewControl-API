const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
const verifyJwt = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.users = decodedToken;
    next();
  } catch (error) {
    return res.status(402).json({ message: "Invalid Token" });
  }
};

// Logic Route
router.post("/login", (req, res) => {
  const { secret } = req.body;

  if (secret === SECRET_KEY) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token: token });
  } else {
    res.json({ message: "Access Denied" });
  }
});

// Protected Route
router.get("/login/admin", verifyJwt, (req, res) => {
  res.json({ message: "Protected route accessable." });
});

module.exports = router;
