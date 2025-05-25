"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, ClockIcon, VideoIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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

const upcomingSessions = [
  {
    id: 1,
    teacher: teachers[0],
    date: "Today",
    time: "2:00 PM",
    duration: "45 minutes",
  },
  {
    id: 2,
    teacher: teachers[1],
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "45 minutes",
  },
]

const pastSessions = [
  {
    id: 101,
    teacher: teachers[0],
    date: "May 10, 2025",
    time: "2:00 PM",
    duration: "45 minutes",
    attended: true,
  },
  {
    id: 102,
    teacher: teachers[1],
    date: "May 9, 2025",
    time: "3:30 PM",
    duration: "45 minutes",
    attended: true,
  },
  {
    id: 103,
    teacher: teachers[0],
    date: "May 8, 2025",
    time: "10:00 AM",
    duration: "45 minutes",
    attended: false,
  },
]

export function StudentLiveSessionsContent() {
  const router = useRouter()

  const joinSession = (sessionId: number) => {
    router.push(`/student/live-sessions/join?session=${sessionId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Live Sessions</h1>
        <p className="text-muted-foreground">Join and manage your one-on-one learning sessions</p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Sessions</CardTitle>
              <CardDescription>Your upcoming one-on-one sessions with teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={session.teacher.avatar || "/placeholder.svg"} alt={session.teacher.name} />
                          <AvatarFallback>{session.teacher.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{session.teacher.name}</CardTitle>
                          <CardDescription>{session.teacher.subject}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm mb-2">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>
                          {session.time} ({session.duration})
                        </span>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0 flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <VideoIcon className="h-4 w-4 mr-2" />
                            Join Session
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Join Session</DialogTitle>
                            <DialogDescription>
                              You are about to join a live session with {session.teacher.name} for{" "}
                              {session.teacher.subject}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" onClick={() => {}}>
                              Cancel
                            </Button>
                            <Button onClick={() => joinSession(session.id)}>Join Now</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>History of your previous sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Teacher</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-center py-3 px-4">Attendance</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastSessions.map((session) => (
                      <tr key={session.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={session.teacher.avatar || "/placeholder.svg"}
                                alt={session.teacher.name}
                              />
                              <AvatarFallback>{session.teacher.initials}</AvatarFallback>
                            </Avatar>
                            {session.teacher.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">{session.teacher.subject}</td>
                        <td className="py-3 px-4">{session.date}</td>
                        <td className="py-3 px-4">{session.time}</td>
                        <td className="text-center py-3 px-4">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                              session.attended
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }`}
                          >
                            {session.attended ? "Present" : "Absent"}
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="outline" size="sm">
                            View Notes
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
      </Tabs>
    </div>
  )
}
