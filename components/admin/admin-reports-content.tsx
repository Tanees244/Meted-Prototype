"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3Icon, DownloadIcon, FileTextIcon, PieChartIcon, TrendingUpIcon } from "lucide-react"

// Mock data
const attendanceData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Attendance Rate",
      data: [92, 88, 94, 91, 95],
    },
  ],
}

const sessionData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Sessions Completed",
      data: [45, 52, 49, 60, 55],
    },
  ],
}

const assignmentData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Assignments Completed",
      data: [35, 42, 38, 45, 40],
    },
  ],
}

export function AdminReportsContent() {
  const [selectedReport, setSelectedReport] = useState("attendance")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">View and generate system reports</p>
      </div>

      <Tabs defaultValue="attendance" onValueChange={setSelectedReport}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Attendance Report</CardTitle>
                  <CardDescription>Monthly attendance rates across all sessions</CardDescription>
                </div>
                <Button variant="outline">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="text-center">
                  <BarChart3Icon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600" />
                  <p className="mt-2 text-muted-foreground">Attendance chart would appear here</p>
                  <p className="text-sm text-muted-foreground">
                    Average attendance rate:{" "}
                    {Math.round(
                      attendanceData.datasets[0].data.reduce((a, b) => a + b, 0) /
                        attendanceData.datasets[0].data.length,
                    )}
                    %
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Attendance Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Month</th>
                        <th className="text-center py-3 px-4">Attendance Rate</th>
                        <th className="text-center py-3 px-4">Total Sessions</th>
                        <th className="text-center py-3 px-4">Present</th>
                        <th className="text-center py-3 px-4">Absent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.labels.map((month, index) => (
                        <tr key={month} className="border-b">
                          <td className="py-3 px-4">{month}</td>
                          <td className="text-center py-3 px-4">{attendanceData.datasets[0].data[index]}%</td>
                          <td className="text-center py-3 px-4">{Math.round(Math.random() * 50) + 50}</td>
                          <td className="text-center py-3 px-4">{Math.round(Math.random() * 40) + 40}</td>
                          <td className="text-center py-3 px-4">{Math.round(Math.random() * 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sessions" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sessions Report</CardTitle>
                  <CardDescription>Monthly session statistics</CardDescription>
                </div>
                <Button variant="outline">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="text-center">
                  <TrendingUpIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600" />
                  <p className="mt-2 text-muted-foreground">Sessions chart would appear here</p>
                  <p className="text-sm text-muted-foreground">
                    Average sessions per month:{" "}
                    {Math.round(
                      sessionData.datasets[0].data.reduce((a, b) => a + b, 0) / sessionData.datasets[0].data.length,
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Session Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Month</th>
                        <th className="text-center py-3 px-4">Total Sessions</th>
                        <th className="text-center py-3 px-4">Completed</th>
                        <th className="text-center py-3 px-4">Cancelled</th>
                        <th className="text-center py-3 px-4">Avg. Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionData.labels.map((month, index) => (
                        <tr key={month} className="border-b">
                          <td className="py-3 px-4">{month}</td>
                          <td className="text-center py-3 px-4">{sessionData.datasets[0].data[index]}</td>
                          <td className="text-center py-3 px-4">
                            {sessionData.datasets[0].data[index] - Math.round(Math.random() * 5)}
                          </td>
                          <td className="text-center py-3 px-4">{Math.round(Math.random() * 5)}</td>
                          <td className="text-center py-3 px-4">45 mins</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Assignments Report</CardTitle>
                  <CardDescription>Monthly assignment completion statistics</CardDescription>
                </div>
                <Button variant="outline">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="text-center">
                  <PieChartIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600" />
                  <p className="mt-2 text-muted-foreground">Assignments chart would appear here</p>
                  <p className="text-sm text-muted-foreground">
                    Average assignments per month:{" "}
                    {Math.round(
                      assignmentData.datasets[0].data.reduce((a, b) => a + b, 0) /
                        assignmentData.datasets[0].data.length,
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Assignment Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Month</th>
                        <th className="text-center py-3 px-4">Total Assignments</th>
                        <th className="text-center py-3 px-4">Completed</th>
                        <th className="text-center py-3 px-4">Pending</th>
                        <th className="text-center py-3 px-4">Avg. Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignmentData.labels.map((month, index) => (
                        <tr key={month} className="border-b">
                          <td className="py-3 px-4">{month}</td>
                          <td className="text-center py-3 px-4">{assignmentData.datasets[0].data[index]}</td>
                          <td className="text-center py-3 px-4">
                            {assignmentData.datasets[0].data[index] - Math.round(Math.random() * 8)}
                          </td>
                          <td className="text-center py-3 px-4">{Math.round(Math.random() * 8)}</td>
                          <td className="text-center py-3 px-4">{Math.round(Math.random() * 15) + 80}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>Create a custom report based on specific criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="report-type" className="text-sm font-medium">
                  Report Type
                </label>
                <select id="report-type" className="w-full p-2 border rounded-md">
                  <option value="attendance">Attendance</option>
                  <option value="sessions">Sessions</option>
                  <option value="assignments">Assignments</option>
                  <option value="users">Users</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date-range" className="text-sm font-medium">
                  Date Range
                </label>
                <select id="date-range" className="w-full p-2 border rounded-md">
                  <option value="last-30">Last 30 Days</option>
                  <option value="last-90">Last 90 Days</option>
                  <option value="year-to-date">Year to Date</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="format" className="text-sm font-medium">
                  Format
                </label>
                <select id="format" className="w-full p-2 border rounded-md">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>
                <FileTextIcon className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
