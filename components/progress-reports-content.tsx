"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3Icon,
  CheckCircleIcon,
  DownloadIcon,
  FileTextIcon,
  LineChartIcon,
  PieChartIcon,
  PrinterIcon,
} from "lucide-react"

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

// Generate performance data
const generatePerformanceData = (studentId: number) => {
  // Generate random grades for the last 5 assignments
  const assignments = []
  for (let i = 1; i <= 5; i++) {
    const grades = ["A", "B", "A-", "B+", "A+"]
    const randomIndex = Math.floor(Math.random() * grades.length)

    assignments.push({
      id: i,
      title: `Assignment ${i}`,
      grade: grades[randomIndex],
      submittedDate: `May ${i + 5}, 2025`,
    })
  }

  // Generate attendance data
  const attendance = {
    present: Math.floor(Math.random() * 10) + 10,
    absent: Math.floor(Math.random() * 3),
    late: Math.floor(Math.random() * 3),
  }

  // Generate progress data (scores out of 100 for the last 6 months)
  const progressData = []
  const months = ["December", "January", "February", "March", "April", "May"]

  for (let i = 0; i < 6; i++) {
    progressData.push({
      month: months[i],
      score: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
    })
  }

  // Generate skill assessment data
  const skills = ["Problem Solving", "Critical Thinking", "Communication", "Collaboration", "Research Skills"]

  const skillAssessments = skills.map((skill) => ({
    skill,
    score: Math.floor(Math.random() * 3) + 3, // Score from 3-5
  }))

  return {
    assignments,
    attendance,
    progressData,
    skillAssessments,
    strengths: [
      "Excellent problem-solving abilities",
      "Strong participation in class discussions",
      "Consistent completion of assignments",
    ],
    areasForImprovement: [
      "Could improve time management for complex tasks",
      "Needs to focus more on showing work in calculations",
    ],
    teacherComments:
      "The student has shown significant progress over the semester. They demonstrate a strong understanding of core concepts and apply them effectively in assignments.",
  }
}

export function ProgressReportsContent() {
  const [selectedStudent, setSelectedStudent] = useState<string>("1")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("semester")

  const student = students.find((s) => s.id.toString() === selectedStudent)
  const performanceData = generatePerformanceData(Number.parseInt(selectedStudent))

  // Calculate attendance rate
  const totalSessions =
    performanceData.attendance.present + performanceData.attendance.absent + performanceData.attendance.late
  const attendanceRate = Math.round((performanceData.attendance.present / totalSessions) * 100)

  // Calculate average grade
  const gradeValues = {
    "A+": 4.3,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  }

  const gradeSum = performanceData.assignments.reduce((sum, assignment) => {
    return sum + (gradeValues[assignment.grade as keyof typeof gradeValues] || 0)
  }, 0)

  const averageGrade = (gradeSum / performanceData.assignments.length).toFixed(2)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Progress Reports</h1>
        <p className="text-muted-foreground">Track and analyze student performance</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-full md:w-[250px]">
            <SelectValue placeholder="Select a student" />
          </SelectTrigger>
          <SelectContent>
            {students.map((student) => (
              <SelectItem key={student.id} value={student.id.toString()}>
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>{student.initials}</AvatarFallback>
                  </Avatar>
                  {student.name} - {student.subject}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="semester">Current Semester</SelectItem>
            <SelectItem value="year">Academic Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {student && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback>{student.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{student.name}</h2>
                <p className="text-muted-foreground">
                  {student.grade} - {student.subject}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageGrade}</div>
                <p className="text-xs text-muted-foreground">
                  Based on {performanceData.assignments.length} assignments
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendanceRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {performanceData.attendance.present} present, {performanceData.attendance.absent} absent,{" "}
                  {performanceData.attendance.late} late
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skill Assessment</CardTitle>
                <LineChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(
                    performanceData.skillAssessments.reduce((sum, skill) => sum + skill.score, 0) /
                    performanceData.skillAssessments.length
                  ).toFixed(1)}
                  /5
                </div>
                <p className="text-xs text-muted-foreground">
                  Average across {performanceData.skillAssessments.length} key skills
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                  <CardDescription>Student performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <LineChartIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600" />
                      <p className="mt-2 text-muted-foreground">Progress chart would appear here</p>
                      <p className="text-sm text-muted-foreground">This is a placeholder for the actual chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {performanceData.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 mt-0.5 text-xs">
                            +
                          </div>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {performanceData.areasForImprovement.map((area, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-2 mt-0.5 text-xs">
                            !
                          </div>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Teacher Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{performanceData.teacherComments}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Edit Comments
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="assignments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Performance</CardTitle>
                  <CardDescription>Grades and submission history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Assignment</th>
                          <th className="text-center py-3 px-4">Grade</th>
                          <th className="text-left py-3 px-4">Submitted Date</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceData.assignments.map((assignment) => (
                          <tr key={assignment.id} className="border-b">
                            <td className="py-3 px-4">{assignment.title}</td>
                            <td className="text-center py-3 px-4">
                              <span
                                className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                  assignment.grade.startsWith("A")
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : assignment.grade.startsWith("B")
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : assignment.grade.startsWith("C")
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                }`}
                              >
                                {assignment.grade}
                              </span>
                            </td>
                            <td className="py-3 px-4">{assignment.submittedDate}</td>
                            <td className="text-right py-3 px-4">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Record</CardTitle>
                  <CardDescription>Session attendance history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="h-[200px] flex items-center justify-center">
                        <div className="text-center">
                          <PieChartIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600" />
                          <p className="mt-2 text-muted-foreground">Attendance chart would appear here</p>
                          <p className="text-sm text-muted-foreground">This is a placeholder for the actual chart</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Present</span>
                        <span className="text-sm">{performanceData.attendance.present} sessions</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(performanceData.attendance.present / totalSessions) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Absent</span>
                        <span className="text-sm">{performanceData.attendance.absent} sessions</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${(performanceData.attendance.absent / totalSessions) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Late</span>
                        <span className="text-sm">{performanceData.attendance.late} sessions</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${(performanceData.attendance.late / totalSessions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Assessment</CardTitle>
                  <CardDescription>Evaluation of key competencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {performanceData.skillAssessments.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.skill}</span>
                          <span className="text-sm">{skill.score}/5</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(skill.score / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Update Assessment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
