import { cn } from "@/lib/utils";

interface SimplifiedCardProps {
  title: string;
  description: string[];
  timestamp: string;
  tags: string[];
}

export function SimplifiedCard({
  title,
  description = ["无描述"],
  timestamp = "",
  tags = [],
}: SimplifiedCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl relative isolate overflow-hidden",
        "bg-white/5 dark:bg-black/90",
        "bg-gradient-to-br from-black/5 to-black/[0.02] dark:from-white/5 dark:to-white/[0.02]",
        "backdrop-blur-xl backdrop-saturate-[180%]",
        "border border-black/10 dark:border-white/10",
        "shadow-[0_8px_16px_rgb(0_0_0_/_0.15)] dark:shadow-[0_8px_16px_rgb(0_0_0_/_0.25)]",
        "will-change-transform translate-z-0"
      )}
    >
      <div
        className={cn(
          "w-full p-5 rounded-xl relative",
          "bg-gradient-to-br from-black/[0.05] to-transparent dark:from-white/[0.08] dark:to-transparent",
          "backdrop-blur-md backdrop-saturate-150",
          "border border-black/[0.05] dark:border-white/[0.08]",
          "text-black/90 dark:text-white",
          "shadow-sm",
          "will-change-transform translate-z-0",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/[0.02] before:to-black/[0.01] dark:before:from-white/[0.03] dark:before:to-white/[0.01] before:opacity-0 before:transition-opacity before:pointer-events-none",
          "hover:before:opacity-100"
        )}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-semibold text-black dark:text-white/90 hover:underline cursor-pointer">
                {title}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2">
          {description.map((item, index) => (
            <p
              key={index}
              className="text-black dark:text-white/90 text-base"
            >
              {item}
            </p>
          ))}
          <span className="text-black dark:text-white/50 text-sm mt-2 block">
            {timestamp}
          </span>
        </div>

        {tags.length > 0 && (
          <div className="mt-4 pt-2 border-t border-black/[0.08] dark:border-white/[0.08]">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 