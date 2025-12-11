import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- Function 1: For Stripe (Sends Credentials) ---
export const sendWelcomeEmail = async (email, password) => {
  try {
    const mailOptions = {
      from: `"Decor Studio Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Decor Studio - Your Login Credentials",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to Decor Studio!</h2>
          <p>Thank you for your purchase. We have created your account for the Learning Management System (LMS).</p>
          
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
            <p><strong>Login URL:</strong> ${process.env.FRONTEND_ORIGIN}/login</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>

          <p>Please login and change your password as soon as possible.</p>
          <p>Best Regards,<br>Decor Studio Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    return false;
  }
};

// --- Function 2: For Auth Controller (Fixes your error) ---
export const sendSignupEmail = async (email) => {
  try {
    const mailOptions = {
      from: `"Decor Studio Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Decor Studio",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome!</h2>
          <p>Thanks for signing up with Decor Studio.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Signup Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("❌ Error sending signup email:", error);
    return false;
  }
};