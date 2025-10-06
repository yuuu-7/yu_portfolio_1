// components/MemoWidget.tsx
import React from 'react';

const MemoWidget = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '32px',
      left: '240px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // 更透明的背景
      backdropFilter: 'blur(20px)',
      padding: '12px',
      borderRadius: '16px',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)', // 深色内阴影
      width: '160px',
      height: '160px',
      border: '1px solid rgba(255, 255, 255, 0.3)', // 细边框
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 标题 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        paddingBottom: '6px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)' // 增加文字阴影
      }}>
        <div style={{
          width: '14px',
          height: '14px',
          backgroundColor: '#ffd60a',
          borderRadius: '3px',
          marginRight: '6px'
        }}></div>
        <h3 style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#1d1d1f',
          margin: '0'
        }}>新备忘录</h3>
      </div>
      
      {/* 内容区域 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)' // 增加文字阴影
      }}>
        <div style={{
          fontSize: '20px',
          marginBottom: '4px'
        }}>📝</div>
        <p style={{
          fontSize: '13px',
          color: '#424242',
          margin: '0'
        }}>无更多文本</p>
      </div>
      
      {/* 日期 */}
      <div style={{
        textAlign: 'right',
        fontSize: '11px',
        color: '#86868b',
        marginTop: '8px',
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)' // 增加文字阴影
      }}>
        2025/1/6
      </div>
    </div>
  );
};

export default MemoWidget;
