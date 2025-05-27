"use client"

import { StudentLoginForm } from "@/components/student-login-form"
import Image from "next/image"

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400">
      {/* Left side with illustration */}
      <div className="hidden lg:flex items-center justify-center p-2 rounded-[5px] overflow-hidden">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image 
            src="/yellow.jpg"
            alt="Student in classroom"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      </div>

      {/* Right side with content (Student Login Form) */}
      <div className="flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        {/* Geometric shapes background */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-teal-400/30 transform rotate-45"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-yellow-300/20 transform rotate-45"></div>

        <div className="w-full max-w-sm relative z-10">
          <StudentLoginForm />
          <div className="mt-8 text-center text-xs text-white/60">
            © 2023 MetEd LMS. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
