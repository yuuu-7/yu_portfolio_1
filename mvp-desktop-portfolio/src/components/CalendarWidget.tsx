// components/CalendarWidget.tsx
'use client'; // 因为使用了 new Date()，这是一个客户端组件
import React from 'react';

const CalendarWidget = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  
  // 获取月份名称
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const monthName = monthNames[currentMonth];
  
  // 获取星期几
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  
  // 获取当月第一天是星期几
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  
  // 获取当月天数
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // 生成日历数组
  const calendarDays = [];
  
  // 添加上个月的空白日期
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // 添加当月日期
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div style={{
      position: 'absolute',
      top: '32px',
      left: '32px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // 更透明的背景
      backdropFilter: 'blur(20px)',
      padding: '12px',
      borderRadius: '16px',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)', // 深色内阴影
      width: '160px',
      height: '160px',
      border: '1px solid rgba(255, 255, 255, 0.3)' // 细边框
    }}>
      {/* 月份标题 */}
      <div style={{
        textAlign: 'center',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#ffffff',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
      }}>
        {monthName} {currentYear}
      </div>
      
      {/* 星期标题 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        marginBottom: '6px'
      }}>
        {dayNames.map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#ffffff',
            padding: '2px 0',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            {day}
          </div>
        ))}
      </div>
      
      {/* 日期网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px'
      }}>
        {calendarDays.map((day, index) => (
          <div
            key={index}
            style={{
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              color: day === currentDate ? '#000000' : '#ffffff',
              backgroundColor: day === currentDate ? '#ffffff' : 'transparent',
              borderRadius: day === currentDate ? '50%' : '4px',
              padding: day === currentDate ? '0' : '3px 0',
              minHeight: day === currentDate ? '20px' : '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textShadow: day === currentDate ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.5)',
              width: day === currentDate ? '20px' : 'auto',
              height: day === currentDate ? '20px' : 'auto',
              margin: day === currentDate ? 'auto' : '0'
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
