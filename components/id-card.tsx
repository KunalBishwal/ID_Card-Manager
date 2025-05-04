"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { StudentID } from "@/lib/types"

interface IDCardProps {
  studentID: StudentID
  className?: string
  isPreview?: boolean
}

export default function IDCard({ studentID, className = "", isPreview = false }: IDCardProps) {
  // Standard ID card dimensions: 85.60mm x 53.98mm (3.37in x 2.13in)
  // Using a scale factor for display purposes

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-600",
    red: "bg-red-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
    teal: "bg-teal-600",
  }

  // Fallback to blue if no matching color scheme
  const headerClass = colorClasses[studentID.colorScheme] || colorClasses.blue

  return (
    <motion.div
      className={`relative bg-white text-black rounded-lg shadow-xl overflow-hidden ${className}`}
      style={{
        width: "400px", 
        height: "280px",
        fontFamily: "Arial, sans-serif",
        padding: "15px",
      }}
      id={`id-card-${studentID.id}`}
      initial={isPreview ? { opacity: 0, scale: 0.9 } : false}
      animate={isPreview ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.3 }}
    >
      {/* Header with college name */}
      <div className={`${headerClass} text-white text-center py-2 border-b-2 border-white`}>
        <h2 className="font-bold text-lg leading-tight">{studentID.collegeName}</h2>
        <p className="text-xs">STUDENT IDENTITY CARD</p>
      </div>

      <div className="flex p-3 space-x-3">
        {/* Left side - Photo */}
        <div className="w-1/3 flex justify-center items-start pt-1">
          <div
            className="border-2 border-gray-300 overflow-hidden"
            style={{ width: "90px", height: "120px" }} 
          >
            {studentID.photoUrl ? (
              <Image
                src={studentID.photoUrl}
                alt={`${studentID.studentName}'s photo`}
                width={90}
                height={120}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                {/* Placeholder image for missing photo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Student details */}
        <div className="w-2/3 text-sm space-y-2">
          <div>
            <p className="text-gray-600 text-xs">Name</p>
            <p className="font-semibold">{studentID.studentName}</p>
          </div>

          <div>
            <p className="text-gray-600 text-xs">Programme</p>
            <p>{studentID.programme}</p>
          </div>

          <div>
            <p className="text-gray-600 text-xs">Register Number</p>
            <p>{studentID.registerNumber}</p>
          </div>

          <div>
            <p className="text-gray-600 text-xs">Valid Period</p>
            <p>
              {studentID.validFrom} - {studentID.validTo}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 ${headerClass} text-white text-center text-xs py-1`}>
        <p>This card is the property of {studentID.collegeName}</p>
      </div>
    </motion.div>
  )
}
