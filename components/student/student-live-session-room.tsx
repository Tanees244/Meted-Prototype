"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileTextIcon, MicIcon, PhoneIcon, VideoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data
const teachers = [
  {
    id: 1,
    name: "Mr. Johnson",
    subject: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MJ",
  },
  {
    id: 2,
    name: "Ms. Smith",
    subject: "Science",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
]

export function StudentLiveSessionRoom() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session") || "1"

  const [teacher, setTeacher] = useState(teachers[0])
  const [isConnecting, setIsConnecting] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [resources, setResources] = useState<string[]>([])

  useEffect(() => {
    // Find the teacher based on the session ID (simplified)
    const teacherId = Number.parseInt(sessionId) % 2 === 0 ? 2 : 1
    const foundTeacher = teachers.find((t) => t.id === teacherId)
    if (foundTeacher) {
      setTeacher(foundTeacher)
    }

    // Simulate connection process
    const timer = setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 2000)

    // Simulate resources being shared
    setResources(["Algebra Worksheet.pdf", "Practice Problems.docx"])

    return () => clearTimeout(timer)
  }, [sessionId])

  const endSession = () => {
    router.push("/student/live-sessions")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Session</h1>
          <p className="text-muted-foreground">One-on-one session with {teacher.name}</p>
        </div>
        <Button variant="destructive" onClick={endSession}>
          <PhoneIcon className="h-4 w-4 mr-2" />
          End Session
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Video Session</CardTitle>
              <CardDescription>Live video connection with your teacher</CardDescription>
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
                    <p className="text-white text-xs">Student view</p>
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
          <Tabs defaultValue="resources">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Shared Resources</CardTitle>
                  <CardDescription>Materials shared by your teacher</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resources.length > 0 ? (
                      <div className="space-y-2">
                        <ul className="space-y-1">
                          {resources.map((file, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <FileTextIcon className="h-4 w-4 mr-2" />
                              {file}
                              <Button variant="ghost" size="sm" className="ml-auto">
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>No resources shared yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Session Notes</CardTitle>
                  <CardDescription>Take notes during your session</CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full min-h-[200px] p-2 border rounded-md"
                    placeholder="Type your notes here..."
                  ></textarea>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Notes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {isConnected && (
        <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
          <AlertTitle>Connected to session</AlertTitle>
          <AlertDescription>
            You are now in a live session with {teacher.name} for {teacher.subject}.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
