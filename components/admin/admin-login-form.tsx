"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/icons"

export function AdminLoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // TODO: Implement admin login logic
      console.log("Admin login:", { email, password })
      router.push("/admin/dashboard")
    } catch (error) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[#4A007C]">
          Admin Login
        </h1>
        <p className="text-sm text-[#6B2A9E]">
          Enter your credentials to access the admin dashboard
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#4A007C]">
                Email
              </Label>
              <div className="relative">
                <Icons.mail className="absolute left-3 top-3 h-4 w-4 text-[#6B2A9E]" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  className="pl-9 border-[#EDE8FE] focus:border-[#4A007C] focus:ring-[#4A007C]"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-[#4A007C]">
                Password
              </Label>
              <div className="relative">
                <Icons.lock className="absolute left-3 top-3 h-4 w-4 text-[#6B2A9E]" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-9 border-[#EDE8FE] focus:border-[#4A007C] focus:ring-[#4A007C]"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-[#4A007C] hover:bg-[#6B2A9E] text-white"
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </form>
        {error && (
          <Alert variant="destructive">
            <AlertDescription className="text-[#4A007C]">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
