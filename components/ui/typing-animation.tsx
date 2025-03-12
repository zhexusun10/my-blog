"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  cursorBlinkSpeed?: number;
}

export function TypingAnimation({
  text,
  duration = 200,
  className,
  cursorBlinkSpeed = 800,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text]);

  // 添加光标闪烁效果，使用更慢的闪烁速度
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => {
      clearInterval(cursorInterval);
    };
  }, [cursorBlinkSpeed]);

  return (
    <span className={cn("relative", className)}>
      {displayedText}
      <span 
        className={cn(
          "inline-block w-[0.1em] h-[1.1em] bg-current ml-1 align-middle",
          showCursor ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300"
        )}
        aria-hidden="true"
      />
    </span>
  );
}
