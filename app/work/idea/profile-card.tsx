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
      <h2 className="text-2xl font-bold mb-4">关于我</h2>
      
      <div className="space-y-4">
        <p>
          你好！我是一名热爱技术和创新的开发者。这里是我的个人博客，我会分享我的想法、项目和技术文章。
        </p>
        
        <p>
          我专注于Web开发、人工智能和开源项目。我相信技术可以改变世界，而分享知识是推动这种变革的关键。
        </p>
        
        <p>
          在这个博客中，你可以找到我的技术文章、项目展示和一些随想。希望这些内容能够对你有所帮助或启发。
        </p>
        
        <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
          <h3 className="text-lg font-semibold mb-2">联系我</h3>
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