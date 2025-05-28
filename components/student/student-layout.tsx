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
    <div className="min-h-screen bg-[#EDE8FE]">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#24CAB6] text-black lg:hidden"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-4 left-4 z-40 w-64 transform rounded-xl bg-[#24CAB6] transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-xl",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo and Title */}
        <div className="p-4 border-b border-black/10">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-black">MetEd</h1>
          </div>
          <p className="text-sm text-black mt-1">Student Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              pathname === "/student/dashboard"
                ? "bg-[#EAB308] text-white hover:bg-[#EAB308]/90"
                : "text-black hover:bg-black/10"
            }`}
            onClick={() => router.push("/student/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              pathname === "/student/assignments"
                ? "bg-[#EAB308] text-white hover:bg-[#EAB308]/90"
                : "text-black hover:bg-black/10"
            }`}
            onClick={() => router.push("/student/assignments")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Assignments
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              pathname === "/student/schedule"
                ? "bg-[#EAB308] text-white hover:bg-[#EAB308]/90"
                : "text-black hover:bg-black/10"
            }`}
            onClick={() => router.push("/student/schedule")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              pathname === "/student/resources"
                ? "bg-[#EAB308] text-white hover:bg-[#EAB308]/90"
                : "text-black hover:bg-black/10"
            }`}
            onClick={() => router.push("/student/resources")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Resources
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              pathname === "/student/live-sessions"
                ? "bg-[#EAB308] text-white hover:bg-[#EAB308]/90"
                : "text-black hover:bg-black/10"
            }`}
            onClick={() => router.push("/student/live-sessions")}
          >
            <Video className="mr-2 h-4 w-4" />
            Live Sessions
          </Button>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-black/10">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-black/10 flex items-center justify-center">
              <User className="h-4 w-4 text-black" />
            </div>
            <div>
              <p className="text-sm font-medium text-black">Mehdi</p>
              <p className="text-xs text-black">Student</p>
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
