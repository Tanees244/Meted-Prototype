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
import { useState } from "react"

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
  const [currentTime, setCurrentTime] = useState(new Date())

  const joinSession = (sessionId: number) => {
    router.push(`/student/live-sessions/join?session=${sessionId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#191970]">Live Sessions</h1>
          <p className="text-[#019583]">Join and manage your one-on-one learning sessions</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-2 text-sm text-[#ff7f00]">
          <ClockIcon className="h-4 w-4" />
          <span>
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2 bg-[#191970]/10">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-[#191970] data-[state=active]:text-white">Past Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <Card className="bg-white border-[#ff7f00]/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#191970]">Scheduled Sessions</CardTitle>
              <CardDescription className="text-[#019583]">Your upcoming one-on-one sessions with teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="bg-white border-[#ff7f00]/20 shadow-lg">
                    <CardHeader className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={session.teacher.avatar || "/placeholder.svg"} alt={session.teacher.name} />
                          <AvatarFallback>{session.teacher.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base text-[#191970]">{session.teacher.name}</CardTitle>
                          <CardDescription className="text-[#019583]">{session.teacher.subject}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm mb-2 text-[#191970]">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-[#191970]">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>
                          {session.time} ({session.duration})
                        </span>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0 flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-[#ff7f00] hover:bg-[#ff7f00]/90 text-white">
                            <VideoIcon className="h-4 w-4 mr-2" />
                            Join Session
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white border-[#ff7f00]/20">
                          <DialogHeader>
                            <DialogTitle className="text-[#191970]">Join Session</DialogTitle>
                            <DialogDescription className="text-[#019583]">
                              You are about to join a live session with {session.teacher.name} for{" "}
                              {session.teacher.subject}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" onClick={() => {}} className="border-[#ff7f00]/20 text-[#ff7f00] hover:bg-[#ff7f00]/10">
                              Cancel
                            </Button>
                            <Button onClick={() => joinSession(session.id)} className="bg-[#ff7f00] hover:bg-[#ff7f00]/90 text-white">
                              Join Now
                            </Button>
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
          <Card className="bg-white border-[#ff7f00]/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#191970]">Past Sessions</CardTitle>
              <CardDescription className="text-[#019583]">History of your previous sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#ff7f00]/20">
                      <th className="text-left py-3 px-4 text-[#191970]">Teacher</th>
                      <th className="text-left py-3 px-4 text-[#191970]">Subject</th>
                      <th className="text-left py-3 px-4 text-[#191970]">Date</th>
                      <th className="text-left py-3 px-4 text-[#191970]">Time</th>
                      <th className="text-center py-3 px-4 text-[#191970]">Attendance</th>
                      <th className="text-right py-3 px-4 text-[#191970]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastSessions.map((session) => (
                      <tr key={session.id} className="border-b border-[#ff7f00]/20">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={session.teacher.avatar || "/placeholder.svg"}
                                alt={session.teacher.name}
                              />
                              <AvatarFallback>{session.teacher.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-[#191970]">{session.teacher.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#191970]">{session.teacher.subject}</td>
                        <td className="py-3 px-4 text-[#191970]">{session.date}</td>
                        <td className="py-3 px-4 text-[#191970]">{session.time}</td>
                        <td className="text-center py-3 px-4">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                              session.attended
                                ? "bg-[#a6c732]/20 text-[#a6c732]"
                                : "bg-[#ff7f00]/20 text-[#ff7f00]"
                            }`}
                          >
                            {session.attended ? "Present" : "Absent"}
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="outline" size="sm" className="border-[#ff7f00]/20 text-[#ff7f00] hover:bg-[#ff7f00]/10">
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
