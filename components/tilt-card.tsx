"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for the tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Add spring physics for smoother animation
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })

  // Transform the motion values to rotation values
  const rotateX = useTransform(ySpring, [-100, 100], [10, -10])
  const rotateY = useTransform(xSpring, [-100, 100], [-10, 10])

  // Handle mouse move
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY

    // Update motion values
    x.set(mouseX)
    y.set(mouseY)
  }

  // Reset on mouse leave
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
      >
        {children}
      </motion.div>

      {/* Reflection/shadow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent opacity-0 pointer-events-none"
        style={{
          opacity: useTransform(ySpring, [-100, 0, 100], [0.15, 0, 0.15]),
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}
      />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-px rounded-lg bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 blur-sm pointer-events-none"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
