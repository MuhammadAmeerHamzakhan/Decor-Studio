// src/config/stripeClient.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-11-15' // Stripe API version (optional; adjust if needed)
});
export default stripe;
