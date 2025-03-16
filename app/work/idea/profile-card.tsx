import { cn } from "@/lib/utils";

export default function ProfileCard() {
  return (
    <div
      className={cn(
        "w-full p-6 rounded-xl relative",
        "bg-gradient-to-br from-black/[0.05] to-transparent dark:from-white/[0.08] dark:to-transparent",
        "backdrop-blur-md backdrop-saturate-150",
        "border border-black/[0.05] dark:border-white/[0.08]",
        "text-black/90 dark:text-white",
        "shadow-sm",
        "h-full"
      )}
    >
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      
      <div className="space-y-4">
        <p>
          Hello! I am a developer passionate about technology and innovation. This is my personal blog where I share my ideas, projects, and technical articles.
        </p>
        
        <p>
          I focus on Web development, artificial intelligence, and open-source projects. I believe technology can change the world, and sharing knowledge is key to driving this change.
        </p>
        
        <p>
          In this blog, you can find my technical articles, project showcases, and some random thoughts. I hope these contents can be helpful or inspiring to you.
        </p>
        
        <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
          <h3 className="text-lg font-semibold mb-2">Contact Me</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-black-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              GitHub
            </a>
            <a href="#" className="text-black-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              Twitter
            </a>
            <a href="#" className="text-black-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 