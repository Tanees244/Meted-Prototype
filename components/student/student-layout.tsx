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
    <div className="min-h-screen bg-[#DFFDFF]">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 rounded-md bg-gradient-to-r from-[#1BA7BC] to-[#37B8C6] text-white lg:hidden shadow-lg"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-4 left-4 z-40 w-64 transform rounded-xl bg-[#1BA7BC] transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-xl border border-[#1BA7BC]/30",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo and Title */}
        <div className="p-6 border-b border-[#1BA7BC]/30">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white">MetEd</h1>
          </div>
          <p className="text-sm text-white/90 mt-1">Student Portal</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-200 rounded-xl flex items-center gap-2 text-white text-base font-medium",
                pathname === link.href
                  ? "bg-white text-[#1BA7BC] font-bold shadow-lg ring-2 ring-[#1BA7BC]/20 border border-white"
                  : "hover:bg-white/10 hover:text-white hover:shadow-md hover:ring-2 hover:ring-white/20 border border-transparent"
              )}
              onClick={() => router.push(link.href)}
            >
              <link.icon className="mr-2 h-5 w-5" />
              {link.title}
            </Button>
          ))}
        </nav>

        {/* User Profile and Logout */}
        <div className="p-4 border-t border-[#1BA7BC]/30">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#1BA7BC] rounded-full blur-sm"></div>
              <div className="relative h-8 w-8 rounded-full bg-[#1BA7BC] flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Mehdi</p>
              <p className="text-xs text-white/90">Student</p>
            </div>
          </div>
          <Button className="mt-4 w-full bg-white text-[#1BA7BC] hover:bg-[#E0F7FA] flex items-center gap-2 font-bold" onClick={() => router.push('/logout')}>
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          isSidebarOpen ? "lg:ml-72" : "lg:ml-72"
        )}
      >
        <div className="px-0 py-[16px]">{children}</div>
      </main>
    </div>
  )
}
