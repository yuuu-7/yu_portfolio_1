// data/skills.ts
export const skills = [
  { 
    name: 'React', 
    icon: '⚛️', 
    mastery: '熟练掌握 React 生态系统，包括 Hooks、Context API、状态管理等核心概念。能够构建复杂的单页应用和组件库。',
    relatedProjects: [
      { id: 2, name: 'Next.js 企业门户', description: '使用 React 构建的现代化企业门户' }
    ]
  },
  { 
    name: 'Next.js', 
    icon: '▲', 
    mastery: '精通 Next.js 全栈开发，包括 SSR、SSG、API Routes 等特性。能够优化性能和 SEO，构建生产级应用。',
    relatedProjects: [
      { id: 2, name: 'Next.js 企业门户', description: '基于 Next.js 的响应式企业门户网站' }
    ]
  },
  { 
    name: 'Tailwind CSS', 
    icon: '🎨', 
    mastery: '熟练使用 Tailwind CSS 进行快速 UI 开发，能够创建响应式设计和自定义组件样式。',
    relatedProjects: [
      { id: 2, name: 'Next.js 企业门户', description: '使用 Tailwind CSS 构建的现代化界面' }
    ]
  },
  { 
    name: 'TypeScript', 
    icon: '🔷', 
    mastery: '深度掌握 TypeScript 类型系统，能够编写类型安全的代码，提升代码质量和开发效率。',
    relatedProjects: []
  },
];