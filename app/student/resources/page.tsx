import type { Metadata } from "next"
import StudentResourcesContent from "@/components/student/student-resources-content"
import StudentLayout from "@/components/student/student-layout"

export const metadata: Metadata = {
  title: "Resources | Student Portal",
  description: "Access learning materials and resources",
}

export default function StudentResourcesPage() {
  return (
    <StudentLayout>
      <StudentResourcesContent />
    </StudentLayout>
  )
}
