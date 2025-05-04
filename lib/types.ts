// lib/types.ts

export interface StudentID {
  id: string
  collegeName: string
  studentName: string
  programme: string
  registerNumber: string
  validFrom: string
  validTo: string
  photoUrl: string
  colorScheme: string
  createdAt: number      // ms since epoch
  updatedAt: number      // <— add this line
}

export interface StudentIDFormData {
  collegeName: string
  studentName: string
  programme: string
  registerNumber: string
  validFrom: string
  validTo: string
  photoUrl: string
  colorScheme: string
}
