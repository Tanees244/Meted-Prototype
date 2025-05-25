"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { LayoutDashboard, Users, Calendar, Bell, BarChart3, Settings, LogOut, Menu, ClipboardList } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/admin/dashboard",
    },
    {
      name: "Registration Requests",
      href: "/admin/requests",
      icon: ClipboardList,
      current: pathname === "/admin/requests",
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: Users,
      current: pathname === "/admin/users",
    },
    {
      name: "Schedule Management",
      href: "/admin/schedule",
      icon: Calendar,
      current: pathname === "/admin/schedule",
    },
    {
      name: "Announcements",
      href: "/admin/announcements",
      icon: Bell,
      current: pathname === "/admin/announcements",
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
      current: pathname === "/admin/reports",
    },
    // {
    //   name: "Settings",
    //   href: "/admin/settings",
    //   icon: Settings,
    //   current: pathname === "/admin/settings",
    // },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-border bg-card px-4 py-5">
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4">
            <Link href="/admin/dashboard" className="text-2xl font-bold">
              MetEd Admin
            </Link>
          </div>
          <div className="mt-8 flex flex-col flex-1">
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    item.current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      item.current ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-4">
              <Link
                href="/admin"
                className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
              >
                <LogOut className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col flex-grow bg-card h-full">
            <div className="flex items-center justify-between h-16 flex-shrink-0 px-6 border-b">
              <Link href="/admin/dashboard" className="text-2xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                MetEd Admin
              </Link>
            </div>
            <div className="flex flex-col flex-1 px-4 py-5">
              <nav className="flex-1 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      item.current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        item.current ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-4">
                <Link
                  href="/admin"
                  className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogOut
                    className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground"
                    aria-hidden="true"
                  />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 bg-background border-b border-border px-4 md:px-6">
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
          <div className="flex items-center ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
