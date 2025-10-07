// data/projects.ts
export const projects = [
  { 
    id: 1, 
    title: '智能卡片管理系统', 
    description: '一个现代化的卡片式界面管理系统，支持拖拽排序和实时预览功能。采用 React 和 TypeScript 构建，具备完整的用户权限管理和数据持久化功能。', 
    images: [
      '/projects/project1-1.jpg',
      '/projects/project1-2.jpg',
      '/projects/project1-3.jpg'
    ],
    year: '2024', 
    role: '全栈开发者',
    tech: ['React', 'TypeScript', 'Node.js']
  },
  { 
    id: 2, 
    title: 'Next.js 企业门户', 
    description: '使用 Next.js 和 Tailwind CSS 构建的响应式企业门户网站，具备完整的用户认证系统。支持多语言切换、主题切换和移动端适配。', 
    images: [
      '/projects/project2-1.jpg',
      '/projects/project2-2.jpg',
      '/projects/project2-3.jpg'
    ],
    year: '2023', 
    role: '前端开发者',
    tech: ['Next.js', 'Tailwind CSS', 'Prisma']
  },
  { 
    id: 3, 
    title: '数据可视化仪表板', 
    description: '交互式数据可视化平台，支持多种图表类型和实时数据更新。提供丰富的数据分析工具和自定义报表功能。', 
    images: [
      '/projects/project3-1.jpg',
      '/projects/project3-2.jpg',
      '/projects/project3-3.jpg'
    ],
    year: '2023', 
    role: 'UI/UX 设计师',
    tech: ['D3.js', 'Vue.js', 'Python']
  },
];