"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { UploadIcon as FileUpload, ClockIcon } from "lucide-react"

interface Assignment {
  id: number
  title: string
  subject: string
  dueDate: string
  description?: string
  submittedDate?: string
  grade?: string
  feedback?: string
  status: "pending" | "completed"
}

// Mock data for assignments
const pendingAssignments: Assignment[] = [
  {
    id: 1,
    title: "Mathematics Problem Set",
    subject: "Mathematics",
    dueDate: "2024-07-15",
    description: "Complete problems 1-20 in Chapter 5",
    status: "pending",
  },
  {
    id: 2,
    title: "English Essay",
    subject: "English",
    dueDate: "2024-07-18",
    description: "Write a 500-word essay on the theme of identity in the assigned novel",
    status: "pending",
  },
]

const completedAssignments: Assignment[] = [
  {
    id: 3,
    title: "Science Lab Report",
    subject: "Science",
    dueDate: "2024-07-10",
    submittedDate: "2024-07-09",
    grade: "A",
    feedback: "Excellent work! Your analysis was thorough and well-presented.",
    status: "completed",
  },
  {
    id: 4,
    title: "History Research Paper",
    subject: "History",
    dueDate: "2024-07-05",
    submittedDate: "2024-07-04",
    grade: "B+",
    feedback: "Good research and arguments. Work on improving your citations.",
    status: "completed",
  },
]

export default function StudentAssignmentsContent() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [submissionText, setSubmissionText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [viewFeedback, setViewFeedback] = useState<Assignment | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOpenDialog(false)
      setSubmissionText("")
      // Would update the assignment status here in a real app
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#24CAB6]">Assignments</h1>
          <p className="text-[#EAB308]">Manage and track your course assignments</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-2 text-sm text-[#24CAB6]">
          <ClockIcon className="h-4 w-4" />
          <span>
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-white/90 backdrop-blur-sm border-[#24CAB6]/20 shadow-lg">
          <TabsTrigger 
            value="pending"
            className="data-[state=active]:bg-[#24CAB6] data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="data-[state=active]:bg-[#EAB308] data-[state=active]:text-white"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm border-[#24CAB6]/20 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-center text-[#24CAB6]/70">No pending assignments</p>
              </CardContent>
            </Card>
          ) : (
            pendingAssignments.map((assignment) => (
              <Card key={assignment.id} className="bg-white border-[#24CAB6]/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#24CAB6]">{assignment.title}</CardTitle>
                  <CardDescription className="text-[#EAB308]">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        assignment.status === "completed"
                          ? "bg-[#EAB308]/20 text-[#EAB308]"
                          : "bg-[#24CAB6]/20 text-[#24CAB6]"
                      }
                    >
                      {assignment.status}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-[#24CAB6] text-[#24CAB6] hover:bg-[#24CAB6]/10"
                        >
                          Submit Work
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-[#24CAB6]">Submit Assignment</DialogTitle>
                          <DialogDescription className="text-[#EAB308]">
                            Upload your work for {assignment.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="submission" className="text-[#24CAB6]">Your Submission</Label>
                            <Textarea
                              id="submission"
                              placeholder="Type your submission here..."
                              value={submissionText}
                              onChange={(e) => setSubmissionText(e.target.value)}
                              className="min-h-[200px] border-[#24CAB6]/20 focus:border-[#24CAB6]"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="file" className="text-[#24CAB6]">Upload File (Optional)</Label>
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-[#24CAB6]/20"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <FileUpload className="w-8 h-8 mb-4 text-[#24CAB6]" />
                                  <p className="mb-2 text-sm text-[#24CAB6]">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-[#24CAB6]/70">PDF, DOC, or DOCX</p>
                                </div>
                                <input id="file-upload" type="file" className="hidden" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setOpenDialog(false)}
                            disabled={isSubmitting}
                            className="border-[#24CAB6] text-[#24CAB6] hover:bg-[#24CAB6]/10"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSubmit}
                            disabled={!submissionText || isSubmitting}
                            className="bg-[#24CAB6] hover:bg-[#24CAB6]/90 text-white"
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedAssignments.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm border-[#24CAB6]/20 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-center text-[#24CAB6]/70">No completed assignments</p>
              </CardContent>
            </Card>
          ) : (
            completedAssignments.map((assignment) => (
              <Card key={assignment.id} className="bg-white border-[#24CAB6]/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#24CAB6]">{assignment.title}</CardTitle>
                  <CardDescription className="text-[#EAB308]">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-[#24CAB6]/70 mb-4">
                    <span>Submitted: {assignment.submittedDate ? new Date(assignment.submittedDate).toLocaleDateString() : 'Not submitted'}</span>
                    {assignment.grade && (
                      <span className="font-medium text-[#EAB308]">Grade: {assignment.grade}</span>
                    )}
                  </div>
                  {assignment.feedback && (
                    <div className="mb-4 p-3 bg-[#EAB308]/10 rounded-lg">
                      <p className="text-sm text-[#24CAB6]">{assignment.feedback}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge
                      className="bg-[#EAB308]/20 text-[#EAB308]"
                    >
                      {assignment.status}
                    </Badge>
                    <Button
                      variant="outline"
                      className="border-[#EAB308] text-[#EAB308] hover:bg-[#EAB308]/10"
                      onClick={() => setViewFeedback(assignment)}
                    >
                      View Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!viewFeedback} onOpenChange={() => setViewFeedback(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#24CAB6]">Assignment Feedback</DialogTitle>
            <DialogDescription className="text-[#EAB308]">
              Feedback for {viewFeedback?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-[#24CAB6]">Grade</h4>
              <p className="text-[#EAB308]">{viewFeedback?.grade}</p>
            </div>
            <div>
              <h4 className="font-medium text-[#24CAB6]">Feedback</h4>
              <p className="text-[#24CAB6]/80">{viewFeedback?.feedback}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
