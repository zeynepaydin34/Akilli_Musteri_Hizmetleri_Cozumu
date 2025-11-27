// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";

// Yardımcı Bileşen: Durum Kartı
const StatusCard = ({ title, value, detail, color, icon }) => (
  <div style={{
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderLeft: `5px solid ${color}`
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{title}</p>
      <span style={{ fontSize: '24px', color: color }}>{icon}</span>
    </div>
    <h2 style={{ margin: '10px 0', fontSize: '32px', color: '#333' }}>{value}</h2>
    <small style={{ color: color, fontWeight: 'bold' }}>{detail}</small>
  </div>
);

// Yardımcı Bileşen: Son 10 Şikayet Tablosu
const RecentMessagesTable = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recent") // Backend'de son 10 şikayet endpoint'i
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  }, []);

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
          <th>Username</th>
          <th>Başlık</th>
          <th>İçerik</th>
          <th>Tarih</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(m => (
          <tr key={m.message_id} style={{ borderBottom: "1px solid #eee" }}>
            <td>{m.username}</td>
            <td>{m.title}</td>
            <td>{truncate(m.content, 50)}</td>
            <td>{new Date(m.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Dashboard() {
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', borderBottom: '3px solid #007bff', paddingBottom: '10px' }}>
          🏠 Genel Durum Paneli (Dashboard)
        </h1>
        <p style={{ color: '#666' }}>Tüm şikayet yönetim sisteminin anlık özetini görün.</p>
      </header>

      {/* METRİK KARTLARI */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        <StatusCard 
          title="Anlık Bekleyen Şikayet" 
          value="15" 
          detail="⚠️ Yüksek Öncelikli" 
          color="#dc3545" 
          icon="🔔"
        />
        <StatusCard 
          title="AI Otomasyon Oranı (Bugün)" 
          value="%85.3" 
          detail="⬆️ Düne göre %3 artış" 
          color="#28a745" 
          icon="🤖"
        />
        <StatusCard 
          title="Ort. Yanıt Süresi (Saat)" 
          value="0.5" 
          detail="⏳ Hedef: 1 saat" 
          color="#ffc107" 
          icon="⏱️"
        />
        <StatusCard 
          title="Manuel Müdahale (Son 7 Gün)" 
          value="42" 
          detail="⬇️ Geçen haftaya göre %10 azalış" 
          color="#007bff" 
          icon="🛠️"
        />
      </section>

      {/* DETAYLI BÖLÜMLER */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {/* Şikayet Kategorisi Dağılımı */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px', color: '#333', fontSize: '18px' }}>
            📈 Şikayet Kategorisi Dağılımı
          </h2>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
            [Pasta Grafik Yer Tutucusu]
          </div>
        </div>

        {/* Kritik Bekleyen Şikayetler */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px', color: '#333', fontSize: '18px' }}>
            🔥 En Kritik Bekleyen Şikayetler
          </h2>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ padding: '10px 0', borderBottom: '1px dotted #eee' }}>**ID 4521:** Yanlış Teslimat Adresi (Yüksek Öncelikli)</li>
            <li style={{ padding: '10px 0', borderBottom: '1px dotted #eee' }}>**ID 4519:** Ürün Garantisi Süreci (Yüksek Öncelikli)</li>
            <li style={{ padding: '10px 0' }}>**ID 4515:** Abone İptali Talebi (Normal Öncelikli)</li>
          </ul>
        </div>
      </section>

      {/* Son 10 Şikayet Tablosu */}
      <section style={{ 
        backgroundColor: '#fff', 
        padding: '25px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px', color: '#333', fontSize: '18px' }}>
          📨 Son 10 Şikayet
        </h2>
        <RecentMessagesTable />
      </section>

    </div>
  );
}
