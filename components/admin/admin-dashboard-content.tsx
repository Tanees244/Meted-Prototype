"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BellIcon, CalendarIcon, CheckCircleIcon, ClockIcon, UserIcon, UsersIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data
const systemStats = {
  totalStudents: 120,
  totalTeachers: 15,
  activeSessions: 8,
  completedSessions: 245,
  pendingAssignments: 32,
  completedAssignments: 187,
}

const recentActivities = [
  {
    id: 1,
    type: "user",
    description: "New teacher account created: Sarah Johnson",
    date: "2 hours ago",
  },
  {
    id: 2,
    type: "session",
    description: "Session scheduled: Math tutoring for John Doe with Mr. Smith",
    date: "3 hours ago",
  },
  {
    id: 3,
    type: "assignment",
    description: "New assignment created: Algebra Equations by Ms. Johnson",
    date: "Yesterday",
  },
  {
    id: 4,
    type: "announcement",
    description: "System-wide announcement posted: Platform maintenance scheduled",
    date: "2 days ago",
  },
]

export function AdminDashboardContent() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of the system.</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-2 text-sm text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
          <span>
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Registered in the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">Active educators</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeSessions}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <Alert key={activity.id}>
                  <BellIcon className="h-4 w-4" />
                  <AlertTitle className="flex justify-between">
                    <span>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Activity</span>
                    <span className="text-xs text-muted-foreground">{activity.date}</span>
                  </AlertTitle>
                  <AlertDescription className="mt-1">
                    <p>{activity.description}</p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Create Announcement</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Announcement</DialogTitle>
                    <DialogDescription>Create a new announcement to be displayed to users.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <input id="title" className="w-full p-2 border rounded-md" placeholder="Announcement title" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="w-full p-2 border rounded-md min-h-[100px]"
                        placeholder="Announcement message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full">
                Add New User
              </Button>
              <Button variant="outline" className="w-full">
                Schedule Session
              </Button>
              <Button variant="outline" className="w-full">
                Generate Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system health and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Server Load</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: "32%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Database Usage</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "67%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
