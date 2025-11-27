import express from "express";
import db from "../config/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Admin ekleme (role = 'admin')
router.post("/admin", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "Alanlar boş olamaz" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (username, email, password_hash, role, created_at) VALUES ($1, $2, $3, 'admin', NOW()) RETURNING user_id, username, email",
      [username, email, hashedPassword]
    );

    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// Adminleri listeleme
router.get("/admin", async (req, res) => {
  try {
    const [admins] = await db.query(
      "SELECT user_id, username, email FROM users WHERE role = 'admin' ORDER BY user_id ASC"
    );
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
