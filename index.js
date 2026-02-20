const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const SECRET_KEY = "soudip12345";
const JWT_SECRET = "my_jwt_secret";

const verifyJwt = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  try {
    // console.log(token)
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.users = decodedToken;
    next()
  } catch (error) {
    return res.status(402).json({ message: "Invalid Token" });
  }
};

app.post("/login", (req, res) => {
  const { secret } = req.body;

  if (secret === SECRET_KEY) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token: token });
  } else {
    res.json({ message: "Access Denied" });
  }
});

app.get("/login/admin", verifyJwt, (req, res) => {
  res.json({ message: "Protected route accessable." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
