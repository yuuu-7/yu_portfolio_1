import DesktopScene from '@/components/DesktopScene';

export default function Home() {
  return (
    <DesktopScene>
      {/* macOS 风格的虚拟桌面 */}
      <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 relative overflow-hidden">
        {/* 桌面壁纸渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-400 to-pink-500 opacity-80"></div>
        
        {/* 桌面图标 */}
        <div className="absolute top-8 left-8 flex flex-col space-y-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
            <div className="text-2xl">📁</div>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
            <div className="text-2xl">📄</div>
          </div>
        </div>

        {/* 程序坞 (Dock) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="text-lg">💼</div>
            </div>
            <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="text-lg">👤</div>
            </div>
            <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="text-lg">📧</div>
            </div>
          </div>
        </div>

        {/* 桌面小组件 */}
        {/* 日历小组件 */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-white/20 backdrop-blur-md rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="text-xs text-white/80">今天</div>
          <div className="text-2xl font-bold text-white">5</div>
          <div className="text-xs text-white/80">十月</div>
        </div>

        {/* 备忘录小组件 */}
        <div className="absolute top-32 right-8 w-48 p-3 bg-yellow-200/80 backdrop-blur-md rounded-xl shadow-lg">
          <div className="text-sm font-bold text-gray-800 mb-1">备忘录</div>
          <div className="text-xs text-gray-700">欢迎来到我的创意空间！</div>
        </div>
      </div>
    </DesktopScene>
  );
}
