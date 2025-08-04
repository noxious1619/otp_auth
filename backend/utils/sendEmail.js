// utils/sendEmail.js
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (toEmail, toName, otp) => {
  try {
    const emailAPI = new TransactionalEmailsApi();
    emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

    const message = new SendSmtpEmail();
    message.subject = "Your OTP Code";
    message.textContent = `Hello ${toName}, your OTP is ${otp} It will expire in 5 minutes.`;
    message.sender = { name: "OTP_Auth", email: "mainkyuduapniid@gmail.com" };
    message.to = [{ email: toEmail, name: toName }];

    const response = await emailAPI.sendTransacEmail(message);
    console.log("Email sent:", response.body);
    return true;
  } catch (err) {
    console.error("Email sending failed:", err.body);
    throw new Error("Failed to send OTP email");
  }
};

export default sendEmail;
