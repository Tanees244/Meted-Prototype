"use client";

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
  LogOut,
  FileText,
  BarChart,
  Bell,
  Menu,
  X,
  User,
} from "lucide-react";

const sidebarLinks = [
  { title: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  // { title: "Courses", href: "/student/courses", icon: BookOpen },
  { title: "Schedule", href: "/student/schedule", icon: Calendar },
  { title: "Live Sessions", href: "/student/live-sessions", icon: Video },
  { title: "Assignments", href: "/student/assignments", icon: FileText },
  { title: "Progress", href: "/student/progress", icon: BarChart },
];

const BottomLinks = [
  { title: "Profile", href: "/student/profile", icon: User },
  { title: "Notifications", href: "/#", icon: Bell },
  { title: "Logout", href: "/logout", icon: LogOut },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 rounded-md bg-gradient-to-r from-[#191970] to-[#37B8C6] text-white lg:hidden shadow-lg"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-4 left-4 z-40 w-64 transform rounded-xl bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-xl border border-[#E0E7EF]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo and Title */}
        <div className="flex flex-row p-6 gap-2">
          <div>
            <img
              src="/logo.png"
              alt="MetEd Logo"
              className="h-14 w-14 rounded-full mb-2"
            />
          </div>
          <div className="items-center">
            <h1 className="text-2xl font-bold text-[#191970]">MetEd</h1>
            <p className="text-sm text-[#191970] mt-1">Student Portal</p>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-200 rounded-xl flex items-center gap-2 text-black text-base font-medium",
                pathname === link.href
                  ? "bg-[#bdbdf3]/20 text-[#191970] font-bold shadow-lg"
                  : "hover:bg-[#191970] hover:text-white hover:shadow-md"
              )}
              onClick={() => router.push(link.href)}
            >
              <link.icon className="mr-2 h-5 w-5" />
              {link.title}
            </Button>
          ))}
        </nav>

        {/* Bottom Links at the bottom of the sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <nav className="space-y-2">
            {BottomLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start transition-all duration-200 rounded-xl flex items-center gap-2 text-black text-base font-medium",
                  pathname === link.href
                    ? "bg-[#bdbdf3]/20 text-[#191970] font-bold shadow-lg"
                    : "hover:bg-[#191970] hover:text-white hover:shadow-md"
                  )}
                onClick={() => router.push(link.href)}
              >
                <link.icon className="mr-2 h-5 w-5" />
                {link.title}
              </Button>
            ))}
          </nav>
        </div>

        {/* User Profile and Logout */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#191970] rounded-full blur-sm"></div>
                <div className="relative h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <User className="h-4 w-4 text-[#191970" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#191970]">Mehdi</p>
                  <p className="text-xs text-[#191970]">Student</p>
              </div>
            </div>
          </div>
          <Button 
            className="w-full bg-[#FF7F00] text-[#191970] hover:bg-[#E0F7FA] flex items-center gap-2 font-bold py-2" 
            onClick={() => router.push('/logout')}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div> */}
      </aside>

      {/* Main Content */}
      <main className={cn("min-h-screen pt-4 px-6 lg:ml-64", isSidebarOpen && "lg:ml-64")}>
        {children}
      </main>
    </div>
  );
}