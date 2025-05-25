"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircleIcon, ClockIcon, FileTextIcon, SearchIcon } from "lucide-react"
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

const assignments = [
  {
    id: 1,
    title: "Algebra Equations",
    description: "Solve the given set of algebraic equations",
    dueDate: "May 15, 2025",
    student: students[0],
    status: "submitted",
    submittedDate: "May 12, 2025",
  },
  {
    id: 2,
    title: "Science Lab Report",
    description: "Write a lab report on the photosynthesis experiment",
    dueDate: "May 18, 2025",
    student: students[1],
    status: "submitted",
    submittedDate: "May 11, 2025",
  },
  {
    id: 3,
    title: "Essay on Shakespeare",
    description: "Write a 500-word essay on a Shakespeare play of your choice",
    dueDate: "May 20, 2025",
    student: students[2],
    status: "pending",
  },
  {
    id: 4,
    title: "Historical Timeline",
    description: "Create a timeline of major events in World War II",
    dueDate: "May 17, 2025",
    student: students[3],
    status: "graded",
    submittedDate: "May 10, 2025",
    grade: "A",
    feedback: "Excellent work! Your timeline is comprehensive and well-researched.",
  },
]

export function AssignmentsContent() {
  const [selectedStudent, setSelectedStudent] = useState<string>("all")
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [feedback, setFeedback] = useState("")
  const [grade, setGrade] = useState("")

  const filteredAssignments = assignments.filter((assignment) => {
    // Filter by student if a specific student is selected
    if (selectedStudent !== "all" && assignment.student.id.toString() !== selectedStudent) {
      return false
    }

    // Filter by search query
    if (searchQuery && !assignment.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  const handleAssignmentSelect = (assignmentId: number) => {
    const assignment = assignments.find((a) => a.id === assignmentId)
    setSelectedAssignment(assignmentId)

    if (assignment && assignment.status === "graded") {
      setFeedback(assignment.feedback || "")
      setGrade(assignment.grade || "")
    } else {
      setFeedback("")
      setGrade("")
    }
  }

  const submitGrade = () => {
    // In a real app, this would send the grade and feedback to an API
    alert(`Grade ${grade} and feedback submitted successfully!`)
    setSelectedAssignment(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">Review and grade student assignments</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search assignments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Submissions</CardTitle>
              <CardDescription>Review and grade student work</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredAssignments.length === 0 ? (
                <div className="text-center py-6">
                  <FileTextIcon className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" />
                  <p className="mt-2 text-muted-foreground">No assignments found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAssignment === assignment.id
                          ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                          : "hover:bg-gray-50 dark:hover:bg-gray-900"
                      }`}
                      onClick={() => handleAssignmentSelect(assignment.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={assignment.student.avatar || "/placeholder.svg"}
                              alt={assignment.student.name}
                            />
                            <AvatarFallback>{assignment.student.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {assignment.student.name} - {assignment.student.subject}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            assignment.status === "submitted"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : assignment.status === "graded"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {assignment.status === "submitted"
                            ? "Submitted"
                            : assignment.status === "graded"
                              ? "Graded"
                              : "Pending"}
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          <span>Due: {assignment.dueDate}</span>
                        </div>
                        {assignment.submittedDate && (
                          <div className="flex items-center text-muted-foreground mt-1">
                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                            <span>Submitted: {assignment.submittedDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedAssignment ? (
            <Card>
              <CardHeader>
                <CardTitle>Grade Assignment</CardTitle>
                <CardDescription>Provide feedback and assign a grade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grade</label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback</label>
                  <Textarea
                    placeholder="Provide feedback on the assignment..."
                    className="min-h-[150px]"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={submitGrade} disabled={!grade}>
                  Submit Grade
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setSelectedAssignment(null)}>
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
                <CardDescription>Select an assignment to view details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <FileTextIcon className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                <p className="mt-2 text-muted-foreground">No assignment selected</p>
                <p className="text-sm text-muted-foreground">Click on an assignment to view and grade it</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
