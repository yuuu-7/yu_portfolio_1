// components/Dock.tsx
'use client';
import React, { useState } from 'react';
import { skills } from '@/data/skills';

const Dock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getIconScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.6; // 悬停的图标最大
    if (distance === 1) return 1.3; // 相邻图标中等放大
    return 1; // 其他图标不变（最多只有3个图标变大）
  };

  const getDockWidth = () => {
    if (hoveredIndex === null) {
      // 基础宽度：4个图标 + 3个间距 + 左右内边距
      return `${4 * 48 + 3 * 8 + 24}px`;
    }
    
    // 计算每个图标的实际宽度（考虑缩放）
    let totalWidth = 12; // 固定左右内边距（12px * 2 = 24px）
    
    for (let i = 0; i < skills.length; i++) {
      const scale = getIconScale(i);
      const iconWidth = 48 * scale; // 图标实际宽度
      totalWidth += iconWidth;
      
      // 在图标之间添加间距（除了最后一个图标）
      if (i < skills.length - 1) {
        // 如果当前图标或下一个图标被放大，增加间距
        const currentScale = getIconScale(i);
        const nextScale = getIconScale(i + 1);
        const maxScale = Math.max(currentScale, nextScale);
        
        // 基础间距 + 放大图标的额外间距
        const baseSpacing = 8;
        const extraSpacing = (maxScale - 1) * 40; // 稍微缩小放大时的间距倍数
        totalWidth += baseSpacing + extraSpacing;
      }
    }
    
    return `${totalWidth}px`;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '64px',
        padding: '8px 12px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        width: getDockWidth(),
        transition: 'width 0.3s ease-in-out'
      }}>
        {skills.map((skill, index) => {
          const scale = getIconScale(index);
          
          // 计算当前图标与下一个图标之间的间距
          const getSpacing = () => {
            if (index >= skills.length - 1) return 0; // 最后一个图标不需要右边距
            
            const currentScale = getIconScale(index);
            const nextScale = getIconScale(index + 1);
            const maxScale = Math.max(currentScale, nextScale);
            
            // 基础间距 + 放大图标的额外间距
            const baseSpacing = 8;
            const extraSpacing = (maxScale - 1) * 40; // 稍微缩小放大时的间距倍数
            return baseSpacing + extraSpacing;
          };
          
          return (
            <div
              key={skill.name}
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(128, 128, 128, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transform: `scale(${scale})`,
                transformOrigin: 'center bottom',
                marginRight: `${getSpacing()}px`,
                position: 'relative'
              }}
              title={skill.name}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setHoveredSkill(skill.name);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setHoveredSkill(null);
              }}
            >
              {skill.icon}
              
              {/* 悬停时显示的提示 */}
              {hoveredSkill === skill.name && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  marginBottom: '12px',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  color: 'white',
                  fontSize: '14px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  whiteSpace: 'nowrap',
                  zIndex: 1000
                }}>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{skill.name}</p>
                  {skill.relatedProjects.length > 0 && (
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
                      {skill.relatedProjects.map(project => (
                        <li key={project} style={{ fontSize: '12px' }}>{project}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;

