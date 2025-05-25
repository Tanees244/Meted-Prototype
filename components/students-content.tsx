"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BookOpenIcon, MailIcon, PhoneIcon, SearchIcon, UserIcon } from "lucide-react"

// Mock data
const students = [
  {
    id: 1,
    name: "John Doe",
    grade: "10th Grade",
    subject: "Mathematics",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    parent: "Robert & Mary Doe",
    parentEmail: "robert.doe@example.com",
    parentPhone: "(555) 123-4568",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
    bio: "John is a dedicated student who excels in problem-solving and analytical thinking. He has shown significant improvement in algebra concepts over the past month.",
    strengths: ["Problem solving", "Analytical thinking", "Geometry"],
    weaknesses: ["Algebra equations", "Word problems"],
    notes: "John needs additional support with algebraic equations. He responds well to visual learning methods.",
  },
  {
    id: 2,
    name: "Sarah Smith",
    grade: "9th Grade",
    subject: "Science",
    email: "sarah.smith@example.com",
    phone: "(555) 234-5678",
    parent: "James & Jennifer Smith",
    parentEmail: "james.smith@example.com",
    parentPhone: "(555) 234-5679",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SS",
    bio: "Sarah shows a natural curiosity for scientific concepts. She is particularly interested in biology and environmental science.",
    strengths: ["Scientific inquiry", "Lab work", "Research skills"],
    weaknesses: ["Physics concepts", "Technical writing"],
    notes: "Sarah would benefit from more hands-on experiments. She learns best through practical application.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    grade: "11th Grade",
    subject: "English",
    email: "michael.johnson@example.com",
    phone: "(555) 345-6789",
    parent: "David & Lisa Johnson",
    parentEmail: "david.johnson@example.com",
    parentPhone: "(555) 345-6780",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MJ",
    bio: "Michael has a strong command of language and excels in creative writing. He needs to work on his analytical essay structure.",
    strengths: ["Creative writing", "Vocabulary", "Reading comprehension"],
    weaknesses: ["Essay structure", "Literary analysis"],
    notes: "Michael should focus on developing stronger thesis statements and supporting arguments in his essays.",
  },
  {
    id: 4,
    name: "Emily Brown",
    grade: "8th Grade",
    subject: "History",
    email: "emily.brown@example.com",
    phone: "(555) 456-7890",
    parent: "Thomas & Karen Brown",
    parentEmail: "thomas.brown@example.com",
    parentPhone: "(555) 456-7891",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
    bio: "Emily has a passion for historical events and cultural studies. She excels at research and presentation.",
    strengths: ["Historical research", "Presentations", "Cultural studies"],
    weaknesses: ["Date memorization", "Connecting historical events"],
    notes:
      "Emily would benefit from creating timelines to better understand the sequence and relationships between historical events.",
  },
]

export function StudentsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleStudentSelect = (studentId: number) => {
    setSelectedStudent(studentId)
  }

  const selectedStudentData = students.find((s) => s.id === selectedStudent)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Directory</h1>
        <p className="text-muted-foreground">View and manage your assigned students</p>
      </div>

      <div className="relative w-full md:w-64">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search students..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Students</CardTitle>
              <CardDescription>Students assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredStudents.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">No students found</p>
                ) : (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center ${
                        selectedStudent === student.id
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-900"
                      }`}
                      onClick={() => handleStudentSelect(student.id)}
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>{student.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.grade} - {student.subject}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedStudentData ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={selectedStudentData.avatar || "/placeholder.svg"}
                        alt={selectedStudentData.name}
                      />
                      <AvatarFallback>{selectedStudentData.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedStudentData.name}</CardTitle>
                      <CardDescription>
                        {selectedStudentData.grade} - {selectedStudentData.subject}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>
                  <TabsContent value="profile" className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">About</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{selectedStudentData.bio}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium">Strengths</h3>
                        <ul className="mt-1 text-sm text-muted-foreground space-y-1">
                          {selectedStudentData.strengths.map((strength, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Areas for Improvement</h3>
                        <ul className="mt-1 text-sm text-muted-foreground space-y-1">
                          {selectedStudentData.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-2"></div>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Teacher Notes</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{selectedStudentData.notes}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="academic" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Subject</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center">
                            <BookOpenIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedStudentData.subject}</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Grade Level</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedStudentData.grade}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <Button variant="outline" className="flex-1">
                        View Progress Report
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Assignments
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="contact" className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Student Contact</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedStudentData.email}</span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedStudentData.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Parent/Guardian Contact</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedStudentData.parent}</span>
                        </div>
                        <div className="flex items-center">
                          <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedStudentData.parentEmail}</span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedStudentData.parentPhone}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Schedule Session</Button>
                <Button>Contact Student</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
                <CardDescription>Select a student to view their profile</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <UserIcon className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                <p className="mt-2 text-muted-foreground">No student selected</p>
                <p className="text-sm text-muted-foreground">Click on a student to view their profile</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
