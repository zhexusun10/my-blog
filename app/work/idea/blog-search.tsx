"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SimplifiedCard } from '@/components/ui/simplified-card';
import { BlogPost, SearchParams } from './types';
import { Search } from 'lucide-react';
import { searchBlogPosts } from './data';
import ProfileCard from './profile-card';

interface BlogSearchProps {
  initialPosts: BlogPost[];
  allTags: string[];
}

export default function BlogSearch({ initialPosts, allTags }: BlogSearchProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    tag: ''
  });

  // 处理搜索和筛选
  useEffect(() => {
    const filteredPosts = searchBlogPosts(searchParams.query, searchParams.tag);
    setPosts(filteredPosts);
  }, [searchParams]);

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({ ...prev, query: e.target.value }));
  };

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    setSearchParams(prev => ({
      ...prev,
      tag: prev.tag === tag ? '' : tag
    }));
  };

  // 清除搜索和筛选
  const handleClearSearch = () => {
    setSearchParams({ query: '', tag: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 左侧个人简介 */}
      <div className="lg:col-span-1">
        <ProfileCard />
      </div>

      {/* 右侧搜索和文章列表 */}
      <div className="lg:col-span-2">
        {/* 搜索栏 */}
        <div className="mb-6">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchParams.query}
              onChange={handleSearchChange}
              placeholder="搜索文章或标签..."
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            
            {(searchParams.query || searchParams.tag) && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* 当前选中的标签 */}
          {searchParams.tag && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">当前筛选:</span>
              <span 
                className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-lg text-sm flex items-center gap-1 cursor-pointer"
                onClick={() => setSearchParams(prev => ({ ...prev, tag: '' }))}
              >
                {searchParams.tag}
                <span className="font-bold">×</span>
              </span>
            </div>
          )}
        </div>

        {/* 标签云 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">标签</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  searchParams.tag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 - 竖向排列 */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map(post => (
              <Link 
                key={post.id} 
                href={`/work/idea/${post.slug}`}
                className="block hover:no-underline"
              >
                <SimplifiedCard
                  title={post.title}
                  description={[post.description]}
                  timestamp={new Date(post.createdAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  tags={post.tags}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">没有找到匹配的文章</p>
            <button
              onClick={handleClearSearch}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              清除筛选
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 