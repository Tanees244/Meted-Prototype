import { Suspense } from "react"
import StudentLayout from "@/components/student/student-layout"
import { StudentLiveSessionRoom } from "@/components/student/student-live-session-room"

export default function StudentLiveSessionJoinPage() {
  return (
    <StudentLayout>
      <Suspense fallback={<div className="p-4">Loading session...</div>}>
        <StudentLiveSessionRoom />
      </Suspense>
    </StudentLayout>
  )
}
