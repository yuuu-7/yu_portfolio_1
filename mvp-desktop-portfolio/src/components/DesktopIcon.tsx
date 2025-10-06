// components/DesktopIcon.tsx
'use client';
import React from 'react';

interface DesktopIconProps {
  label: string;
  type: 'folder' | 'pdf';
}

const DesktopIcon = ({ label, type }: DesktopIconProps) => {
  const renderIcon = () => {
    if (type === 'folder') {
      return (
        <div style={{
          width: '64px',
          height: '48px',
          backgroundColor: '#a8a8a8',
          borderRadius: '8px',
          marginBottom: '4px',
          position: 'relative',
          boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* 文件夹标签 */}
          <div style={{
            width: '20px',
            height: '8px',
            backgroundColor: '#d1d5db',
            borderRadius: '2px 2px 0 0',
            position: 'absolute',
            top: '-4px',
            left: '8px'
          }}></div>
          {/* 文件夹主体 */}
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#a8a8a8',
            borderRadius: '8px',
            border: '1px solid #9ca3af'
          }}></div>
        </div>
      );
    } else if (type === 'pdf') {
      return (
        <div style={{
          width: '48px',
          height: '64px',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          marginBottom: '4px',
          position: 'relative',
          boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          padding: '4px'
        }}>
          {/* PDF内容预览 */}
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px',
            marginBottom: '2px'
          }}></div>
          <div style={{
            width: '80%',
            height: '6px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px',
            marginBottom: '2px'
          }}></div>
          <div style={{
            width: '90%',
            height: '6px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px',
            marginBottom: '2px'
          }}></div>
          <div style={{
            width: '70%',
            height: '6px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px',
            marginBottom: '2px'
          }}></div>
          <div style={{
            width: '85%',
            height: '6px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px',
            marginBottom: '2px'
          }}></div>
          <div style={{
            width: '60%',
            height: '6px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px'
          }}></div>
          {/* 折叠角 */}
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '12px',
            height: '12px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '0 4px 0 4px'
          }}></div>
        </div>
      );
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '96px',
      height: '96px',
      textAlign: 'center',
      cursor: 'pointer',
      borderRadius: '6px',
      padding: '8px',
      transition: 'background-color 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    }}
    >
      {renderIcon()}
      <span style={{
        fontSize: '14px',
        color: '#ffffff',
        fontWeight: '600',
        textShadow: '0 0 4px rgba(0, 0, 0, 0.6)'
      }}>
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
