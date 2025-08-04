const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Sample route (register)
router.post("/register", async (req, res) => {
  const { name, email } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered." });

    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User registered. OTP sent." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
