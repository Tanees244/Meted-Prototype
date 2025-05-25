"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// This would typically come from your API/database
interface StudentRequest {
  id: string
  name: string
  email: string
  registrationDate: string
  status: "pending" | "approved" | "rejected"
}

interface Teacher {
  id: string
  name: string
  subjects: string[]
}

interface TimeSlot {
  id: string
  time: string
}

export function StudentRequestsContent() {
  const [requests, setRequests] = useState<StudentRequest[]>([
    // Sample data - replace with actual API call
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      registrationDate: "2024-03-20",
      status: "pending",
    },
    // Add more sample data as needed
  ])

  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [selectedTeacher, setSelectedTeacher] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")

  // Sample data - replace with actual API data
  const teachers: Teacher[] = [
    { id: "1", name: "Dr. Smith", subjects: ["Mathematics", "Physics"] },
    { id: "2", name: "Prof. Johnson", subjects: ["Chemistry", "Biology"] },
  ]

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00 AM - 10:30 AM" },
    { id: "2", time: "11:00 AM - 12:30 PM" },
    { id: "3", time: "02:00 PM - 03:30 PM" },
    { id: "4", time: "04:00 PM - 05:30 PM" },
  ]

  const handleApprove = (id: string) => {
    setSelectedStudentId(id)
    setIsAssignmentModalOpen(true)
  }

  const handleReject = (id: string) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: "rejected" } : request
    ))
    // Add API call to update status
  }

  const handleAssignmentSubmit = () => {
    if (selectedStudentId && selectedTeacher && selectedTimeSlot) {
      setRequests(requests.map(request => 
        request.id === selectedStudentId ? { ...request, status: "approved" } : request
      ))
      // Add API call to update student with teacher and time slot
      setIsAssignmentModalOpen(false)
      setSelectedStudentId(null)
      setSelectedTeacher("")
      setSelectedTimeSlot("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Student Registration Requests</h1>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.registrationDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {request.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprove(request.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(request.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAssignmentModalOpen} onOpenChange={setIsAssignmentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Teacher and Time Slot</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="teacher">Select Teacher</Label>
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name} ({teacher.subjects.join(", ")})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeSlot">Select Time Slot</Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {slot.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignmentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignmentSubmit} disabled={!selectedTeacher || !selectedTimeSlot}>
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 