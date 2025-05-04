// lib/storage.ts
import { db } from "./firestore"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore"
import type { StudentID, StudentIDFormData } from "./types"

const COL = "student_ids"

function toMs(v: any): number {
  if (v && typeof v.toMillis === "function") return v.toMillis()
  if (typeof v === "number") return v
  if (v instanceof Date) return v.getTime()
  return Date.now()
}

// Create
export async function addStudentID(data: StudentIDFormData): Promise<string> {
  const { id: _i, createdAt: _c, updatedAt: _u, ...rest } = data as any
  const ref = await addDoc(collection(db, COL), {
    ...rest,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return ref.id
}

// Read all
export async function getStudentIDs(): Promise<StudentID[]> {
  const snap = await getDocs(collection(db, COL))
  return snap.docs.map((d) => {
    const raw = d.data() as any
    const createdAt = toMs(raw.createdAt)
    const updatedAt = toMs(raw.updatedAt)
    const { createdAt: _c, updatedAt: _u, id: _i, ...rest } = raw
    return {
      id: d.id,
      ...rest,
      createdAt,
      updatedAt,
    } as StudentID
  })
}

// Read one
export async function getStudentIDById(id: string): Promise<StudentID | null> {
  const dref = doc(db, COL, id)
  const snap = await getDoc(dref)
  if (!snap.exists()) return null

  const raw = snap.data() as any
  const createdAt = toMs(raw.createdAt)
  const updatedAt = toMs(raw.updatedAt)
  const { createdAt: _c, updatedAt: _u, id: _i, ...rest } = raw

  return {
    id: snap.id,
    ...rest,
    createdAt,
    updatedAt,
  } as StudentID
}

// Update
export async function updateStudentID(s: StudentID): Promise<void> {
  const { id, createdAt: _c, updatedAt: _u, ...rest } = s
  const dref = doc(db, COL, id)
  await updateDoc(dref, { ...rest, updatedAt: Timestamp.now() })
}

// Delete
export async function deleteStudentID(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id))
}
