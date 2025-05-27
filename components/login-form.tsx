"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LockIcon, MailIcon } from "lucide-react"

export function TeacherLoginForm() {
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
        router.push("/teacher/change-password")
      } else {
        router.push("/teacher/dashboard")
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 shadow-lg border-none bg-teal-800/90 backdrop-blur-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-yellow-300 mb-2">Teacher Login</h1>
        <p className="text-yellow-200/70 text-sm">Enter your details to log in</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-[#ff7f00]/10 border-[#ff7f00]/20 text-[#ff7f00]">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-yellow-200">Email</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-yellow-300/70">
                <MailIcon className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="teacher@meted.edu"
                className="pl-10 bg-teal-900/50 border-teal-700 text-white placeholder:text-teal-300/50 focus:border-yellow-400 focus:ring-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-yellow-200">Password</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-yellow-300/70">
                <LockIcon className="h-5 w-5" />
              </div>
              <Input
                id="password"
                type="password"
                className="pl-10 bg-teal-900/50 border-teal-700 text-white placeholder:text-teal-300/50 focus:border-yellow-400 focus:ring-yellow-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-teal-900 font-semibold transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
