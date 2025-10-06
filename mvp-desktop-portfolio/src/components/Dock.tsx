// src/components/Dock.tsx
const Dock = () => {
  const apps = ['Projects', 'AboutMe', 'Contact'];

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
      <div className="flex items-center space-x-2 p-2 bg-white/20 backdrop-blur-md rounded-xl">
        {apps.map((app) => (
          <div
            key={app}
            className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
          >
            {app.substring(0, 2)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;
