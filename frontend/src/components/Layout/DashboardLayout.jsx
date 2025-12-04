// Archivo: src/components/Layout/DashboardLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../../assets/styles/dashboard.css';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-layout dark-mode">
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <main className={`content-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;