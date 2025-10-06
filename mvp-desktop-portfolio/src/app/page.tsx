'use client';
import { useState } from 'react';
import Dock from '@/components/Dock';
import CalendarWidget from '@/components/CalendarWidget';
import MemoWidget from '@/components/MemoWidget';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import ProjectsContent from '@/components/ProjectsContent';

export default function Home() {
  const [isProjectsWindowOpen, setProjectsWindowOpen] = useState(false);
  const [isAboutWindowOpen, setAboutWindowOpen] = useState(false);

  return (
    <main className="h-screen w-screen relative" style={{ 
      backgroundImage: 'url(/desktop-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* 图标 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'absolute',
        top: '32px',
        right: '32px'
      }}>
        <div onClick={() => setProjectsWindowOpen(true)}>
          <DesktopIcon label="我的作品" type="folder" />
        </div>
        <div onClick={() => setAboutWindowOpen(true)}>
          <DesktopIcon label="关于我" type="pdf" />
        </div>
      </div>

      {/* 条件渲染窗口 */}
      {isProjectsWindowOpen && (
        <Window title="我的作品" onClose={() => setProjectsWindowOpen(false)}>
          <ProjectsContent />
        </Window>
      )}

      {isAboutWindowOpen && (
        <Window title="关于我" onClose={() => setAboutWindowOpen(false)}>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#1d1d1f'
            }}>
              关于我
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#424242',
              marginBottom: '16px'
            }}>
              你好！我是一名热爱技术的开发者，专注于前端开发和用户体验设计。
            </p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#424242',
              marginBottom: '16px'
            }}>
              我擅长使用 React、Next.js、TypeScript 等现代技术栈构建高质量的 Web 应用。
            </p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#424242'
            }}>
              欢迎查看我的作品集，了解我的项目经验和技术能力。
            </p>
          </div>
        </Window>
      )}
      
      <CalendarWidget />
      <MemoWidget />
      <Dock />
    </main>
  );
}
