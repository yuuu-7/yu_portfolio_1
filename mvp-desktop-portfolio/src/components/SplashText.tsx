// components/SplashText.tsx
import React from 'react';

interface SplashTextProps {
  isVisible: boolean;
  fadeOutText?: boolean;
}

const SplashText = ({ isVisible, fadeOutText = false }: SplashTextProps) => {
  if (!isVisible) return null;

  return (
    <div 
      className="text-center mb-8 transition-opacity duration-[1500ms] ease-out" 
      style={{ 
        zIndex: 10, 
        lineHeight: '0.5', 
        position: 'absolute',
        left: '50%',
        top: '32%',
        transform: 'translate(-50%, -50%)',
        opacity: fadeOutText ? 0 : 1
      }}
    >
      <h1 
        className="font-bold mb-0" 
        style={{ 
          fontFamily: 'Helvetica-Bold, Helvetica, Arial, sans-serif', 
          color: '#ffffff', 
          textShadow: '0 0 20px rgba(255, 255, 255, 0.3)', 
          fontSize: '40px' 
        }}
      >
        Welcome to Huan Yu&apos;s study.
      </h1>
      <h2 
        className="font-bold mb-0" 
        style={{ 
          fontFamily: 'Helvetica-Bold, Helvetica, Arial, sans-serif', 
          color: '#ffffff', 
          textShadow: '0 0 20px rgba(255, 255, 255, 0.3)', 
          fontSize: '40px' 
        }}
      >
        Explore at your leisure.
      </h2>
      <h3 
        className="font-bold" 
        style={{ 
          fontFamily: 'Noto Sans SC, Source Han Sans, Noto Sans CJK SC, sans-serif', 
          color: '#ffffff', 
          textShadow: '0 0 20px rgba(255, 255, 255, 0.3)', 
          fontSize: '20px', 
          marginTop: '8px' 
        }}
      >
        环宇的书房向你敞开，请随意探索！
      </h3>
    </div>
  );
};

export default SplashText;
