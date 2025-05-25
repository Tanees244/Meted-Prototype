import type { Metadata } from "next"
import StudentAssignmentsContent from "@/components/student/student-assignments-content"
import StudentLayout from "@/components/student/student-layout"

export const metadata: Metadata = {
  title: "Assignments | Student Portal",
  description: "View and submit your assignments",
}

export default function StudentAssignmentsPage() {
  return (
    <StudentLayout>
      <StudentAssignmentsContent />
    </StudentLayout>
  )
}
