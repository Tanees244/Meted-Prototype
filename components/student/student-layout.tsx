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
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#F5FAFF]">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#191970] text-white lg:hidden"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-4 left-4 z-40 w-64 transform rounded-xl bg-[#191970] text-white transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-xl",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-8 items-center justify-between px-6 pt-12 pb-8">
          <h1 className="text-2xl font-bold">MetEd Student</h1>
        </div>
        <nav className="space-y-1 p-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#ff7f00] text-white shadow-lg shadow-[#ff7f00]/20"
                    : "text-white/70 hover:bg-[#ff7f00]/10 hover:text-white"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.title}</span>
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 w-full py-0">
          <div className="space-y-2">
            {/* Notification and Settings Section */}
            <div className="flex flex-col gap-2">
              {/* <Button
                variant="ghost"
                className="w-full justify-start space-x-3 text-white/70 hover:bg-[#ff7f00]/10 hover:text-white rounded-lg px-4 py-3"
              >
                <Bell className="h-5 w-5" />
                <span className="text-sm font-medium">Notifications</span>
              </Button> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 text-white/70 hover:bg-[#ff7f00]/10 hover:text-white rounded-lg px-4 py-3"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">Account</span>
                  </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-[#ff7f00]/20">
                  <DropdownMenuLabel className="text-[#191970]">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#ff7f00]/20" />
                  <DropdownMenuItem className="text-[#191970] hover:bg-[#ff7f00]/10 hover:text-[#ff7f00]">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#191970] hover:bg-[#ff7f00]/10 hover:text-[#ff7f00]">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#ff7f00]/20" />
                  <DropdownMenuItem className="text-[#191970] hover:bg-[#ff7f00]/10 hover:text-[#ff7f00]">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 text-white/70 hover:bg-[#ff7f00]/10 hover:text-white rounded-lg px-10 py-12"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Logout</span>
            </Button>
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
