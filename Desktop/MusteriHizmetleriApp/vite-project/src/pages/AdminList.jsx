import React, { useEffect, useState } from 'react';

export default function AdminList() {
    const [admins, setAdmins] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Adminleri getir
    useEffect(() => {
        fetch('http://localhost:5000/api/admin')
            .then(res => res.json())
            .then(data => setAdmins(data))
            .catch(err => console.error(err));
    }, []);

    const handleAddAdmin = () => {
        if(!username || !email || !password) { alert('Tüm alanlar zorunlu!'); return; }

        fetch('http://localhost:5000/api/admin', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ username, email, password })
        })
        .then(res => res.json())
        .then(data => {
            setAdmins(prev => [...prev, data]);
            setUsername(''); setEmail(''); setPassword('');
        })
        .catch(err => console.error(err));
    }

    return (
        <div style={{ padding: 30, fontFamily:'Arial' }}>
            <h1 style={{ borderBottom:'3px solid #007bff', paddingBottom:10 }}>👤 Admin Yönetimi</h1>

            <div style={{ display:'flex', gap: 50, marginTop:30 }}>

                {/* Admin Ekleme */}
                <div style={{ flex:1, background:'#fff', padding:25, borderRadius:10, boxShadow:'0 3px 8px rgba(0,0,0,0.1)' }}>
                    <h2>Yeni Admin Ekle</h2>
                    <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} style={{ width:'100%', margin:'8px 0', padding:8, borderRadius:6, border:'1px solid #ccc'}} />
                    <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:'100%', margin:'8px 0', padding:8, borderRadius:6, border:'1px solid #ccc'}} />
                    <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width:'100%', margin:'8px 0', padding:8, borderRadius:6, border:'1px solid #ccc'}} />
                    <button onClick={handleAddAdmin} style={{ marginTop:10, padding:'10px 15px', background:'#28a745', color:'#fff', border:'none', borderRadius:6, cursor:'pointer'}}>➕ Admin Ekle</button>
                </div>

                {/* Admin Listesi */}
                <div style={{ flex:1, background:'#fff', padding:25, borderRadius:10, boxShadow:'0 3px 8px rgba(0,0,0,0.1)' }}>
                    <h2>Mevcut Adminler</h2>
                    {admins.length === 0 ? <p>Yükleniyor...</p> : (
                        <ul>
                            {admins.map(a => (
                                <li key={a.user_id}>{a.username} ({a.email})</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
