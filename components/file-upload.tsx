"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, FileImage, FileText, Check, AlertCircle, Camera } from "lucide-react"
import { convertFileToBase64, validateImageFile, validatePDFFile } from "@/lib/file-utils"
import Image from "next/image"

interface FileUploadProps {
  type: "image" | "pdf"
  currentFile?: string
  onFileChange: (file: string | null) => void
  label: string
  description: string
  className?: string
}

export const FileUpload = ({
  type,
  currentFile,
  onFileChange,
  label,
  description,
  className = "",
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(
    async (file: File) => {
      setError(null)
      setIsUploading(true)
      setUploadProgress(0)

      // Validate file
      const validation = type === "image" ? validateImageFile(file) : validatePDFFile(file)
      if (!validation.isValid) {
        setError(validation.error || "Invalid file")
        setIsUploading(false)
        return
      }

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 100)

        // Convert file to base64
        const base64 = await convertFileToBase64(file)

        // Complete progress
        setUploadProgress(100)
        setTimeout(() => {
          onFileChange(base64)
          setIsUploading(false)
          setUploadProgress(0)
        }, 500)
      } catch (err) {
        setError("Failed to upload file. Please try again.")
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [type, onFileChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const removeFile = useCallback(() => {
    onFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [onFileChange])

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      <motion.div
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden ${
          isDragging
            ? "border-cyan-400 bg-cyan-400/10 scale-105"
            : currentFile
              ? "border-green-400/50 bg-green-400/5"
              : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: currentFile ? 1 : 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 text-center relative z-10"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Upload className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-white font-medium mb-2">Uploading...</p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-gray-400">{uploadProgress}%</p>
            </motion.div>
          ) : currentFile ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 relative z-10"
            >
              <div className="flex items-center gap-4">
                {type === "image" ? (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/10">
                    <Image src={currentFile || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                ) : (
                  <motion.div
                    className="w-20 h-20 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <FileText className="w-10 h-10 text-white" />
                  </motion.div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">
                      {type === "image" ? "Image uploaded" : "PDF uploaded"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {type === "image" ? "Profile picture ready" : "Resume ready for download"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={openFileDialog}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-4 h-4 text-cyan-400" />
                  </motion.button>
                  <motion.button
                    onClick={removeFile}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 text-center cursor-pointer relative z-10"
              onClick={openFileDialog}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                  type === "image" ? "from-cyan-400 to-blue-500" : "from-orange-400 to-red-500"
                } flex items-center justify-center`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {type === "image" ? (
                  <FileImage className="w-8 h-8 text-white" />
                ) : (
                  <FileText className="w-8 h-8 text-white" />
                )}
              </motion.div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {isDragging ? "Drop your file here" : `Upload ${type === "image" ? "Image" : "PDF"}`}
              </h3>

              <p className="text-sm text-gray-400 mb-4">
                {type === "image"
                  ? "Drag & drop or click to select (JPEG, JPG, PNG, WebP)"
                  : "Drag & drop or click to select PDF file"}
              </p>

              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300"
                whileHover={{ bg: "rgba(255,255,255,0.15)" }}
              >
                <Upload className="w-4 h-4" />
                Choose File
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${
              isDragging ? "#00d4ff" : currentFile ? "#10b981" : "transparent"
            }, transparent)`,
            padding: "2px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
          }}
          animate={{ rotate: isDragging || isUploading ? 360 : 0 }}
          transition={{ duration: 2, repeat: isDragging || isUploading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
        />
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-300">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={type === "image" ? "image/jpeg,image/jpg,image/png,image/webp" : "application/pdf"}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  )
}
