"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import TiltCard from "@/components/tilt-card"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-accent/90 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block">ID</span>
              <span className="inline-block text-accent-foreground font-extrabold">Forge</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Create, manage, and download professional student ID cards that conform to the standard Indian college ID
              card format.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button asChild size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                <Link href="/create">
                  Create Your ID Card <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/manage">Manage Existing Cards</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose IDForge?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Easy to Create"
            description="Fill in student details, upload a photo, and generate professional ID cards in seconds."
            icon="Wand2"
            color="primary"
          />
          <FeatureCard
            title="Multiple Color Schemes"
            description="Choose from various color schemes to match your college or institution's branding."
            icon="Palette"
            color="accent"
          />
          <FeatureCard
            title="Download & Share"
            description="Export your ID cards as high-quality PNG images ready for printing or digital distribution."
            icon="Download"
            color="secondary"
          />
        </div>
      </section>

      {/* Preview Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">See IDForge in Action</h2>

          <div className="flex justify-center">
            <TiltCard>
              <div
                className="bg-white rounded-lg shadow-xl overflow-hidden"
                style={{ width: "340px", height: "215px" }}
              >
                <div className="bg-primary text-white text-center py-2 px-3">
                  <h2 className="font-bold text-lg leading-tight">Demo University</h2>
                  <p className="text-xs">STUDENT IDENTITY CARD</p>
                </div>

                <div className="flex p-3">
                  <div className="w-1/3 flex justify-center items-start pt-1">
                    <div
                      className="border-2 border-gray-300 overflow-hidden"
                      style={{ width: "80px", height: "100px" }}
                    >
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                        Photo
                      </div>
                    </div>
                  </div>

                  <div className="w-2/3 text-sm space-y-1.5 text-black">
                    <div>
                      <p className="text-gray-600 text-xs">Name</p>
                      <p className="font-semibold">John Doe</p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-xs">Programme</p>
                      <p>B.Tech Computer Science</p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-xs">Register Number</p>
                      <p>CS2023001</p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-xs">Valid Period</p>
                      <p>2023 - 2027</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-center text-xs py-1">
                  <p>This card is the property of Demo University</p>
                </div>
              </div>
            </TiltCard>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/create">Create Your Own ID Card</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
