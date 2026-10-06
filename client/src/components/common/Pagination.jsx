import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toBengaliNumber } from '../../utils/formatDate';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '36px' }}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn"
        style={{
          background: '#fff',
          border: '1px solid var(--border)',
          padding: '8px 12px',
          borderRadius: '6px',
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
        }}
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className="btn"
          style={{
            background: currentPage === page ? 'var(--primary)' : '#fff',
            color: currentPage === page ? '#fff' : 'var(--text-main)',
            border: `1px solid ${currentPage === page ? 'var(--primary)' : 'var(--border)'}`,
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {toBengaliNumber(page)}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn"
        style={{
          background: '#fff',
          border: '1px solid var(--border)',
          padding: '8px 12px',
          borderRadius: '6px',
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
        }}
        aria-label="Next Page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
