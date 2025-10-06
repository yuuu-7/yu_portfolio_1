// components/SplashScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import SplashText from './SplashText';
import SplashButton from './SplashButton';

interface SplashScreenProps {
  onEnter: (position: { x: number; y: number }) => void;
  isLoading: boolean;
  progress: number;
  backgroundImage?: string; // 可选的背景图片
  isExpanding?: boolean; // 是否正在扩散
  buttonPosition?: { x: number; y: number }; // 按钮位置
  fadeOutText?: boolean; // 文字是否在最后1秒淡出
}

const SplashScreen = ({ onEnter, isLoading, progress, backgroundImage = '/garden-bg.jpg', isExpanding = false, buttonPosition, fadeOutText = false }: SplashScreenProps) => {
  const [localButtonPosition, setLocalButtonPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 使用传入的 buttonPosition 或本地状态
  const currentButtonPosition = buttonPosition || localButtonPosition;

  const handleButtonEnter = (position: { x: number; y: number }) => {
    setLocalButtonPosition(position);
    onEnter(position);
  };

  // 生成动态眼睛光标
  const generateEyesCursor = (mouseX: number, mouseY: number) => {
    if (!containerRef.current) return 'auto';
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 计算相对于中心的角度
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const angle = Math.atan2(deltaY, deltaX);
    
    // 计算眼珠偏移（限制在眼窝内）
    const maxOffset = 3.5; // 稍微缩小后，适当调整偏移
    const offsetX = Math.cos(angle) * maxOffset;
    const offsetY = Math.sin(angle) * maxOffset;
    
    // 生成眼睛 SVG
    const svg = `
      <svg width="44" height="22" viewBox="0 0 44 22" xmlns="http://www.w3.org/2000/svg">
        <!-- 左眼外白边框 -->
        <ellipse cx="11" cy="11" rx="8.8" ry="5.8" fill="none" stroke="white" stroke-width="1.2"/>
        <!-- 左眼主体（含内阴影描边） -->
        <ellipse cx="11" cy="11" rx="8" ry="5" fill="white" stroke="rgba(0,0,0,0.25)" stroke-width="0.8"/>
        <circle cx="${11 + offsetX}" cy="${11 + offsetY}" r="2.6" fill="black"/>
        
        <!-- 右眼外白边框 -->
        <ellipse cx="33" cy="11" rx="8.8" ry="5.8" fill="none" stroke="white" stroke-width="1.2"/>
        <!-- 右眼主体（含内阴影描边） -->
        <ellipse cx="33" cy="11" rx="8" ry="5" fill="white" stroke="rgba(0,0,0,0.25)" stroke-width="0.8"/>
        <circle cx="${33 + offsetX}" cy="${11 + offsetY}" r="2.6" fill="black"/>
      </svg>
    `;
    
    // 使用 UTF-8 编码避免 btoa 的 Latin1 限制
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}"), auto`;
  };

  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center text-white z-50 transition-all duration-1000 ease-out"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: isLoading ? 'rgba(0, 0, 0, 1)' : (isExpanding ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.2)'),
        backdropFilter: isLoading ? 'blur(0px)' : 'blur(5px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        cursor: generateEyesCursor(mousePosition.x, mousePosition.y)
      }}
    >
      {!isLoading ? (
        <>
          {/* 文字组件 */}
          <SplashText isVisible={true} fadeOutText={fadeOutText} />
          
          {/* 按钮组件 */}
          <SplashButton onEnter={handleButtonEnter} isVisible={true} isExpanding={isExpanding} />
        </>
      ) : (
        <>
          <h1 className="text-4xl mb-8 animate-pulse">正在加载桌面...</h1>
          {/* 进度条容器 */}
          <div className="w-80 h-3 bg-gray-800 rounded-full overflow-hidden mb-4 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xl text-gray-200 font-semibold">{Math.round(progress)}%</p>
        </>
      )}
      
      {/* 扩散的橙色圆形 - 在文字层之下扩散，不覆盖文字 */}
      {isExpanding && currentButtonPosition.x > 0 && currentButtonPosition.y > 0 && (
        <div
          className="fixed pointer-events-none"
          style={{
            left: currentButtonPosition.x,
            top: currentButtonPosition.y,
            width: '100vw',
            height: '100vh',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        >
          {/* 核心圆形 - 从按钮大小开始，逐渐变大 */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '80px', // 按钮宽度
              height: '80px', // 按钮高度
              background: 'radial-gradient(circle, rgba(251, 146, 60, 1) 0%, rgba(251, 146, 60, 0.9) 50%, rgba(251, 146, 60, 0.8) 100%)',
              borderRadius: '50%', // 圆形
              transform: 'translate(-50%, -50%)',
              animation: 'expandCircleToFullScreen 2s ease-out forwards'
            }}
          />
          
          {/* 弥散层1 - 内层模糊 */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.9) 0%, rgba(251, 146, 60, 0.7) 50%, rgba(251, 146, 60, 0.5) 100%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(5px)',
              animation: 'expandCircleToFullScreen 2s ease-out forwards'
            }}
          />
          
          {/* 弥散层2 - 中层模糊 */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.7) 0%, rgba(251, 146, 60, 0.5) 50%, rgba(251, 146, 60, 0.3) 100%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(10px)',
              animation: 'expandCircleToFullScreen 2s ease-out forwards'
            }}
          />
          
          {/* 弥散层3 - 外层模糊 */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.5) 0%, rgba(251, 146, 60, 0.3) 50%, rgba(251, 146, 60, 0.1) 100%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(15px)',
              animation: 'expandCircleToFullScreen 2s ease-out forwards'
            }}
          />
          
          {/* 弥散层4 - 最外层模糊 */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, rgba(251, 146, 60, 0.15) 50%, rgba(251, 146, 60, 0.05) 100%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(25px)',
              animation: 'expandCircleToFullScreen 2s ease-out forwards'
            }}
          />
        </div>
      )}
    </div>
  );
};
export default SplashScreen;