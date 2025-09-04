"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  X,
  Save,
  Plus,
  Trash2,
  Edit3,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  LinkIcon,
  Sparkles,
  Eye,
} from "lucide-react"
import { useProfile } from "@/hooks/use-profile"
import { FileUpload } from "@/components/file-upload"
import { ImagePreview } from "@/components/image-preview"
import { UploadDemo } from "@/components/upload-demo"
import type { Skill, Project } from "@/types/profile"

interface ProfileManagerProps {
  isOpen: boolean
  onClose: () => void
}

export const ProfileManager = ({ isOpen, onClose }: ProfileManagerProps) => {
  const {
    profileData,
    updatePersonalInfo,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addCertification,
    updateCertification,
    removeCertification,
    addAchievement,
    updateAchievement,
    removeAchievement,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
  } = useProfile()

  const [activeTab, setActiveTab] = useState("personal")
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User, color: "from-cyan-400 to-blue-500" },
    { id: "skills", label: "Skills", icon: Code, color: "from-green-400 to-emerald-500" },
    { id: "projects", label: "Projects", icon: Briefcase, color: "from-purple-400 to-pink-500" },
    { id: "experience", label: "Experience", icon: Briefcase, color: "from-orange-400 to-red-500" },
    { id: "education", label: "Education", icon: GraduationCap, color: "from-blue-400 to-indigo-500" },
    { id: "certifications", label: "Certifications", icon: Award, color: "from-yellow-400 to-orange-500" },
    { id: "achievements", label: "Achievements", icon: Trophy, color: "from-pink-400 to-rose-500" },
    { id: "social", label: "Social Links", icon: LinkIcon, color: "from-teal-400 to-cyan-500" },
  ]

  const skillCategories = ["languages", "frontend", "backend", "tools", "databases", "cloud"] as const

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 bg-black/95 border border-white/20 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-600/50 rounded-3xl p-[1px]">
              <div className="w-full h-full bg-black/95 rounded-3xl" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <Settings className="w-6 h-6 text-black relative z-10" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Profile Manager
                  </h2>
                  <p className="text-gray-400 text-sm">Customize your portfolio with dynamic updates</p>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClose}
                  className="border-white/20 bg-white/5 hover:bg-white/10 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>

            <div className="flex h-[calc(100%-88px)] relative z-10">
              {/* Enhanced Sidebar */}
              <div className="w-72 border-r border-white/10 p-6 overflow-y-auto bg-gradient-to-b from-white/5 to-transparent">
                <div className="space-y-3">
                  {tabs.map((tab, index) => (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 h-12 rounded-xl transition-all duration-300 ${
                          activeTab === tab.id
                            ? `bg-gradient-to-r ${tab.color} text-black shadow-lg shadow-cyan-400/25`
                            : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                          <tab.icon className="w-5 h-5" />
                        </motion.div>
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div
                            className="ml-auto"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="flex-1 p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "personal" && (
                      <PersonalInfoTab
                        personalInfo={profileData.personalInfo}
                        onUpdate={updatePersonalInfo}
                        onPreviewImage={setPreviewImage}
                      />
                    )}

                    {activeTab === "skills" && (
                      <SkillsTab
                        skills={profileData.skills}
                        onAdd={addSkill}
                        onUpdate={updateSkill}
                        onRemove={removeSkill}
                        editingItem={editingItem}
                        setEditingItem={setEditingItem}
                      />
                    )}

                    {activeTab === "projects" && (
                      <ProjectsTab
                        projects={profileData.projects}
                        onAdd={addProject}
                        onUpdate={updateProject}
                        onRemove={removeProject}
                        editingItem={editingItem}
                        setEditingItem={setEditingItem}
                      />
                    )}

                    {/* Other tabs remain the same for now */}
                    {["experience", "education", "certifications", "achievements", "social"].includes(activeTab) && (
                      <div className="text-center py-16">
                        <motion.div
                          className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Settings className="w-12 h-12 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {tabs.find((t) => t.id === activeTab)?.label} Management
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                          This section is coming soon with advanced management features and dynamic UI components.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Image Preview Modal */}
          {previewImage && (
            <ImagePreview
              src={previewImage || "/placeholder.svg"}
              alt="Profile Preview"
              isOpen={!!previewImage}
              onClose={() => setPreviewImage(null)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Enhanced Personal Info Tab Component
const PersonalInfoTab = ({ personalInfo, onUpdate, onPreviewImage }: any) => {
  const [formData, setFormData] = useState(personalInfo)
  const [isSaving, setIsSaving] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate save
    onUpdate(formData)
    setIsSaving(false)
  }

  const handleImageChange = (file: string | null) => {
    setFormData({ ...formData, profileImage: file })
  }

  const handleResumeChange = (file: string | null) => {
    setFormData({ ...formData, resumeUrl: file })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Personal Information
          </h3>
          <p className="text-gray-400 mt-2">Update your basic profile information</p>
        </div>
        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowDemo(!showDemo)}
              variant="outline"
              className="border-purple-400/50 bg-purple-500/10 hover:bg-purple-500/20 px-4 py-2 rounded-xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {showDemo ? "Hide Demo" : "Try Demo"}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-400/25"
            >
              {isSaving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-5 h-5 mr-2"
                >
                  <Settings className="w-5 h-5" />
                </motion.div>
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Demo Section */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UploadDemo />
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Uploads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <FileUpload
            type="image"
            currentFile={formData.profileImage}
            onFileChange={handleImageChange}
            label="Profile Picture"
            description="Upload your profile image (JPEG, JPG, PNG, WebP - Max 5MB)"
          />
          {formData.profileImage && (
            <motion.div className="mt-4" whileHover={{ scale: 1.02 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPreviewImage(formData.profileImage)}
                className="border-white/20 bg-white/5 hover:bg-white/10 rounded-lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Image
              </Button>
            </motion.div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <FileUpload
            type="pdf"
            currentFile={formData.resumeUrl}
            onFileChange={handleResumeChange}
            label="Resume"
            description="Upload your resume (PDF - Max 10MB)"
          />
        </motion.div>
      </div>

      {/* Form Fields */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { label: "Full Name", key: "name", type: "text" },
          { label: "Email", key: "email", type: "email" },
          { label: "Phone", key: "phone", type: "tel" },
          { label: "Location", key: "location", type: "text" },
          { label: "Professional Title", key: "title", type: "text" },
          { label: "GitHub Username", key: "githubUsername", type: "text" },
          { label: "LinkedIn Username", key: "linkedinUsername", type: "text" },
          { label: "LeetCode Username", key: "leetcodeUsername", type: "text" },
        ].map((field, index) => (
          <motion.div
            key={field.key}
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            <label className="text-sm font-medium text-gray-300">{field.label}</label>
            <div className="relative">
              <Input
                type={field.type}
                value={formData[field.key] || ""}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                className="bg-white/5 border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl transition-all duration-300 hover:bg-white/10"
              />
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-transparent"
                whileFocus={{ borderColor: "rgba(0, 212, 255, 0.5)" }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-2"
      >
        <label className="text-sm font-medium text-gray-300">Bio</label>
        <div className="relative">
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="bg-white/5 border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl transition-all duration-300 hover:bg-white/10 min-h-[120px]"
            rows={5}
          />
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
            whileFocus={{ borderColor: "rgba(0, 212, 255, 0.5)" }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Enhanced Skills Tab Component
const SkillsTab = ({ skills, onAdd, onUpdate, onRemove, editingItem, setEditingItem }: any) => {
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "languages" as const,
    proficiency: 50,
  })

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      onAdd(newSkill)
      setNewSkill({ name: "", category: "languages", proficiency: 50 })
    }
  }

  const skillCategories = ["languages", "frontend", "backend", "tools", "databases", "cloud"] as const
  const categoryColors = {
    languages: "from-red-400 to-orange-500",
    frontend: "from-cyan-400 to-blue-500",
    backend: "from-green-400 to-emerald-500",
    tools: "from-purple-400 to-pink-500",
    databases: "from-yellow-400 to-orange-500",
    cloud: "from-blue-400 to-indigo-500",
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Skills Management
          </h3>
          <p className="text-gray-400 mt-2">Add and organize your technical skills</p>
        </div>
      </div>

      {/* Add New Skill */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

          <CardHeader className="relative z-10">
            <CardTitle className="text-xl flex items-center gap-3">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Plus className="w-4 h-4 text-white" />
              </motion.div>
              Add New Skill
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Skill name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="bg-white/10 border-white/20 focus:border-cyan-400 rounded-xl"
              />
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
              >
                {skillCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-black">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <div className="space-y-2">
                <Input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Proficiency %"
                  value={newSkill.proficiency}
                  onChange={(e) => setNewSkill({ ...newSkill, proficiency: Number.parseInt(e.target.value) || 0 })}
                  className="bg-white/10 border-white/20 focus:border-cyan-400 rounded-xl"
                />
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${newSkill.proficiency}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleAddSkill}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:from-green-300 hover:to-emerald-400 rounded-xl font-semibold"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Skill
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills List */}
      <div className="space-y-6">
        {skillCategories.map((category, categoryIndex) => {
          const categorySkills = skills.filter((skill: Skill) => skill.category === category)
          if (categorySkills.length === 0) return null

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all duration-300">
                {/* Category header with gradient */}
                <div className={`h-1 bg-gradient-to-r ${categoryColors[category]}`} />

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`w-8 h-8 bg-gradient-to-r ${categoryColors[category]} rounded-lg flex items-center justify-center`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Code className="w-4 h-4 text-white" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-xl capitalize flex items-center gap-3">
                          {category}
                          <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                            {categorySkills.length}
                          </Badge>
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditingItem(category)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-cyan-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemove(category)}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </motion.button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill: Skill, index: number) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="group"
                      >
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                              {skill.name}
                            </div>
                            <div className="flex gap-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setEditingItem(skill.id)}
                                className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                              >
                                <Edit3 className="w-3 h-3 text-cyan-400" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemove(skill.id)}
                                className="p-1 rounded-md bg-red-500/20 hover:bg-red-500/30 transition-colors"
                              >
                                <Trash2 className="w-3 h-3 text-red-400" />
                              </motion.button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Proficiency</span>
                              <span className="text-cyan-400 font-medium">{skill.proficiency}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <motion.div
                                className={`bg-gradient-to-r ${categoryColors[category]} h-2 rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.proficiency}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Enhanced Projects Tab Component
const ProjectsTab = ({ projects, onAdd, onUpdate, onRemove, editingItem, setEditingItem }: any) => {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech: [],
    date: "",
    features: [],
    status: "In Progress",
    category: "Full Stack",
    githubUrl: "",
    liveUrl: "",
  })

  const [techInput, setTechInput] = useState("")
  const [featureInput, setFeatureInput] = useState("")

  const addTech = () => {
    if (techInput.trim() && !newProject.tech.includes(techInput.trim())) {
      setNewProject({ ...newProject, tech: [...newProject.tech, techInput.trim()] })
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    setNewProject({ ...newProject, tech: newProject.tech.filter((t) => t !== tech) })
  }

  const addFeature = () => {
    if (featureInput.trim() && !newProject.features.includes(featureInput.trim())) {
      setNewProject({ ...newProject, features: [...newProject.features, featureInput.trim()] })
      setFeatureInput("")
    }
  }

  const removeFeature = (feature: string) => {
    setNewProject({ ...newProject, features: newProject.features.filter((f) => f !== feature) })
  }

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      onAdd(newProject)
      setNewProject({
        title: "",
        description: "",
        tech: [],
        date: "",
        features: [],
        status: "In Progress",
        category: "Full Stack",
        githubUrl: "",
        liveUrl: "",
      })
      setTechInput("")
      setFeatureInput("")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Projects Management
          </h3>
          <p className="text-gray-400 mt-2">Showcase your amazing projects</p>
        </div>
      </div>

      {/* Add New Project Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-500/10 to-red-500/10" />

          <CardHeader className="relative z-10">
            <CardTitle className="text-xl flex items-center gap-3">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Plus className="w-4 h-4 text-white" />
              </motion.div>
              Add New Project
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Project title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="bg-white/10 border-white/20 focus:border-purple-400 rounded-xl"
              />
              <Input
                placeholder="Date (e.g., April 2024)"
                value={newProject.date}
                onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                className="bg-white/10 border-white/20 focus:border-purple-400 rounded-xl"
              />
            </div>

            <Textarea
              placeholder="Project description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="bg-white/10 border-white/20 focus:border-purple-400 rounded-xl"
              rows={3}
            />

            {/* Tech Stack */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Technologies</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add technology"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTech()}
                  className="bg-white/10 border-white/20 focus:border-purple-400 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={addTech}
                  className="bg-purple-500/20 hover:bg-purple-500/30 border-purple-400/50 rounded-xl"
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProject.tech.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-sm"
                  >
                    {tech}
                    <button onClick={() => removeTech(tech)} className="ml-1 text-red-400 hover:text-red-300">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Key Features</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add feature"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addFeature()}
                  className="bg-white/10 border-white/20 focus:border-purple-400 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={addFeature}
                  className="bg-purple-500/20 hover:bg-purple-500/30 border-purple-400/50 rounded-xl"
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProject.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-sm"
                  >
                    {feature}
                    <button onClick={() => removeFeature(feature)} className="ml-1 text-red-400 hover:text-red-300">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="GitHub URL"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                className="bg-white/10 border-white/20 focus:border-purple-400 rounded-xl"
              />
              <Input
                placeholder="Live Demo URL"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                className="bg-white/10 border-white/20 focus:border-purple-400 rounded-xl"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAddProject}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-300 hover:to-pink-400 rounded-xl font-semibold py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Project
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Projects List */}
      <div className="grid gap-6">
        {projects.map((project: Project, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01, y: -2 }}
            className="group"
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all duration-300">
              {/* Project header with gradient */}
              <div className="h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />

              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Briefcase className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-gray-400">{project.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black">{project.status}</Badge>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingItem(project.id)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-cyan-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemove(project.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </motion.button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                <div className="space-y-4">
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: idx * 0.2 }}
                          />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {project.githubUrl && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-white/20 bg-white/5 hover:bg-white/10 rounded-xl"
                          onClick={() => window.open(project.githubUrl, "_blank")}
                        >
                          <Code className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      </motion.div>
                    )}
                    {project.liveUrl && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-300 hover:to-pink-400 rounded-xl"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
