"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LockIcon, MailIcon } from "lucide-react"

export function StudentLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call
    try {
      // In a real app, this would be an API call to authenticate
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if this is first login (simulated)
      const isFirstLogin = email.includes("new")

      if (isFirstLogin) {
        router.push("/student/change-password")
      } else {
        router.push("/student/dashboard")
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 shadow-lg border-none bg-white/70 backdrop-blur-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-2">Student Login</h1>
        <p className="text-muted-foreground text-sm">Enter your details to log in</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <MailIcon className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="student@meted.edu"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <LockIcon className="h-5 w-5" />
              </div>
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
      <div className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
          Register Now
        </Link>
      </div>
    </Card>
  )
}
