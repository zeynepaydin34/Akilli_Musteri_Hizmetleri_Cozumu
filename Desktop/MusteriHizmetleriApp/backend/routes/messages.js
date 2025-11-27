import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Tüm mesajları getir (username ile birlikte)
router.get("/messages", async (req, res) => {
    try {
        const result = await db.query(
            `SELECT 
                messages.message_id,
                users.username,
                messages.title,
                messages.content,
                messages.created_at
             FROM messages
             JOIN users ON messages.user_id = users.user_id
             ORDER BY messages.created_at DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
