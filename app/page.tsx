import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">MetEd LMS</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">One-on-One Learning Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to MetEd</CardTitle>
            <CardDescription>Choose your portal to continue</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild className="w-full">
              <Link href="/login">Teacher Portal</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/student">Student Portal</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin">Admin Portal</Link>
            </Button>
          </CardContent>
          <CardFooter className="text-xs text-center text-muted-foreground">
            <p className="w-full">© 2025 MetEd LMS. All rights reserved.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
