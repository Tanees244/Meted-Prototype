"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface TimeSlot {
  id: string
  label: string
  time: string
}

interface TimeSelectionProps {
  selectedTimes: string[]
  onChange: (times: string[]) => void
}

const timeSlots: TimeSlot[] = [
  {
    id: "morning",
    label: "Morning",
    time: "09:00 AM - 12:00 PM",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    time: "01:00 PM - 04:00 PM",
  },
  {
    id: "evening",
    label: "Evening",
    time: "05:00 PM - 08:00 PM",
  },
  {
    id: "late-evening",
    label: "Late Evening",
    time: "08:00 PM - 10:00 PM",
  },
]

export function TimeSelection({ selectedTimes, onChange }: TimeSelectionProps) {
  const handleTimeToggle = (timeId: string) => {
    const newSelection = selectedTimes.includes(timeId)
      ? selectedTimes.filter((id) => id !== timeId)
      : [...selectedTimes, timeId]
    onChange(newSelection)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Preferred Time Slots</h3>
      <p className="text-sm text-muted-foreground">
        Select all time slots that work for you. You can choose multiple options.
      </p>
      <div className="grid gap-4">
        {timeSlots.map((slot) => (
          <Card key={slot.id} className="p-4">
            <div className="flex items-start space-x-4">
              <Checkbox
                id={slot.id}
                checked={selectedTimes.includes(slot.id)}
                onCheckedChange={() => handleTimeToggle(slot.id)}
              />
              <div className="space-y-1">
                <Label
                  htmlFor={slot.id}
                  className="text-base font-medium cursor-pointer"
                >
                  {slot.label}
                </Label>
                <p className="text-sm text-muted-foreground">{slot.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 