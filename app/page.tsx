import { Particles } from "@/components/ui/particles";
import DisplayCards from "@/components/ui/display-cards";
import { Music, Gamepad2, Briefcase } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import Link from "next/link";

// 创建一个包装组件，使整个卡片可点击
const CardWrapper = ({ href }: { href: string }) => {
  return (
    <Link href={href} className="block w-full h-full absolute inset-0 z-10">
      <span className="sr-only">Navigate to {href}</span>
    </Link>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* 背景 Particles */}
      <div className="absolute inset-0 -z-10">
        <Particles 
          className="absolute inset-0"
          quantity={600}
          staticity={50}
          color="#000000"
          ease={10}
        />
      </div>
      
      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <header className="mb-24 text-center">
          <div className="animate-float">
            <h1 className="text-7xl md:text-9xl font-bold drop-shadow-md">
              <TypingAnimation 
                text="Zhexu's Blog" 
                duration={150}
                cursorBlinkSpeed={1200}
              />
            </h1>
          </div>
        </header>
        
        <main className="w-full">
          <div className="flex justify-center">
            <DisplayCards 
              cards={[
                {
                  icon: <Gamepad2 className="size-4 text-red-300" />,
                  title: "Game",
                  description: "",
                  date: "",
                  titleClassName: "text-red-500",
                  className: "relative [grid-area:stack] translate-x-0 translate-y-0 hover:translate-x-0 hover:-translate-y-12 transition-transform duration-500 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                  children: <CardWrapper href="/game" />
                },
                {
                  icon: <Music className="size-4 text-purple-300" />,
                  title: "Music",
                  description: "",
                  date: "",
                  titleClassName: "text-purple-500",
                  className: "relative [grid-area:stack] translate-x-16 translate-y-0 hover:translate-x-16 hover:-translate-y-12 transition-transform duration-500 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                  children: <CardWrapper href="/music" />
                },
                {
                  icon: <Briefcase className="size-4 text-emerald-300" />,
                  title: "Work",
                  description: "",
                  date: "",
                  iconClassName: "text-emerald-500",
                  titleClassName: "text-emerald-500",
                  className: "relative [grid-area:stack] translate-x-32 translate-y-0 hover:translate-x-32 hover:-translate-y-12 transition-transform duration-500 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                  children: <CardWrapper href="/work" />
                }
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
