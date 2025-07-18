import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  dateInput: string | Date,
  formatStr = 'dd-MM-yyyy HH:mm:ss'
) {
  let date: Date;
  
  if (typeof dateInput === 'string') {
    // PostgreSQL'den gelen tarih string'ini UTC olarak parse et
    try {
      // PostgreSQL'den gelen tarih UTC olarak kabul edilir
      const utcDate = parseISO(dateInput + 'Z'); // Z ekleyerek UTC olduğunu belirt
      date = utcDate;
    } catch (error) {
      return "";
    }
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    return "";
  }
  
  if (isNaN(date.getTime())) return "";
  
  // UTC tarihini Türkiye saat diliminde formatla
  return formatInTimeZone(date, 'Europe/Istanbul', formatStr);
}
