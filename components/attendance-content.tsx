"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data
const students = [
  {
    id: 1,
    name: "John Doe",
    grade: "10th Grade",
    subject: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
  },
  {
    id: 2,
    name: "Sarah Smith",
    grade: "9th Grade",
    subject: "Science",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SS",
  },
  {
    id: 3,
    name: "Michael Johnson",
    grade: "11th Grade",
    subject: "English",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MJ",
  },
  {
    id: 4,
    name: "Emily Brown",
    grade: "8th Grade",
    subject: "History",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
  },
]

// Generate attendance records for the past 30 days
const generateAttendanceRecords = () => {
  const records = []
  const today = new Date()

  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    for (const student of students) {
      // Randomly determine attendance status
      const random = Math.random()
      let status = "present"

      if (random < 0.1) {
        status = "absent"
      } else if (random < 0.2) {
        status = "late"
      }

      records.push({
        id: `${student.id}-${date.toISOString()}`,
        student,
        date: date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        status,
        time: status === "late" ? "10 minutes" : null,
      })
    }
  }

  return records
}

const attendanceRecords = generateAttendanceRecords()

export function AttendanceContent() {
  const [selectedStudent, setSelectedStudent] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredRecords = attendanceRecords.filter((record) => {
    // Filter by student
    if (selectedStudent !== "all" && record.student.id.toString() !== selectedStudent) {
      return false
    }

    // Filter by date
    if (selectedDate && !record.date.includes(selectedDate)) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && record.status !== selectedStatus) {
      return false
    }

    return true
  })

  // Calculate attendance statistics
  const calculateStats = (studentId = "all") => {
    const relevantRecords =
      studentId === "all" ? attendanceRecords : attendanceRecords.filter((r) => r.student.id.toString() === studentId)

    const total = relevantRecords.length
    const present = relevantRecords.filter((r) => r.status === "present").length
    const absent = relevantRecords.filter((r) => r.status === "absent").length
    const late = relevantRecords.filter((r) => r.status === "late").length

    const presentRate = total > 0 ? Math.round((present / total) * 100) : 0

    return { total, present, absent, late, presentRate }
  }

  const stats = calculateStats(selectedStudent === "all" ? "all" : selectedStudent)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance Logs</h1>
        <p className="text-muted-foreground">Track and monitor student attendance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.present}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <XCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.absent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.late}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Rate</CardTitle>
          <CardDescription>Overall attendance percentage: {stats.presentRate}%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${stats.presentRate}%` }}></div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by student" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            {students.map((student) => (
              <SelectItem key={student.id} value={student.id.toString()}>
                {student.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Filter by date (e.g., May)"
          className="w-full md:w-[200px]"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="late">Late</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>Detailed attendance history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Student</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-muted-foreground">
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={record.student.avatar || "/placeholder.svg"} alt={record.student.name} />
                            <AvatarFallback>{record.student.initials}</AvatarFallback>
                          </Avatar>
                          {record.student.name}
                        </div>
                      </td>
                      <td className="py-3 px-4">{record.date}</td>
                      <td className="text-center py-3 px-4">
                        <Badge
                          className={`${
                            record.status === "present"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : record.status === "absent"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{record.status === "late" && `Late by ${record.time}`}</td>
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
