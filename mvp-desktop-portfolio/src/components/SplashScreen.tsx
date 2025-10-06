// components/SplashScreen.tsx
import React from 'react';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen = ({ onEnter }: SplashScreenProps) => {
  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white z-50">
      <h1 className="text-4xl mb-8">个人数字桌面</h1>
      <button
        onClick={onEnter}
        className="px-8 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
      >
        ENTER
      </button>
    </div>
  );
};
export default SplashScreen;
