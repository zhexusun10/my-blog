"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { TextEffect } from "@/components/ui/text-effect";

export default function GamePage() {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // 0.5秒后显示副标题
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative bg-white">
      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <header className="mb-16 text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-black">
              <TypingAnimation 
                text="Game Zone" 
                duration={100}
                cursorBlinkSpeed={1000}
              />
            </h1>
          </div>
          <div className="h-8 mt-4">
            {showSubtitle && (
              <TextEffect
                preset="fade"
                per="char"
                className="text-xl text-gray-600"
                delay={0.1}
              >
                Play and have fun
              </TextEffect>
            )}
          </div>
        </header>
        
        <main className="w-full max-w-6xl mx-auto flex-grow">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-8">游戏内容正在开发中，敬请期待...</p>
            <div className="w-24 h-24 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto"></div>
          </div>
        </main>

        <footer className="mt-16 text-center">
          <Link href="/" className="text-gray-500 hover:text-black transition-colors">
            ← Back to Home
          </Link>
        </footer>
      </div>
    </div>
  );
} 