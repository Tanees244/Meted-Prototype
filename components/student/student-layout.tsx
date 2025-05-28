"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Video,
  FileText,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Resources",
    href: "/student/resources",
    icon: BookOpen,
  },
  {
    title: "Schedule",
    href: "/student/schedule",
    icon: Calendar,
  },
  {
    title: "Live Sessions",
    href: "/student/live-sessions",
    icon: Video,
  },
  {
    title: "Assignments",
    href: "/student/assignments",
    icon: FileText,
  },
  {
    title: "Progress",
    href: "/student/progress",
    icon: BarChart,
  },
]

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-violet-50/30 to-fuchsia-50/30">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gradient-to-r from-blue-500 to-violet-500 text-white lg:hidden shadow-lg"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-4 left-4 z-40 w-64 transform rounded-xl bg-gradient-to-br from-white via-blue-50/50 to-violet-50/50 transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-xl border border-blue-100/50",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo and Title */}
        <div className="p-6 border-b border-blue-100/50">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">MetEd</h1>
          </div>
          <p className="text-sm text-violet-600 mt-1">Student Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-200",
                pathname === link.href
                  ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600 shadow-md"
                  : "text-blue-900 hover:bg-blue-50/50 hover:text-violet-600"
              )}
              onClick={() => router.push(link.href)}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </Button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-100/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full blur-sm"></div>
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Mehdi</p>
              <p className="text-xs text-violet-600">Student</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          isSidebarOpen ? "lg:ml-72" : "lg:ml-72"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
