"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { LayoutDashboard, Video, BookOpen, FileText, BarChart2, Calendar, LogOut, Menu } from "lucide-react"
import { useTheme } from "next-themes"

interface StudentLayoutProps {
  children: React.ReactNode
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    {
      name: "Dashboard",
      href: "/student/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/student/dashboard",
    },
    {
      name: "Live Sessions",
      href: "/student/live-sessions",
      icon: Video,
      current: pathname === "/student/live-sessions",
    },
    {
      name: "Assignments",
      href: "/student/assignments",
      icon: BookOpen,
      current: pathname === "/student/assignments",
    },
    {
      name: "Resources",
      href: "/student/resources",
      icon: FileText,
      current: pathname === "/student/resources",
    },
    {
      name: "Progress",
      href: "/student/progress",
      icon: BarChart2,
      current: pathname === "/student/progress",
    },
    {
      name: "Schedule",
      href: "/student/schedule",
      icon: Calendar,
      current: pathname === "/student/schedule",
    },
  ]

  const MobileNav = () => (
    <div className="flex flex-col flex-grow bg-gradient-to-b from-[#191970] to-[#191970]/90 h-full">
      <div className="flex items-center justify-between h-16 flex-shrink-0 px-6 border-b border-[#ff7f00]/30">
        <Link href="/student/dashboard" className="text-2xl font-bold text-white">
          MetEd Student
        </Link>
      </div>
      <div className="flex flex-col flex-1 px-4 py-5">
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                item.current 
                  ? "bg-[#ff7f00] text-white shadow-lg shadow-[#ff7f00]/20" 
                  : "text-white/90 hover:bg-[#ff7f00]/20 hover:text-white"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 transition-colors ${
                  item.current 
                    ? "text-white" 
                    : "text-white/90 group-hover:text-white"
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pb-4">
          <Link
            href="/student"
            className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-white/90 hover:bg-[#ff7f00]/20 hover:text-white transition-colors"
          >
            <LogOut
              className="mr-3 h-5 w-5 text-white/90 group-hover:text-white transition-colors"
              aria-hidden="true"
            />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#dedede] via-white to-[#dedede]">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-[#ff7f00]/30 bg-gradient-to-b from-[#191970] to-[#191970]/90 px-4 py-5">
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4">
            <Link href="/student/dashboard" className="text-2xl font-bold text-white">
              MetEd Student
            </Link>
          </div>
          <div className="mt-8 flex flex-col flex-1">
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    item.current 
                      ? "bg-[#ff7f00] text-white shadow-lg shadow-[#ff7f00]/20" 
                      : "text-white/90 hover:bg-[#ff7f00]/20 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      item.current 
                        ? "text-white" 
                        : "text-white/90 group-hover:text-white"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Link
                href="/student"
                className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-white/90 hover:bg-[#ff7f00]/20 hover:text-white transition-colors"
              >
                <LogOut
                  className="mr-3 h-5 w-5 text-white/90 group-hover:text-white transition-colors"
                  aria-hidden="true"
                />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 text-[#191970] hover:text-[#ff7f00]">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex-1 md:pl-64">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[#ff7f00]/20 bg-white/90 backdrop-blur-sm px-4 shadow-sm">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <main className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#dedede]/50 via-white to-[#dedede]/50">
          {children}
        </main>
      </div>
    </div>
  )
}
