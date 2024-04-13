const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

async function verifyAccessToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY_SECRET);
    const user = await User.findOne({ regNo: decoded.regNo });
    if (!user.isVerified) {
      return res.status(403).json({ error: "User is not verified. Please verify your account." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = verifyAccessToken;