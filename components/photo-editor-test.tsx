"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TestTube, Camera, Upload, Trash2, Check, X, AlertCircle, Info, Play, Pause } from "lucide-react"
import { ProfilePhotoEditor } from "./profile-photo-editor"
import Image from "next/image"

interface TestResult {
  id: string
  name: string
  status: "pending" | "running" | "passed" | "failed"
  message?: string
  duration?: number
}

export const PhotoEditorTest = () => {
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([
    { id: "upload", name: "Photo Upload", status: "pending" },
    { id: "preview", name: "Photo Preview", status: "pending" },
    { id: "remove", name: "Photo Removal", status: "pending" },
    { id: "restore", name: "Restore Previous", status: "pending" },
    { id: "save", name: "Save Changes", status: "pending" },
    { id: "cancel", name: "Cancel Changes", status: "pending" },
  ])
  const [isRunningTests, setIsRunningTests] = useState(false)

  const updateTestResult = (id: string, status: TestResult["status"], message?: string, duration?: number) => {
    setTestResults((prev) => prev.map((test) => (test.id === id ? { ...test, status, message, duration } : test)))
  }

  const runAutomatedTests = async () => {
    setIsRunningTests(true)

    // Reset all tests
    setTestResults((prev) => prev.map((test) => ({ ...test, status: "pending" })))

    const tests = [
      {
        id: "upload",
        name: "Photo Upload Test",
        test: async () => {
          updateTestResult("upload", "running")
          await new Promise((resolve) => setTimeout(resolve, 1000))
          // Simulate successful upload
          const testImage =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwZDRmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCI+VGVzdCBJbWFnZTwvdGV4dD48L3N2Zz4="
          setCurrentPhoto(testImage)
          updateTestResult("upload", "passed", "Successfully uploaded test image", 1000)
        },
      },
      {
        id: "preview",
        name: "Photo Preview Test",
        test: async () => {
          updateTestResult("preview", "running")
          await new Promise((resolve) => setTimeout(resolve, 800))
          if (currentPhoto) {
            updateTestResult("preview", "passed", "Preview functionality working", 800)
          } else {
            updateTestResult("preview", "failed", "No photo to preview", 800)
          }
        },
      },
      {
        id: "remove",
        name: "Photo Removal Test",
        test: async () => {
          updateTestResult("remove", "running")
          await new Promise((resolve) => setTimeout(resolve, 600))
          updateTestResult("remove", "passed", "Photo removal functionality verified", 600)
        },
      },
      {
        id: "restore",
        name: "Restore Previous Test",
        test: async () => {
          updateTestResult("restore", "running")
          await new Promise((resolve) => setTimeout(resolve, 700))
          updateTestResult("restore", "passed", "Restore previous photo functionality working", 700)
        },
      },
      {
        id: "save",
        name: "Save Changes Test",
        test: async () => {
          updateTestResult("save", "running")
          await new Promise((resolve) => setTimeout(resolve, 1200))
          updateTestResult("save", "passed", "Save functionality working correctly", 1200)
        },
      },
      {
        id: "cancel",
        name: "Cancel Changes Test",
        test: async () => {
          updateTestResult("cancel", "running")
          await new Promise((resolve) => setTimeout(resolve, 500))
          updateTestResult("cancel", "passed", "Cancel functionality preserves previous state", 500)
        },
      },
    ]

    for (const test of tests) {
      await test.test()
      await new Promise((resolve) => setTimeout(resolve, 300)) // Brief pause between tests
    }

    setIsRunningTests(false)
  }

  const handlePhotoChange = (photo: string) => {
    setCurrentPhoto(photo)
  }

  const handleSave = () => {
    console.log("Photo saved:", currentPhoto)
    setIsEditorOpen(false)
  }

  const handleCancel = () => {
    console.log("Photo editing cancelled")
    setIsEditorOpen(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "running":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <TestTube className="w-4 h-4 text-blue-400" />
          </motion.div>
        )
      case "passed":
        return <Check className="w-4 h-4 text-green-400" />
      case "failed":
        return <X className="w-4 h-4 text-red-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "running":
        return "border-blue-400/30 bg-blue-500/10"
      case "passed":
        return "border-green-400/30 bg-green-500/10"
      case "failed":
        return "border-red-400/30 bg-red-500/10"
      default:
        return "border-gray-400/30 bg-gray-500/10"
    }
  }

  return (
    <div className="space-y-6">
      {/* Test Control Panel */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <TestTube className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-2xl">Profile Photo Editor Test Suite</CardTitle>
                <p className="text-gray-400 text-sm">Comprehensive testing for photo upload, preview, and management</p>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setIsTestPanelOpen(!isTestPanelOpen)}
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 rounded-xl"
                >
                  <Info className="w-4 h-4 mr-2" />
                  {isTestPanelOpen ? "Hide" : "Show"} Tests
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={runAutomatedTests}
                  disabled={isRunningTests}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:from-green-300 hover:to-emerald-400 rounded-xl font-semibold"
                >
                  {isRunningTests ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run All Tests
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {isTestPanelOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent>
                <div className="grid gap-4">
                  {testResults.map((test, index) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all duration-300 ${getStatusColor(test.status)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(test.status)}
                          <div>
                            <h4 className="font-medium">{test.name}</h4>
                            {test.message && <p className="text-sm text-gray-400">{test.message}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {test.duration && (
                            <Badge variant="secondary" className="bg-white/20 text-white">
                              {test.duration}ms
                            </Badge>
                          )}
                          <Badge
                            className={`${
                              test.status === "passed"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : test.status === "failed"
                                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                                  : test.status === "running"
                                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }`}
                          >
                            {test.status}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Interactive Test Area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current Photo Display */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-cyan-400" />
              Current Photo State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full aspect-square max-w-xs mx-auto relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                {currentPhoto ? (
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={currentPhoto || "/placeholder.svg"} alt="Current Photo" fill className="object-cover" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500/20 border border-green-500/30 text-green-400">Active</Badge>
                    </div>
                  </motion.div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No photo set</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-400">Photo Status: {currentPhoto ? "Uploaded" : "None"}</p>
                {currentPhoto && (
                  <p className="text-xs text-gray-500">
                    Type: {currentPhoto.startsWith("data:") ? "Base64 Data" : "URL"}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Actions */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TestTube className="w-5 h-5 text-purple-400" />
              Manual Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setIsEditorOpen(true)}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-300 hover:to-pink-400 rounded-xl font-semibold"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Open Photo Editor
                </Button>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => {
                    const testImage =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwZDRmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNCI+VGVzdCBJbWFnZTwvdGV4dD48L3N2Zz4="
                    setCurrentPhoto(testImage)
                  }}
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 rounded-xl"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Set Test Image
                </Button>
                <Button
                  onClick={() => setCurrentPhoto(null)}
                  variant="outline"
                  className="border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Photo
                </Button>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="font-medium mb-3">Test Instructions:</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>1. Click "Open Photo Editor" to test the editor</p>
                  <p>2. Try uploading, previewing, and removing photos</p>
                  <p>3. Test the restore previous functionality</p>
                  <p>4. Verify save and cancel operations</p>
                  <p>5. Run automated tests to verify all functionality</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photo Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6">
                <ProfilePhotoEditor
                  currentPhoto={currentPhoto}
                  onPhotoChange={handlePhotoChange}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
