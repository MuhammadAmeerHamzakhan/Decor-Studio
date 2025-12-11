import express from "express";
import {
  adminCreateUser,
  signupUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// ✅ USER SIGNUP
router.post("/signup", signupUser);

// ✅ USER LOGIN
router.post("/login", loginUser);

// ✅ ADMIN CREATE USER (Your Existing Feature)
router.post("/admin-create", adminCreateUser);

// ✅ TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working!" });
});

export default router;
