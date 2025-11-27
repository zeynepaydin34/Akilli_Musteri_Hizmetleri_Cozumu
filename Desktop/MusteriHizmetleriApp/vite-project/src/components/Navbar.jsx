import React from 'react';

const navbarStyle = {
    height: '60px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 20px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
};

const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
};

const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#00bcd4',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '16px'
};

export default function Navbar() {
    return (
        <div style={navbarStyle}>
            <div style={profileStyle}>
                <div style={{ fontSize: '14px', color: '#333' }}>
                    Admin Panel
                </div>
                <div style={avatarStyle}>
                    A
                </div>
                <span style={{ color: '#666', fontSize: '12px' }}>▼</span>
            </div>
        </div>
    );
}