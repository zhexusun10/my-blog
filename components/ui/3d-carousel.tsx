"use client"

import React, { useState, useEffect, useRef } from "react"
import {  useLayoutEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"


export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

interface CarouselItem {
  id: number
  image: string
  title: string
  artist: string
  url?: string
}

interface Carousel3DProps {
  items: CarouselItem[]
  className?: string
  autoRotate?: boolean
  rotateInterval?: number
  visibleItems?: number
}

export function Carousel3D({
  items,
  className,
  autoRotate = true,
  rotateInterval = 5000,
  visibleItems = 6, // 默认同时显示3个专辑
}: Carousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoRotate)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const totalItems = items.length
  
  // 计算每个项目的旋转角度
  const getRotationAngle = (index: number) => {
    // 计算相对于当前活动项的索引
    let relativeIndex = (index - activeIndex + totalItems) % totalItems
    
    // 优化：只显示活动项周围的一定数量的项
    if (relativeIndex > totalItems / 2) {
      relativeIndex = relativeIndex - totalItems
    }
    
    // 计算角度，限制在可见项的范围内
    const maxAngle = 180 // 最大角度范围
    const anglePerItem = Math.min(maxAngle / visibleItems, 360 / totalItems)
    
    return relativeIndex * anglePerItem
  }

  // 计算每个项目的z-index和可见性
  const getZIndex = (index: number) => {
    const relativeIndex = (index - activeIndex + totalItems) % totalItems
    const normalizedIndex = relativeIndex > totalItems / 2 ? totalItems - relativeIndex : relativeIndex
    
    // 确保活动项的z-index最高
    if (index === activeIndex) {
      return 1000; // 使用一个非常高的值确保活动项始终在最上层
    }
    
    // 其他项的z-index根据与活动项的距离递减
    // 前面的项比后面的项z-index低，确保不会遮挡
    if (relativeIndex < totalItems / 2 && relativeIndex > 0) {
      // 前面的项
      return 900 - normalizedIndex * 10;
    } else if (relativeIndex > totalItems / 2) {
      // 后面的项
      return 900 - (totalItems - normalizedIndex) * 10;
    } else {
      return 900; // 其他情况
    }
  }

  // 计算每个项目的可见性
  const getVisibility = (index: number) => {
    const relativeIndex = (index - activeIndex + totalItems) % totalItems
    const normalizedIndex = relativeIndex > totalItems / 2 ? totalItems - relativeIndex : relativeIndex
    
    // 只显示活动项周围的一定数量的项
    return normalizedIndex <= Math.floor(visibleItems / 2)
  }

  // 计算每个项目的样式
  const getItemStyle = (index: number) => {
    const angle = getRotationAngle(index)
    const zIndex = getZIndex(index)
    const isActive = index === activeIndex
    const isVisible = getVisibility(index)
    
    // 根据角度计算距离，使专辑在圆周上均匀分布
    // 大幅增加距离，防止重叠
    const distance = 700 + Math.abs(angle) * 1.2 // 进一步增加基础距离和角度系数
    
    // 计算缩放比例，活动项最大，两侧逐渐变小
    const scale = isActive ? 1 : Math.max(0.5, 1 - Math.abs(angle) / 180 * 0.5)
    
    // 添加Y轴位移，使非活动项稍微下沉，增强层次感
    const translateY = isActive ? 0 : Math.abs(angle) * 0.7
    
    // 添加X轴位移，使左右两侧的专辑向外侧偏移
    const translateX = isActive ? 0 : (angle > 0 ? 1 : -1) * Math.abs(angle) * 0.3
    
    return {
      transform: `rotateY(${angle}deg) translateZ(${distance}px) translate(${translateX}px, ${translateY}px) scale(${scale})`,
      zIndex,
      opacity: isActive ? 1 : Math.max(0.3, 1 - Math.abs(angle) / 90),
      display: isVisible ? 'block' : 'none', // 隐藏不可见的项，提高性能
      // 添加过滤器效果，使非活动项更加模糊
      filter: isActive ? 'none' : `blur(${Math.min(4, Math.abs(angle) / 45)}px)`,
    }
  }

  // 处理自动轮播
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalItems)
      }, rotateInterval)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isAutoPlaying, totalItems, rotateInterval])

  // 处理手动导航
  const handlePrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % totalItems)
  }

  // 鼠标悬停时暂停自动轮播
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // 鼠标离开时恢复自动轮播
  const handleMouseLeave = () => {
    if (autoRotate) {
      setIsAutoPlaying(true)
    }
  }

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, handlePrev, handleNext]);

  return (
    <div 
      className={cn("relative w-full h-[600px] perspective-1000", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full transform-style-3d transition-transform duration-700">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="absolute inset-0 w-72 h-72 mx-auto my-auto transition-all duration-500 cursor-pointer preserve-3d hover:scale-110"
              style={getItemStyle(index)}
              onClick={() => {
                if (item.url && index === activeIndex) {
                  window.open(item.url, '_blank', 'noopener,noreferrer');
                } else {
                  setActiveIndex(index);
                }
              }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-transform duration-300 group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority={index === activeIndex}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                  <p className="text-sm opacity-80 truncate">{item.artist}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 导航按钮 */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
