````markdown
# Tasks - 个人创意桌面网站

## Phase 0: 初始化

### T0.1: 项目初始化 (Next.js + Tailwind CSS)
- **步骤 1: 创建项目**
  打开终端，执行以下命令来创建 Next.js 项目。在交互式提问中，请确保选择使用 `TypeScript` 和 `Tailwind CSS`。
  ```bash
  npx create-next-app@latest mvp-desktop-portfolio
````

  - **步骤 2: 进入项目目录**
    ```bash
    cd mvp-desktop-portfolio
    ```
  - **步骤 3: 启动开发服务器**
    ```bash
    npm run dev
    ```

**验收：**

  - [ ] 浏览器访问 `http://localhost:3000` 能看到 Next.js 的默认欢迎页面。
  - [ ] 项目根目录下生成了 `tailwind.config.ts` 文件。

-----

### T0.2: 清理与结构准备

  - **步骤 1: 清理默认样式**
    打开 `src/app/globals.css` 文件，删除除了最前面 `@tailwind` 指令之外的所有内容，保留如下：
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
  - **步骤 2: 清理首页内容**
    打开 `src/app/page.tsx` 文件，删除 `main` 标签内的所有内容，替换为一个简单的标题，如下所示：
    ```tsx
    export default function Home() {
      return (
        <main>
          <h1>我的虚拟桌面</h1>
        </main>
      );
    }
    ```
  - **步骤 3: 创建组件文件夹**
    在 `src` 目录下创建一个名为 `components` 的新文件夹，用于存放后续所有React组件。
    ```bash
    mkdir src/components
    ```

**验收：**

  - [ ] 访问 `http://localhost:3000` 页面背景变为纯白，只显示 "我的虚拟桌面" 文字。
  - [ ] `src` 目录下存在一个空的 `components` 文件夹。

## Phase 1: 场景与核心布局

### T1.1: 构建窗前桌面场景

  - **步骤 1: 准备背景图**
    在 `public` 目录下放入一张你喜欢的花园图片，并命名为 `garden-bg.jpg`。
  - **步骤 2: 创建场景组件**
    在 `src/components` 目录下创建 `DesktopScene.tsx` 文件，并写入以下代码，用于构建外部容器和窗户效果：
    ```tsx
    // src/components/DesktopScene.tsx
    import React from 'react';

    interface DesktopSceneProps {
      children: React.ReactNode;
    }

    const DesktopScene: React.FC<DesktopSceneProps> = ({ children }) => {
      return (
        <div className="w-full h-screen bg-gray-800 flex items-center justify-center font-sans">
          {/* Window Frame */}
          <div className="w-[90%] h-[90%] max-w-6xl max-h-4xl bg-gray-300 rounded-lg shadow-2xl p-4 flex flex-col">
            {/* Garden Background */}
            <div 
              className="flex-grow w-full h-1/2 bg-cover bg-center rounded-md"
              style={{ backgroundImage: "url('/garden-bg.jpg')" }}
            ></div>
            {/* Desk Surface */}
            <div className="w-full h-1/2 bg-yellow-900/50 pt-8 flex justify-center">
              {/* Laptop */}
              <div className="w-[80%] h-full bg-black rounded-t-lg p-2">
                {children}
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default DesktopScene;
    ```
  - **步骤 3: 应用场景组件**
    修改 `src/app/page.tsx`，引入并使用 `DesktopScene` 组件：
    ```tsx
    // src/app/page.tsx
    import DesktopScene from '@/components/DesktopScene';

    export default function Home() {
      return (
        <DesktopScene>
          {/* This will be our virtual screen content */}
          <div className="w-full h-full bg-blue-500 rounded-md">
            虚拟屏幕内容
          </div>
        </DesktopScene>
      );
    }
    ```

**验收：**

  - [ ] 页面展示了一个灰色窗口，上半部分是花园背景图。
  - [ ] 窗口下半部分是一个深色桌面，上面有一个黑色圆角的“笔记本电脑”，其内部是蓝色的“虚拟屏幕”。

## Phase 2: 虚拟屏幕与程序坞

### T2.1: 创建程序坞 (Dock)

  - **步骤 1: 创建 Dock 组件**
    在 `src/components` 目录下创建 `Dock.tsx` 文件，并写入以下代码：
    ```tsx
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
    ```
  - **步骤 2: 创建虚拟屏幕组件**
    在 `src/components` 目录下创建 `VirtualScreen.tsx` 文件，用于整合虚拟屏幕内的所有元素：
    ```tsx
    // src/components/VirtualScreen.tsx
    import Dock from './Dock';

    const VirtualScreen = () => {
      return (
        <div className="relative w-full h-full bg-cover bg-center rounded-md" style={{ backgroundImage: "url('/macos-bg.jpg')" }}>
          {/* Screen Content will go here */}
          
          <Dock />
        </div>
      );
    };

    export default VirtualScreen;
    ```
    *(注：请在 `public` 目录下准备一张名为 `macos-bg.jpg` 的壁纸图片)*
  - **步骤 3: 整合到主页面**
    修改 `src/app/page.tsx`，用 `VirtualScreen` 替换掉之前的蓝色 div：
    ```tsx
    // src/app/page.tsx
    import DesktopScene from '@/components/DesktopScene';
    import VirtualScreen from '@/components/VirtualScreen';

    export default function Home() {
      return (
        <DesktopScene>
          <VirtualScreen />
        </DesktopScene>
      );
    }
    ```

**验收：**

  - [ ] 虚拟屏幕区域显示了你选择的壁纸图片。
  - [ ] 屏幕底部中央出现了一个半透明的程序坞，包含三个灰色图标。
  - [ ] 鼠标悬停在图标上时，有轻微的放大效果。

### T2.2: 创建可交互窗口

  - **步骤 1: 创建窗口组件**
    在 `src/components` 目录下创建 `Window.tsx` 文件：
    ```tsx
    // src/components/Window.tsx
    import React from 'react';

    interface WindowProps {
      title: string;
      children: React.ReactNode;
      onClose: () => void;
    }

    const Window: React.FC<WindowProps> = ({ title, children, onClose }) => {
      return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 max-w-2xl bg-white/80 backdrop-blur-lg rounded-lg shadow-lg flex flex-col transition-all duration-300">
          {/* Title Bar */}
          <div className="w-full h-8 bg-gray-200/90 rounded-t-lg flex items-center px-2">
            <div className="flex space-x-2">
              <button onClick={onClose} className="w-3 h-3 bg-red-500 rounded-full"></button>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-center flex-grow text-sm font-medium text-gray-700">{title}</p>
          </div>
          {/* Content */}
          <div className="p-4 overflow-y-auto">
            {children}
          </div>
        </div>
      );
    };

    export default Window;
    ```
  - **步骤 2: 使用状态管理窗口**
    修改 `src/components/VirtualScreen.tsx`，引入 `useState` 和 `Window` 组件，并添加点击 Dock 打开窗口的逻辑：
    ```tsx
    // src/components/VirtualScreen.tsx
    'use client'; // Add this at the top

    import { useState } from 'react';
    import Dock from './Dock';
    import Window from './Window';

    const VirtualScreen = () => {
      const [openWindow, setOpenWindow] = useState<string | null>(null);

      const apps = [
        { id: 'Projects', title: '我的作品' },
        { id: 'AboutMe', title: '关于我.pdf' },
        { id: 'Contact', title: '咨询申请.docx' },
      ];

      return (
        <div className="relative w-full h-full bg-cover bg-center rounded-md" style={{ backgroundImage: "url('/macos-bg.jpg')" }}>
          
          {/* Windows rendering */}
          {openWindow === 'Projects' && (
            <Window title="我的作品" onClose={() => setOpenWindow(null)}>
              <p>作品列表将在这里展示。</p>
            </Window>
          )}
          {openWindow === 'AboutMe' && (
            <Window title="关于我.pdf" onClose={() => setOpenWindow(null)}>
              <p>个人简介内容。</p>
            </Window>
          )}
          {openWindow === 'Contact' && (
            <Window title="咨询申请.docx" onClose={() => setOpenWindow(null)}>
              <p>联系表单将在这里展示。</p>
            </Window>
          )}
          
          {/* Dock rendering */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-2 p-2 bg-white/20 backdrop-blur-md rounded-xl">
              {apps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setOpenWindow(app.id)}
                  className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  title={app.title}
                >
                  {app.id.substring(0, 2)}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    export default VirtualScreen;
    ```

**验收：**

  - [ ] 点击程序坞中的任意一个图标，屏幕中央会弹出一个带有标题栏的窗口。
  - [ ] 点击窗口左上角的红色按钮，该窗口会关闭。
  - [ ] 同一时间只能显示一个窗口。

## Phase 3: 内容填充

### T3.1: 填充“关于我”和“作品集”内容

  - **步骤 1: 准备作品数据**
    在 `src` 目录下创建一个 `data.ts` 文件，用于存放项目信息：
    ```ts
    // src/data.ts
    export const projects = [
      {
        id: 1,
        title: '项目一',
        description: '这是项目一的详细描述...',
        imageUrl: '[https://via.placeholder.com/300](https://via.placeholder.com/300)', // 替换为你的项目图片链接
      },
      {
        id: 2,
        title: '项目二',
        description: '这是项目二的详细描述...',
        imageUrl: '[https://via.placeholder.com/300](https://via.placeholder.com/300)',
      },
    ];
    ```
  - **步骤 2: 更新 VirtualScreen 以展示内容**
    修改 `src/components/VirtualScreen.tsx`，导入数据并填充到对应的窗口中：
    ```tsx
    // src/components/VirtualScreen.tsx
    // ... imports
    import { projects } from '@/data'; // 导入项目数据
    import Image from 'next/image'; // 导入 Image 组件

    // ... inside VirtualScreen component

    // Replace window content
    {openWindow === 'Projects' && (
      <Window title="我的作品" onClose={() => setOpenWindow(null)}>
        <ul className="space-y-4">
          {projects.map(project => (
            <li key={project.id} className="p-2 border rounded-md hover:bg-gray-100">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <Image src={project.imageUrl} alt={project.title} width={300} height={150} className="mt-2 rounded" />
            </li>
          ))}
        </ul>
      </Window>
    )}
    {openWindow === 'AboutMe' && (
      <Window title="关于我.pdf" onClose={() => setOpenWindow(null)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">环宇 (Your Name)</h2>
          <p>这里是你的个人简介。一名充满激情的前端开发者，致力于打造美观且用户友好的Web应用。擅长 React、Next.js 和 Tailwind CSS。</p>
          <p className="mt-4">欢迎通过联系表单与我交流！</p>
        </div>
      </Window>
    )}
    // ... rest of the component
    ```

**验收：**

  - [ ] 点击 "关于我" 图标，窗口中能正确显示个人简介文本。
  - [ ] 点击 "作品集" 图标，窗口中能以列表形式展示 `data.ts` 中定义的项目信息（图片和文字）。

### T3.2: 集成联系表单

  - **步骤 1: 获取 Tally.so 表单链接**
    前往 [Tally.so](https://tally.so/) 官网，注册并创建一个简单的联系表单（例如包含姓名、邮箱、消息字段）。创建完成后，点击 "Share" 并选择 "Embed"，复制嵌入链接 (URL)。
  - **步骤 2: 将表单嵌入窗口**
    修改 `src/components/VirtualScreen.tsx` 中 "Contact" 窗口的内容，使用 `iframe` 嵌入 Tally 表单：
    ```tsx
    // ... inside VirtualScreen component

    {openWindow === 'Contact' && (
      <Window title="咨询申请.docx" onClose={() => setOpenWindow(null)}>
        <iframe
          src="YOUR_TALLY_EMBED_URL" // <--- 替换成你的 Tally 表单链接
          className="w-full h-full border-0"
          title="Contact Form"
        ></iframe>
      </Window>
    )}

    // ... rest of the component
    ```
  - **步骤 3: 调整窗口组件以适应 iframe**
    修改 `src/components/Window.tsx`，让内容区域可以完全填充，以容纳 iframe。将 `<div className="p-4 overflow-y-auto">` 修改为 `<div className="p-1 flex-grow">`：
    ```tsx
    // src/components/Window.tsx

    // ... inside Window component
    {/* Content */}
    <div className="p-1 flex-grow">
      {children}
    </div>
    ```

**验收：**

  - [ ] 点击 "联系" 图标，窗口中成功加载并显示了 Tally.so 表单。
  - [ ] 在表单中填写内容并提交，能在 Tally.so 的后台看到提交的数据。

## Phase 4: 桌面小组件与响应式

### T4.1: 实现日历和备忘录小组件

  - **步骤 1: 创建小组件**
    在 `src/components` 中创建 `Widgets.tsx` 文件，包含日历和备忘录：
    ```tsx
    // src/components/Widgets.tsx
    'use client';
    import { useEffect, useState } from 'react';

    export const CalendarWidget = () => {
      const [date, setDate] = useState(new Date());
      
      useEffect(() => {
        // For accuracy, though not strictly needed for just the date
        const timer = setInterval(() => setDate(new Date()), 60000);
        return () => clearInterval(timer);
      }, []);

      const day = date.getDate();
      const dayName = date.toLocaleDateString('zh-CN', { weekday: 'long' });

      return (
        <div className="absolute top-8 right-8 w-24 h-24 bg-white/80 backdrop-blur-md rounded-lg flex flex-col items-center justify-center text-black shadow-md">
          <p className="text-xs">{dayName}</p>
          <p className="text-4xl font-bold">{day}</p>
        </div>
      );
    };

    export const MemoWidget = () => {
      return (
        <div className="absolute top-8 left-8 w-48 p-3 bg-yellow-200/80 backdrop-blur-md rounded-lg shadow-md text-sm text-gray-800">
          <p className="font-bold mb-1">备忘录</p>
          <p>欢迎来到我的创意空间！点击下方的图标来了解更多关于我的信息。</p>
        </div>
      );
    };
    ```
  - **步骤 2: 添加到虚拟屏幕**
    在 `src/components/VirtualScreen.tsx` 中引入并使用这两个小组件：
    ```tsx
    // src/components/VirtualScreen.tsx
    // ... imports
    import { CalendarWidget, MemoWidget } from './Widgets';

    // ... inside VirtualScreen component
    return (
      <div className="relative ...">
        <CalendarWidget />
        <MemoWidget />
        
        {/* Windows rendering... */}
        {/* Dock rendering... */}
      </div>
    );
    ```

**验收：**

  - [ ] 虚拟屏幕的右上角出现一个显示当天日期的日历小组件。
  - [ ] 虚拟屏幕的左上角出现一个黄色的备忘录小组件，显示固定的欢迎词。

### T4.2: 实现基础响应式设计

  - **步骤 1: 调整主页面布局**
    修改 `src/app/page.tsx`，使用 Tailwind CSS 的响应式前缀 (`md:`) 来在小屏幕设备上隐藏外部桌面场景：
    ```tsx
    // src/app/page.tsx
    import DesktopScene from '@/components/DesktopScene';
    import VirtualScreen from '@/components/VirtualScreen';

    export default function Home() {
      return (
        <main>
          {/* Hidden on mobile, shown on medium screens and up */}
          <div className="hidden md:block">
            <DesktopScene>
              <VirtualScreen />
            </DesktopScene>
          </div>
          
          {/* Shown on mobile, hidden on medium screens and up */}
          <div className="block md:hidden w-full h-screen">
            <VirtualScreen />
          </div>
        </main>
      );
    }
    ```
  - **步骤 2: 调整窗口在移动端的尺寸**
    修改 `src/components/Window.tsx`，让窗口在移动端全屏显示：
    ```tsx
    // src/components/Window.tsx
    // ... inside Window component
    return (
      <div className="absolute top-0 left-0 w-full h-full md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-3/4 md:h-3/4 max-w-2xl bg-white/80 backdrop-blur-lg md:rounded-lg shadow-lg flex flex-col transition-all duration-300">
        {/* ... rest of the component */}
      </div>
    );
    ```

**验收：**

  - [ ] 在桌面浏览器中，网站显示完整的“窗前桌面”场景。
  - [ ] 使用浏览器的开发者工具切换到手机视图（例如 iPhone 12），外部场景消失，只直接展示“虚拟屏幕”的内容。
  - [ ] 在手机视图下打开一个窗口，该窗口会占满整个屏幕。

## Phase 5: 部署

### T5.1: 推送到 GitHub

  - **步骤 1: 初始化 Git**
    ```bash
    git init
    git add .
    git commit -m "Initial commit: MVP complete"
    ```
  - **步骤 2: 创建 GitHub 仓库**
    在 [GitHub](https://github.com/) 上创建一个新的空仓库（不要勾选 `README` 或 `.gitignore`）。
  - **步骤 3: 关联并推送代码**
    复制你新仓库的地址，并在终端执行以下命令：
    ```bash
    git remote add origin YOUR_GITHUB_REPOSITORY_URL.git
    git branch -M main
    git push -u origin main
    ```

**验收：**

  - [ ] 你的所有项目代码都已成功上传到 GitHub 仓库。

### T5.2: 部署到 Vercel

  - **步骤 1: 注册并登录 Vercel**
    使用你的 GitHub 账户在 [Vercel](https://vercel.com/) 官网上注册并登录。
  - **步骤 2: 导入项目**
    在 Vercel 的 Dashboard 页面，点击 "Add New..." -\> "Project"。从列表中找到并选择你刚刚推送的 GitHub 仓库，点击 "Import"。
  - **步骤 3: 配置并部署**
    Vercel 会自动识别出这是 Next.js 项目，通常无需任何额外配置。直接点击 "Deploy" 按钮。
  - **步骤 4: 等待部署完成**
    Vercel 将会自动构建并部署你的网站。完成后，会提供一个公开的 URL。

**验收：**

  - [ ] Vercel 上的部署过程没有报错并成功完成。
  - [ ] 你可以通过 Vercel 提供的 `*.vercel.app` 域名公开访问你的创意桌面网站。
  - [ ] 网站在公开域名上的所有功能都和本地开发时一样正常。

<!-- end list -->

```
```