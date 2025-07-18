import * as React from "react"

import { cn } from "@/lib/utils"

type InputIntegerProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value?: number | string
  onChange?: (value: number | null) => void
}

// Tam sayı formatı için formatter
const formatter = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function parseInteger(value: string): number | null {
  // Sadece rakamları al ve sayıya çevir
  const normalized = value.replace(/[^0-9]/g, "")
  const num = parseInt(normalized, 10)
  return isNaN(num) ? null : num
}

function formatInteger(value: number): string {
  return formatter.format(value)
}

function InputInteger({ className, value, onChange, ...props }: InputIntegerProps) {
  const [displayValue, setDisplayValue] = React.useState<string>(
    value !== undefined && value !== null && value !== ""
      ? formatInteger(Number(value))
      : ""
  )
  const [isFocused, setIsFocused] = React.useState(false)

  React.useEffect(() => {
    if (!isFocused) {
      if (value !== undefined && value !== null && value !== "") {
        setDisplayValue(formatInteger(Number(value)))
      } else {
        setDisplayValue("")
      }
    }
  }, [value, isFocused])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    
    // Sadece rakam izin ver
    val = val.replace(/[^0-9]/g, "")
    
    setDisplayValue(val)
    
    if (onChange) {
      const parsed = parseInteger(val)
      onChange(parsed)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    const parsed = parseInteger(displayValue)
    if (parsed !== null) {
      setDisplayValue(formatInteger(parsed))
    } else {
      setDisplayValue("")
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    // Focus durumunda sadece sayısal değeri göster (format olmadan)
    if (value !== undefined && value !== null && value !== "") {
      const num = Number(value)
      // Türkiye formatında göster: 1234 -> 1.234
      setDisplayValue(num.toLocaleString("tr-TR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }))
    } else {
      setDisplayValue("")
    }
  }

  return (
    <input
      type="text"
      data-slot="input"
      inputMode="numeric"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground  flex h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white dark:border-gray-700  px-4 py-2 text-base  transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-teal-500  focus:ring-teal-500/20",
        className
      )}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...props}
    />
  )
}

export { InputInteger } 