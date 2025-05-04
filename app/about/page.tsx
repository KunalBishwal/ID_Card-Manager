// app/about/page.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-accent/90 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About IDForge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto mb-8"
          >
            IDForge helps students and institutions generate professional,
            print-ready student ID cards in the standard Indian college format.
            Built with Next.js, Firebase Auth & Firestore, and a polished UI,
            it’s the easiest way to manage your student IDs online.
          </motion.p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
