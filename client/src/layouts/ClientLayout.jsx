import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebar from '../components/client/ClientSidebar';
import ClientTopbar from '../components/client/ClientTopbar';
import '../client.css';

export default function ClientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="client-layout-root">
      {/* Client Enterprise Sidebar */}
      <ClientSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Workspace */}
      <div className="client-main-wrapper">
        <ClientTopbar 
          onToggleSidebar={() => setSidebarOpen(prev => !prev)} 
        />

        <main className="client-content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
