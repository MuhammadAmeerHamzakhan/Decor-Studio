import express from "express";
import { createCheckoutSession, handleWebhook } from "../controllers/paymentController.js";

const router = express.Router();

// Endpoint for Frontend to start payment
router.post("/create-checkout-session", createCheckoutSession);

// Endpoint for Stripe to notify us (Logic only, route mounting is tricky)
// We will actually mount the webhook directly in server.js to handle the RAW body issue
export const webhookController = handleWebhook; 

export default router;