"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, Maximize2, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImagePreviewProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export const ImagePreview = ({ src, alt, isOpen, onClose }: ImagePreviewProps) => {
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = src
    link.download = `${alt}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleRotate = () => {
    setRotation((prev) => prev + 90)
  }

  const handleZoom = () => {
    setScale((prev) => (prev === 1 ? 2 : 1))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,212,255,0.1),transparent_50%)]" />
          </div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 flex gap-2 z-10"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownload}
              className="bg-black/50 border-white/20 hover:bg-black/70"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRotate}
              className="bg-black/50 border-white/20 hover:bg-black/70"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoom}
              className="bg-black/50 border-white/20 hover:bg-black/70"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="bg-black/50 border-white/20 hover:bg-black/70"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl p-1">
              <div className="w-full h-full bg-black rounded-xl" />
            </div>

            <motion.div
              className="relative z-10 rounded-xl overflow-hidden"
              animate={{ rotate: rotation, scale }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={800}
                height={600}
                className="object-contain max-h-[70vh]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
