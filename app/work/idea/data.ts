import { BlogPost } from './types';

// 模拟的博客文章数据
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-next-js',
    title: '开始使用 Next.js 开发',
    description: '本文介绍了如何使用 Next.js 框架开始构建现代化的 React 应用程序。',
    content: `
# 开始使用 Next.js 开发

Next.js 是一个基于 React 的全栈框架，它使构建高性能的 Web 应用程序变得简单。

## 为什么选择 Next.js?

1. **服务器端渲染** - 提高首屏加载速度和 SEO 友好性
2. **自动代码分割** - 只加载当前页面所需的 JavaScript
3. **内置 API 路由** - 轻松创建 API 端点
4. **简单的数据获取方法** - 支持多种数据获取策略
5. **优化图片处理** - 内置的图像优化组件

## 快速开始

创建一个新的 Next.js 应用程序：

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

现在你可以在浏览器中访问 http://localhost:3000 查看你的应用。

## 项目结构

Next.js 项目的基本结构如下：

\`\`\`
my-app/
  ├── app/          # 应用目录 (Next.js 13+)
  ├── public/       # 静态文件目录
  ├── components/   # React 组件
  ├── lib/          # 工具函数和库
  ├── package.json  # 项目依赖
  └── next.config.js # Next.js 配置文件
\`\`\`

## 页面路由

Next.js 13+ 使用基于文件系统的路由：

\`\`\`jsx
// app/page.tsx - 主页
export default function Home() {
  return <h1>欢迎来到 Next.js!</h1>;
}

// app/about/page.tsx - 关于页面
export default function About() {
  return <h1>关于我们</h1>;
}
\`\`\`

## 数据获取

Next.js 提供了几种数据获取方法：

\`\`\`jsx
// app/blog/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function BlogPage() {
  const data = await getData();
  
  return (
    <main>
      <h1>博客文章</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
\`\`\`

## 结论

Next.js 为构建现代化的 React 应用提供了强大而灵活的工具集。无论是个人项目还是企业级应用，它都能满足各种复杂需求。
    `,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    tags: ['Next.js', 'React', '前端开发', '教程'],
    createdAt: '2023-10-15T08:00:00Z',
    updatedAt: '2023-10-16T10:30:00Z',
  },
  {
    id: '2',
    slug: 'tailwind-css-tips-and-tricks',
    title: 'Tailwind CSS 使用技巧与窍门',
    description: '探索使用 Tailwind CSS 的一些高级技巧，让你的开发更加高效。',
    content: `
# Tailwind CSS 使用技巧与窍门

Tailwind CSS 是一个功能强大的 CSS 框架，采用实用优先的方法构建现代网站。下面分享一些使用 Tailwind 的高级技巧。

## 自定义配置

Tailwind 的一大优势是高度可定制化。通过 tailwind.config.js 文件，你可以定制几乎所有内容：

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': '#3B82F6',
        'brand-light': '#93C5FD',
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
\`\`\`

## 组件提取

虽然 Tailwind 鼓励直接在 HTML 中使用类，但对于重复的模式，提取组件是明智的做法：

\`\`\`jsx
// Button.js
export function Button({ children, variant = 'primary', ...props }) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
  };
  
  return (
    <button 
      className={\`\${baseClasses} \${variantClasses[variant]}\`}
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

## 使用 @apply 提取常用样式

对于经常重复的类组合，可以使用 @apply 指令：

\`\`\`css
/* globals.css */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500;
  }
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500;
  }
}
\`\`\`

然后在 HTML 中使用：

\`\`\`html
<button class="btn btn-primary">
  点击我
</button>
\`\`\`

## 响应式设计技巧

Tailwind 的响应式系统非常直观：

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  响应式文本大小
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  响应式网格
</div>
\`\`\`

## 深色模式

Tailwind v2.0 引入了内置的深色模式支持：

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  自动适应深色模式
</div>
\`\`\`

## 动态内容的样式

对于动态内容，可以使用模板字符串：

\`\`\`jsx
function StatusBadge({ status }) {
  const statusStyles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };
  
  return (
    <span className={\`px-2 py-1 rounded-full text-xs font-medium \${statusStyles[status]}\`}>
      {status}
    </span>
  );
}
\`\`\`

## 总结

Tailwind CSS 的灵活性和可定制性使其成为现代前端开发的强大工具。通过这些技巧，你可以更高效地使用 Tailwind，创建美观且功能丰富的用户界面。
    `,
    coverImage: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d',
    tags: ['CSS', 'Tailwind CSS', '前端开发', '设计'],
    createdAt: '2023-09-20T10:15:00Z',
  },
  {
    id: '3',
    slug: 'type-script-best-practices',
    title: 'TypeScript 最佳实践',
    description: '提高 TypeScript 代码质量和可维护性的最佳实践指南。',
    content: `
# TypeScript 最佳实践

TypeScript 通过为 JavaScript 添加静态类型检查增强了开发体验。以下是一些编写高质量 TypeScript 代码的最佳实践。

## 1. 使用严格的类型检查

在 tsconfig.json 中启用严格模式：

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

这将启用多项严格的类型检查，包括 strictNullChecks、noImplicitAny 等。

## 2. 避免使用 any 类型

\`any\` 类型会绕过类型检查，失去 TypeScript 的主要优势：

\`\`\`typescript
// 不好的做法
function processData(data: any) {
  return data.length; // 不安全，data 可能没有 length 属性
}

// 更好的做法
function processData(data: string | string[] | { length: number }) {
  return data.length; // 类型安全
}
\`\`\`

## 3. 利用接口描述对象形状

接口是 TypeScript 中描述对象形状的强大工具：

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  active?: boolean; // 可选属性
  readonly createdAt: Date; // 只读属性
}

function getUserInfo(user: User) {
  console.log(user.name);
}
\`\`\`

## 4. 使用函数重载表达复杂的函数类型

\`\`\`typescript
// 函数重载声明
function parseValue(value: string): string;
function parseValue(value: number): number;
function parseValue(value: boolean): string;
// 实现
function parseValue(value: string | number | boolean): string | number {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  return value;
}
\`\`\`

## 5. 使用泛型创建可重用组件

泛型使你能够创建可重用的组件：

\`\`\`typescript
// 一个通用的响应包装器
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// 使用泛型获取类型安全的响应
async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users');
  return response.json();
}
\`\`\`

## 6. 使用类型保护进行运行时类型检查

\`\`\`typescript
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

// 类型保护函数
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function getRandomPet(): Fish | Bird {
  return Math.random() > 0.5 ? 
    { swim: () => console.log("Swimming"), layEggs: () => console.log("Fish eggs") } :
    { fly: () => console.log("Flying"), layEggs: () => console.log("Bird eggs") };
}

const pet = getRandomPet();

if (isFish(pet)) {
  pet.swim(); // TypeScript 知道这是一条鱼
} else {
  pet.fly(); // TypeScript 知道这是一只鸟
}
\`\`\`

## 7. 使用枚举表示固定值集合

\`\`\`typescript
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER"
}

interface User {
  id: number;
  name: string;
  role: UserRole;
}

function hasEditPermission(user: User): boolean {
  return user.role === UserRole.Admin || user.role === UserRole.Editor;
}
\`\`\`

## 8. 使用命名空间组织相关功能

\`\`\`typescript
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      // 邮箱验证逻辑
      return s.includes('@');
    }
  }
}

const emailValidator = new Validation.EmailValidator();
\`\`\`

## 9. 利用索引签名处理动态属性

\`\`\`typescript
interface Dictionary<T> {
  [key: string]: T;
}

const cache: Dictionary<string> = {};
cache.foo = "bar"; // 允许
\`\`\`

## 总结

遵循这些最佳实践，可以帮助你编写更加健壮、可维护的 TypeScript 代码。TypeScript 的强大类型系统是一个强大的工具，正确使用可以显著提高代码质量和开发效率。
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    tags: ['TypeScript', 'JavaScript', '编程', '最佳实践'],
    createdAt: '2023-11-05T14:30:00Z',
    updatedAt: '2023-11-07T09:15:00Z',
  },
];

// 通过 slug 获取文章
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// 按标题和标签搜索文章
export function searchBlogPosts(query?: string, tag?: string): BlogPost[] {
  let filteredPosts = [...blogPosts];
  
  // 按标签过滤
  if (tag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }
  
  // 按查询字符串过滤（标题）
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) || 
      post.tags.some(t => t.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  return filteredPosts;
} 