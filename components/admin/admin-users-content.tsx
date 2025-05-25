"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon, SearchIcon } from "lucide-react"

// Mock data
const teachers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@meted.edu",
    subject: "Mathematics",
    students: 12,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@meted.edu",
    subject: "Science",
    students: 8,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@meted.edu",
    subject: "English",
    students: 10,
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
  },
]

const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    grade: "10th Grade",
    teacher: "John Smith",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    grade: "9th Grade",
    teacher: "Sarah Johnson",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SS",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    grade: "11th Grade",
    teacher: "John Smith",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MJ",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@example.com",
    grade: "8th Grade",
    teacher: "Sarah Johnson",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
  },
]

export function AdminUsersContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("teachers")

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage teachers and students in the system</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new teacher or student account in the system.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="user-type" className="text-sm font-medium">
                    User Type
                  </label>
                  <select id="user-type" className="w-full p-2 border rounded-md">
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input id="name" className="w-full p-2 border rounded-md" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input id="email" type="email" className="w-full p-2 border rounded-md" placeholder="Email address" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative w-full md:w-64">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search users..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="teachers" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="teachers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
              <CardDescription>Manage teacher accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-center py-3 px-4">Students</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-muted-foreground">
                          No teachers found
                        </td>
                      </tr>
                    ) : (
                      filteredTeachers.map((teacher) => (
                        <tr key={teacher.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                                <AvatarFallback>{teacher.initials}</AvatarFallback>
                              </Avatar>
                              {teacher.name}
                            </div>
                          </td>
                          <td className="py-3 px-4">{teacher.email}</td>
                          <td className="py-3 px-4">{teacher.subject}</td>
                          <td className="text-center py-3 px-4">{teacher.students}</td>
                          <td className="text-center py-3 px-4">
                            <span
                              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                teacher.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              }`}
                            >
                              {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                            </span>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Button variant="outline" size="sm">
                              Edit
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
        </TabsContent>
        <TabsContent value="students" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage student accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Grade</th>
                      <th className="text-left py-3 px-4">Teacher</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-muted-foreground">
                          No students found
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                <AvatarFallback>{student.initials}</AvatarFallback>
                              </Avatar>
                              {student.name}
                            </div>
                          </td>
                          <td className="py-3 px-4">{student.email}</td>
                          <td className="py-3 px-4">{student.grade}</td>
                          <td className="py-3 px-4">{student.teacher}</td>
                          <td className="text-center py-3 px-4">
                            <span
                              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                student.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              }`}
                            >
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </span>
                          </td>
                          <td className="text-right py-3 px-4">
                            <Button variant="outline" size="sm">
                              Edit
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
