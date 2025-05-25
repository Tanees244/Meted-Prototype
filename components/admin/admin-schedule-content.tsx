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
import { PlusIcon } from "lucide-react"

// Mock data
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

const scheduleData = [
  {
    day: "Monday",
    slots: [
      { time: "9:00 AM", teacher: "John Smith", student: "John Doe", subject: "Mathematics" },
      { time: "11:00 AM", teacher: "Sarah Johnson", student: "Sarah Smith", subject: "Science" },
      { time: "2:00 PM", teacher: "John Smith", student: "Michael Johnson", subject: "Mathematics" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      { time: "10:00 AM", teacher: "Sarah Johnson", student: "Emily Brown", subject: "Science" },
      { time: "1:00 PM", teacher: "John Smith", student: "Sarah Smith", subject: "Mathematics" },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      { time: "9:00 AM", teacher: "John Smith", student: "John Doe", subject: "Mathematics" },
      { time: "11:00 AM", teacher: "Sarah Johnson", student: "Michael Johnson", subject: "Science" },
    ],
  },
  {
    day: "Thursday",
    slots: [
      { time: "10:00 AM", teacher: "Sarah Johnson", student: "Emily Brown", subject: "Science" },
      { time: "2:00 PM", teacher: "John Smith", student: "John Doe", subject: "Mathematics" },
    ],
  },
  {
    day: "Friday",
    slots: [
      { time: "9:00 AM", teacher: "John Smith", student: "Sarah Smith", subject: "Mathematics" },
      { time: "1:00 PM", teacher: "Sarah Johnson", student: "Michael Johnson", subject: "Science" },
      { time: "3:00 PM", teacher: "John Smith", student: "Emily Brown", subject: "Mathematics" },
    ],
  },
]

export function AdminScheduleContent() {
  const [selectedDay, setSelectedDay] = useState("all")

  const filteredSchedule = selectedDay === "all" ? scheduleData : scheduleData.filter((day) => day.day === selectedDay)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Schedule Management</h1>
          <p className="text-muted-foreground">Manage and schedule one-on-one sessions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Schedule New Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
                <DialogDescription>Create a new one-on-one session between a teacher and student.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="teacher" className="text-sm font-medium">
                    Teacher
                  </label>
                  <select id="teacher" className="w-full p-2 border rounded-md">
                    <option value="">Select a teacher</option>
                    <option value="1">John Smith (Mathematics)</option>
                    <option value="2">Sarah Johnson (Science)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="student" className="text-sm font-medium">
                    Student
                  </label>
                  <select id="student" className="w-full p-2 border rounded-md">
                    <option value="">Select a student</option>
                    <option value="1">John Doe (10th Grade)</option>
                    <option value="2">Sarah Smith (9th Grade)</option>
                    <option value="3">Michael Johnson (11th Grade)</option>
                    <option value="4">Emily Brown (8th Grade)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="day" className="text-sm font-medium">
                      Day
                    </label>
                    <select id="day" className="w-full p-2 border rounded-md">
                      <option value="">Select a day</option>
                      {weekdays.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="time" className="text-sm font-medium">
                      Time
                    </label>
                    <select id="time" className="w-full p-2 border rounded-md">
                      <option value="">Select a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="duration" className="text-sm font-medium">
                    Duration
                  </label>
                  <select id="duration" className="w-full p-2 border rounded-md">
                    <option value="30">30 minutes</option>
                    <option value="45" selected>
                      45 minutes
                    </option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Schedule Session</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant={selectedDay === "all" ? "default" : "outline"} onClick={() => setSelectedDay("all")}>
          All Days
        </Button>
        {weekdays.map((day) => (
          <Button key={day} variant={selectedDay === day ? "default" : "outline"} onClick={() => setSelectedDay(day)}>
            {day}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredSchedule.map((daySchedule) => (
          <Card key={daySchedule.day}>
            <CardHeader>
              <CardTitle>{daySchedule.day}</CardTitle>
              <CardDescription>Scheduled sessions for {daySchedule.day}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-left py-3 px-4">Teacher</th>
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daySchedule.slots.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-muted-foreground">
                          No sessions scheduled for this day
                        </td>
                      </tr>
                    ) : (
                      daySchedule.slots.map((slot, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4">{slot.time}</td>
                          <td className="py-3 px-4">{slot.teacher}</td>
                          <td className="py-3 px-4">{slot.student}</td>
                          <td className="py-3 px-4">{slot.subject}</td>
                          <td className="text-right py-3 px-4">
                            <Button variant="outline" size="sm" className="mr-2">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              Cancel
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
        ))}
      </div>
    </div>
  )
}
