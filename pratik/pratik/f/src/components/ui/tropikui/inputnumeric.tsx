import * as React from "react"

import { cn } from "@/lib/utils"

type InputNumericProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value?: number | string
  onChange?: (value: number | null) => void
}

// Türkiye formatı için formatter
const formatter = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function parseNumber(value: string): number | null {
  // Türkiye formatından sayıya çevir: 1.234,56 -> 1234.56
  const normalized = value
    .replace(/\./g, "") // Binlik ayırıcıları kaldır
    .replace(/,/g, ".") // Virgülü noktaya çevir
  const num = parseFloat(normalized)
  return isNaN(num) ? null : num
}

function formatNumber(value: number): string {
  return formatter.format(value)
}

function InputNumeric({ className, value, onChange, ...props }: InputNumericProps) {
  const [displayValue, setDisplayValue] = React.useState<string>(
    value !== undefined && value !== null && value !== ""
      ? formatNumber(Number(value))
      : ""
  )
  const [isFocused, setIsFocused] = React.useState(false)

  React.useEffect(() => {
    if (!isFocused) {
      if (value !== undefined && value !== null && value !== "") {
        setDisplayValue(formatNumber(Number(value)))
      } else {
        setDisplayValue("")
      }
    }
  }, [value, isFocused])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    
    // Sadece rakam, nokta ve virgül izin ver
    val = val.replace(/[^0-9.,]/g, "")
    
    // Birden fazla virgül varsa sadece ilkini tut
    const commaCount = (val.match(/,/g) || []).length
    if (commaCount > 1) {
      const parts = val.split(",")
      val = parts[0] + "," + parts.slice(1).join("")
    }
    
    // Virgülden sonra maksimum 2 basamak
    if (val.includes(",")) {
      const [whole, decimal] = val.split(",")
      if (decimal && decimal.length > 2) {
        val = whole + "," + decimal.substring(0, 2)
      }
    }
    
    setDisplayValue(val)
    
    if (onChange) {
      const parsed = parseNumber(val)
      onChange(parsed)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    const parsed = parseNumber(displayValue)
    if (parsed !== null) {
      setDisplayValue(formatNumber(parsed))
    } else {
      setDisplayValue("")
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    // Focus durumunda sadece sayısal değeri göster (format olmadan)
    if (value !== undefined && value !== null && value !== "") {
      const num = Number(value)
      // Türkiye formatında göster: 1234.56 -> 1.234,56
      setDisplayValue(num.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
    } else {
      setDisplayValue("")
    }
  }

  return (
    <input
      type="text"
      data-slot="input"
      inputMode="decimal"
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

export { InputNumeric }
