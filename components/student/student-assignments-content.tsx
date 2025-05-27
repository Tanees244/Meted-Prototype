"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { UploadIcon as FileUpload } from "lucide-react"

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
    dueDate: "2023-06-15",
    description: "Complete problems 1-20 in Chapter 5",
    status: "pending",
  },
  {
    id: 2,
    title: "English Essay",
    subject: "English",
    dueDate: "2023-06-18",
    description: "Write a 500-word essay on the theme of identity in the assigned novel",
    status: "pending",
  },
]

const completedAssignments: Assignment[] = [
  {
    id: 3,
    title: "Science Lab Report",
    subject: "Science",
    dueDate: "2023-06-10",
    submittedDate: "2023-06-09",
    grade: "A",
    feedback: "Excellent work! Your analysis was thorough and well-presented.",
    status: "completed",
  },
  {
    id: 4,
    title: "History Research Paper",
    subject: "History",
    dueDate: "2023-06-05",
    submittedDate: "2023-06-04",
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
          <h1 className="text-2xl font-bold tracking-tight text-[#191970]">My Assignments</h1>
          <p className="text-[#019583]">View and submit your assignments</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
          <TabsTrigger 
            value="pending"
            className="data-[state=active]:bg-[#ff7f00] data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="data-[state=active]:bg-[#a6c732] data-[state=active]:text-white"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-center text-[#191970]/70">No pending assignments</p>
              </CardContent>
            </Card>
          ) : (
            pendingAssignments.map((assignment) => (
              <Card key={assignment.id} className="bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-[#191970]">{assignment.title}</CardTitle>
                      <CardDescription className="text-[#019583]">{assignment.subject}</CardDescription>
                    </div>
                    <Badge className="bg-[#ff7f00]/20 text-[#ff7f00] border-[#ff7f00]/30">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#191970]/80">{assignment.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Dialog
                    open={openDialog && selectedAssignment?.id === assignment.id}
                    onOpenChange={(open) => {
                      setOpenDialog(open)
                      if (!open) setSelectedAssignment(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setSelectedAssignment(assignment)}
                        className="bg-[#ff7f00] hover:bg-[#ff7f00]/90 text-white"
                      >
                        Submit Assignment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 backdrop-blur-sm border-[#ff7f00]/20">
                      <DialogHeader>
                        <DialogTitle className="text-[#191970]">Submit Assignment</DialogTitle>
                        <DialogDescription className="text-[#019583]">
                          {assignment.title} - Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="submission" className="text-[#191970]">Your Answer</Label>
                          <Textarea
                            id="submission"
                            placeholder="Type your answer here..."
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                            className="min-h-[150px] border-[#ff7f00]/20 focus:border-[#ff7f00]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="file" className="text-[#191970]">Attach Files (Optional)</Label>
                          <div className="flex items-center gap-2">
                            <Input 
                              id="file" 
                              type="file" 
                              className="border-[#ff7f00]/20 focus:border-[#ff7f00]"
                            />
                            <Button 
                              size="icon" 
                              variant="outline"
                              className="border-[#ff7f00]/20 hover:bg-[#ff7f00]/10"
                            >
                              <FileUpload className="h-4 w-4 text-[#ff7f00]" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => setOpenDialog(false)}
                          className="border-[#ff7f00]/20 text-[#ff7f00] hover:bg-[#ff7f00]/10"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSubmit} 
                          disabled={isSubmitting}
                          className="bg-[#ff7f00] hover:bg-[#ff7f00]/90 text-white"
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedAssignments.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-center text-[#191970]/70">No completed assignments</p>
              </CardContent>
            </Card>
          ) : (
            completedAssignments.map((assignment) => (
              <Card key={assignment.id} className="bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-[#191970]">{assignment.title}</CardTitle>
                      <CardDescription className="text-[#019583]">{assignment.subject}</CardDescription>
                    </div>
                    <Badge className="bg-[#a6c732]/20 text-[#a6c732] border-[#a6c732]/30">
                      Grade: {assignment.grade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-[#191970]/70 mb-4">
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    <span>Submitted: {assignment.submittedDate ? new Date(assignment.submittedDate).toLocaleDateString() : 'Not submitted'}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Dialog
                    open={viewFeedback?.id === assignment.id}
                    onOpenChange={(open) => {
                      if (!open) setViewFeedback(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        onClick={() => setViewFeedback(assignment)}
                        className="border-[#a6c732]/20 text-[#a6c732] hover:bg-[#a6c732]/10"
                      >
                        View Feedback
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 backdrop-blur-sm border-[#ff7f00]/20">
                      <DialogHeader>
                        <DialogTitle className="text-[#191970]">Teacher Feedback</DialogTitle>
                        <DialogDescription className="text-[#019583]">
                          {assignment.title} - Grade: {assignment.grade}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-[#191970]/80">{assignment.feedback}</p>
                      </div>
                      <DialogFooter>
                        <Button 
                          onClick={() => setViewFeedback(null)}
                          className="bg-[#ff7f00] hover:bg-[#ff7f00]/90 text-white"
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
