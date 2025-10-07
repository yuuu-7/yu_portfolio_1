// components/SkillDetailPage.tsx
import React, { useState } from 'react';
import ProjectDetailPage from './ProjectDetailPage';
import { projects } from '@/data/projects';

interface Project {
  id: number;
  name: string;
  description: string;
}

interface Skill {
  name: string;
  icon: string;
  mastery: string;
  relatedProjects: Project[];
}

interface SkillDetailPageProps {
  skill: Skill;
  onClose: () => void;
  onProjectClick: (projectId: number) => void;
}

const SkillDetailPage: React.FC<SkillDetailPageProps> = ({ skill, onClose, onProjectClick }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleProjectClick = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <>
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      zIndex: 2000,
      position: 'relative'
    }}>
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#ff4757',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: 'white',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff3742';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ff4757';
          }}
        >
          ×
        </button>

        {/* 技能标题 */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#2c3e50',
          margin: '0 0 30px 0',
          textAlign: 'left'
        }}>
          {skill.name}
        </h1>

        {/* 技能说明 */}
        <div style={{
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#2c3e50',
            margin: '0 0 15px 0'
          }}>
            技能说明
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#7f8c8d',
            margin: '0',
            lineHeight: '1.6'
          }}>
            {skill.mastery}
          </p>
        </div>

        {/* 相关项目 */}
        {skill.relatedProjects.length > 0 && (
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#2c3e50',
              margin: '0 0 20px 0'
            }}>
              相关项目
            </h2>
            <div style={{
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
            }}>
              {skill.relatedProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e9ecef'
                  }}
                  onClick={() => handleProjectClick(project.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    margin: '0 0 10px 0'
                  }}>
                    {project.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#7f8c8d',
                    margin: '0',
                    lineHeight: '1.5'
                  }}>
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 如果没有相关项目 */}
        {skill.relatedProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#7f8c8d',
            fontSize: '16px',
            padding: '40px 0'
          }}>
            暂无相关项目
          </div>
        )}
    </div>
    
    {/* 项目详情页面 */}
    {selectedProject && (
      <ProjectDetailPage
        project={selectedProject}
        onClose={handleCloseProject}
      />
    )}
    </>
  );
};

export default SkillDetailPage;
