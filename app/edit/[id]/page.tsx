// app/edit/[id]/page.tsx
"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import type { StudentID } from "@/lib/types"
import { getStudentIDById } from "@/lib/storage"
import CardForm from "@/components/card-form"

export default function EditPage() {
  const params = useParams()
  const rawId = params.id
  // Narrow `rawId: string | string[] | undefined` -> `id: string | null`
  const id =
    typeof rawId === "string"
      ? rawId
      : Array.isArray(rawId) && rawId.length > 0
      ? rawId[0]
      : null

  const router = useRouter()
  const [data, setData] = useState<StudentID | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      // no valid id → back to manage
      router.replace("/manage")
      return
    }

    ;(async () => {
      const sid = await getStudentIDById(id)
      if (!sid) {
        // not found →  redirect
        router.replace("/manage")
      } else {
        setData(sid)
      }
      setLoading(false)
    })()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  if (!data) {
    // either invalid id or redirect in flight
    return null
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Edit ID Card</h1>
          <p className="text-muted-foreground">
            Update details for {data.studentName}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <CardForm initialData={data} />
      </div>
    </div>
  )
}
