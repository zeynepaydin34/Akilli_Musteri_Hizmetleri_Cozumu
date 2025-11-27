import React, { useEffect, useState } from 'react';

// Tek satırlık şikayet satırı bileşeni
const ResolvedRow = ({ complaint }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 4fr 3fr 2fr',
        padding: '12px 0',
        borderBottom: '1px dotted #eee',
        fontSize: '14px',
        alignItems: 'center'
    }}>
        <div style={{ fontWeight: 'bold' }}>{complaint.id}</div>
        <div>{complaint.subject}</div>
        <div style={{ color: '#28a745' }}>✅ {complaint.resolution}</div>
        <div style={{ color: '#888', textAlign: 'right' }}>{complaint.date}</div>
    </div>
);

// Metrik kartı
const MetricCard = ({ title, value, color }) => (
    <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '15px',
        borderLeft: `5px solid ${color}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{title}</p>
        <h2 style={{ margin: '5px 0 0 0', fontSize: '28px', color: color }}>{value}</h2>
    </div>
);

export default function ResolvedComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Endpoint'ten veriyi çek
        fetch('/api/resolved')
            .then(res => res.json())
            .then(data => {
                setComplaints(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Şikayetleri çekerken hata:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: '0px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ color: '#333', borderBottom: '3px solid #007bff', paddingBottom: '10px' }}>
                    ✅ Çözümlenmiş Şikayetler Arşivi
                </h1>
                <p style={{ color: '#666' }}>Otomasyon veya manuel olarak tamamlanan tüm şikayetlerin detaylı kaydı.</p>
            </header>

            <section style={{ 
                display: 'grid', 
                gridTemplateColumns: '3fr 1fr',
                gap: '20px' 
            }}>
                {/* Sol Sütun */}
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px', color: '#333', fontSize: '18px' }}>
                        Tüm Çözümlenenler
                    </h2>

                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr 4fr 3fr 2fr',
                        padding: '15px 0',
                        borderBottom: '2px solid #333',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '13px',
                        color: '#333'
                    }}>
                        <div>ID</div>
                        <div>Konu</div>
                        <div>Çözüm</div>
                        <div style={{ textAlign: 'right' }}>Tarih</div>
                    </div>

                    {loading ? (
                        <p>Yükleniyor...</p>
                    ) : (
                        complaints.map(c => <ResolvedRow key={c.id} complaint={c} />)
                    )}
                </div>

                {/* Sağ Sütun: Metrikler */}
                <div>
                    <h2 style={{ color: '#555', fontSize: '18px', marginBottom: '20px' }}>Arşiv Özeti</h2>
                    <MetricCard title="Toplam Çözümlenen (Son 30 Gün)" value={complaints.length} color="#007bff" />
                    {/* Ekstra metrikler backend’den veya hesaplanarak eklenebilir */}
                </div>
            </section>
        </div>
    );
}
