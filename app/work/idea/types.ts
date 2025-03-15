// 定义文章的数据结构
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

// 定义搜索参数
export interface SearchParams {
  query?: string;
  tag?: string;
} 