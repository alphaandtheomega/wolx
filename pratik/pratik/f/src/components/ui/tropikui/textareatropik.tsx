import * as React from "react"

import { cn } from "@/lib/utils"

function TextareaTropik({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        " placeholder:text-muted-foreground  flex field-sizing-content min-h-12 w-full bg-transparent px-3 py-2 text-base shadow-xs  outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-teal-500  focus:ring-teal-500/20 transition-all ",
        className
      )}
      {...props}
    />
  )
}

export { TextareaTropik }
