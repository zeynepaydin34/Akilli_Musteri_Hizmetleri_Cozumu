import express from "express";
import pool from "../config/db.js";  

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("POST /api/login çalıştı", req.body);
  const { email, password } = req.body;

  // Sadece test amaçlı basit kontrol
  if (email === "admin5@gmail.com" && password === "abc") {
    return res.json({ message: "Login successful" });
  }

  res.status(401).json({ message: "Email veya şifre hatalı" });
});

export default router;
