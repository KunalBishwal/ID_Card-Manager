// app/loginpage/page.tsx
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { onAuthChanged, signInWithGoogle } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // If already signed in, go home; otherwise show the form
    const unsub = onAuthChanged((user) => {
      if (user) {
        router.replace("/")
      } else {
        setChecking(false)
      }
    })
    return unsub
  }, [router])

  const handleLogin = async () => {
    try {
      await signInWithGoogle()
      router.replace("/")
    } catch (err) {
      console.error("Login failed", err)
    }
  }

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gradient-to-br from-primary to-accent p-1 rounded-2xl"
      >
        <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
          <h1 className="text-3xl font-bold mb-2 text-primary">
            Welcome to <span className="text-accent">IDForge</span>
          </h1>
          <p className="text-muted-foreground mb-6">
            Sign in with your Google account to get started.
          </p>

          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100"
          >
            {/* Google “G” Icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.6-1.6-34.5-4.6-50.8H272v96.1h146.4c-6.3 
                   34-25.2 62.8-53.4 82v67.8h86.4c50.6-46.7 79.6-115.5 79.6-195.1z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.5 0 133.3-24 177.8-65.2l-86.4-67.8
                   c-24.1 16-55.1 25.5-91.4 25.5-70.2 0-129.7-47.3-151.1-110.9
                   L32.2 361.4c44 88.6 134.5 151.9 239.8 151.9z"
              />
              <path
                fill="#FBBC05"
                d="M120.9 324.2c-9.8-29.4-9.8-61 0-90.4V165.9H32.2
                   c-42.6 84.9-42.6 185.2 0 270.1l88.7-67.8z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.4 0 74.7 13.6 102.6 40.2l77.1-77.1
                   C397.1 24.1 338.3 0 272 0 166.7 0 76.2 63.3 32.2
                   152.9l88.7 67.8c21.4-63.6 80.9-110.9 151.1-110.9z"
              />
            </svg>
            Sign in with Google
          </Button>

          <p className="mt-4 text-sm text-muted-foreground">
            <Link href="/about" className="underline hover:text-primary">
              Learn more about IDForge
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
