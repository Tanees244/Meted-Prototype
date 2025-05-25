"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Mock data for student progress
const subjects = [
  {
    name: "Mathematics",
    grade: "A-",
    percentage: 92,
    assignments: {
      completed: 18,
      total: 20,
    },
    attendance: 95,
    teacherFeedback: "Excellent progress in algebra. Work on geometry concepts.",
  },
  {
    name: "English",
    grade: "B+",
    percentage: 88,
    assignments: {
      completed: 15,
      total: 18,
    },
    attendance: 90,
    teacherFeedback: "Good writing skills. Focus on critical analysis.",
  },
  {
    name: "Science",
    grade: "A",
    percentage: 95,
    assignments: {
      completed: 12,
      total: 12,
    },
    attendance: 98,
    teacherFeedback: "Outstanding work in lab experiments. Excellent understanding of concepts.",
  },
  {
    name: "History",
    grade: "B",
    percentage: 85,
    assignments: {
      completed: 10,
      total: 12,
    },
    attendance: 92,
    teacherFeedback: "Good research skills. Work on connecting historical events.",
  },
]

const recentAssessments = [
  {
    id: 1,
    title: "Mathematics Mid-Term",
    date: "2023-05-15",
    score: 92,
    maxScore: 100,
    subject: "Mathematics",
  },
  {
    id: 2,
    title: "English Essay",
    date: "2023-05-10",
    score: 88,
    maxScore: 100,
    subject: "English",
  },
  {
    id: 3,
    title: "Science Lab Report",
    date: "2023-05-08",
    score: 95,
    maxScore: 100,
    subject: "Science",
  },
  {
    id: 4,
    title: "History Quiz",
    date: "2023-05-05",
    score: 85,
    maxScore: 100,
    subject: "History",
  },
]

export default function StudentProgressContent() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold">My Academic Progress</h1>
        <Select defaultValue="current">
          <SelectTrigger className="w-[180px] mt-2 md:mt-0">
            <SelectValue placeholder="Select Term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Term</SelectItem>
            <SelectItem value="previous">Previous Term</SelectItem>
            <SelectItem value="all">All Terms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">90% Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55/62</div>
            <p className="text-xs text-muted-foreground">89% Completion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Present: 47/50 Days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5th</div>
            <p className="text-xs text-muted-foreground">Top 10%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="assessments">Recent Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          {subjects.map((subject, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{subject.name}</CardTitle>
                  <div className="text-2xl font-bold">{subject.grade}</div>
                </div>
                <CardDescription>
                  Assignments: {subject.assignments.completed}/{subject.assignments.total} completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{subject.percentage}%</span>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Attendance</span>
                      <span>{subject.attendance}%</span>
                    </div>
                    <Progress value={subject.attendance} className="h-2" />
                  </div>

                  <div className="pt-2 border-t">
                    <h4 className="text-sm font-medium mb-1">Teacher Feedback:</h4>
                    <p className="text-sm text-muted-foreground">{subject.teacherFeedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          {recentAssessments.map((assessment) => (
            <Card key={assessment.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{assessment.title}</CardTitle>
                    <CardDescription>
                      {assessment.subject} - {new Date(assessment.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="text-xl font-bold">
                    {assessment.score}/{assessment.maxScore}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score</span>
                    <span>{Math.round((assessment.score / assessment.maxScore) * 100)}%</span>
                  </div>
                  <Progress value={(assessment.score / assessment.maxScore) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
