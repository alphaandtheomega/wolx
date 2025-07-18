import * as React from "react"
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils"

const InputCalendar = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type="text"
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground  flex h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white dark:border-gray-700  px-4 py-2 text-base  transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-teal-500  focus:ring-teal-500/20",
            className
          )}
          {...props}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" strokeWidth={2} />
      </div>
    )
  }
)
InputCalendar.displayName = "InputCalendar"

export { InputCalendar } 