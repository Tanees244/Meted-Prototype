"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusIcon, SearchIcon } from "lucide-react"

// Mock data
const announcements = [
  {
    id: 1,
    title: "System Maintenance",
    message: "The system will be down for maintenance on Saturday, May 20th from 2:00 AM to 4:00 AM EST.",
    audience: "All Users",
    date: "May 15, 2025",
    author: "Admin",
  },
  {
    id: 2,
    title: "New Feature: Video Conferencing",
    message: "We've added a new video conferencing feature to enhance your one-on-one sessions. Check it out!",
    audience: "Teachers",
    date: "May 10, 2025",
    author: "Admin",
  },
  {
    id: 3,
    title: "End of Semester Reminder",
    message: "Please remember to submit all final grades by June 15th. Contact admin if you have any questions.",
    audience: "Teachers",
    date: "May 5, 2025",
    author: "Admin",
  },
  {
    id: 4,
    title: "Summer Break Schedule",
    message: "Summer break will begin on June 20th. Please check the schedule for any summer sessions.",
    audience: "All Users",
    date: "May 1, 2025",
    author: "Admin",
  },
]

export function AdminAnnouncementsContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.audience.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Manage system-wide announcements</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Announcement
              </Button>
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
                <div className="space-y-2">
                  <label htmlFor="audience" className="text-sm font-medium">
                    Audience
                  </label>
                  <select id="audience" className="w-full p-2 border rounded-md">
                    <option value="all">All Users</option>
                    <option value="teachers">Teachers Only</option>
                    <option value="students">Students Only</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative w-full md:w-64">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search announcements..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
          <CardDescription>System-wide announcements and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Message</th>
                  <th className="text-left py-3 px-4">Audience</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnnouncements.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-muted-foreground">
                      No announcements found
                    </td>
                  </tr>
                ) : (
                  filteredAnnouncements.map((announcement) => (
                    <tr key={announcement.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{announcement.title}</td>
                      <td className="py-3 px-4">
                        <div className="max-w-md truncate">{announcement.message}</div>
                      </td>
                      <td className="py-3 px-4">{announcement.audience}</td>
                      <td className="py-3 px-4">{announcement.date}</td>
                      <td className="text-right py-3 px-4">
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
