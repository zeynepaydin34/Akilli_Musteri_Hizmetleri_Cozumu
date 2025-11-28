import React, { useEffect, useState } from 'react';

// Temel Stil Değişkenleri
const primaryColor = '#007bff';
const successColor = '#28a745';
const lightGrayBg = '#f4f7f9';
const cardShadow = '0 6px 15px rgba(0,0,0,0.1)';

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Adminleri getir
  useEffect(() => {
    fetch('http://localhost:5000/api/admin')
      .then(res => res.json())
      .then(data => setAdmins(data))
      .catch(err => console.error('Adminleri çekerken hata:', err));
  }, []);

  // Yeni admin ekle
  const handleAddAdmin = () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('Tüm alanlar zorunlu!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    fetch('http://localhost:5000/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
      .then(res => res.json())
      .then(data => {
        setAdmins(prev => [...prev, data]);
        setUsername(''); setEmail(''); setPassword(''); setConfirmPassword('');
      })
      .catch(err => console.error('Admin eklerken hata:', err));
  };

  // Kart stilleri
  const cardStyle = {
    flex: '1 1 400px',
    background: '#fff',
    padding: 25,
    borderRadius: 12,
    boxShadow: cardShadow,
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    width: '100%',
    margin: '10px 0',
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };

  const adminListScrollArea = {
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '10px',
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Roboto, Arial, sans-serif', backgroundColor: lightGrayBg, minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 30, color: '#333', borderBottom: `3px solid ${primaryColor}`, paddingBottom: 10 }}>
        <span style={{ color: primaryColor, marginRight: 10 }}>⚙️</span> Admin Yönetimi
      </h1>

      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', alignItems: 'stretch' }}>
        
        {/* Yeni Admin Ekle */}
        <div style={cardStyle}>
          <h2 style={{ marginBottom: 15, color: primaryColor }}>Yeni Admin Ekle</h2>
          
          <input
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="E-posta"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Şifre"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Şifre (Tekrar)"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={handleAddAdmin}
            style={{
              marginTop: 15,
              padding: '12px 15px',
              background: successColor,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              width: '100%'
            }}
          >
            ➕ Admin Ekle
          </button>
        </div>

        {/* Mevcut Adminler */}
        <div style={cardStyle}>
          <h2 style={{ marginBottom: 15, color: '#6c757d' }}>Mevcut Adminler</h2>
          
          {admins.length === 0 ? <p style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>Yükleniyor...</p> : (
            <div style={adminListScrollArea}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {admins.map(a => (
                  <div key={a.user_id} style={{
                    padding: 12,
                    borderRadius: 8,
                    borderLeft: `4px solid ${primaryColor}`,
                    background: '#fcfcfc',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}>
                    <strong style={{ display: 'block', color: '#333' }}>{a.username}</strong>
                    <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{a.email}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
