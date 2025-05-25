"use client"

import { Card } from "@/components/ui/card"

interface RegistrationData {
  personalDetails: {
    name: string
    email: string
    phone: string
    password: string
  }
  selectedCourses: string[]
  preferredTimes: string[]
}

interface ReviewDetailsProps {
  data: RegistrationData
}

// Sample courses data - replace with your actual data
const coursesMap: Record<string, string> = {
  "1": "Mathematics",
  "2": "Physics",
  "3": "Chemistry",
}

// Sample time slots data - replace with your actual data
const timeSlotsMap: Record<string, string> = {
  morning: "Morning (09:00 AM - 12:00 PM)",
  afternoon: "Afternoon (01:00 PM - 04:00 PM)",
  evening: "Evening (05:00 PM - 08:00 PM)",
  "late-evening": "Late Evening (08:00 PM - 10:00 PM)",
}

export function ReviewDetails({ data }: ReviewDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Personal Details</h3>
        <Card className="p-4">
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Name</dt>
              <dd className="text-base">{data.personalDetails.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Email</dt>
              <dd className="text-base">{data.personalDetails.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
              <dd className="text-base">{data.personalDetails.phone}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Selected Courses</h3>
        <Card className="p-4">
          <ul className="space-y-2">
            {data.selectedCourses.map((courseId) => (
              <li key={courseId} className="text-base">
                {coursesMap[courseId]}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Preferred Time Slots</h3>
        <Card className="p-4">
          <ul className="space-y-2">
            {data.preferredTimes.map((timeId) => (
              <li key={timeId} className="text-base">
                {timeSlotsMap[timeId]}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
} 