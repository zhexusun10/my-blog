import { getBlogPostBySlug, blogPosts } from '../data';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import GiscusComments from './giscus-comments';
import { cn } from '@/lib/utils';

// 确保页面可以静态导出
export const dynamic = 'force-static';

// 为静态导出生成所有可能的路径参数
export function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

// 格式化日期
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 文章详情页组件
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  // 如果文章不存在，显示错误信息
  if (!post) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600 dark:text-gray-300">文章不存在</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        {/* 返回链接 */}
        <Link 
          href="/work/idea" 
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" /> 返回文章列表
        </Link>

        {/* 纸张效果的文章容器 */}
        <div className="relative mb-8">
          {/* 纸张阴影效果 - 多层阴影创造更真实的效果 */}
          <div className="absolute -inset-1 bg-gray-200 dark:bg-gray-700 rounded-lg -z-10"></div>
          <div className="absolute -inset-[6px] bg-gray-100 dark:bg-gray-800 rounded-lg -z-20 opacity-75"></div>
          
          {/* 主要纸张内容 */}
          <div className={cn(
            "bg-white dark:bg-gray-800 rounded-lg overflow-hidden",
            "border border-gray-200 dark:border-gray-700",
            "p-8",
            "shadow-[0_3px_10px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_3px_10px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.2)]",
            "relative",
            "after:absolute after:inset-0 after:bg-[radial-gradient(#00000009_1px,transparent_1px)] after:bg-[length:20px_20px] after:opacity-30 after:pointer-events-none",
            "dark:after:bg-[radial-gradient(#ffffff09_1px,transparent_1px)] dark:after:opacity-20"
          )}>
            {/* 文章标题 */}
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            {/* 文章元信息 */}
            <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 mb-8">
              <span className="mr-4">发布于 {formatDate(post.createdAt)}</span>
              {post.updatedAt && (
                <span className="mr-4">更新于 {formatDate(post.updatedAt)}</span>
              )}
            </div>

            {/* 封面图片 */}
            {post.coverImage && (
              <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden mb-8">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* 文章内容 */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* 文章标签 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link 
                    key={tag}
                    href={`/work/idea?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* 评论区 */}
            <GiscusComments />
          </div>
        </div>
      </div>
    </div>
  );
} 