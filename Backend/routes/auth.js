const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.json({ message: "User created", user: { _id: user._id, name, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { _id: user._id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
