// lib/types.ts
export interface StudentID {
  id: string
  /** Firebase‐Auth UID of the owner */
  uid: string
  collegeName: string
  studentName: string
  programme: string
  registerNumber: string
  validFrom: string
  validTo: string
  photoUrl: string
  colorScheme: string
  createdAt: number
  updatedAt: number
}

export type StudentIDFormData = Omit<
  StudentID,
  "id" | "uid" | "createdAt" | "updatedAt"
>
