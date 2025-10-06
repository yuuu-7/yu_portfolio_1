# Tasks - 场景化数字桌面个人网站

## Phase 0: 初始化

### T0.1: 创建项目环境

  - **步骤 1: 创建 Next.js 项目**
    打开终端，运行以下命令，并根据提示选择默认选项（特别是使用 App Router）：
    ```bash
    npx create-next-app@latest digital-desktop-portfolio --typescript --tailwind --eslint --app
    ```
  - **步骤 2: 进入项目目录并启动**
    ```bash
    cd digital-desktop-portfolio
    npm run dev
    ```
  - **步骤 3: 验证**
    在浏览器中打开 `http://localhost:3000`。

验收：

  - [ ] 浏览器成功打开 `http://localhost:3000`。
  - [ ] 页面显示 Next.js 的欢迎页面。

-----

### T0.2: 清理项目与建立结构

  - **步骤 1: 清理默认样式**
    打开 `app/globals.css` 文件，删除所有内容，并替换为：
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body {
      background-color: #f0f2f5; /* 设置一个类似桌面的浅灰色背景 */
      color: #333;
      overflow: hidden; /* 防止滚动 */
    }
    ```
  - **步骤 2: 清理主页面**
    打开 `app/page.tsx` 文件，删除 `<main>` 标签内的所有内容，替换为一个简单的 div，作为桌面容器：
    ```tsx
    export default function Home() {
      return (
        <main className="h-screen w-screen">
          {/* 桌面内容将在这里构建 */}
        </main>
      );
    }
    ```
  - **步骤 3: 创建文件夹**
    在项目根目录下创建以下文件夹结构，用于存放组件、数据和静态资源：
    ```
    /
    ├── app/
    ├── components/      // 可复用组件
    ├── data/            // 存放模拟数据
    └── public/
        └── icons/       // 存放图标文件
    ```

验收：

  - [ ] `http://localhost:3000` 页面变成一个空白的浅灰色页面。
  - [ ] 项目中已创建 `components`, `data`, 和 `public/icons` 文件夹。

## Phase 1: 搭建核心桌面静态布局

### T1.1: 创建程序坞 (Dock)

  - **步骤 1: 创建 Dock 组件文件**
    在 `components` 文件夹下创建 `Dock.tsx` 文件。
  - **步骤 2: 编写 Dock 组件代码**
    粘贴以下代码到 `components/Dock.tsx`。这里我们先用灰色方块作为图标占位符。
    ```tsx
    // components/Dock.tsx
    import React from 'react';

    const dockIcons = ['Skill1', 'Skill2', 'Skill3', 'Skill4']; // 模拟技能图标

    const Dock = () => {
      return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-end justify-center h-16 p-2 space-x-2 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
            {dockIcons.map((icon) => (
              <div
                key={icon}
                className="w-12 h-12 bg-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110"
                title={icon} // 简单的悬停提示
              ></div>
            ))}
          </div>
        </div>
      );
    };

    export default Dock;
    ```
  - **步骤 3: 在主页面中使用 Dock**
    修改 `app/page.tsx`，导入并使用 Dock 组件：
    ```tsx
    // app/page.tsx
    import Dock from '@/components/Dock';

    export default function Home() {
      return (
        <main className="h-screen w-screen relative">
          {/* 桌面内容 */}
          <Dock />
        </main>
      );
    }
    ```

验收：

  - [ ] 页面底部中央出现一个半透明的圆角容器。
  - [ ] 容器内有4个灰色的方块作为图标占位符。

-----

### T1.2: 创建桌面小组件

  - **步骤 1: 创建日历组件**
    在 `components` 文件夹下创建 `CalendarWidget.tsx` 文件，并粘贴以下代码：
    ```tsx
    // components/CalendarWidget.tsx
    'use client'; // 因为使用了 new Date()，这是一个客户端组件
    import React from 'react';

    const CalendarWidget = () => {
      const today = new Date();
      const dateString = today.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const dayString = today.toLocaleDateString('zh-CN', { weekday: 'long' });

      return (
        <div className="absolute top-8 right-8 bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md w-48 text-center">
          <p className="text-lg font-semibold">{dateString}</p>
          <p className="text-2xl font-bold">{dayString}</p>
        </div>
      );
    };

    export default CalendarWidget;
    ```
  - **步骤 2: 创建备忘录组件**
    在 `components` 文件夹下创建 `MemoWidget.tsx` 文件，并粘贴以下代码：
    ```tsx
    // components/MemoWidget.tsx
    import React from 'react';

    const MemoWidget = () => {
      return (
        <div className="absolute top-40 right-8 bg-yellow-100/80 backdrop-blur-sm p-4 rounded-lg shadow-md w-48">
          <h3 className="font-bold border-b border-gray-400 pb-1 mb-2">备忘录</h3>
          <p className="text-sm">欢迎来到我的数字桌面！</p>
        </div>
      );
    };

    export default MemoWidget;
    ```
  - **步骤 3: 在主页面中使用小组件**
    修改 `app/page.tsx`，导入并使用这两个组件：
    ```tsx
    // app/page.tsx
    import Dock from '@/components/Dock';
    import CalendarWidget from '@/components/CalendarWidget';
    import MemoWidget from '@/components/MemoWidget';

    export default function Home() {
      return (
        <main className="h-screen w-screen relative">
          <CalendarWidget />
          <MemoWidget />
          <Dock />
        </main>
      );
    }
    ```

验收：

  - [ ] 页面右上角出现一个显示当前日期的日历卡片。
  - [ ] 日历下方出现一个黄色的备忘录卡片，显示欢迎词。

-----

### T1.3: 创建桌面图标

  - **步骤 1: 创建桌面图标组件**
    在 `components` 文件夹下创建 `DesktopIcon.tsx` 文件：
    ```tsx
    // components/DesktopIcon.tsx
    import React from 'react';

    interface DesktopIconProps {
      label: string;
    }

    const DesktopIcon = ({ label }: DesktopIconProps) => {
      return (
        <div className="flex flex-col items-center justify-center w-24 h-24 text-center cursor-pointer hover:bg-white/20 rounded-md p-2">
          {/* 这是一个临时的文件夹图标占位符 */}
          <div className="w-16 h-12 bg-orange-400 rounded-md mb-1"></div>
          <span className="text-sm text-white font-semibold" style={{ textShadow: '1px 1px 2px black' }}>
            {label}
          </span>
        </div>
      );
    };

    export default DesktopIcon;
    ```
  - **步骤 2: 在主页面上放置图标**
    修改 `app/page.tsx`，添加作品集和关于我两个图标：
    ```tsx
    // app/page.tsx
    import Dock from '@/components/Dock';
    import CalendarWidget from '@/components/CalendarWidget';
    import MemoWidget from '@/components/MemoWidget';
    import DesktopIcon from '@/components/DesktopIcon';

    export default function Home() {
      return (
        <main className="h-screen w-screen relative p-8">
          {/* 图标 */}
          <div className="flex flex-col space-y-4">
            <DesktopIcon label="我的作品" />
            <DesktopIcon label="关于我" />
          </div>
          
          <CalendarWidget />
          <MemoWidget />
          <Dock />
        </main>
      );
    }
    ```

验收：

  - [ ] 页面左上角出现两个图标，一个是“我的作品”，另一个是“关于我”。
  - [ ] 鼠标悬停在图标上时有轻微的背景高亮效果。

## Phase 2: 实现窗口系统与内容交互

### T2.1: 创建可复用窗口组件

  - **步骤 1: 创建 Window 组件文件**
    在 `components` 文件夹下创建 `Window.tsx` 文件。
  - **步骤 2: 编写 Window 组件代码**
    粘贴以下代码，这是一个带标题栏和关闭按钮的基础窗口框架。
    ```tsx
    // components/Window.tsx
    import React from 'react';

    interface WindowProps {
      title: string;
      onClose: () => void;
      children: React.ReactNode;
    }

    const Window = ({ title, onClose, children }: WindowProps) => {
      return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white rounded-lg shadow-2xl flex flex-col">
          {/* 标题栏 */}
          <div className="flex items-center justify-between h-10 bg-gray-200 rounded-t-lg px-4 border-b border-gray-300">
            <span className="font-semibold">{title}</span>
            <button
              onClick={onClose}
              className="w-6 h-6 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none"
              aria-label="Close"
            ></button>
          </div>
          {/* 内容区 */}
          <div className="p-4 flex-grow overflow-y-auto">
            {children}
          </div>
        </div>
      );
    };

    export default Window;
    ```

验收：

  - [ ] `Window.tsx` 组件已创建。
  - [ ] 组件代码包含标题栏、关闭按钮和内容区域（children）。

-----

### T2.2: 实现窗口的打开与关闭

  - **步骤 1: 在主页面中管理窗口状态**
    修改 `app/page.tsx`，使用 `useState` 来控制“我的作品”窗口的显示和隐藏。
    ```tsx
    // app/page.tsx
    'use client'; // 添加 'use client' 因为我们使用了 useState
    import { useState } from 'react';
    import Dock from '@/components/Dock';
    import CalendarWidget from '@/components/CalendarWidget';
    import MemoWidget from '@/components/MemoWidget';
    import DesktopIcon from '@/components/DesktopIcon';
    import Window from '@/components/Window'; // 导入 Window 组件

    export default function Home() {
      const [isProjectsWindowOpen, setProjectsWindowOpen] = useState(false);

      return (
        <main className="h-screen w-screen relative p-8">
          <div className="flex flex-col space-y-4">
            <div onClick={() => setProjectsWindowOpen(true)}>
              <DesktopIcon label="我的作品" />
            </div>
            <DesktopIcon label="关于我" />
          </div>

          {/* 条件渲染窗口 */}
          {isProjectsWindowOpen && (
            <Window title="我的作品" onClose={() => setProjectsWindowOpen(false)}>
              <p>这里是作品集内容...</p>
            </Window>
          )}
          
          <CalendarWidget />
          <MemoWidget />
          <Dock />
        </main>
      );
    }
    ```

验收：

  - [ ] 点击“我的作品”桌面图标，会弹出一个居中的窗口。
  - [ ] 点击窗口标题栏上的红色圆形按钮，窗口会关闭。

-----

### T2.3: 填充作品集与“关于我”内容

  - **步骤 1: 创建模拟数据**
    在 `data` 文件夹下创建 `projects.ts` 文件：
    ```ts
    // data/projects.ts
    export const projects = [
      { id: 1, title: '项目一', description: '这是一个非常酷的个人项目。', imageUrl: 'https://via.placeholder.com/150' },
      { id: 2, title: '项目二', description: '使用 Next.js 和 Tailwind CSS 构建。', imageUrl: 'https://via.placeholder.com/150' },
      { id: 3, title: '项目三', description: '一个关于数据可视化的作品。', imageUrl: 'https://via.placeholder.com/150' },
    ];
    ```
  - **步骤 2: 创建作品集内容组件**
    在 `components` 文件夹下创建 `ProjectsContent.tsx` 文件：
    ```tsx
    // components/ProjectsContent.tsx
    import { projects } from '@/data/projects';
    import Image from 'next/image';

    const ProjectsContent = () => {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project.id} className="border rounded-lg p-3">
              <Image src={project.imageUrl} alt={project.title} width={150} height={150} className="w-full h-auto rounded-md" />
              <h3 className="font-bold mt-2">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      );
    };

    export default ProjectsContent;
    ```
  - **步骤 3: 更新主页面逻辑**
    修改 `app/page.tsx`，添加“关于我”窗口的状态，并在两个窗口中分别使用对应的内容组件。
    ```tsx
    // app/page.tsx (只展示修改部分)
    'use client';
    import { useState } from 'react';
    // ... 其他 imports
    import Window from '@/components/Window';
    import ProjectsContent from '@/components/ProjectsContent'; // 导入新组件

    export default function Home() {
      const [isProjectsWindowOpen, setProjectsWindowOpen] = useState(false);
      const [isAboutWindowOpen, setAboutWindowOpen] = useState(false); // 新增状态

      return (
        <main className="h-screen w-screen relative p-8">
          <div className="flex flex-col space-y-4">
            <div onClick={() => setProjectsWindowOpen(true)}>
              <DesktopIcon label="我的作品" />
            </div>
            <div onClick={() => setAboutWindowOpen(true)}> {/* 新增点击事件 */}
              <DesktopIcon label="关于我" />
            </div>
          </div>

          {isProjectsWindowOpen && (
            <Window title="我的作品" onClose={() => setProjectsWindowOpen(false)}>
              <ProjectsContent /> {/* 使用作品集组件 */}
            </Window>
          )}

          {isAboutWindowOpen && (
            <Window title="关于我" onClose={() => setAboutWindowOpen(false)}>
              {/* 关于我内容 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">关于我</h2>
                <p>你好！我是一名热爱技术的开发者...</p>
              </div>
            </Window>
          )}
          
          {/* ... 其他组件 ... */}
          <Dock />
        </main>
      );
    }
    ```

验收：

  - [ ] 点击“我的作品”图标，弹出的窗口中会显示3个模拟项目。
  - [ ] 点击“关于我”图标，会弹出另一个显示个人简介的窗口。
  - [ ] 两个窗口可以独立打开和关闭。

## Phase 3: 完善核心交互与动效

### T3.1: 实现沉浸式进入动效

  - **步骤 1: 创建开屏组件**
    在 `components` 文件夹创建 `SplashScreen.tsx` 文件：
    ```tsx
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
    ```
  - **步骤 2: 在主页面管理加载状态**
    修改 `app/page.tsx`，引入一个新的状态来控制显示开屏还是桌面。
    ```tsx
    // app/page.tsx (只展示修改部分)
    'use client';
    import { useState, useEffect } from 'react';
    import SplashScreen from '@/components/SplashScreen'; // 导入开屏组件
    // ... 其他 imports

    export default function Home() {
      const [isDesktopVisible, setDesktopVisible] = useState(false);
      const [isProjectsWindowOpen, setProjectsWindowOpen] = useState(false);
      const [isAboutWindowOpen, setAboutWindowOpen] = useState(false);

      const handleEnter = () => {
        // 在这里可以添加更复杂的动画逻辑，目前先直接切换
        setDesktopVisible(true);
      };

      if (!isDesktopVisible) {
        return <SplashScreen onEnter={handleEnter} />;
      }

      return (
        <main className="h-screen w-screen relative p-8 animate-fadeIn"> {/* 使用动画 */}
          {/* ... 桌面所有组件 ... */}
        </main>
      );
    }
    ```
  - **步骤 3: 添加简单的淡入动画**
    在 `app/globals.css` 文件中添加一个简单的淡入动画效果：
    ```css
    /* app/globals.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* ... body 样式 ... */

    @keyframes fadeIn {
      from { opacity: 0; filter: blur(10px); }
      to { opacity: 1; filter: blur(0px); }
    }

    .animate-fadeIn {
      animation: fadeIn 1.5s ease-out forwards;
    }
    ```

验收：

  - [ ] 首次加载页面时，显示的是黑色的开屏界面和 "ENTER" 按钮。
  - [ ] 点击 "ENTER" 按钮后，开屏界面消失，桌面内容以淡入和去模糊的效果出现。

-----

### T3.2: 实现 Dock 悬停交互

  - **步骤 1: 创建技能数据**
    在 `data` 文件夹下创建 `skills.ts` 文件：
    ```ts
    // data/skills.ts
    export const skills = [
      { name: 'React', icon: 'R', relatedProjects: ['项目二'] },
      { name: 'Next.js', icon: 'N', relatedProjects: ['项目二'] },
      { name: 'Tailwind CSS', icon: 'T', relatedProjects: ['项目二'] },
      { name: 'TypeScript', icon: 'TS', relatedProjects: [] },
    ];
    ```
  - **步骤 2: 更新 Dock 组件**
    修改 `components/Dock.tsx`，使其能够处理悬停状态并显示提示。
    ```tsx
    // components/Dock.tsx
    'use client';
    import { useState } from 'react';
    import { skills } from '@/data/skills';

    const Dock = () => {
      const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

      return (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2"
          onMouseLeave={() => setHoveredSkill(null)} // 鼠标离开整个 Dock 区域时清除悬停状态
        >
          <div className="flex items-end justify-center h-16 p-2 space-x-2 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="relative flex items-center justify-center w-12 h-12 bg-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredSkill(skill.name)}
              >
                <span className="font-bold text-xl">{skill.icon}</span>

                {/* 悬停时显示的提示 */}
                {hoveredSkill === skill.name && (
                  <div className="absolute bottom-full mb-3 px-3 py-2 bg-black text-white text-sm rounded-md shadow-lg whitespace-nowrap">
                    <p className="font-bold">{skill.name}</p>
                    {skill.relatedProjects.length > 0 && (
                      <ul className="list-disc list-inside">
                        {skill.relatedProjects.map(p => <li key={p}>{p}</li>)}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default Dock;
    ```

验收：

  - [ ] Dock 中的图标变成了技能首字母。
  - [ ] 鼠标悬停在技能图标上时，图标上方会弹出一个黑色的提示框。
  - [ ] 提示框中会显示技能名称和关联的项目列表（如果存在）。

## Phase 4: 部署

### T4.1: 推送到 GitHub

  - **步骤 1: 创建 GitHub 仓库**
    在 GitHub.com 上创建一个新的空仓库（例如 `digital-desktop-portfolio`）。
  - **步骤 2: 初始化本地 Git 仓库并推送**
    在你的项目根目录打开终端，运行以下命令（请将 `YOUR_USERNAME` 和 `YOUR_REPONAME` 替换为你的 GitHub 用户名和仓库名）：
    ```bash
    git init -b main
    git add .
    git commit -m "Initial commit: Setup project and basic features"
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPONAME.git
    git push -u origin main
    ```

验收：

  - [ ] 你的代码已成功推送到 GitHub 仓库。
  - [ ] 在 GitHub 仓库页面上可以看到你的项目文件。

-----

### T4.2: 部署到 Vercel

  - **步骤 1: 注册并登录 Vercel**
    使用你的 GitHub 账户在 [Vercel.com](https://vercel.com/) 上注册并登录。
  - **步骤 2: 导入项目**
    在 Vercel 的控制面板上，点击 "Add New..." -\> "Project"。
    选择 "Continue with Git"，然后找到并选择你刚刚创建的 GitHub 仓库。
  - **步骤 3: 配置并部署**
    Vercel 会自动检测到这是一个 Next.js 项目，你无需修改任何配置。直接点击 "Deploy" 按钮。
  - **步骤 4: 等待部署完成**
    Vercel 会自动安装依赖、构建项目并进行部署。完成后，会提供一个公开的 URL。

验收：

  - [ ] 项目成功部署到 Vercel，并获得一个 `.vercel.app` 的域名。
  - [ ] 打开该域名，网站功能与本地开发环境（`localhost:3000`）完全一致。
  - [ ] 从开屏动画到打开/关闭窗口的所有功能均可正常使用。