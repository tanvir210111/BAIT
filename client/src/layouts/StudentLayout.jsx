import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/student/StudentSidebar';
import StudentTopbar from '../components/student/StudentTopbar';
import '../student.css';

export default function StudentLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`student-layout-root ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Student Panel Sidebar */}
      <StudentSidebar 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(prev => !prev)}
      />

      {/* Main Student Workspace */}
      <div className="student-main-wrapper">
        <StudentTopbar 
          onToggleMobileSidebar={() => setIsMobileOpen(prev => !prev)} 
        />

        <main className="student-content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
