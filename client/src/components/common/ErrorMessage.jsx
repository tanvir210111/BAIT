import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ErrorMessage({ message, type = 'error', onClose }) {
  if (!message) return null;

  const typeConfig = {
    error: {
      bg: '#fee2e2',
      border: '#fecaca',
      color: '#991b1b',
      icon: AlertCircle
    },
    warning: {
      bg: '#fef3c7',
      border: '#fde68a',
      color: '#92400e',
      icon: AlertTriangle
    },
    success: {
      bg: '#d1fae5',
      border: '#a7f3d0',
      color: '#065f46',
      icon: CheckCircle
    },
    info: {
      bg: '#e0f2fe',
      border: '#bae6fd',
      color: '#0369a1',
      icon: Info
    }
  };

  const current = typeConfig[type] || typeConfig.error;
  const IconComponent = current.icon;

  return (
    <div style={{
      background: current.bg,
      border: `1px solid ${current.border}`,
      color: current.color,
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '18px',
      fontSize: '0.92rem',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <IconComponent size={18} style={{ flexShrink: 0 }} />
      <span style={{ flexGrow: 1 }}>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: current.color, fontWeight: 'bold' }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
