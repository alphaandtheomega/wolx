import React from "react";
import { toast } from "sonner";
import axios from "axios";
import { InputAdd } from "@/components/ui/tropikui/inputadd";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BelgeNoProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  accessToken?: string;
  apiUrl?: string; // opsiyonel, default olarak env'den alınır
  parametreId?: number; // yeni prop
}

function parseDeger(deger: any) {
  if (typeof deger !== "string") return deger;
  if (
    (deger.startsWith('"') && deger.endsWith('"')) ||
    (deger.startsWith("'") && deger.endsWith("'"))
  ) {
    return deger.slice(1, -1);
  }
  try {
    return JSON.parse(deger);
  } catch {
    return deger;
  }
}

const BelgeNo: React.FC<BelgeNoProps> = ({
  value,
  onChange,
  label = "Belge No",
  required = false,
  disabled = false,
  className = "",
  accessToken,
  apiUrl,
  parametreId = 11,
}) => {
  const resolvedApiUrl = apiUrl || import.meta.env.VITE_API_URL || "http://localhost:3002";

  // Plus butonuna tıklandığında parametreler/ID'den değer çek
  const handlePlusClick = async () => {
    try {
      const resp = await axios.get(
        `${resolvedApiUrl}/api/ayarlar/parametreler/${parametreId}`,
        accessToken
          ? {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          : { withCredentials: true }
      );
      const deger = parseDeger(resp.data?.deger);
      onChange?.(deger?.toString?.() ?? "");
    } catch (err) {
      toast.error("Belge No alınamadı", {
        description: "Parametreler tablosundan Belge No çekilemedi.",
      });
    }
  };

  return (
    <FormItem className={`flex flex-col gap-1 w-full ${className}`}>
      <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <InputAdd
          type="text"
          value={value}
          onChange={(e: any) => onChange?.(e.target.value)}
          onPlusClick={handlePlusClick}
          placeholder={label}
         
          disabled={disabled}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default BelgeNo;
