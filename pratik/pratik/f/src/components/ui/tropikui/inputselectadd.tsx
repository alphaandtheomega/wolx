import * as React from "react"

import { cn } from "@/lib/utils"

interface InputSelectAddProps extends React.ComponentProps<"input"> {
  onPlusClick?: () => void;
  onListClick?: () => void;
}

function InputSelectAdd({ className, type, onPlusClick, onListClick, ...props }: InputSelectAddProps) {
  return (
    <div className="relative flex items-center w-full">
      <input
        type={type}
        data-slot="input"
        
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground  flex h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white dark:border-gray-700  px-4 py-2 text-base  transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-teal-500  focus:ring-teal-500/20",
          className
        )}
        {...props}
      />
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-row items-center gap-0.5">
        <button
          type="button"
          tabIndex={-1}
          className="p-1 text-muted-foreground hover:text-primary focus:outline-none"
          aria-label="Yeni Kayıt Ekle"
          onClick={onPlusClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-plus-icon lucide-square-plus"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </button>
        <button
          type="button"
          tabIndex={-1}
          className="p-1 text-muted-foreground hover:text-primary focus:outline-none"
          aria-label="Gantt İkonu"
          onClick={onListClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-chart-gantt-icon lucide-square-chart-gantt"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 8h7" />
            <path d="M8 12h6" />
            <path d="M11 16h5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { InputSelectAdd }
