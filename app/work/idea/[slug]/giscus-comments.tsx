"use client";

import React, { useEffect } from 'react';

// Giscus 评论组件
export default function GiscusComments() {
  useEffect(() => {
    // 动态加载 Giscus 脚本
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'zhexusun10/my-blog');
    script.setAttribute('data-repo-id', 'R_kgDOOHa7zA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOOHa7zM4CoEb_');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // 检查是否已经存在带有 giscus 类的元素
    const giscusContainer = document.querySelector('.giscus');
    if (giscusContainer) {
      // 如果存在，则清空容器后添加脚本
      giscusContainer.innerHTML = '';
      giscusContainer.appendChild(script);
    } else {
      // 否则直接添加到 body
      document.body.appendChild(script);
    }

    return () => {
      // 清理函数
      if (giscusContainer && giscusContainer.contains(script)) {
        giscusContainer.removeChild(script);
      } else if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div className="giscus mt-8 pt-8 border-t border-gray-200 dark:border-gray-700" />;
} 