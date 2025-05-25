import type { Metadata } from "next"
import StudentProgressContent from "@/components/student/student-progress-content"
import StudentLayout from "@/components/student/student-layout"

export const metadata: Metadata = {
  title: "Progress | Student Portal",
  description: "View your academic progress and performance",
}

export default function StudentProgressPage() {
  return (
    <StudentLayout>
      <StudentProgressContent />
    </StudentLayout>
  )
}
