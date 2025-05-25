import { ChangePasswordForm } from "@/components/change-password-form"

export default function ChangePasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">MetEd LMS</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Change Password</p>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  )
}
