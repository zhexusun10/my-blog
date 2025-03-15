import { searchBlogPosts } from './data';
import { BlogPost } from './types';
import BlogSearch from './blog-search';

// 确保页面可以静态导出
export const dynamic = 'force-static';

export default function IdeaPage() {
  // 获取所有文章
  const allPosts = searchBlogPosts();
  // 获取所有标签
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags)));

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      {/* 页面标题 */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">创意想法</h1>
      
      </div>

      {/* 搜索组件 */}
      <BlogSearch initialPosts={allPosts} allTags={allTags} />
    </div>
  );
} 