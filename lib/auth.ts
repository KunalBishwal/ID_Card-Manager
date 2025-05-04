// lib/auth.ts
import {
  signInWithPopup,
  onAuthStateChanged as onAuthStateChangedFirebase,
  signOut,
  type User,
} from "firebase/auth"
import { auth, googleProvider } from "./firestore"

// Subscribe to auth state changes
export function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChangedFirebase(auth, callback)
}

// Trigger Google sign-in
export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider)
}

// Sign out
export function signOutUser() {
  return signOut(auth)
}
