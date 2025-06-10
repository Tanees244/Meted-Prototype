"use client"

import { StudentLoginForm } from "@/components/student-login-form"
import Image from "next/image"

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen flex">

      <div className="w-full lg:w-1/3 bg-gradient-to-br from-[#191970] via-[#191970]/90 to-[#191970] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <StudentLoginForm />
          <p className="mt-8 text-center text-white/60 text-sm">
            © 2024 Meted. All rights reserved.
          </p>
        </div>
      </div>
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-2/3 bg-gradient-to-br from-[#191970] via-[#191970]/90 to-[#191970] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#ff7f00]/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#019583]/10 mix-blend-multiply" />
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src="/Login.jpg"
              alt="Student studying illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      
    </div>
  )
}
