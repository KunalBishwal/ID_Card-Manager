"use client"

import { useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { onAuthChanged } from "@/lib/auth"

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // routes that should NOT be guarded:
  const isPublic =
    pathname === "/loginpage" ||
    pathname === "/about" ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/")

  useEffect(() => {
    if (isPublic) {
      // on public pages we skip auth checks
      setChecking(false)
      return
    }

    const unsubscribe = onAuthChanged((user) => {
      if (!user) {
        // not signed in: redirect to login
        router.replace("/loginpage")
      } else {
        // signed in: show app
        setChecking(false)
      }
    })

    return unsubscribe
  }, [isPublic, router])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/90 via-primary to-accent/90">
        <p className="text-white">Checking authentication…</p>
      </div>
    )
  }

  return <>{children}</>
}
