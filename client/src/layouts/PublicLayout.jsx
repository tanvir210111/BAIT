import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SearchModal from '../components/common/SearchModal';

/**
 * PublicLayout: Wraps all main public website pages.
 * Note: There is NO Support Chat on the Main Public Website as requested.
 */
export default function PublicLayout() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onOpenSearch={() => setSearchModalOpen(true)} />

      <main style={{ flexGrow: 1 }}>
        <Outlet context={{ onOpenSearch: () => setSearchModalOpen(true) }} />
      </main>

      <Footer />

      {/* Global Search Modal */}
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </div>
  );
}
