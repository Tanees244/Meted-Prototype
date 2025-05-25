import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { LiveSessionRoom } from "@/components/live-session-room"

export default function LiveSessionStartPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4">Loading session...</div>}>
        <LiveSessionRoom />
      </Suspense>
    </DashboardLayout>
  )
}
