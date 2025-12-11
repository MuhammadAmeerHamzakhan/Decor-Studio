import Stripe from "stripe";
import { supabaseAdmin } from "../config/supabaseClient.js"; 
import { sendWelcomeEmail } from "../utils/emailService.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1. Create Checkout Session (Frontend calls this when user clicks "Buy")
export const createCheckoutSession = async (req, res) => {
  const { priceId, email } = req.body; 

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email, 
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Decor Studio Course",
              description: "Full access to LMS",
            },
            unit_amount: 5000, // $50.00
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_ORIGIN}/login?success=true`,
      cancel_url: `${process.env.FRONTEND_ORIGIN}/?canceled=true`,
      metadata: {
        user_email: email,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

// Helper: Generate Random Password
const generatePassword = () => {
  return Math.random().toString(36).slice(-8) + "Aa1!"; 
};

// 2. Handle Stripe Webhook (Stripe calls this automatically)
export const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify that the request actually came from Stripe
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // Get email
    const userEmail = session.metadata.user_email || session.customer_details.email;

    console.log(`💰 Payment succeeded for: ${userEmail}`);

    // A. Generate Password
    const tempPassword = generatePassword();

    // 👇 IMPORTANT: Log password to terminal for testing 👇
    console.log("🔑 GENERATED PASSWORD FOR LOGIN:", tempPassword);
    // 👆-----------------------------------------------👆

    // B. Create User in Supabase
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: userEmail,
      password: tempPassword,
      email_confirm: true, // Auto-confirm the user
    });

    if (error) {
      console.error("❌ Error creating Supabase user:", error.message);
    } else {
      console.log("✅ User created in Supabase:", data.user.id);
      
      // C. Send Credentials via Email
      await sendWelcomeEmail(userEmail, tempPassword);
    }
  }

  res.send();
};