"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Upload, X, Save, RotateCcw, Eye, Trash2 } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { ImagePreview } from "@/components/image-preview"
import Image from "next/image"

interface ProfilePhotoEditorProps {
  currentPhoto?: string
  onPhotoChange: (photo: string) => void
  onSave: () => void
  onCancel: () => void
}

export const ProfilePhotoEditor = ({ currentPhoto, onPhotoChange, onSave, onCancel }: ProfilePhotoEditorProps) => {
  const [newPhoto, setNewPhoto] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const hasChanges = newPhoto !== null
  const displayPhoto = newPhoto || currentPhoto
  const previousPhoto = currentPhoto

  const handlePhotoUpload = useCallback(
    (file: string | null) => {
      setNewPhoto(file)
      if (file) {
        onPhotoChange(file)
      }
    },
    [onPhotoChange],
  )

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSave()
    setNewPhoto(null) // Reset after save
    setIsSaving(false)
  }

  const handleCancel = () => {
    if (hasChanges && previousPhoto) {
      // Restore previous photo
      onPhotoChange(previousPhoto)
    }
    setNewPhoto(null)
    onCancel()
  }

  const handleRemovePhoto = () => {
    setNewPhoto("")
    onPhotoChange("")
  }

  const handleRestorePrevious = () => {
    if (previousPhoto) {
      setNewPhoto(null)
      onPhotoChange(previousPhoto)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Profile Photo Editor
          </h3>
          <p className="text-gray-400 mt-2">Upload, preview, and manage your profile picture</p>
        </div>
        <div className="flex gap-3">
          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-sm"
            >
              Unsaved Changes
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Photo Upload Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white/5 border-white/10 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Upload className="w-4 h-4 text-white" />
                </motion.div>
                Upload New Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                type="image"
                currentFile={displayPhoto}
                onFileChange={handlePhotoUpload}
                label="Profile Picture"
                description="Upload your profile image (JPEG, JPG, PNG, WebP - Max 5MB)"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Photo Preview Section */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-white/5 border-white/10 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Camera className="w-4 h-4 text-white" />
                </motion.div>
                Photo Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Photo Display */}
              <div className="relative">
                <div className="w-full aspect-square max-w-xs mx-auto relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                  {displayPhoto ? (
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={displayPhoto || "/placeholder.svg"}
                        alt="Profile Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      {/* Status Indicator */}
                      <motion.div
                        className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium ${
                          hasChanges
                            ? "bg-orange-500/20 border border-orange-500/30 text-orange-400"
                            : "bg-green-500/20 border border-green-500/30 text-green-400"
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        {hasChanges ? "Modified" : "Current"}
                      </motion.div>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No photo uploaded</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {displayPhoto && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => setIsPreviewOpen(true)}
                      variant="outline"
                      className="w-full border-white/20 bg-white/5 hover:bg-white/10 rounded-xl"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Full Screen Preview
                    </Button>
                  </motion.div>
                )}

                {displayPhoto && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleRemovePhoto}
                      variant="outline"
                      className="w-full border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Photo
                    </Button>
                  </motion.div>
                )}

                {hasChanges && previousPhoto && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Button
                      onClick={handleRestorePrevious}
                      variant="outline"
                      className="w-full border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300 rounded-xl"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Restore Previous
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Previous Photo Comparison */}
      <AnimatePresence>
        {hasChanges && previousPhoto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-lg">Photo Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-3">Previous Photo</p>
                    <div className="w-32 h-32 mx-auto relative rounded-xl overflow-hidden bg-white/10">
                      <Image
                        src={previousPhoto || "/placeholder.svg"}
                        alt="Previous Photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-3">New Photo</p>
                    <div className="w-32 h-32 mx-auto relative rounded-xl overflow-hidden bg-white/10">
                      {newPhoto ? (
                        <Image src={newPhoto || "/placeholder.svg"} alt="New Photo" fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <X className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <div className="text-sm text-gray-400">{hasChanges ? "You have unsaved changes" : "No changes to save"}</div>
        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-white/20 bg-transparent hover:bg-white/10 rounded-xl"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:from-green-300 hover:to-emerald-400 disabled:opacity-50 rounded-xl font-semibold"
            >
              {isSaving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-4 h-4 mr-2"
                >
                  <Upload className="w-4 h-4" />
                </motion.div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {displayPhoto && (
        <ImagePreview
          src={displayPhoto || "/placeholder.svg"}
          alt="Profile Photo Preview"
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  )
}
