"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-12 h-6 bg-[#E0E7EF] dark:bg-[#191970] rounded-full p-1 transition-colors duration-300 border border-[#E0E7EF] dark:border-[#191970]"
    >
      {/* Toggle Thumb */}
      <span
        className={
          `absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ` +
          (theme === "dark" ? "translate-x-6" : "translate-x-0")
        }
      />
      {/* Sun and Moon Icons */}
      <SunIcon
        className="h-4 w-4 text-[#191970] absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: theme === "light" ? 1 : 0.5 }}
      />
      <MoonIcon
        className="h-4 w-4 text-[#ff7f00] absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: theme === "dark" ? 1 : 0.5 }}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
