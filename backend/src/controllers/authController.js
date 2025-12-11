// src/controllers/authController.js

import { supabase, supabaseAdmin } from "../config/supabaseClient.js";
import { sendSignupEmail } from "../utils/emailService.js";
import crypto from "crypto";

/* =========================================================
   ✨ SANITIZE FUNCTION (prevents invalid email errors)
========================================================= */
function clean(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : value;
}

/* =========================================================
   ✅ USER SIGNUP (Fixed + Sanitized)
========================================================= */
export async function signupUser(req, res) {
  try {
    let name = clean(req.body.name);
    let email = clean(req.body.email)?.toLowerCase();
    let password = clean(req.body.password);

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Email validation (fix for your issue)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format",
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      message: "Signup successful",
      user: data.user,
    });
  } catch (err) {
    console.error("signupUser error", err);
    return res.status(500).json({
      success: false,
      error: "Server error during signup",
    });
  }
}

/* =========================================================
   ✅ USER LOGIN (Fixed + Sanitized)
========================================================= */
export async function loginUser(req, res) {
  try {
    let email = clean(req.body.email)?.toLowerCase();
    let password = clean(req.body.password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error("loginUser error", err);
    return res.status(500).json({
      success: false,
      error: "Server error during login",
    });
  }
}

/* =========================================================
   ✅ ADMIN CREATE USER (Safe + Sanitized)
========================================================= */
export async function adminCreateUser(req, res) {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({
        success: false,
        error: "Admin service key missing",
      });
    }

    let email = clean(req.body.email)?.toLowerCase();
    let name = clean(req.body.name);
    let role = clean(req.body.role);

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Missing email",
      });
    }

    const tempPassword = crypto.randomBytes(6).toString("base64url");

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: name || null,
        role: role || "user",
        created_by: "admin",
      },
    });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Safe profile upsert
    try {
      await supabaseAdmin.from("profiles").upsert({
        id: data.user.id,
        email,
        full_name: name || null,
        role: role || "user",
        created_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("profile upsert failed", e.message);
    }

    // Email with temporary password
    await sendSignupEmail({
      to: email,
      email,
      password: tempPassword,
      loginUrl: process.env.FRONTEND_ORIGIN + "/login",
    });

    return res.json({
      success: true,
      message: "User created by admin",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (err) {
    console.error("adminCreateUser error", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
