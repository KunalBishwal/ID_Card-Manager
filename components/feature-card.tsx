"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import type { StudentID, StudentIDFormData } from "@/lib/types"
import { addStudentID, updateStudentID } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RefreshCw, Save, Download } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import IDCard from "./id-card"
import TiltCard from "./tilt-card"
import { downloadIDCard } from "@/lib/download"

interface CardFormProps {
  initialData?: StudentID
}

const DEGREES = [
  "B.Tech Computer Science",
  "B.Tech Electronics",
  "B.Tech Mechanical",
  "B.Tech Civil",
  "B.Com",
  "BBA",
  "MBA",
  "MCA",
  "M.Tech",
  "B.Sc",
  "M.Sc",
  "BA",
  "MA",
  "BCA",
  "Other",
]

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR + i - 5)

export default function CardForm({ initialData }: CardFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const previewId = initialData?.id || "preview"

  const defaultData: StudentIDFormData = {
    collegeName: "",
    studentName: "",
    programme: "",
    registerNumber: "",
    validFrom: CURRENT_YEAR.toString(),
    validTo: (CURRENT_YEAR + 4).toString(),
    photoUrl: "",
    colorScheme: "blue",
  }

  const [formData, setFormData] = useState<StudentIDFormData>(
    initialData ?? defaultData
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReset = () => {
    setFormData(defaultData)
    setErrors({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {}
    if (!formData.collegeName.trim()) errs.collegeName = "College name is required"
    if (!formData.studentName.trim()) errs.studentName = "Student name is required"
    if (!formData.programme) errs.programme = "Programme is required"
    if (!formData.registerNumber.trim()) errs.registerNumber = "Register number is required"
    if (Number(formData.validTo) <= Number(formData.validFrom))
      errs.validTo = "Valid to year must be after valid from year"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    const payload: StudentID = {
      ...formData,
      id: initialData?.id || uuidv4(),
      createdAt: initialData?.createdAt || Date.now(),
      updatedAt: initialData?.updatedAt || Date.now(),
    }

    if (initialData) {
      await updateStudentID(payload)
    } else {
      await addStudentID(payload)
    }

    router.push("/manage")
  }

  const handleDownload = () => {
    if (!validateForm()) return

    const payload: StudentID = {
      ...formData,
      id: previewId,
      createdAt: initialData?.createdAt || Date.now(),
      updatedAt: initialData?.updatedAt || Date.now(),
    }

    downloadIDCard(payload)
  }

  const isFormValid = () => {
    return (
      formData.collegeName.trim() !== "" &&
      formData.studentName.trim() !== "" &&
      formData.programme.trim() !== "" &&
      formData.registerNumber.trim() !== "" &&
      Number(formData.validTo) > Number(formData.validFrom)
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Form */}
      <Card className="md:sticky md:top-24 self-start">
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="collegeName">College Name</Label>
            <Input
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              placeholder="Enter college name"
              className={errors.collegeName ? "border-red-500" : ""}
            />
            {errors.collegeName && (
              <p className="text-red-500 text-xs">{errors.collegeName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              placeholder="Enter student name"
              className={errors.studentName ? "border-red-500" : ""}
            />
            {errors.studentName && (
              <p className="text-red-500 text-xs">{errors.studentName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="programme">Programme / Degree</Label>
            <Select
              value={formData.programme}
              onValueChange={(v) => handleSelectChange("programme", v)}
            >
              <SelectTrigger className={errors.programme ? "border-red-500" : ""}>
                <SelectValue placeholder="Select programme" />
              </SelectTrigger>
              <SelectContent>
                {DEGREES.map((deg) => (
                  <SelectItem key={deg} value={deg}>
                    {deg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.programme && (
              <p className="text-red-500 text-xs">{errors.programme}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="registerNumber">Register Number</Label>
            <Input
              id="registerNumber"
              name="registerNumber"
              value={formData.registerNumber}
              onChange={handleInputChange}
              placeholder="Enter register number"
              className={errors.registerNumber ? "border-red-500" : ""}
            />
            {errors.registerNumber && (
              <p className="text-red-500 text-xs">{errors.registerNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validFrom">Valid From</Label>
              <Select
                value={formData.validFrom}
                onValueChange={(v) => handleSelectChange("validFrom", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((yr) => (
                    <SelectItem key={yr} value={String(yr)}>
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="validTo">Valid To</Label>
              <Select
                value={formData.validTo}
                onValueChange={(v) => handleSelectChange("validTo", v)}
              >
                <SelectTrigger className={errors.validTo ? "border-red-500" : ""}>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((yr) => (
                    <SelectItem key={yr} value={String(yr)}>
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.validTo && (
                <p className="text-red-500 text-xs">{errors.validTo}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Student Photo</Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Upload a passport size photo (3.5 x 4.5 cm)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Card Color Scheme</Label>
            <RadioGroup
              value={formData.colorScheme}
              onValueChange={(v) => handleSelectChange("colorScheme", v)}
              className="grid grid-cols-3 gap-2"
            >
              {(["blue", "red", "green", "purple", "orange", "teal"] as const).map(
                (color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={color} className={`border-${color}-600`} />
                    <Label htmlFor={color} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full bg-${color}-600 mr-2`} />
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </Label>
                  </div>
                )
              )}
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <RefreshCw className="h-4 w-4" /> Reset
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear all fields</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleSubmit} className="gap-2">
                  <Save className="h-4 w-4" /> {initialData ? "Update" : "Generate"} ID
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {initialData ? "Save changes" : "Create new ID card"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      {/* Preview & Download */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-medium mb-6">Preview</h3>
        <TiltCard className="mb-8 overflow-visible">
          <IDCard
            studentID={{
              ...(formData as any),
              id: previewId,
              createdAt: initialData?.createdAt || Date.now(),
              updatedAt: initialData?.updatedAt || Date.now(),
            }}
            isPreview
          />
        </TiltCard>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                onClick={handleDownload}
                disabled={!isFormValid()}
                className="gap-2"
              >
                <Download className="h-4 w-4" /> Download ID Card
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export ID card as PNG</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
