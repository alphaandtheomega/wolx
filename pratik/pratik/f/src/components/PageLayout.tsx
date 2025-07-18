import React from "react";
import { useSidebar } from "@/components/ui/sidebar";

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  const { state } = useSidebar();

  // Sadece Tailwind responsive class'ları ile çözüm
  // Sidebar açıkken lg ve üstü için max-w-[calc(97vw-16rem)] uygula
  // Küçük ve orta ekranlarda her zaman w-full ve max-w-full
  const responsiveClass =
    state === "expanded"
      ? "w-full max-w-full md:max-w-[calc(97vw-16rem)]"
      : "w-full max-w-full";

  return (
    <div
      className={`bg-background border border-border m-2 p-2 shadow-sm rounded-md ${responsiveClass} ${className}`}
    >
      {children}
    </div>
  );
} 