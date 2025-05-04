// components/navbar.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Menu as MenuIcon } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { auth } from "@/lib/firestore"
import { onAuthChanged, signOutUser } from "@/lib/auth"
import type { User } from "firebase/auth"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  // start with currentUser so avatar shows up immediately
  const [user, setUser] = useState<User | null>(auth.currentUser)

  useEffect(() => {
    const unsubscribe = onAuthChanged((u) => setUser(u))
    return unsubscribe
  }, [])

  const handleSignOut = async () => {
    await signOutUser()
    router.replace("/loginpage")
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Create", path: "/create" },
    { name: "Manage", path: "/manage" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            IDForge
          </motion.div>
        </Link>

        <nav className="flex items-center gap-6">
          {/* Desktop nav + avatar dropdown */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}

            <ModeToggle />

            {user?.photoURL && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "Avatar"}
                    className="w-8 h-8 rounded-full border-2 border-primary cursor-pointer"
                    title="Account"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    {user.displayName}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile sheet menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary p-2",
                      pathname === item.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}

                {user?.photoURL && (
                  <div className="mt-6 flex items-center gap-3 border-t pt-4">
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "Avatar"}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col flex-1">
                      <p className="text-sm font-medium">{user.displayName}</p>
                      <button
                        onClick={handleSignOut}
                        className="text-sm text-destructive hover:underline"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
