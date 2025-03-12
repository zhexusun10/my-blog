"use client";

import { useState } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


export default function TaylorSwiftPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 这里是示例图片，您可以替换为您上传的 Taylor Swift 图片
  const images1 = [
    "/images/taylor-swift/1.jpg",
    "/images/taylor-swift/2.jpg",
    "/images/taylor-swift/3.jpg",
    "/images/taylor-swift/4.jpg",
    "/images/taylor-swift/5.jpg",
    "/images/taylor-swift/6.jpg",
  ]
  
  const images2 = [
    "/images/taylor-swift/7.jpg",
    "/images/taylor-swift/8.jpg",
    "/images/taylor-swift/9.jpg",
    "/images/taylor-swift/10.jpg",
    "/images/taylor-swift/11.jpg",
    "/images/taylor-swift/12.jpg",
  ];

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen relative bg-white">
      {/* 两条竖向照片流 - 居中放置 */}
      <div className="flex justify-center h-screen max-w-5xl mx-auto px-8">
        <div className="w-[300px] mx-4 vertical-slider-container">
          <InfiniteSlider duration={30} durationOnHover={100} gap={16} direction="vertical">
            {images1.map((image, index) => (
              <div 
                key={index} 
                className="h-[350px] w-full rounded-[4px] overflow-hidden mb-4 cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <Image 
                  src={image} 
                  alt={`Portrait ${index * 2 + 1}`} 
                  className="w-full h-full object-cover taylor-image"
                  width={300}
                  height={350}
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
        
        <div className="w-[300px] mx-4 vertical-slider-container">
          <InfiniteSlider duration={30} durationOnHover={100} gap={16} direction="vertical" reverse={true}>
            {images2.map((image, index) => (
              <div 
                key={index} 
                className="h-[350px] w-full rounded-[4px] overflow-hidden mb-4 cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <Image 
                  src={image} 
                  alt={`Portrait ${index * 2 + 2}`} 
                  className="w-full h-full object-cover taylor-image"
                  width={300}
                  height={350}
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
      
      {/* 右下角标题和返回按钮 */}
      <div className="absolute bottom-6 right-6 text-right z-10">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Taylor' }}>
          Taylor Swift
        </h2>
        <Link href="/music" className="text-sm text-gray-400 hover:text-black transition-colors">
          Back to Albums
        </Link>
      </div>

      {/* 图片放大模态框 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage} 
                alt="Enlarged portrait" 
                className="max-w-full max-h-[85vh] object-contain"
                width={1200}
                height={800}
              />
              <button 
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-colors"
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 