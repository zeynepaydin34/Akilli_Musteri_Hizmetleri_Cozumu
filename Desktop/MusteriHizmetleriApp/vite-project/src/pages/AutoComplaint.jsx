// src/pages/AutoComplaint.jsx
import React, { useState, useEffect } from "react";

export default function AutoComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [autoReply, setAutoReply] = useState("");

  const categories = ["Kargo", "Hesap", "Fatura", "Ürün Kalitesi", "Diğer"];
  const emotions = ["Mutlu", "Üzgün", "Sinirli", "Hayal Kırıklığı", "Kararsız"];

  // 🔥 DB’den şikayetleri çek
  useEffect(() => {
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setComplaints([]);
      });
  }, []);

  const selectedComplaint = complaints[currentIndex] || null;

  // 🧠 AI tahmini çağır
  useEffect(() => {
    if (!selectedComplaint) return;

    const fetchAIAnalysis = async () => {
      try {
        const res = await fetch("http://localhost:5001/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: selectedComplaint.content, message_id: "TEST" })
        });
        const data = await res.json();
        if (data.predicted_labels) setSelectedCategories(data.predicted_labels.slice(0,2));
        if (data.predicted_sentiment) setSelectedEmotion(data.predicted_sentiment);
        if (data.auto_reply) setAutoReply(data.auto_reply);
      } catch (err) {
        console.error("AI fetch error:", err);
      }
    };

    fetchAIAnalysis();
  }, [selectedComplaint]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      if (selectedCategories.length < 2) {
        setSelectedCategories([...selectedCategories, category]);
      } else {
        alert("En fazla 2 kategori seçebilirsiniz!");
      }
    }
  };

  const handleSendReply = () => {
    if (!selectedComplaint) return;
    if (selectedCategories.length === 0 || !selectedEmotion || !autoReply.trim()) {
      alert("Kategori, duygu ve yanıt alanı zorunludur!");
      return;
    }

    console.log({
      message_id: selectedComplaint.message_id,
      username: selectedComplaint.username,
      categories: selectedCategories,
      emotion: selectedEmotion,
      reply: autoReply,
    });

    alert("Yanıt gönderildi! (simülasyon)");
    // Burada istersen backend’e POST ile kaydedebilirsin
  };

  const handleNext = () => {
    if (currentIndex < complaints.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedCategories([]);
      setSelectedEmotion("");
      setAutoReply("");
    } else {
      alert("Son şikayet!");
    }
  };

  return (
    <div style={{ display: "flex", padding: 30, fontFamily: "Arial", gap: 25 }}>
      {/* SOL PANEL: Şikayet */}
      <div style={{ flex: 1, background: "#fff", padding: 25, borderRadius: 10, boxShadow: "0 3px 8px rgba(0,0,0,0.1)" }}>
        <h2>📬 Şikayet Detayları</h2>
        {!selectedComplaint ? (
          <p>Şikayet yok veya yükleniyor...</p>
        ) : (
          <>
            <p><strong>Başlık:</strong> {selectedComplaint.title}</p>
            <p><strong>İçerik:</strong> {selectedComplaint.content}</p>
            <p><strong>Kullanıcı:</strong> {selectedComplaint.username}</p>
            {selectedComplaint.created_at && <p><small>{new Date(selectedComplaint.created_at).toLocaleString()}</small></p>}
          </>
        )}
      </div>

      {/* SAĞ PANEL: Otomatik Yanıt */}
      <div style={{ flex: 1, background: "#fff", padding: 25, borderRadius: 10, boxShadow: "0 3px 8px rgba(0,0,0,0.1)" }}>
        <h2>⚙️ Otomatik Yanıt</h2>

        {!selectedComplaint ? (
          <p>Bir şikayet seçin.</p>
        ) : (
          <>
            {/* Kategori (multi-select, max 2) */}
            <div style={{ marginBottom: 20 }}>
              <label><strong>Kategori (1-2):</strong></label>
              <div style={{ marginTop: 5, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 5,
                      border: selectedCategories.includes(cat) ? "2px solid #007bff" : "1px solid #ccc",
                      background: selectedCategories.includes(cat) ? "#e8f3ff" : "#f9f9f9",
                      cursor: "pointer",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Duygu */}
            <div style={{ marginBottom: 20 }}>
              <label><strong>Duygu:</strong></label>
              <select
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value)}
                style={{ marginLeft: 10, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
              >
                <option value="">Seçiniz</option>
                {emotions.map((em) => (
                  <option key={em} value={em}>{em}</option>
                ))}
              </select>
            </div>

            {/* AI Yanıt */}
            <div style={{ marginBottom: 20 }}>
              <label><strong>Önerilen Yanıt:</strong></label>
              <textarea
                value={autoReply}
                onChange={(e) => setAutoReply(e.target.value)}
                placeholder="AI tarafından önerilen yanıt buraya gelecek..."
                style={{ width: "100%", height: 100, padding: 10, borderRadius: 8, border: "1px solid #ccc", marginTop: 5 }}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleSendReply} style={{ padding: "10px 15px", background: "#28a745", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
                ✉️ Yanıt Gönder
              </button>
              <button onClick={handleNext} style={{ padding: "10px 15px", background: "#007bff", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
                ⏭ Sonraki Şikayet
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
