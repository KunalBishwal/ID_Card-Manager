// lib/storage.ts
import { db } from "./firestore"
import { getAuth } from "firebase/auth"
import {
  collection,
  query,
  where,
  orderBy,
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

// helper to convert Firestore Timestamps or numbers → ms
function toMs(v: any): number {
  if (v?.toMillis) return v.toMillis()
  if (typeof v === "number") return v
  if (v instanceof Date) return v.getTime()
  return Date.now()
}

/** Create a new ID card tied to the currently‐signed‐in user */
export async function addStudentID(data: StudentIDFormData): Promise<string> {
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error("Not authenticated")
  const ref = await addDoc(collection(db, COL), {
    ...data,
    uid,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return ref.id
}

/** Get *only* this user’s cards, newest first */
export async function getStudentIDs(): Promise<StudentID[]> {
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  if (!uid) return []

  const q = query(
    collection(db, COL),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => {
    const raw = d.data() as any
    const createdAt = toMs(raw.createdAt)
    const updatedAt = toMs(raw.updatedAt)
    // strip off Firestore‐only fields
    const { uid: _u, createdAt: _c, updatedAt: _u2, ...rest } = raw
    return {
      id: d.id,
      uid,
      ...rest,
      createdAt,
      updatedAt,
    } as StudentID
  })
}

export async function getStudentIDById(id: string): Promise<StudentID | null> {
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  if (!uid) return null

  const snap = await getDoc(doc(db, COL, id))
  if (!snap.exists()) return null
  const raw = snap.data() as any
  if (raw.uid !== uid) return null   // prevent reading others’ docs

  const createdAt = toMs(raw.createdAt)
  const updatedAt = toMs(raw.updatedAt)
  const { uid: _u, createdAt: _c, updatedAt: _u2, ...rest } = raw

  return {
    id: snap.id,
    uid,
    ...rest,
    createdAt,
    updatedAt,
  } as StudentID
}

export async function updateStudentID(s: StudentID): Promise<void> {
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  if (!uid || s.uid !== uid) throw new Error("Not authorized")
  const { id, uid: _u, createdAt: _c, updatedAt: _u2, ...rest } = s
  await updateDoc(doc(db, COL, id), {
    ...rest,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteStudentID(id: string): Promise<void> {
  const auth = getAuth()
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error("Not authenticated")
  const dref = doc(db, COL, id)
  const snap = await getDoc(dref)
  if (!snap.exists() || (snap.data() as any).uid !== uid) {
    throw new Error("Not authorized")
  }
  await deleteDoc(dref)
}
