import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AutoComplaint from './pages/AutoComplaint';
import AdminList from './pages/AdminList';
import ResolvedComplaints from './pages/ResolvedComplaints';
import Login from './pages/Login';

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Login kontrolü

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard': return <Dashboard />;
      case 'NewTickets': return <AutoComplaint />;
      case 'AdminList': return <AdminList />;
      case 'ResolvedComplaints': return <ResolvedComplaints />;
      case 'Login': return <Login />;
      default: return <Dashboard />;
    }
  };

  // Eğer giriş yapılmamışsa Login sayfasını göster
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // Giriş yapıldıktan sonra normal layout
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div style={{
        marginLeft: '250px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
      }}>
        <Navbar />
        <div style={{
          flex: 1,
          padding: '20px 30px',
          boxSizing: 'border-box',
        }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
