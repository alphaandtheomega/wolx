import React from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronDownIcon } from "lucide-react";

interface TarihFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function TarihField({
  value,
  onChange,
  label = "Tarih",
  required = false,
  disabled = false,
  className = "",
}: TarihFieldProps) {
  const [open, setOpen] = React.useState(false);
  // value string (yyyy-MM-dd) -> Date
  const date = value ? new Date(value) : undefined;

  // Eğer value yoksa, bugünün tarihi seçili olsun
  React.useEffect(() => {
    if (!value && onChange) {
      const today = new Date();
      onChange(format(today, "yyyy-MM-dd"));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <FormItem className={`space-y-1 w-full ${className}`}>
      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
              disabled={disabled}
            >
              {date ? format(date, "dd.MM.yyyy", { locale: tr }) : "Tarih seç"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              locale={tr}
              onSelect={(date) => {
                if (onChange) {
                  onChange(date ? format(date, "yyyy-MM-dd") : "");
                }
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
