"use client"

import Image from "next/image"
import { StudentLoginForm } from "@/components/student/student-login-form"

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="hidden lg:flex items-center justify-center p-2 rounded-[5px] overflow-hidden">
        <div className="relative w-full h-full">
          <Image 
            src="/teacher-giving-presentation-classroom.jpg"
            alt="Student in classroom"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Right side with content (Student Login Form) */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-purple-50 relative overflow-hidden">
        {/* Geometric shapes background */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-200 transform rotate-45 opacity-30"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-200 transform rotate-45 opacity-20"></div>

        <div className="w-full max-w-sm relative z-10">
          <StudentLoginForm />
          <div className="mt-8 text-center text-xs text-gray-500">
            © 2023 MetEd LMS. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
