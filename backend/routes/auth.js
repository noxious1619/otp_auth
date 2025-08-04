import express from "express";
import sendEmail from "../utils/sendEmail.js";

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

export default router;
