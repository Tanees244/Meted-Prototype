import type { Metadata } from "next"
import StudentScheduleContent from "@/components/student/student-schedule-content"
import StudentLayout from "@/components/student/student-layout"

export const metadata: Metadata = {
  title: "Schedule | Student Portal",
  description: "View your class schedule and upcoming sessions",
}

export default function StudentSchedulePage() {
  return (
    <StudentLayout>
      <StudentScheduleContent />
    </StudentLayout>
  )
}
