// components/SplashScreen.tsx
import React, { useState, useRef } from 'react';
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

  // 使用传入的 buttonPosition 或本地状态
  const currentButtonPosition = buttonPosition || localButtonPosition;

  const handleButtonEnter = (position: { x: number; y: number }) => {
    setLocalButtonPosition(position);
    onEnter(position);
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
        zIndex: 9999,
        cursor: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDRDMTYuNDE4IDQgMjAgNy41ODIgMjAgMTJDMjAgMTYuNDE4IDE2LjQxOCAyMCAxMiAyMEM3LjU4MiAyMCA0IDE2LjQxOCA0IDEyQzQgNy41ODIgNy41ODIgNCAxMiA0WiIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjkiLz4KPHBhdGggZD0iTTEyIDlDMTMuNjU2OSA5IDE1IDEwLjM0MzEgMTUgMTJDMTUgMTMuNjU2OSAxMy42NTY5IDE1IDEyIDE1QzEwLjM0MzEgMTUgOSAxMy42NTY5IDkgMTJDOSAxMC4zNDMxIDEwLjM0MzEgOSAxMiA5WiIgZmlsbD0iIzAwMDAwMCIvPgo8L3N2Zz4K"), auto'
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