"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Steps } from "@/components/ui/steps"
import { PersonalDetails } from "@/components/register/personal-details"
import { CourseSelection } from "@/components/register/course-selection"
import { TimeSelection } from "@/components/register/time-selection"
import { ReviewDetails } from "@/components/register/review-details"

interface RegistrationData {
  personalDetails: {
    name: string
    email: string
    phone: string
    password: string
    agreeTerms: boolean
  }
  selectedCourses: string[]
  preferredTimes: string[]
}

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    personalDetails: {
      name: "",
      email: "",
      phone: "",
      password: "",
      agreeTerms: false,
    },
    selectedCourses: [],
    preferredTimes: [],
  })

  const steps = [
    { title: "Personal Details", description: "Enter your basic information" },
    { title: "Course Selection", description: "Choose your courses" },
    { title: "Preferred Timings", description: "Select your preferred time slots" },
    { title: "Review & Submit", description: "Review your information" },
  ]

  const handleNext = () => {
    if (currentStep === 1 && !registrationData.personalDetails.agreeTerms) {
      alert("Please agree to the Terms & Conditions.")
      return
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Add your API call here to submit registration data
      // await submitRegistration(registrationData)
      
      // Show success message and redirect to login
      alert("Registration submitted successfully! Please wait for admin approval.")
      router.push("/student")
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registration failed. Please try again.")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetails
            data={registrationData.personalDetails}
            onChange={(data) =>
              setRegistrationData({ ...registrationData, personalDetails: data })
            }
          />
        )
      case 2:
        return (
          <CourseSelection
            selectedCourses={registrationData.selectedCourses}
            onChange={(courses: string[]) =>
              setRegistrationData({ ...registrationData, selectedCourses: courses })
            }
          />
        )
      case 3:
        return (
          <TimeSelection
            selectedTimes={registrationData.preferredTimes}
            onChange={(times: string[]) =>
              setRegistrationData({ ...registrationData, preferredTimes: times })
            }
          />
        )
      case 4:
        return <ReviewDetails data={registrationData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="hidden lg:flex items-center justify-center p-2 rounded-[5px] overflow-hidden">
        <div className="relative w-full h-full">
          <Image 
            src="/teacher-giving-presentation-classroom.jpg"
            alt="Student registration"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Right side with content */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-purple-50 relative overflow-hidden">
        {/* Geometric shapes background */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-200 transform rotate-45 opacity-30"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-200 transform rotate-45 opacity-20"></div>

        <div className="w-full max-w-2xl relative z-10">
          <Card className="p-6 shadow-lg border-none bg-white/70 backdrop-blur-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-purple-700 mb-2">Student Registration</h1>
              <p className="text-muted-foreground text-sm">Complete all steps to register as a student</p>
            </div>

            {/* Steps */}
            <div className="mb-8">
              <Steps 
                steps={steps} 
                currentStep={currentStep} 
                className="flex-col space-y-4" 
              />
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                Back
              </Button>
              {currentStep === 4 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Submit Registration
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Next
                </Button>
              )}
            </div>
          </Card>
          <div className="mt-8 text-center text-xs text-gray-500">
            © 2023 MetEd LMS. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
} 