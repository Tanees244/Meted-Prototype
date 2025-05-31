import type React from "react"
import type { Metadata } from "next"
import { DynaPuff, Poetsen_One, Sniglet, Lato, Nunito, Poppins, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "MetEd LMS - Teacher Portal",
  description: "Learning Management System for one-on-one educational support",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
