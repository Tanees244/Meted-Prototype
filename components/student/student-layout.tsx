"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { LayoutDashboard, Video, BookOpen, FileText, BarChart2, Calendar, LogOut, Menu, Bell, User, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

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
    <div className="flex flex-col flex-grow bg-gradient-to-br from-[#26CDB8] via-[#26CDB8]/90 to-[#26CDB8]/80 h-full">
      <div className="flex items-center justify-between h-16 flex-shrink-0 px-6 border-b border-[#F2BF27]/20">
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
                  ? "bg-[#F2BF27] text-[#1F4F81] shadow-sm" 
                  : "text-white/90 hover:bg-[#F2BF27]/20 hover:text-white"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 transition-colors ${
                  item.current 
                    ? "text-[#1F4F81]" 
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
            className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-white/90 hover:bg-[#F2BF27]/20 hover:text-white transition-colors"
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
    <div className="flex h-screen bg-gradient-to-br from-[#26CDB8]/5 via-[#26CDB8]/10 to-[#26CDB8]/5">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-[#F2BF27]/20 bg-gradient-to-br from-[#26CDB8] via-[#26CDB8]/90 to-[#26CDB8]/80 px-4 py-5">
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
                      ? "bg-[#F2BF27] text-[#1F4F81] shadow-sm" 
                      : "text-white/90 hover:bg-[#F2BF27]/20 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      item.current 
                        ? "text-[#1F4F81]" 
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
                className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-white/90 hover:bg-[#F2BF27]/20 hover:text-white transition-colors"
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
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 text-[#26CDB8] hover:text-[#26CDB8]/80">
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[#26CDB8]/20 bg-white/90 backdrop-blur-sm px-4 shadow-sm">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-[#26CDB8]" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-[#F2BF27] text-[10px] text-white">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start">
                    <p className="font-medium">New Assignment</p>
                    <p className="text-sm text-muted-foreground">Math homework due tomorrow</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start">
                    <p className="font-medium">Live Session</p>
                    <p className="text-sm text-muted-foreground">Science class starts in 30 minutes</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start">
                    <p className="font-medium">Grade Update</p>
                    <p className="text-sm text-muted-foreground">Your English essay has been graded</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5 text-[#26CDB8]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />
            </div>
          </div>
        </div>
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
