'use client';
import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Dock from '@/components/Dock';
import CalendarWidget from '@/components/CalendarWidget';
import MemoWidget from '@/components/MemoWidget';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import ProjectsContent from '@/components/ProjectsContent';
import ExitButton from '@/components/ExitButton';

export default function Home() {
  const [isDesktopVisible, setDesktopVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProjectsWindowOpen, setProjectsWindowOpen] = useState(false);
  const [isAboutWindowOpen, setAboutWindowOpen] = useState(false);

  const handleEnter = () => {
    // 开始扩散效果
    setIsExpanding(true);
    
    // 2秒后开始加载过程（等待圆点扩散完成）
    setTimeout(() => {
      setIsLoading(true);
      setProgress(0);
      setDesktopVisible(true);
      
      // 模拟加载过程，从全黑逐渐变清晰
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // 加载完成后停止加载状态
            setTimeout(() => {
              setIsLoading(false);
              setIsExpanding(false);
            }, 500); // 缩短加载完成后的等待时间
            return 100;
          }
          return prev + Math.random() * 3 + 2; // 调整进度增长速度
        });
      }, 80); // 更频繁的更新
    }, 2000); // 2秒后开始显示桌面
  };

  const handleExit = () => {
    // 关闭所有窗口
    setProjectsWindowOpen(false);
    setAboutWindowOpen(false);
    // 返回开屏界面
    setDesktopVisible(false);
  };

  return (
    <div className="w-full h-full">
      {/* 开屏界面 */}
      {!isDesktopVisible && (
        <SplashScreen onEnter={handleEnter} isLoading={isLoading} progress={progress} backgroundImage="/garden-bg.jpg" isExpanding={isExpanding} />
      )}
      
      {/* 桌面内容 */}
      {isDesktopVisible && (
        <main 
          className="h-screen w-screen relative" 
          style={{ 
            backgroundImage: 'url(/desktop-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: isLoading ? progress / 100 : 1,
            filter: isLoading ? `blur(${15 - (progress / 100) * 15}px) brightness(${0.1 + (progress / 100) * 0.9})` : 'blur(0px) brightness(1)',
            transition: 'opacity 0.8s ease-out, filter 1.2s ease-out, brightness 1.2s ease-out',
            transform: isLoading ? `scale(${0.99 + (progress / 100) * 0.01})` : 'scale(1)',
            backgroundColor: isLoading ? `rgba(0, 0, 0, ${1 - progress / 100})` : 'transparent'
          }}
        >
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
          <ExitButton onExit={handleExit} />
          <Dock />
        </main>
      )}
      
      {/* 加载过渡层 - 只在扩散完成后显示 */}
      {isLoading && !isExpanding && (
        <div 
          className="fixed inset-0 w-full h-full z-50 transition-all duration-1000"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 1)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9998,
            opacity: isLoading ? 1 : 0
          }}
        >
          {/* 毛玻璃进度条容器 */}
          <div 
            className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-center"
            style={{
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* 进度条背景 */}
            <div 
              className="relative w-80 h-2 rounded-full overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* 进度条填充 */}
              <div 
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  background: 'linear-gradient(90deg, rgba(251, 146, 60, 0.8) 0%, rgba(251, 146, 60, 0.6) 50%, rgba(251, 146, 60, 0.4) 100%)',
                  width: `${progress}%`,
                  boxShadow: '0 0 15px rgba(251, 146, 60, 0.5)',
                  filter: 'blur(0.5px)'
                }}
              />
              
              {/* 进度条光效 */}
              <div 
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  width: `${progress}%`,
                  animation: 'progressShine 2s ease-in-out infinite'
                }}
              />
            </div>
            
            {/* 进度百分比文字 */}
            <div 
              className="absolute bottom-8 text-white text-sm font-medium"
              style={{
                textShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
                fontFamily: 'Helvetica, Arial, sans-serif'
              }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
