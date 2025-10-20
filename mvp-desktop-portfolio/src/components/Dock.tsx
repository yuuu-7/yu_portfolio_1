// components/Dock.tsx
'use client';
import React, { useState } from 'react';
import { skills } from '@/data/skills';
import SkillDetailPage from './SkillDetailPage';

const Dock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [sel10ectedSkill, setSelectedSkill] = useState<{ name: string; icon: string; mastery: string; relatedProjects: { id: number; name: string; description: string; }[] } | null>(null);

  const handleSkillClick = (skill: { name: string; icon: string; mastery: string; relatedProjects: { id: number; name: string; description: string; }[] }) => {
    setSelectedSkill(skill);
  };

  const handleProjectClick = (projectId: number) => {
    // 这里可以添加跳转到项目详情的逻辑
    console.log('点击项目:', projectId);
    // 可以在这里添加路由跳转或其他逻辑
  };

  const handleCloseSkillPage = () => {
    setSelectedSkill(null);
  };

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
    <>
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
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'normal',
                  color: '#1d1d1f',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
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
              onClick={() => handleSkillClick(skill)}
            >
              {skill.icon}
              
               {/* 悬停时显示的 macOS 风格提示 */}
               {hoveredSkill === skill.name && (
                 <div style={{
                   position: 'absolute',
                   bottom: '100%',
                   marginBottom: '8px',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   zIndex: 1000
                 }}>
                   {/* 提示框主体 */}
                   <div style={{
                     padding: '6px 12px',
                     backgroundColor: 'rgba(60, 60, 60, 0.95)',
                     color: 'white',
                     fontSize: '8px',
                     fontWeight: '500',
                     borderRadius: '12px',
                     boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                     whiteSpace: 'nowrap',
                     backdropFilter: 'blur(20px)'
                   }}>
                     {skill.name}
                   </div>
                   
                   {/* 指向性三角形 */}
                   <div style={{
                     position: 'absolute',
                     top: '100%',
                     left: '50%',
                     transform: 'translateX(-50%)',
                     width: '0',
                     height: '0',
                     borderLeft: '6px solid transparent',
                     borderRight: '6px solid transparent',
                     borderTop: '6px solid rgba(60, 60, 60, 0.95)',
                     filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                   }} />
                 </div>
               )}
            </div>
          );
        })}
      </div>
      </div>

      {/* 技能详情页面 */}
      {selectedSkill && (
        <SkillDetailPage
          skill={selectedSkill}
          onClose={handleCloseSkillPage}
          onProjectClick={handleProjectClick}
        />
      )}
    </>
  );
};

export default Dock;

