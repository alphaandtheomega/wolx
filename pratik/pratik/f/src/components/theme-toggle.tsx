import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="outline"
      aria-label="Tema Değiştir"
      onClick={toggleTheme}
      className="ml-2 h-10 w-12 border-1 border-border"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}
