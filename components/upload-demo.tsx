"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "@/components/file-upload"
import { ImagePreview } from "@/components/image-preview"
import { Upload, FileText, CheckCircle, Sparkles, Download, Eye, Zap, Palette, Camera } from "lucide-react"
import Image from "next/image"

export const UploadDemo = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [resume, setResume] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showDemo, setShowDemo] = useState(false)

  // Demo data for showcasing
  const demoProfileImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMzAiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjkiLz4KPHBhdGggZD0iTTcwIDEzMEM3MCA5NS44NjI5IDk1Ljg2MjkgNzAgMTMwIDcwUzE5MCA5NS44NjI5IDE5MCAxMzBWMjAwSDcwVjEzMFoiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjkiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwIiB5MT0iMCIgeDI9IjIwMCIgeTI9IjIwMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBENEZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwN0NGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="

  const handleDemoUpload = () => {
    setShowDemo(true)
    // Simulate profile image upload
    setTimeout(() => {
      setProfileImage(demoProfileImage)
    }, 1000)

    // Simulate resume upload
    setTimeout(() => {
      setResume(
        "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKE5hdmVlbiBTaW5naCAtIFJlc3VtZSkKL0NyZWF0b3IgKERlbW8gUERGKQovUHJvZHVjZXIgKFBvcnRmb2xpbyBEZW1vKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFs0IDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjcyIDcyMCBUZAooTmF2ZWVuIFNpbmdoIC0gRnVsbCBTdGFjayBEZXZlbG9wZXIpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxMDggMDAwMDAgbiAKMDAwMDAwMDE1NSAwMDAwMCBuIAowMDAwMDAwMjEyIDAwMDAwIG4gCjAwMDAwMDAzMDkgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDIgMCBSCj4+CnN0YXJ0eHJlZgo0MDMKJSVFT0YK",
      )
    }, 2000)
  }

  const resetDemo = () => {
    setProfileImage(null)
    setResume(null)
    setShowDemo(false)
    setPreviewImage(null)
  }

  return (
    <div className="space-y-8">
      {/* Demo Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          File Upload Demo
        </h3>
        <p className="text-gray-400 mb-6">Experience the dynamic file upload system with enhanced UI animations</p>

        <div className="flex justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDemoUpload}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-400/25"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Demo Upload
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={resetDemo}
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl"
            >
              Reset Demo
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Upload Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Image Upload */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Camera className="w-4 h-4 text-white" />
                </motion.div>
                Profile Picture Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                type="image"
                currentFile={profileImage}
                onFileChange={setProfileImage}
                label="Profile Image"
                description="Upload your profile picture (JPEG, JPG, PNG, WebP - Max 5MB)"
              />

              {profileImage && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewImage(profileImage)}
                    className="border-white/20 bg-white/5 hover:bg-white/10 rounded-lg flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = profileImage || ""
                      link.download = "profile-image.jpg"
                      link.click()
                    }}
                    className="border-white/20 bg-white/5 hover:bg-white/10 rounded-lg flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Resume Upload */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-orange-400 to-red-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText className="w-4 h-4 text-white" />
                </motion.div>
                Resume Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                type="pdf"
                currentFile={resume}
                onFileChange={setResume}
                label="Resume"
                description="Upload your resume (PDF - Max 10MB)"
              />

              {resume && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = resume || ""
                      link.download = "Naveen_Singh_Resume.pdf"
                      link.click()
                    }}
                    className="border-white/20 bg-white/5 hover:bg-white/10 rounded-lg w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Dynamic Updates Preview */}
      <AnimatePresence>
        {(profileImage || resume) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Dynamic Updates Preview
              </h4>
              <p className="text-gray-400">See how your uploads instantly update the portfolio</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Preview */}
              {profileImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        Profile Updated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                          {/* Animated rings */}
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute inset-2 rounded-full border border-blue-400/20"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />

                          {/* Profile image */}
                          <div className="absolute inset-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden bg-black">
                              <Image
                                src={profileImage || "/placeholder.svg"}
                                alt="Profile Preview"
                                width={60}
                                height={60}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Status indicator */}
                          <motion.div
                            className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center border-2 border-black"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Sparkles className="w-3 h-3 text-black" />
                          </motion.div>
                        </div>

                        <div>
                          <h5 className="font-semibold text-green-400">Profile Image Active</h5>
                          <p className="text-sm text-gray-400">Your image is now displayed in the hero section</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className="bg-green-500/20 text-green-300 text-xs">Hero Section</Badge>
                            <Badge className="bg-blue-500/20 text-blue-300 text-xs">Navigation</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Resume Preview */}
              {resume && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-orange-400" />
                        Resume Updated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center relative overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <FileText className="w-10 h-10 text-white relative z-10" />
                        </motion.div>

                        <div>
                          <h5 className="font-semibold text-orange-400">Resume Available</h5>
                          <p className="text-sm text-gray-400">Download button is now active in navigation</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className="bg-orange-500/20 text-orange-300 text-xs">Navigation</Badge>
                            <Badge className="bg-red-500/20 text-red-300 text-xs">Contact Section</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Feature Showcase */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Palette className="w-6 h-6 text-purple-400" />
                    Enhanced UI Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div className="text-center p-4 bg-white/5 rounded-xl" whileHover={{ scale: 1.05, y: -5 }}>
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Upload className="w-6 h-6 text-white" />
                      </motion.div>
                      <h6 className="font-semibold mb-2">Drag & Drop</h6>
                      <p className="text-sm text-gray-400">Interactive file dropping with visual feedback</p>
                    </motion.div>

                    <motion.div className="text-center p-4 bg-white/5 rounded-xl" whileHover={{ scale: 1.05, y: -5 }}>
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl mx-auto mb-3 flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Sparkles className="w-6 h-6 text-white" />
                      </motion.div>
                      <h6 className="font-semibold mb-2">Live Preview</h6>
                      <p className="text-sm text-gray-400">Instant preview with zoom and rotation controls</p>
                    </motion.div>

                    <motion.div className="text-center p-4 bg-white/5 rounded-xl" whileHover={{ scale: 1.05, y: -5 }}>
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl mx-auto mb-3 flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(168, 85, 247, 0.7)",
                            "0 0 0 10px rgba(168, 85, 247, 0)",
                            "0 0 0 0 rgba(168, 85, 247, 0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <CheckCircle className="w-6 h-6 text-white" />
                      </motion.div>
                      <h6 className="font-semibold mb-2">Auto Updates</h6>
                      <p className="text-sm text-gray-400">Dynamic portfolio updates across all sections</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      {previewImage && (
        <ImagePreview
          src={previewImage || "/placeholder.svg"}
          alt="Profile Preview"
          isOpen={!!previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  )
}
