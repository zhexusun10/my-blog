import { BlogPost } from './types';

// Blog post data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-next-js',
    title: 'Getting Started with Next.js',
    description: 'This article introduces how to start building modern React applications with the Next.js framework.',
    content: `
# Getting Started with Next.js

Next.js is a full-stack framework based on React that makes building high-performance web applications simple.

## Why Choose Next.js?

1. **Server-side Rendering** - Improves first-screen loading speed and SEO friendliness
2. **Automatic Code Splitting** - Only loads JavaScript needed for the current page
3. **Built-in API Routes** - Easily create API endpoints
4. **Simple Data Fetching Methods** - Supports multiple data fetching strategies
5. **Optimized Image Processing** - Built-in image optimization component

## Quick Start

Create a new Next.js application:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

Now you can visit http://localhost:3000 in your browser to view your application.

## Project Structure

The basic structure of a Next.js project is as follows:

\`\`\`
my-app/
  ├── app/          # Application directory (Next.js 13+)
  ├── public/       # Static files directory
  ├── components/   # React components
  ├── lib/          # Utility functions and libraries
  ├── package.json  # Project dependencies
  └── next.config.js # Next.js configuration file
\`\`\`

## Page Routing

Next.js 13+ uses file-system based routing:

\`\`\`jsx
// app/page.tsx - Home page
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}

// app/about/page.tsx - About page
export default function About() {
  return <h1>About Us</h1>;
}
\`\`\`

## Data Fetching

Next.js provides several methods for data fetching:

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
      <h1>Blog Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
\`\`\`

## Conclusion

Next.js provides a powerful and flexible toolkit for building modern React applications. Whether it's a personal project or an enterprise-level application, it can meet various complex requirements.
    `,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    tags: ['Next.js', 'React', 'Frontend Development', 'Tutorial'],
    createdAt: '2023-10-15T08:00:00Z',
    updatedAt: '2023-10-16T10:30:00Z',
  },
  {
    id: '2',
    slug: 'tailwind-css-tips-and-tricks',
    title: 'Tailwind CSS Tips and Tricks',
    description: 'Explore some advanced techniques for using Tailwind CSS to make your development more efficient.',
    content: `
# Tailwind CSS Tips and Tricks

Tailwind CSS is a powerful CSS framework that takes a utility-first approach to building modern websites. Here are some advanced tips for using Tailwind.

## Custom Configuration

One of Tailwind's major advantages is its high customizability. Through the tailwind.config.js file, you can customize almost everything:

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

## Component Extraction

While Tailwind encourages using classes directly in HTML, extracting components for repeated patterns is a wise practice:

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

## Using @apply to Extract Common Styles

For frequently repeated class combinations, you can use the @apply directive:

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

Then use in HTML:

\`\`\`html
<button class="btn btn-primary">
  Click Me
</button>
\`\`\`

## Responsive Design Tips

Tailwind's responsive system is very intuitive:

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
\`\`\`

## Dark Mode

Tailwind v2.0 introduced built-in dark mode support:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  Automatically adapts to dark mode
</div>
\`\`\`

## Styling Dynamic Content

For dynamic content, you can use template strings:

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

## Summary

Tailwind CSS's flexibility and customizability make it a powerful tool for modern frontend development. With these tips, you can use Tailwind more efficiently to create beautiful and feature-rich user interfaces.
    `,
    coverImage: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d',
    tags: ['CSS', 'Tailwind CSS', 'Frontend Development', 'Design'],
    createdAt: '2023-09-20T10:15:00Z',
  },
  {
    id: '3',
    slug: 'type-script-best-practices',
    title: 'TypeScript Best Practices',
    description: 'Best practices for improving TypeScript code quality and maintainability.',
    content: `
# TypeScript Best Practices

TypeScript enhances the development experience by adding static type checking to JavaScript. Here are some best practices for writing high-quality TypeScript code.

## 1. Use Strict Type Checking

Enable strict mode in tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

This enables multiple strict type checks, including strictNullChecks, noImplicitAny, etc.

## 2. Avoid Using any Type

\`any\` type bypasses type checking, losing the main advantage of TypeScript:

\`\`\`typescript
// Bad practice
function processData(data: any) {
  return data.length; // Unsafe, data may not have length property
}

// Better practice
function processData(data: string | string[] | { length: number }) {
  return data.length; // Type-safe
}
\`\`\`

## 3. Utilize Interface to Describe Object Shape

Interfaces are a powerful tool for describing object shapes in TypeScript:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  active?: boolean; // Optional property
  readonly createdAt: Date; // Read-only property
}

function getUserInfo(user: User) {
  console.log(user.name);
}
\`\`\`

## 4. Use Function Overloads to Express Complex Function Types

\`\`\`typescript
// Function overload declarations
function parseValue(value: string): string;
function parseValue(value: number): number;
function parseValue(value: boolean): string;
// Implementation
function parseValue(value: string | number | boolean): string | number {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  return value;
}
\`\`\`

## 5. Use Generics to Create Reusable Components

Generics allow you to create reusable components:

\`\`\`typescript
// A generic response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Use generics to get type-safe response
async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users');
  return response.json();
}
\`\`\`

## 6. Use Type Guards for Runtime Type Checking

\`\`\`typescript
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

// Type guard function
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
  pet.swim(); // TypeScript knows this is a fish
} else {
  pet.fly(); // TypeScript knows this is a bird
}
\`\`\`

## 7. Use Enums to Represent Fixed Value Sets

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

## 8. Use Namespaces to Organize Related Features

\`\`\`typescript
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      // Email validation logic
      return s.includes('@');
    }
  }
}

const emailValidator = new Validation.EmailValidator();
\`\`\`

## 9. Utilize Index Signatures to Handle Dynamic Properties

\`\`\`typescript
interface Dictionary<T> {
  [key: string]: T;
}

const cache: Dictionary<string> = {};
cache.foo = "bar"; // Allowed
\`\`\`

## Summary

Following these best practices can help you write more robust and maintainable TypeScript code. TypeScript's powerful type system is a powerful tool, and using it correctly can significantly improve code quality and development efficiency.
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Best Practices'],
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