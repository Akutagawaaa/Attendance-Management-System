import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createTransport } from "nodemailer";
import attendanceRoutes from "./routes/attendance.js"; // ✅ Ensure correct import

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); // Allows frontend to communicate with backend

// ✅ Default route to verify if the backend is running
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// ✅ Attach API routes
app.use("/api", attendanceRoutes);

// ✅ Nodemailer configuration
const transporter = createTransport({
  host: process.env.VITE_BREVO_SMTP_HOST,
  port: process.env.VITE_BREVO_SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for 587
  auth: {
    user: process.env.VITE_BREVO_SMTP_USER,
    pass: process.env.VITE_BREVO_SMTP_PASS,
  },
});

// ✅ API route to send email
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.VITE_BREVO_SENDER_EMAIL, // Must match Brevo verified sender
    to: to,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at: http://localhost:${PORT}`));
