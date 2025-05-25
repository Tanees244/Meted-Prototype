"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { CheckIcon, FileTextIcon, MicIcon, PhoneIcon, UploadIcon, VideoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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

export function LiveSessionRoom() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const studentId = searchParams.get("student") || "1"
  const sessionId = searchParams.get("session")

  const [student, setStudent] = useState(students[0])
  const [isConnecting, setIsConnecting] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [attendanceMarked, setAttendanceMarked] = useState(false)
  const [sessionNotes, setSessionNotes] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false)

  useEffect(() => {
    // Find the student based on the ID
    const foundStudent = students.find((s) => s.id.toString() === studentId)
    if (foundStudent) {
      setStudent(foundStudent)
    }

    // Simulate connection process
    const timer = setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [studentId])

  const endSession = () => {
    router.push("/live-sessions")
  }

  const markAttendance = () => {
    setAttendanceMarked(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const saveNotes = () => {
    // In a real app, this would save the notes to a database
    alert("Session notes saved successfully!")
  }

  const shareResources = () => {
    // In a real app, this would share the resources with the student
    alert("Resources shared with student successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Session</h1>
          <p className="text-muted-foreground">One-on-one session with {student.name}</p>
        </div>
        <Dialog open={showEndSessionDialog} onOpenChange={setShowEndSessionDialog}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <PhoneIcon className="h-4 w-4 mr-2" />
              End Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>End Session</DialogTitle>
              <DialogDescription>
                Are you sure you want to end this session? Make sure you've marked attendance and saved your notes.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEndSessionDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={endSession}>
                End Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Video Session</CardTitle>
              <CardDescription>Live video connection with your student</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {isConnecting && (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mb-4"></div>
                  <p>Connecting to session...</p>
                </div>
              )}

              {isConnected && (
                <div className="relative h-[400px] bg-gray-900 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <VideoIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Video stream would appear here</p>
                      <p className="text-sm opacity-70 mt-2">This is a placeholder for the actual video interface</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                    <p className="text-white text-xs">Teacher view</p>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    <Button size="icon" variant="secondary">
                      <MicIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <VideoIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="attendance">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mark Attendance</CardTitle>
                  <CardDescription>Record student attendance for this session</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
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

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="present" checked={attendanceMarked} />
                        <Label htmlFor="present">Mark as Present</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="on-time" />
                        <Label htmlFor="on-time">On Time</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={markAttendance} disabled={attendanceMarked} className="w-full">
                    {attendanceMarked ? (
                      <>
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Attendance Marked
                      </>
                    ) : (
                      "Mark Attendance"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Session Notes</CardTitle>
                  <CardDescription>Take notes during the session</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your session notes here..."
                    className="min-h-[200px]"
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={saveNotes}>
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Save Notes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Resources</CardTitle>
                  <CardDescription>Share materials with the student</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="resource">Upload File</Label>
                      <Input id="resource" type="file" onChange={handleFileUpload} />
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Uploaded Files:</p>
                        <ul className="space-y-1">
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <FileTextIcon className="h-4 w-4 mr-2" />
                              {file}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={shareResources}>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Share with Student
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {attendanceMarked && (
        <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
          <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Attendance Recorded</AlertTitle>
          <AlertDescription>You have successfully marked {student.name} as present for this session.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
