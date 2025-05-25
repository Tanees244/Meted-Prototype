"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

interface PersonalDetailsProps {
  data: {
    name: string
    email: string
    phone: string
    password: string
    agreeTerms: boolean
  }
  onChange: (data: PersonalDetailsProps["data"]) => void
}

export function PersonalDetails({ data, onChange }: PersonalDetailsProps) {
  const handleChange = (field: keyof PersonalDetailsProps["data"], value: string | boolean) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Enter Your Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Enter Your Email Address</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="JohnDoe@gmail.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Enter Your Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+92 *** **** ***"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Enter Your Password</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="************"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={data.agreeTerms}
          onCheckedChange={(checked) => handleChange("agreeTerms", checked)}
        />
        <Label htmlFor="terms" className="text-sm font-normal">
          I agree to the{" "}
          <Link href="#" className="underline underline-offset-2">
            Terms & Conditions
          </Link>
        </Label>
      </div>
    </div>
  )
} 