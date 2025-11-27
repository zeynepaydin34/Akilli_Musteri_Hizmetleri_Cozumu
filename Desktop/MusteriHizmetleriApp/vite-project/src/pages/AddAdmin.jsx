// src/pages/AdminRegistration.jsx

import React from 'react';

// Yardımcı Bileşen: Form Alanı
const FormInput = ({ label, type = 'text', placeholder }) => (
    <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'
            }}
        />
    </div>
);


export default function AdminRegistration() {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Yeni Admin Kaydı Simüle Edildi!');
        // Gerçek uygulamada API çağrısı yapılır
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
            
            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ color: '#333', borderBottom: '3px solid #007bff', paddingBottom: '10px' }}>
                    ➕ Yeni Admin Kullanıcısı Kayıt
                </h1>
                <p style={{ color: '#666' }}>Sisteme yeni yönetici kullanıcıları ekleyin ve yetkilendirin.</p>
            </header>

            <section style={{ 
                maxWidth: '600px', 
                backgroundColor: '#fff', 
                padding: '30px', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
            }}>
                <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '25px', color: '#333', fontSize: '18px' }}>
                    Kullanıcı Bilgileri
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <FormInput label="Tam Adı" placeholder="Ad Soyad" />
                    <FormInput label="E-posta Adresi" type="email" placeholder="kullanici@domain.com" />
                    <FormInput label="Şifre" type="password" placeholder="En az 8 karakter" />
                    <FormInput label="Şifre Tekrar" type="password" placeholder="Şifreyi doğrulayın" />
                    
                    {/* Yetkilendirme Alanı */}
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                            Yetki Seviyesi
                        </label>
                        <select
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box'
                            }}
                        >
                            <option value="Admin">Tam Yetkili Admin</option>
                            <option value="Support">Destek Ekibi (Şikayet Yönetimi)</option>
                            <option value="Viewer">Sadece Görüntüleyici</option>
                        </select>
                    </div>

                    <button 
                        type="submit"
                        style={{ 
                            width: '100%',
                            padding: '12px', 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        Admini Kaydet
                    </button>
                </form>
            </section>
            
        </div>
    );
}