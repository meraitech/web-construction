import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/shared/styles/admin.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Login - Dashboard",
  description: "Login to access dashboard",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
