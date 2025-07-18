"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/context/auth-context";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CariSecModal from "./CariSecModal";

interface Cari {
  CariID: number;
  CariIsim: string;
  CariKod: string;
}

interface CariSecComboProps {
  value?: string;
  onChange?: (value: string) => void;
  onCariSelect?: (cari: Cari) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function CariSecCombo({
  value,
  onChange,
  onCariSelect,
  label = "Cari Ünvanı",
  placeholder = "Cari seçin...",
  disabled = false,
  required = false,
  className = "",
}: CariSecComboProps) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
  const [open, setOpen] = useState(false);
  const [selectedCari, setSelectedCari] = useState<Cari | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { accessToken } = useAuth();
  const [cariSecModalOpen, setCariSecModalOpen] = useState(false);

  // value prop'u değiştiğinde selectedCari'yi güncelle
  useEffect(() => {
    if (!value) {
      setSelectedCari(null);
      setSearchTerm("");
    }
  }, [value]);

  // Seçili cari'yi value prop'una göre kontrol et
  const displayValue = selectedCari ? selectedCari.CariIsim : placeholder;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Cariler verilerini çek - sadece 3+ karakter yazıldığında ve debounce sonrası
  const { data: cariler, isLoading: carilerLoading } = useQuery({
    queryKey: ["cariler", debouncedSearchTerm],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/cariler?search=${encodeURIComponent(debouncedSearchTerm)}`,
        accessToken
          ? {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          : { withCredentials: true }
      );
      return response.data as Cari[];
    },
    enabled: debouncedSearchTerm.length >= 3, // Sadece 3+ karakter için çalışsın
    staleTime: 5 * 60 * 1000, // 5 dakika cache
  });

  const handleCariSelect = (cari: Cari) => {
    setSelectedCari(cari);
    setOpen(false);
    setSearchTerm("");
    
    if (onChange) {
      onChange(cari.CariID.toString());
    }
    
    if (onCariSelect) {
      onCariSelect(cari);
    }
  };

  const handleModalSelect = (cari: Cari) => {
    setSelectedCari(cari);
    setCariSecModalOpen(false);
    setSearchTerm("");
    
    if (onChange) {
      onChange(cari.CariID.toString());
    }
    
    if (onCariSelect) {
      onCariSelect(cari);
    }
  };

  return (
    <FormItem className={`space-y-1 w-full ${className}`}>
      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <div className="relative w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="flex h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white dark:border-gray-700 px-4 py-2 text-base transition-all duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-teal-500 focus:ring-teal-500/20 justify-between pr-12"
                disabled={disabled || carilerLoading}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest(".cari-modal-btn") === null) {
                    setOpen(true);
                  }
                }}
              >
                {displayValue}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 min-w-[180px] max-w-[520px] sm:max-w-[400px] md:max-w-[520px] lg:max-w-[600px]">
              <Command>
                <CommandInput
                  placeholder="En az 3 karakter yazın..."
                  className="h-12 px-4 py-2 text-base md:text-sm"
                  value={searchTerm}
                  onValueChange={(newValue) => {
                    setSearchTerm(newValue);
                  }}
                />
                <CommandList>
                  <CommandEmpty>
                    {searchTerm.length < 3
                      ? "En az 3 karakter yazın..."
                      : carilerLoading
                      ? "Aranıyor..."
                      : "Cari bulunamadı."}
                  </CommandEmpty>
                  <CommandGroup>
                    {cariler?.map((cari) => (
                      <CommandItem
                        key={cari.CariID}
                        value={cari.CariIsim + ' ' + cari.CariKod}
                        className="px-4 py-3 text-base md:text-sm"
                        onSelect={() => handleCariSelect(cari)}
                      >
                        <div className="flex flex-col">
                          <span className="text-base md:text-sm">{cari.CariIsim}</span>
                          <span className="text-xs md:text-xs text-gray-500">{cari.CariKod}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4 md:h-3 md:w-3",
                            selectedCari?.CariID === cari.CariID
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-6 md:w-6 flex items-center justify-center text-muted-foreground hover:text-primary focus:outline-none cari-modal-btn"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              setCariSecModalOpen(true);
            }}
            aria-label="Cari Modal Aç"
            style={{ pointerEvents: 'auto' }}
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
      </FormControl>
      <FormMessage />
      
      <CariSecModal
        open={cariSecModalOpen}
        onClose={() => setCariSecModalOpen(false)}
        onSaved={() => {}}
        onSelect={handleModalSelect}
      />
    </FormItem>
  );
}
