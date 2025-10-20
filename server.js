import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


const deleteRequests = new Map(); // Store pending deletion requests

// 🔥 Nodemailer Setup (Replace with real credentials)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✅ Step 1: User Requests Deletion
app.post("/api/request-delete", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Missing fields" });
    }

    // Generate unique verification token
    const token = crypto.randomBytes(32).toString("hex");
    deleteRequests.set(token, { name, email });

    const verificationLink = `https://strato-craft.com/confirm-delete/${token}`;

    const mailOptions = {
        from: "no-reply@strato-craft.com",
        to: email,
        subject: "Confirm Your Account Deletion - Oh-i",
        text: `Hello ${name},\n\nTo confirm your account deletion, please click the link below:\n\n${verificationLink}\n\nIf you did not request this, ignore this email.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Step 2: User Clicks Verification Link
app.get("/api/confirm-delete/:token", async (req, res) => {
    const { token } = req.params;

    if (!deleteRequests.has(token)) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    const { name, email } = deleteRequests.get(token);
    deleteRequests.delete(token);

    // Forward request to Admin
    const adminMailOptions = {
        from: "no-reply@strato-craft.com",
        to: "support@strato-craft.com",
        subject: "🚨 Confirmed Oh-i Account Deletion Request",
        text: `The following user has confirmed their account deletion request:\n\nName: ${name}\nEmail: ${email}\n\nPlease verify and process manually in Firebase.`,
    };

    try {
        await transporter.sendMail(adminMailOptions);
        res.send("✅ Your deletion request has been confirmed! An admin will process your request soon.");
    } catch (error) {
        console.error("Email to admin failed:", error);
        res.status(500).json({ message: "Failed to notify admin" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
