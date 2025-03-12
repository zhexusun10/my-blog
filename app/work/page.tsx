"use client";

import React, { useRef, useState, useEffect } from "react";
import { WorkNavBar } from "@/components/ui/work-navbar";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { FileText, Briefcase, User, Lightbulb, Github } from "lucide-react";

// 定义导航项
const navItems = [
  {
    name: "About",
    url: "#about",
    icon: User,
  },
  {
    name: "Project",
    url: "#project",
    icon: Briefcase,
  },
  {
    name: "Resume",
    url: "#resume",
    icon: FileText,
  },
  {
    name: "Ideas",
    url: "#ideas",
    icon: Lightbulb,
  },
];

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("About");
  const [scrolling, setScrolling] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  // 处理导航点击
  const handleNavClick = (sectionId: string) => {
    if (scrolling) return;
    
    setScrolling(true);
    
    // 找到对应的部分索引
    const sectionIndex = navItems.findIndex(item => item.url === `#${sectionId}`);
    if (sectionIndex === -1) return;
    
    setCurrentSectionIndex(sectionIndex);
    
    // 计算滚动位置
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const scrollLeft = sectionIndex * containerWidth;
      
      // 使用 scrollTo 进行平滑滚动
      containerRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      
      // 更新活动部分
      setActiveSection(navItems[sectionIndex].name);
      
      // 滚动完成后重置滚动状态
      setTimeout(() => {
        setScrolling(false);
      }, 400);
    }
  };

  // 监听滚动事件，更新活动部分
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrolling) return;
      
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.clientWidth;
      
      // 计算当前活动部分
      const sectionIndex = Math.round(scrollPosition / containerWidth);
      
      if (sectionIndex >= 0 && sectionIndex < navItems.length) {
        const sectionName = navItems[sectionIndex].name;
        
        if (activeSection !== sectionName) {
          setActiveSection(sectionName);
          setCurrentSectionIndex(sectionIndex);
        }
      }
    };

    // 使用 throttle 减少滚动事件触发频率
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", throttledHandleScroll);
    return () => container.removeEventListener("scroll", throttledHandleScroll);
  }, [activeSection, scrolling]);

  // 处理触摸滑动
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartXRef.current) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartXRef.current - touchEndX;
      
      // 向左滑动 (diff > 0) 显示下一个部分
      // 向右滑动 (diff < 0) 显示上一个部分
      if (Math.abs(diff) > 50) { // 最小滑动距离
        const currentIndex = navItems.findIndex(item => item.name === activeSection);
        if (diff > 0 && currentIndex < navItems.length - 1) {
          handleNavClick(navItems[currentIndex + 1].url.replace('#', ''));
        } else if (diff < 0 && currentIndex > 0) {
          handleNavClick(navItems[currentIndex - 1].url.replace('#', ''));
        }
      }
      
      touchStartXRef.current = null;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, handleNavClick, touchStartXRef]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 水平滚动容器 */}
      <div 
        ref={containerRef}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory"
        }}
      >
        {/* About部分 */}
        <section 
          id="about" 
          className="flex-shrink-0 w-full h-full snap-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            <p className="text-xl max-w-2xl text-center">
              这里是关于我的个人介绍，包括我的背景、兴趣和专业领域。
            </p>
            {/* 这里可以添加个人简介和照片 */}
          </div>
        </section>

        {/* Project部分 */}
        <section 
          id="project" 
          className="flex-shrink-0 w-full h-full snap-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <h2 className="text-4xl font-bold mb-8">My Projects</h2>
            <p className="text-xl max-w-2xl text-center mb-8">
              这里展示我的项目作品集，包括网站开发、应用程序和其他创意项目。
            </p>
            
            {/* GitHub链接按钮 */}
            <a 
              href="https://github.com/zhexusun10" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#24292e] hover:bg-[#1b1f23] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 mt-4"
            >
              <Github className="w-6 h-6" />
              <span>Visit My GitHub</span>
            </a>
            
            {/* 这里可以添加项目卡片或列表 */}
          </div>
        </section>

        {/* Resume部分 */}
        <section 
          id="resume" 
          className="flex-shrink-0 w-full h-full snap-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <h2 className="text-4xl font-bold mb-8">Resume</h2>
            <p className="text-xl max-w-2xl text-center">
              我的教育背景、工作经验和专业技能。
            </p>
            {/* 这里可以添加简历内容 */}
          </div>
        </section>

        {/* Ideas部分 */}
        <section 
          id="ideas" 
          className="flex-shrink-0 w-full h-full snap-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <h2 className="text-4xl font-bold mb-8">Ideas</h2>
            <p className="text-xl max-w-2xl text-center">
              我的创意想法和概念，包括未来项目和实验性作品。
            </p>
            {/* 这里可以添加创意想法展示 */}
          </div>
        </section>
      </div>

      {/* 导航栏 */}
      <WorkNavBar 
        items={navItems} 
        className="bottom-8"
        onNavClick={handleNavClick}
        activeSection={activeSection}
      />

      {/* 添加自定义滚动样式 */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 