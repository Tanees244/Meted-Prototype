"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Video,
  FileText,
  BarChart,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";

const sidebarLinks = [
  { title: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { title: "Schedule", href: "/student/schedule", icon: Calendar },
  { title: "Live Sessions", href: "/student/live-sessions", icon: Video },
  { title: "Assignments", href: "/student/assignments", icon: FileText },
  { title: "Progress", href: "/student/progress", icon: BarChart },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Not collapsed by default
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-4 left-4 z-40 transform rounded-xl bg-white transition-all duration-200 ease-in-out shadow-xl border border-[#E0E7EF]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          isSidebarCollapsed ? "w-16" : "w-64 lg:w-64"
        )}
      >
        {/* Logo and Toggle Section */}
        <div className="p-4 flex items-center border-b border-[#E0E7EF]">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-full bg-[#191970] text-white shadow-md hover:shadow-lg transition-shadow duration-200 mr-2 lg:hidden"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5 transition-transform duration-200 transform rotate-90" />
            ) : (
              <Menu className="h-5 w-5 transition-transform duration-200" />
            )}
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-[#191970]">MetEd</h1>
            <p className="text-sm text-[#191970] mt-1 font-medium">Student Portal</p>
          </div>
        </div>

        {/* Collapse/Expand Toggle */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-full bg-[#191970] text-white shadow-md hover:shadow-lg transition-shadow duration-200"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? (
              <Menu className="h-6 w-6 transition-transform duration-200" />
            ) : (
              <X className="h-6 w-6 transition-transform duration-200 transform rotate-90" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-200 rounded-xl flex items-center gap-3 text-base font-medium",
                pathname === link.href
                  ? "bg-white text-[#191970] font-bold shadow-md ring-2 ring-[#FF7F00]/30 border border-white"
                  : "text-[#191970] hover:bg-white hover:shadow-sm hover:ring-2 hover:ring-[#191970]/20 border border-transparent"
              )}
              onClick={() => router.push(link.href)}
            >
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center mr-2",
                  pathname === link.href ? "bg-[#FF7F00] text-white" : "bg-[#191970] text-white"
                )}
              >
                <link.icon className="h-5 w-5" />
              </div>
              {!isSidebarCollapsed && <span>{link.title}</span>}
            </Button>
          ))}
        </nav>

        {/* User Profile and Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E0E7EF]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#191970] rounded-full blur-sm"></div>
                <div className="relative h-8 w-8 rounded-full bg-[#191970] flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#191970]">Mehdi</p>
                <p className="text-xs text-[#191970]">Student</p>
              </div>
            </div>
          </div>
          <Button
            className="w-full bg-[#FF7F00] text-[#191970] hover:bg-[#FF7F00]/90 flex items-center gap-2 font-bold py-2 rounded-xl"
            onClick={() => router.push('/logout')}
          >
            <div className="h-6 w-6 rounded-full bg-[#191970] flex items-center justify-center">
              <LogOut className="h-4 w-4 text-white" />
            </div>
            {!isSidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen py-4 px-2 lg:ml-72 transition-all duration-200",
          isSidebarOpen && "ml-0 lg:ml-72",
          isSidebarCollapsed ? "lg:ml-16" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </div>
  );
}