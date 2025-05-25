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

// Mock data for assignments
const pendingAssignments = [
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

const completedAssignments = [
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
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [submissionText, setSubmissionText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [viewFeedback, setViewFeedback] = useState(null)

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
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">My Assignments</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No pending assignments</p>
              </CardContent>
            </Card>
          ) : (
            pendingAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>{assignment.subject}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{assignment.description}</p>
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
                      <Button onClick={() => setSelectedAssignment(assignment)}>Submit Assignment</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Assignment</DialogTitle>
                        <DialogDescription>
                          {assignment.title} - Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="submission">Your Answer</Label>
                          <Textarea
                            id="submission"
                            placeholder="Type your answer here..."
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                            className="min-h-[150px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="file">Attach Files (Optional)</Label>
                          <div className="flex items-center gap-2">
                            <Input id="file" type="file" />
                            <Button size="icon" variant="outline">
                              <FileUpload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
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
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No completed assignments</p>
              </CardContent>
            </Card>
          ) : (
            completedAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>{assignment.subject}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Grade: {assignment.grade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    <span>Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</span>
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
                      <Button variant="outline" onClick={() => setViewFeedback(assignment)}>
                        View Feedback
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Teacher Feedback</DialogTitle>
                        <DialogDescription>
                          {assignment.title} - Grade: {assignment.grade}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p>{assignment.feedback}</p>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setViewFeedback(null)}>Close</Button>
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
