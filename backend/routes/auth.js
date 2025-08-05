import express from "express";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/send-otp", async (req, res) => {
  const { email, name } = req.body;

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Send email
  const emailSent = await sendEmail(email, name, otp);

  if (emailSent) {
    // Store OTP in memory or DB (MongoDB preferred in production)
    // For now: send back OTP in response (only for testing)
    res.status(200).json({ success: true, message: "OTP sent", otp });
  } else {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp, name } = req.body;

  const record = await Otp.findOne({ email, otp });
  if (!record) return res.status(400).json({ error: "Invalid or expired OTP" });

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email, name });
    await user.save();
  }

  await Otp.deleteMany({ email });

  // generate JWT
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({ message: "OTP verified", token, user });
});



export default router;
