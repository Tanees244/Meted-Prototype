"use client"

import { useState } from "react"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  BarChart3Icon,
  BookOpenIcon,
  CalendarIcon,
  CheckSquareIcon,
  ClipboardListIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UploadIcon,
  UsersIcon,
  XIcon,
} from "lucide-react"
interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: "Live Sessions",
    href: "/live-sessions",
    icon: <BookOpenIcon className="h-5 w-5" />,
  },
  {
    title: "Assignments",
    href: "/assignments",
    icon: <CheckSquareIcon className="h-5 w-5" />,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: <ClipboardListIcon className="h-5 w-5" />,
  },
  {
    title: "Students",
    href: "/students",
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: <UploadIcon className="h-5 w-5" />,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: <CalendarIcon className="h-5 w-5" />,
  },
  {
    title: "Progress Reports",
    href: "/progress-reports",
    icon: <BarChart3Icon className="h-5 w-5" />,
  },
]

const navBottom: NavItem[] = [
  {
    title: "Notifications",
    href: "/#",
    icon: <BarChart3Icon className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/progress-reports",
    icon: <BarChart3Icon className="h-5 w-5" />,
  },
]

// Export as a named export
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="flex items-center justify-center h-14 px-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">MetEd LMS</h1>
          </div>
          <div className="flex flex-col flex-grow px-4 mt-5">
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )
              })}
            </nav>
            <nav className="flex-1 space-y-1">
              {navBottom.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full bg-white dark:bg-gray-950">
            <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">MetEd LMS</h1>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col flex-grow px-4 mt-5">
              <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-auto pb-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 dark:bg-gray-950 dark:border-gray-800">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>

          <div className="flex-1" />
          <ThemeToggle />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Teacher" />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-medium">Teacher Name</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">teacher@meted.edu</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

// Also export as default
export default DashboardLayout
