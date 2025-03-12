"use client";

import { Carousel3D } from "@/components/ui/3d-carousel";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { TextEffect } from "@/components/ui/text-effect";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// 导入图片
import album1 from "../images/albums/album1.jpg";
import album2 from "../images/albums/album2.jpg";
import album3 from "../images/albums/album3.jpg";
import album4 from "../images/albums/album4.jpg";
import album5 from "../images/albums/album5.jpg";
import album6 from "../images/albums/album6.jpg";
import album7 from "../images/albums/album7.jpg";
import album8 from "../images/albums/album8.jpg";
import album9 from "../images/albums/album9.jpg";
import album10 from "../images/albums/album10.jpg";
import album11 from "../images/albums/album11.jpg";
import album12 from "../images/albums/album12.jpg";
import album13 from "../images/albums/album13.jpg";
import album14 from "../images/albums/album14.jpg";
import album15 from "../images/albums/album15.jpg";

// 音乐专辑数据（使用导入的图片）
const initialAlbums = [
  {
    id: 1,
    image: album1.src,
    title: "Folklore",
    artist: "Taylor Swift",
    url: "https://music.apple.com/us/album/folklore-deluxe-version/1528112358"
  },
  {
    id: 2,
    image: album2.src,
    title: "Melodrama",
    artist: "Lorde",
    url: "https://music.apple.com/us/album/melodrama/1429662346"
  },
  {
    id: 3,
    image: album3.src,
    title: "Blonde",
    artist: "Frank Ocean",
    url: "https://music.apple.com/us/album/blonde/1146195596"
  },
  {
    id: 4,
    image: album4.src,
    title: "叶惠美",
    artist: "周杰伦",
    url: "https://music.apple.com/us/album/%E8%91%89%E6%83%A0%E7%BE%8E/1721464893"
  },
  {
    id: 5,
    image: album5.src,
    title: "Bleachers",
    artist: "Jack Antonoff",
    url: "https://music.apple.com/us/album/bleachers/1712730224"
  },
  {
    id: 6,
    image: album6.src,
    title: "Evermore",
    artist: "Taylor Swift",
    url: "https://music.apple.com/us/album/evermore-deluxe-version/1547315522"
  },
  {
    id: 7,
    image: album7.src,
    title: "范特西",
    artist: "周杰伦",
    url: "https://music.apple.com/us/album/%E8%8C%83%E7%89%B9%E8%A5%BF/1721454234"
  },
  {
    id: 8,
    image: album8.src,
    title: "Midnights",
    artist: "Taylor Swift",
    url: "https://music.apple.com/us/album/midnights-the-til-dawn-edition/1689131527"
  },
  {
    id: 9,
    image: album9.src,
    title: "The Tortured Poets Department",
    artist: "Taylor Swift",
    url: "https://music.apple.com/us/album/the-tortured-poets-department-the-anthology/1742057774"
  },
  {
    id: 10,
    image: album10.src,
    title: "the record",
    artist: "Boygenius",
    url: "https://music.apple.com/us/album/the-record/1666138312"
  },
  {
    id: 11,
    image: album11.src,
    title: "NFR!",
    artist: "Lana Del Rey",
    url: "https://music.apple.com/us/album/norman-f-g-rockwell/1474669063?i=1474669065"
  },
  {
    id: 12,
    image: album12.src,
    title: "Cowboy Carter",
    artist: "Beyonce",
    url: "https://music.apple.com/us/album/cowboy-carter/1738363766"
  },
  {
    id: 13,
    image: album13.src,
    title: "The Life of Pablo",
    artist: "Kanye West",
    url: "https://music.apple.com/us/album/the-life-of-pablo/1443063578"
  },
  {
    id: 14,
    image: album14.src,
    title: "ye",
    artist: "Kanye West",
    url: "https://music.apple.com/us/album/ye/1441456689"
  },
  {
    id: 15,
    image: album15.src,
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    url: "https://music.apple.com/us/album/happier-than-ever/1564530719?i=1564531202"
  },
];

export default function MusicPage() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [albums, setAlbums] = useState(initialAlbums);
  const router = useRouter();

  useEffect(() => {
    // 1.5秒后显示副标题
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const handleTaylorClick = () => {
    router.push('/taylor-swift');
  };

  return (
    <div className="min-h-screen relative bg-white">
      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <header className="mb-8 text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-black">
              <TypingAnimation 
                text="Music Collection" 
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
                Explore my favorite albums
              </TextEffect>
            )}
          </div>
        </header>
        
        <main className="w-full max-w-6xl mx-auto flex-grow">
          <Carousel3D items={albums} />
          <div className="text-center mt-8">
            <p 
              className="text-sm text-black font-light italic transition-all duration-300 hover:text-gray-400 hover:shadow-glow cursor-pointer" 
              style={{ fontFamily: 'Taylor' }}
              onClick={handleTaylorClick}
            >
              Gratuitous Taylor Swift Pics
            </p>
          </div>
        </main>
      </div>
    </div>
  );
} 