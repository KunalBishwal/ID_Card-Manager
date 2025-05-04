import html2canvas from "html2canvas"
import type { StudentID } from "./types"

export const downloadIDCard = async (studentID: StudentID): Promise<void> => {
  const element = document.getElementById(`id-card-${studentID.id}`)

  if (!element) {
    console.error("ID card element not found")
    return
  }

  try {
    const images = element.querySelectorAll('img')
    const imagePromises = Array.from(images).map(img => {
      return new Promise<void>((resolve, reject) => {
        if (img.complete) {
          resolve()
        } else {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error('Image failed to load'))
        }
      })
    })

    await Promise.all(imagePromises)

    const originalStyles = {
      overflow: element.style.overflow,
      position: element.style.position,
      height: element.style.height,
      width: element.style.width,
    }

    element.style.overflow = "visible"
    element.style.position = "relative"
    element.style.height = "auto" 
    element.style.width = "400px"  // Maintain original design width

    const canvas = await html2canvas(element, {
      scale: 4,  // Increased from 3 to 4 for higher resolution
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      x: 0,
      y: 0,
    })

    const image = canvas.toDataURL("image/png")

    const link = document.createElement("a")
    link.href = image
    link.download = `${studentID.studentName.replace(/\s+/g, "-")}-ID-Card.png`

    link.click()

    element.style.overflow = originalStyles.overflow
    element.style.position = originalStyles.position
    element.style.height = originalStyles.height
    element.style.width = originalStyles.width

  } catch (error) {
    console.error("Error generating ID card image:", error)
  }
}