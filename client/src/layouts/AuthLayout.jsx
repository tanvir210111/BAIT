import React from 'react';
import { Outlet } from 'react-router-dom';
import '../auth.css';

/**
 * Dedicated Standalone Authentication Layout
 * Clean, minimal, full-viewport background (#F7F9F8) without public Header/Footer
 */
export default function AuthLayout() {
  return (
    <div className="auth-layout-root">
      <Outlet />
    </div>
  );
}
