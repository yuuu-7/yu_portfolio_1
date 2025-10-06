// components/SplashScreen.tsx
import React, { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onEnter: () => void;
  isLoading: boolean;
  progress: number;
  backgroundImage?: string; // 可选的背景图片
  isExpanding?: boolean; // 是否正在扩散
}

const SplashScreen = ({ onEnter, isLoading, progress, backgroundImage = '/garden-bg.jpg', isExpanding = false }: SplashScreenProps) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isButtonTransitioning, setIsButtonTransitioning] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
    
    // 开始按钮过渡效果
    setIsButtonTransitioning(true);
    
    // 短暂延迟后开始扩散效果
    setTimeout(() => {
      setButtonClicked(true);
      onEnter();
    }, 300); // 300ms的过渡时间
  };

  return (
    <div 
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
        zIndex: 9999
      }}
    >
      {!isLoading ? (
        <>
          <div className="text-center mb-8 transition-opacity duration-1000" style={{ zIndex: 10, lineHeight: '0.5', transform: 'translateY(-76px)' }}>
            <h1 className="font-bold mb-0" style={{ fontFamily: 'Helvetica-Bold, Helvetica, Arial, sans-serif', color: '#ffffff', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)', fontSize: '40px' }}>Welcome to Huan Yu's study.</h1>
            <h2 className="font-bold mb-0" style={{ fontFamily: 'Helvetica-Bold, Helvetica, Arial, sans-serif', color: '#ffffff', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)', fontSize: '40px' }}>Explore at your leisure.</h2>
            <h3 className="font-bold" style={{ fontFamily: 'Noto Sans SC, Source Han Sans, Noto Sans CJK SC, sans-serif', color: '#ffffff', textShadow: '0 0 20px rgba(255, 255, 255, 0.3)', fontSize: '20px', marginTop: '8px' }}>环宇的书房向你敞开，请随意探索！</h3>
          </div>
          <div className="relative" style={{ transform: 'translateY(95px)' }}>
            {/* 动态星云纹理层 - 最外层 */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                background: isButtonTransitioning 
                  ? 'rgba(0, 0, 0, 0.05)'
                  : `
                    radial-gradient(ellipse at 30% 20%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 50%, rgba(251, 146, 60, 0.08) 0%, transparent 70%),
                    conic-gradient(from 0deg at 50% 50%, 
                      rgba(251, 146, 60, 0.05) 0deg,
                      transparent 60deg,
                      rgba(251, 146, 60, 0.03) 120deg,
                      transparent 180deg,
                      rgba(251, 146, 60, 0.04) 240deg,
                      transparent 300deg,
                      rgba(251, 146, 60, 0.06) 360deg
                    )
                  `,
                filter: 'blur(60px)',
                transform: 'scale(4.2)',
                zIndex: -4,
                animation: 'nebulaFlow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite, breathe 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
            
            {/* 动态星云纹理层 - 外层 */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                background: isButtonTransitioning 
                  ? 'rgba(0, 0, 0, 0.1)'
                  : `
                    radial-gradient(ellipse at 40% 30%, rgba(251, 146, 60, 0.2) 0%, transparent 60%),
                    radial-gradient(ellipse at 60% 70%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                    conic-gradient(from 45deg at 50% 50%, 
                      rgba(251, 146, 60, 0.1) 0deg,
                      transparent 90deg,
                      rgba(251, 146, 60, 0.08) 180deg,
                      transparent 270deg,
                      rgba(251, 146, 60, 0.12) 360deg
                    )
                  `,
                filter: 'blur(45px)',
                transform: 'scale(3.5)',
                zIndex: -3,
                animation: 'nebulaFlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite reverse, breathe 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
            
            {/* 动态星云纹理层 - 中层 */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                background: isButtonTransitioning 
                  ? 'rgba(0, 0, 0, 0.2)'
                  : `
                    radial-gradient(ellipse at 25% 25%, rgba(251, 146, 60, 0.3) 0%, transparent 50%),
                    radial-gradient(ellipse at 75% 75%, rgba(251, 146, 60, 0.25) 0%, transparent 50%),
                    conic-gradient(from 90deg at 50% 50%, 
                      rgba(251, 146, 60, 0.2) 0deg,
                      transparent 120deg,
                      rgba(251, 146, 60, 0.15) 240deg,
                      transparent 360deg
                    )
                  `,
                filter: 'blur(32px)',
                transform: 'scale(2.8)',
                zIndex: -2,
                animation: 'nebulaFlow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite, breathe 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
            
            {/* 动态星云纹理层 - 内层 */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                background: isButtonTransitioning 
                  ? 'rgba(0, 0, 0, 0.4)'
                  : `
                    radial-gradient(ellipse at 50% 50%, rgba(251, 146, 60, 0.4) 0%, transparent 60%),
                    conic-gradient(from 135deg at 50% 50%, 
                      rgba(251, 146, 60, 0.3) 0deg,
                      transparent 180deg,
                      rgba(251, 146, 60, 0.25) 360deg
                    )
                  `,
                filter: 'blur(20px)',
                transform: 'scale(2.2)',
                zIndex: -1,
                animation: 'nebulaFlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite reverse, breathe 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
            
            {/* 额外模糊层 - 增加边缘柔和度 */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                background: isButtonTransitioning 
                  ? 'rgba(0, 0, 0, 0.02)'
                  : `
                    radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.08) 0%, transparent 70%),
                    radial-gradient(circle at 30% 30%, rgba(251, 146, 60, 0.05) 0%, transparent 80%),
                    radial-gradient(circle at 70% 70%, rgba(251, 146, 60, 0.06) 0%, transparent 75%)
                  `,
                filter: 'blur(80px)',
                transform: 'scale(5)',
                zIndex: -5,
                animation: 'nebulaFlow 10s cubic-bezier(0.4, 0, 0.6, 1) infinite, breathe 5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
            
            {/* ENTER按钮主体 - 正圆形，无边框，边缘模糊 */}
            <button
              ref={buttonRef}
              onClick={handleButtonClick}
              className={`text-white transition-all duration-300 ${
                buttonClicked 
                  ? 'opacity-0 scale-0' 
                  : 'hover:scale-105'
              }`}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: isButtonTransitioning 
                  ? 'rgba(0, 0, 0, 1)' 
                  : `
                    radial-gradient(circle at 30% 30%, rgba(251, 146, 60, 1) 0%, rgba(251, 146, 60, 0.9) 50%, rgba(251, 146, 60, 0.8) 100%),
                    conic-gradient(from 0deg at 50% 50%, 
                      rgba(251, 146, 60, 1) 0deg,
                      rgba(251, 146, 60, 0.9) 90deg,
                      rgba(251, 146, 60, 0.95) 180deg,
                      rgba(251, 146, 60, 0.85) 270deg,
                      rgba(251, 146, 60, 1) 360deg
                    )
                  `,
                transform: buttonClicked ? 'scale(0)' : 'scale(1)',
                opacity: buttonClicked ? 0 : 1,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '1px',
                boxShadow: isButtonTransitioning 
                  ? 'none' 
                  : '0 0 30px rgba(251, 146, 60, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(12px)',
                filter: 'blur(3px)',
                animation: 'breathe 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              ENTER
            </button>
          </div>
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
      
      {/* 扩散的黑色圆形 - 从按钮位置开始，逐渐变大覆盖整个页面 */}
      {isExpanding && (
        <div
          className="fixed pointer-events-none"
          style={{
            left: buttonPosition.x,
            top: buttonPosition.y,
            width: '100vw',
            height: '100vh',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999
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
              backgroundColor: 'rgba(0, 0, 0, 1)',
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
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
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