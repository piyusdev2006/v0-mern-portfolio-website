export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: "Please select a valid image file (JPEG, JPG, PNG, or WebP)" }
  }

  if (file.size > maxSize) {
    return { isValid: false, error: "Image size must be less than 5MB" }
  }

  return { isValid: true }
}

export const validatePDFFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ["application/pdf"]
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: "Please select a valid PDF file" }
  }

  if (file.size > maxSize) {
    return { isValid: false, error: "PDF size must be less than 10MB" }
  }

  return { isValid: true }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
