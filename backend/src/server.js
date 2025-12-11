import dotenv from "dotenv";
dotenv.config(); // Load env FIRST

import express from "express";
import cors from "cors";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes, { webhookController } from "./routes/paymentRoutes.js";

const app = express();

// Middleware
app.use(cors({ origin: "*" }));

// --- STRIPE WEBHOOK ROUTE (MUST BE BEFORE express.json) ---
// We need the raw body for the webhook signature verification
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  webhookController
);

// --- REGULAR MIDDLEWARE ---
app.use(express.json()); // Now parse JSON for all other routes

// --- ROUTES ---
app.use("/auth/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running successfully!" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});