"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { WorkNavBar } from "@/components/ui/work-navbar";
import { FileText, Briefcase, User, Lightbulb, Github } from "lucide-react";
import Link from "next/link";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";

// Define navigation items
const navItems = [
  {
    name: "About",
    url: "#about",
    icon: User,
  },
  {
    name: "Skills",
    url: "#skills",
    icon: FileText,
  },
  {
    name: "Project",
    url: "#project",
    icon: Briefcase,
  },
  {
    name: "Ideas",
    url: "#ideas",
    icon: Lightbulb,
  },
];

// Define skill icons
const skillIcons = [
  "react", "nextdotjs", "typescript", "javascript", "html5", "css3", 
  "tailwindcss", "nodedotjs", "express", "mongodb", "mysql", "postgresql",
  "git", "github", "docker", "aws", "vercel", "firebase", 
  "redux", "graphql", "jest", "figma", "adobephotoshop", "adobeillustrator"
];

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("About");
  const [scrolling, setScrolling] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Handle navigation click
  const handleNavClick = useCallback((sectionId: string) => {
    if (scrolling) return;
    
    setScrolling(true);
    
    // Find the corresponding section index
    const sectionIndex = navItems.findIndex(item => item.url === `#${sectionId}`);
    if (sectionIndex === -1) return;
    
    // Calculate scroll position
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const scrollLeft = sectionIndex * containerWidth;
      
      // Use scrollTo for smooth scrolling
      containerRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      
      // Update active section
      setActiveSection(navItems[sectionIndex].name);
      
      // Reset scrolling state after completion
      setTimeout(() => {
        setScrolling(false);
      }, 400);
    }
  }, [scrolling]);

  // Listen for scroll events to update active section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrolling) return;
      
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.clientWidth;
      
      // Calculate current active section
      const sectionIndex = Math.round(scrollPosition / containerWidth);
      
      if (sectionIndex >= 0 && sectionIndex < navItems.length) {
        const sectionName = navItems[sectionIndex].name;
        
        if (activeSection !== sectionName) {
          setActiveSection(sectionName);
        }
      }
    };

    // Use throttle to reduce scroll event frequency
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

  // Handle touch swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartXRef.current) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartXRef.current - touchEndX;
      
      // Swipe left (diff > 0) shows next section
      // Swipe right (diff < 0) shows previous section
      if (Math.abs(diff) > 50) { // Minimum swipe distance
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
      {/* Horizontal scroll container */}
      <div 
        ref={containerRef}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory"
        }}
      >
        {/* About section */}
        <section 
          id="about" 
          className="flex-shrink-0 w-full h-full snap-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            <p className="text-xl max-w-2xl text-center mb-8">
              This is my personal introduction, including my background, interests, and professional areas.
            </p>
            {/* Add personal bio and photo here */}
          </div>
        </section>

        {/* Skills section */}
        <section 
          id="skills" 
          className="flex-shrink-0 w-full h-full snap-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center w-full h-full p-8">
            {/* Left side icon cloud */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center">
              <div className="w-full h-[500px] relative">
                <IconCloud iconSlugs={skillIcons} />
              </div>
            </div>
            
            {/* Right side skills description */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center">
              <h2 className="text-4xl font-bold mb-8">Skills</h2>
              <p className="text-xl max-w-2xl text-center md:text-left mb-8">
                My professional skills and abilities. I am proficient in both frontend and backend development technologies, including React, Next.js, TypeScript, and other modern web technology stacks.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Frontend Development</h3>
                  <p>React, Next.js, TypeScript, Tailwind CSS</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Backend Development</h3>
                  <p>Node.js, Express, MongoDB, PostgreSQL</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Development Tools</h3>
                  <p>Git, Docker, AWS, Vercel</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Design Skills</h3>
                  <p>Figma, Photoshop, Illustrator</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project section */}
        <section 
          id="project" 
          className="flex-shrink-0 w-full h-full snap-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <h2 className="text-4xl font-bold mb-8">My Projects</h2>
            <p className="text-xl max-w-2xl text-center mb-8">
              Here I showcase my project portfolio, including website development, applications, and other creative projects.
            </p>
            
            {/* GitHub link button */}
            <a 
              href="https://github.com/zhexusun10" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#24292e] hover:bg-[#1b1f23] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 mt-4"
            >
              <Github className="w-6 h-6" />
              <span>Visit My GitHub</span>
            </a>
            
            {/* Add project cards or list here */}
          </div>
        </section>

        {/* Ideas section */}
        <section 
          id="ideas" 
          className="flex-shrink-0 w-full h-full snap-center"
          style={{ scrollSnapAlign: "center" }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <h2 className="text-4xl font-bold mb-8">Ideas</h2>
            <p className="text-xl max-w-2xl text-center mb-8">
              My creative ideas and concepts, including future projects and experimental works.
            </p>
            
            {/* Blog link button */}
            <Link 
              href="/work/idea" 
              className="flex items-center justify-center gap-2 bg-[#24292e] hover:bg-[#1b1f23] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 mt-4"
            >
              <Lightbulb className="w-6 h-6" />
              <span>Visit My Ideas</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Navigation bar */}
      <WorkNavBar 
        items={navItems} 
        className="bottom-8"
        onNavClick={handleNavClick}
        activeSection={activeSection}
      />

      {/* Add custom scroll styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 