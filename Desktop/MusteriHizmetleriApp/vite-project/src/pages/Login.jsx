// src/pages/Login.jsx
import React, { useState } from "react";
import loginImage from "../assets/images/AI_CustomerService.png";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Giriş başarılı
        onLogin();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Sunucu hatası!");
    }
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        overflow: "hidden",
        width: 800,
        maxWidth: "90%",
        minHeight: 400
      }}>
        {/* Sol Görsel */}
        <div style={{
          flex: 1,
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />

        {/* Sağ Form */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 40
        }}>
          <form onSubmit={handleSubmit} style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Admin Girişi</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ padding: 12, borderRadius: 6, border: "1px solid #ccc" }}
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              style={{ padding: 12, borderRadius: 6, border: "1px solid #ccc" }}
              required
            />

            <button style={{
              padding: 12,
              borderRadius: 6,
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer"
            }}>
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
