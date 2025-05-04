// app/manage/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { StudentID } from "@/lib/types"
import { getStudentIDs, deleteStudentID } from "@/lib/storage"
import { downloadIDCard } from "@/lib/download"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Pencil, Trash2, Eye, Download, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import IDCard from "@/components/id-card"
import TiltCard from "@/components/tilt-card"

export default function ManagePage() {
  const router = useRouter()
  const [studentIDs, setStudentIDs] = useState<StudentID[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [preview, setPreview] = useState<StudentID | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Load data
  useEffect(() => {
    ;(async () => {
      setStudentIDs(await getStudentIDs())
    })()
  }, [])

  // Delete + reload
  const handleDelete = async (id: string) => {
    await deleteStudentID(id)
    setStudentIDs(await getStudentIDs())
  }

  // Download
  const handleDownload = (sid: StudentID) => {
    downloadIDCard(sid)
  }

  // Preview
  const handlePreview = (sid: StudentID) => {
    setPreview(sid)
    setIsPreviewOpen(true)
  }

  // Filter
  const filtered = studentIDs.filter((s) => {
    const q = searchTerm.toLowerCase()
    return (
      s.studentName.toLowerCase().includes(q) ||
      s.registerNumber.toLowerCase().includes(q) ||
      s.programme.toLowerCase().includes(q)
    )
  })

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage ID Cards</h1>
            <p className="text-muted-foreground mt-1">
              View, edit, and download your generated ID cards
            </p>
          </div>
          <Button asChild className="gap-2 md:self-end">
            <Link href="/create">
              <Plus className="h-4 w-4" /> Create New ID
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, register number, or programme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No ID cards found</h3>
            <p className="text-muted-foreground mb-6">
              You haven't created any ID cards yet. Get started by creating your first ID card.
            </p>
            <Button asChild>
              <Link href="/create">Create Your First ID Card</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Reg. No.</TableHead>
                  <TableHead>Programme</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((sid) => (
                  <TableRow key={sid.id} className="border-b">
                    <TableCell>
                      <div className="w-12 h-16 border overflow-hidden">
                        {sid.photoUrl ? (
                          <Image
                            src={sid.photoUrl}
                            alt={`${sid.studentName}'s photo`}
                            width={48}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                            No Photo
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{sid.studentName}</TableCell>
                    <TableCell>{sid.registerNumber}</TableCell>
                    <TableCell>{sid.programme}</TableCell>
                    <TableCell>{`${sid.validFrom} - ${sid.validTo}`}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* Preview */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => handlePreview(sid)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Preview ID card</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Download */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => handleDownload(sid)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download as PNG</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Edit */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => router.push(`/edit/${sid.id}`)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit ID card</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Delete */}
                        <AlertDialog>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="icon" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent>Delete ID card</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <p className="text-sm">
                                Permanently delete {sid.studentName}’s ID card?
                              </p>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(sid.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Preview Modal */}
        {preview && (
          <AlertDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>ID Card Preview</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="flex justify-center py-4">
                <TiltCard>
                  <IDCard studentID={preview} />
                </TiltCard>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <Button onClick={() => handleDownload(preview)}>Download</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* 
          Off-screen—but still rendered—IDCards so html2canvas can find them.
          We position them far off-screen instead of using `display: none`. 
        */}
        <div style={{ position: "absolute", top: -9999, left: -9999, zIndex: -1 }}>
          {studentIDs.map((sid) => (
            <IDCard key={sid.id} studentID={sid} />
          ))}
        </div>
      </div>
    </div>
)
}