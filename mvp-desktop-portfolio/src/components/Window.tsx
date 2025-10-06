// components/Window.tsx
'use client';
import React from 'react';

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Window = ({ title, onClose, children }: WindowProps) => {
  return (
    <div style={{
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      height: '500px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000
    }}>
      {/* 标题栏 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px 16px 0 0',
        padding: '0 16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <span style={{
          fontWeight: '600',
          color: '#1d1d1f',
          fontSize: '14px',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'
        }}>
          {title}
        </span>
        <button
          onClick={onClose}
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#dc2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
          }}
          aria-label="Close"
        >
          <span style={{
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            ×
          </span>
        </button>
      </div>
      {/* 内容区 */}
      <div style={{
        padding: '16px',
        flex: 1,
        overflowY: 'auto',
        backgroundColor: 'transparent'
      }}>
        {children}
      </div>
    </div>
  );
};

export default Window;