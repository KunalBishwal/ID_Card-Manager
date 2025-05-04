"use client"

import { motion } from "framer-motion"
import { type LucideIcon, Wand2, Palette, Download, Users, Shield, Zap } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  color: string
}

export default function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  // Map string icon names to Lucide components
  const iconMap: Record<string, LucideIcon> = {
    Wand2,
    Palette,
    Download,
    Users,
    Shield,
    Zap,
  }

  const IconComponent = iconMap[icon] || Wand2

  // Color classes based on the color prop
  const colorClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/20 text-secondary-foreground border-secondary/30",
    accent: "bg-accent/10 text-accent border-accent/20",
  }

  const iconColorClasses: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary-foreground",
    accent: "text-accent",
  }

  return (
    <motion.div
      className={`rounded-xl p-6 border ${colorClasses[color] || colorClasses.primary} transition-all duration-300`}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${colorClasses[color] || colorClasses.primary}`}
      >
        <IconComponent className={`h-6 w-6 ${iconColorClasses[color] || iconColorClasses.primary}`} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
