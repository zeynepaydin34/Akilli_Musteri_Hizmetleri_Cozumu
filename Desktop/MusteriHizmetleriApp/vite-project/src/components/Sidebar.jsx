import React from 'react';

const sidebarStyle = {
    width: '250px',
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '20px 0',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    zIndex: 100
};

const menuTitleStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#00bcd4'
};

const groupTitleStyle = {
    fontSize: '11px',
    color: '#999',
    padding: '15px 20px 5px 20px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const navItemStyle = {
    padding: '12px 20px 12px 24px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    borderLeft: '4px solid transparent',
    fontSize: '15px'
};

const activeItemStyle = {
    ...navItemStyle,
    backgroundColor: '#495057',
    borderLeft: '4px solid #00bcd4',
    fontWeight: 'bold'
};

const NAV_MENU = [
    { type: 'item', name: 'Dashboard', icon: '🏠', page: 'Dashboard' },
    { type: 'group', title: 'Şikayet Yönetimi' },
    { type: 'item', name: 'Yeni Şikayetler / Otomasyon', icon: '🤖', page: 'NewTickets' },
    { type: 'item', name: 'Çözümlenmiş Şikayetler', icon: '✅', page: 'ResolvedComplaints' },
    { type: 'group', title: 'Admin Yönetimi' },
    { type: 'item', name: 'Adminler', icon: '👤', page: 'AdminList' }
];

export default function Sidebar({ activePage, setActivePage }) {
    const handleNavigation = (pageName) => setActivePage(pageName);

    return (
        <div style={sidebarStyle}>
            <div style={menuTitleStyle}>AI YÖNETİM PANELİ</div>
            <nav>
                {NAV_MENU.map((item, index) => {
                    if (item.type === 'group') {
                        return <div key={index} style={groupTitleStyle}>{item.title}</div>;
                    }
                    return (
                        <div
                            key={item.page}
                            style={item.page === activePage ? activeItemStyle : navItemStyle}
                            onClick={() => handleNavigation(item.page)}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {item.icon} {item.name}
                            </span>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
