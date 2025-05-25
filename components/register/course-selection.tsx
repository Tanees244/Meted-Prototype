"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface Course {
  id: string
  name: string
  description: string
  duration: string
}

interface CourseSelectionProps {
  selectedCourses: string[]
  onChange: (courses: string[]) => void
}

// Sample courses - replace with your actual course data
const courses: Course[] = [
  {
    id: "1",
    name: "Mathematics",
    description: "Advanced mathematics course covering algebra, calculus, and statistics",
    duration: "6 months",
  },
  {
    id: "2",
    name: "Physics",
    description: "Comprehensive physics course covering mechanics, thermodynamics, and quantum physics",
    duration: "6 months",
  },
  {
    id: "3",
    name: "Chemistry",
    description: "In-depth chemistry course covering organic, inorganic, and physical chemistry",
    duration: "6 months",
  },
]

export function CourseSelection({ selectedCourses, onChange }: CourseSelectionProps) {
  const handleCourseToggle = (courseId: string) => {
    const newSelection = selectedCourses.includes(courseId)
      ? selectedCourses.filter((id) => id !== courseId)
      : [...selectedCourses, courseId]
    onChange(newSelection)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Available Courses</h3>
      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-4">
            <div className="flex items-start space-x-4">
              <Checkbox
                id={course.id}
                checked={selectedCourses.includes(course.id)}
                onCheckedChange={() => handleCourseToggle(course.id)}
              />
              <div className="space-y-1">
                <Label
                  htmlFor={course.id}
                  className="text-base font-medium cursor-pointer"
                >
                  {course.name}
                </Label>
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <p className="text-sm text-muted-foreground">Duration: {course.duration}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 