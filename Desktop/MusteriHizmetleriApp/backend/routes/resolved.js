import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET /api/resolved - Yanıtlanmış şikayetleri getir
router.get("/", async (req, res) => {
    try {
        const query = `
           SELECT 
    u.username,
    m.title,
    m.content AS message_content,
    ar.content AS reply_content,
    c.name AS category_name,
    s.sentiment AS sentiment_name
FROM auto_replies ar
JOIN messages m ON ar.message_id = m.message_id
JOIN users u ON m.user_id = u.user_id
LEFT JOIN message_categories mc ON mc.message_id = m.message_id
LEFT JOIN categories c ON c.category_id = mc.category_id
LEFT JOIN sentiments s ON s.message_id = m.message_id
ORDER BY ar.created_at DESC
LIMIT 50;

        `;

        const [rows] = await db.query(query);
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

export default router;
