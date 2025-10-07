// components/ProjectDetailPage.tsx
import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  year: string;
  role: string;
  tech: string[];
}

interface ProjectDetailPageProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '60px 20px 20px 20px'
      }}>
      
      {/* 关闭按钮 - 移动到整个页面右上角 */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          background: 'rgba(0, 0, 0, 0.7)',
          border: 'none',
          color: '#ffffff',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'all 0.3s ease',
          zIndex: 3000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }}
        title="关闭详情页面"
      >
        ×
      </button>

      {/* 左右切换按钮 */}
      <button
        onClick={prevImage}
        style={{
          position: 'absolute',
          left: 'calc(50% - 600px - 60px)',
          top: 'calc(50% - 20px)',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.7)',
          border: 'none',
          color: '#262626',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          transition: 'all 0.2s',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }}
      >
        ‹
      </button>

      <button
        onClick={nextImage}
        style={{
          position: 'absolute',
          right: 'calc(50% - 600px - 60px)',
          top: 'calc(50% - 20px)',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.7)',
          border: 'none',
          color: '#262626',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          transition: 'all 0.2s',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }}
      >
        ›
      </button>

      {/* 居中模态框卡片 */}
      <div style={{
        width: '1200px',
        maxWidth: '95vw',
        height: '700px',
        maxHeight: '95vh',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        display: 'flex',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        transform: 'translateY(-20px)'
      }}>


        {/* 左侧图片区域 */}
        <div style={{
          width: '65%',
          height: '100%',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} - 图片 ${currentImageIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
          {/* 占位符 */}
          <div style={{
            display: 'none',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontSize: '18px',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🖼️</div>
            <div>图片加载中...</div>
          </div>

          {/* 图片指示器 */}
          {project.images.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px'
            }}>
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 右侧文字详情区域 */}
        <div style={{
          width: '35%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          position: 'relative'
        }}>

          {/* 项目名称 - 固定位置 */}
          <div style={{
            padding: '20px 20px 12px 20px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1a1a1a',
              margin: 0,
              lineHeight: '1.2'
            }}>
              {project.title}
            </h1>
          </div>

          {/* 项目年份 + 角色 */}
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#666666',
              fontWeight: '500'
            }}>
              {project.year} • {project.role}
            </div>
          </div>

          {/* 项目详情 */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#333333',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              {project.description}
            </div>

            {/* 技术栈标签 */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#f0f8ff',
                    color: '#0066cc',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: '1px solid #e6f3ff'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 右下角圆形联系按钮 */}
          <button
            onClick={() => {
              // 这里可以添加联系逻辑
              console.log('联系开发者');
            }}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '56px',
              height: '56px',
              backgroundColor: '#007AFF',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056CC';
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 122, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007AFF';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)';
            }}
            title="联系开发者"
          >
            💬
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
