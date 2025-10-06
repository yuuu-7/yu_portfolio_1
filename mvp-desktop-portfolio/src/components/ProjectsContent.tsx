// components/ProjectsContent.tsx
import { projects } from '@/data/projects';

const ProjectsContent = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    }}>
      {projects.map(project => (
        <div key={project.id} style={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            style={{
              width: '100%',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '6px',
              marginBottom: '8px'
            }}
          />
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
            margin: '0',
            lineHeight: '1.4'
          }}>
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectsContent;