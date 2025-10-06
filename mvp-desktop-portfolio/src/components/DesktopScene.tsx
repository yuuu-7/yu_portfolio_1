// src/components/DesktopScene.tsx
import React from 'react';

interface DesktopSceneProps {
  children: React.ReactNode;
}

const DesktopScene: React.FC<DesktopSceneProps> = ({ children }) => {
  return (
    <div className="w-full h-screen font-sans overflow-hidden relative">
      {/* 真实桌面场景背景图片 */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/desktop_scene.jpg')" }}
      ></div>
      
      {/* 笔记本电脑屏幕区域 - 精确定位到图片中的屏幕位置 */}
      <div className="absolute top-[60%] left-[50%] transform -translate-x-1/2 w-[12.5%] h-[14.5%]">
        {/* 屏幕内容区域 */}
        <div className="w-full h-full bg-white rounded-lg shadow-2xl border-2 border-gray-300 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DesktopScene;
