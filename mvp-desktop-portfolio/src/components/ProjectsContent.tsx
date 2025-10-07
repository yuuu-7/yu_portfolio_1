// components/ProjectsContent.tsx
import { projects } from '@/data/projects';

interface ProjectsContentProps {
  onProjectClick: (projectId: number) => void;
}

const ProjectsContent: React.FC<ProjectsContentProps> = ({ onProjectClick }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    }}>
      {projects.map(project => (
        <div 
          key={project.id} 
          onClick={() => onProjectClick(project.id)}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img 
            src={project.images[0]} 
            alt={project.title} 
            style={{
              width: '100%',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '6px',
              marginBottom: '8px'
            }}
            onError={(e) => {
              // 如果图片加载失败，显示占位符
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'flex';
            }}
          />
          {/* 占位符 */}
          <div style={{
            display: 'none',
            width: '100%',
            height: '120px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e9ecef',
            color: '#6c757d',
            fontSize: '14px',
            borderRadius: '6px',
            marginBottom: '8px',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🖼️</div>
            <div>图片</div>
          </div>
          <h3 style={{
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#1d1d1f',
            fontSize: '16px'
          }}>
            {project.title}
          </h3>
          
          {/* 年份和角色信息 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '12px',
            color: '#666666'
          }}>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '500'
            }}>
              {project.year}
            </span>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '500'
            }}>
              {project.role}
            </span>
          </div>
          
          <p style={{
            fontSize: '14px',
            color: '#424242',
            margin: '0 0 12px 0',
            lineHeight: '1.4'
          }}>
            {project.description}
          </p>
          
          {/* 技术栈标签 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px'
          }}>
            {project.tech.map((tech, index) => (
              <span key={index} style={{
                backgroundColor: 'rgba(251, 146, 60, 0.2)',
                color: '#fb923c',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '500',
                border: '1px solid rgba(251, 146, 60, 0.3)'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsContent;