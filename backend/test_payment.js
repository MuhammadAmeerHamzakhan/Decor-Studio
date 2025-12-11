// C:\Users\HP\Decor-Studio\backend\test_payment.js
import fetch from 'node-fetch';

async function startCheckout() {
  console.log("...Requesting Checkout Session...");
  
  try {
    const response = await fetch('http://localhost:4000/api/payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'ameer.test4@example.com' })
    });

    const data = await response.json();
    console.log("\n👇 COPY THIS URL AND PASTE INTO YOUR BROWSER 👇\n");
    console.log(data.url);
    console.log("\n☝️ ------------------------------------------- ☝️\n");
  } catch (error) {
    console.error("Error:", error);
  }
}

startCheckout();