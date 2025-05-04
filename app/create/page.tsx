"use client"

import { motion } from "framer-motion"
import CardForm from "@/components/card-form"

export default function CreatePage() {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-2">Create ID Card</h1>
            <p className="text-muted-foreground">
              Fill in the student details to generate a new ID card. All fields are required except the photo.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <CardForm />
      </div>
    </div>
  )
}
