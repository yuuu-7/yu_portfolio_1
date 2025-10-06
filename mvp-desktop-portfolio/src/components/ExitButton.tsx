// components/ExitButton.tsx
import React from 'react';

interface ExitButtonProps {
  onExit: () => void;
}

const ExitButton = ({ onExit }: ExitButtonProps) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '32px',
      right: '32px',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
    }}
    onClick={onExit}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
    title="退出桌面"
    >
      {/* 开着的门图标 */}
      <div style={{
        fontSize: '32px',
        color: '#ffffff'
      }}>
        🚪
      </div>
    </div>
  );
};

export default ExitButton;
