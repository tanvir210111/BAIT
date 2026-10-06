import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/student/StudentSidebar';
import StudentTopbar from '../components/student/StudentTopbar';
import '../student.css';

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="student-layout-root">
      {/* Student Panel Sidebar */}
      <StudentSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Student Workspace */}
      <div className="student-main-wrapper">
        <StudentTopbar 
          onToggleSidebar={() => setSidebarOpen(prev => !prev)} 
        />

        <main className="student-content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
