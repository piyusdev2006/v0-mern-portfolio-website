"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useProfile } from "@/hooks/use-profile"
import {
  Award,
  Trophy,
  Star,
  Crown,
  ExternalLink,
  Calendar,
  Building,
  Users,
  Target,
  Sparkles,
  CheckCircle,
} from "lucide-react"

const achievementCategories = {
  "Open Source": { icon: Star, color: "from-green-400 to-emerald-500" },
  Community: { icon: Users, color: "from-blue-400 to-indigo-500" },
  Competition: { icon: Trophy, color: "from-yellow-400 to-orange-500" },
  Certification: { icon: Award, color: "from-purple-400 to-pink-500" },
  Leadership: { icon: Crown, color: "from-red-400 to-rose-500" },
}

export const RecognitionShowcase = () => {
  const { profileData } = useProfile()
  const [activeTab, setActiveTab] = useState<"certifications" | "achievements" | "timeline">("certifications")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [animatedCounters, setAnimatedCounters] = useState(false)

  const stats = {
    totalCertifications: profileData.certifications.length,
    totalAchievements: profileData.achievements.length,
    uniqueIssuers: new Set(profileData.certifications.map((cert) => cert.issuer)).size,
    recentYear: new Date().getFullYear(),
  }

  const achievementsByCategory = profileData.achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.category]) acc[achievement.category] = []
      acc[achievement.category].push(achievement)
      return acc
    },
    {} as Record<string, typeof profileData.achievements>,
  )

  const timelineItems = [
    ...profileData.certifications.map((cert) => ({
      type: "certification" as const,
      title: cert.name,
      organization: cert.issuer,
      date: cert.date,
      description: `Certified in ${cert.name}`,
      icon: Award,
      color: "from-purple-400 to-pink-500",
    })),
    ...profileData.achievements.map((achievement) => ({
      type: "achievement" as const,
      title: achievement.title,
      organization: achievement.category,
      date: achievement.date,
      description: achievement.description,
      icon: Trophy,
      color: "from-yellow-400 to-orange-500",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedCounters(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <Crown className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Recognition Gallery
              </h2>
            </motion.div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Certifications, achievements, and milestones that validate expertise and dedication
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              label: "Certifications",
              value: stats.totalCertifications,
              icon: Award,
              color: "from-purple-400 to-pink-500",
              description: "Professional certifications",
            },
            {
              label: "Achievements",
              value: stats.totalAchievements,
              icon: Trophy,
              color: "from-yellow-400 to-orange-500",
              description: "Notable accomplishments",
            },
            {
              label: "Organizations",
              value: stats.uniqueIssuers,
              icon: Building,
              color: "from-blue-400 to-indigo-500",
              description: "Issuing organizations",
            },
            {
              label: "Active Year",
              value: stats.recentYear,
              icon: Calendar,
              color: "from-green-400 to-emerald-500",
              description: "Current achievements",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all duration-300">
                <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                    animate={
                      animatedCounters
                        ? {
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{
                      rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 },
                    }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <motion.div
                    className="text-4xl font-bold mb-2"
                    animate={
                      animatedCounters
                        ? {
                            scale: [1, 1.2, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                  >
                    {stat.value}
                  </motion.div>

                  <h3 className="font-semibold mb-1 group-hover:text-cyan-400 transition-colors">{stat.label}</h3>
                  <p className="text-xs text-gray-400">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-white/10 rounded-2xl p-2 backdrop-blur-sm border border-white/20">
            {[
              { id: "certifications", label: "Certifications", icon: Award },
              { id: "achievements", label: "Achievements", icon: Trophy },
              { id: "timeline", label: "Timeline", icon: Calendar },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Certifications View */}
          {activeTab === "certifications" && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {profileData.certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm h-full overflow-hidden hover:border-white/30 transition-all duration-300">
                    <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-500" />

                    <CardHeader className="relative">
                      <motion.div
                        className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Award className="w-6 h-6 text-white" />
                      </motion.div>

                      <CardTitle className="text-lg group-hover:text-purple-400 transition-colors pr-16">
                        {cert.name}
                      </CardTitle>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Building className="w-4 h-4" />
                        {cert.issuer}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {cert.date}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">Certified</Badge>

                        {cert.credentialUrl && (
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 bg-white/5 hover:bg-white/10"
                              onClick={() => window.open(cert.credentialUrl, "_blank")}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Verify
                            </Button>
                          </motion.div>
                        )}
                      </div>

                      {cert.credentialId && <div className="mt-3 text-xs text-gray-400">ID: {cert.credentialId}</div>}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Achievements View */}
          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                <motion.button
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    selectedCategory === null
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-4 h-4" />
                  All Categories
                </motion.button>

                {Object.entries(achievementCategories).map(([category, config]) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      selectedCategory === category
                        ? `bg-gradient-to-r ${config.color} text-black shadow-lg`
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <config.icon className="w-4 h-4" />
                    {category}
                    <Badge variant="secondary" className="ml-1 bg-black/20 text-xs">
                      {achievementsByCategory[category]?.length || 0}
                    </Badge>
                  </motion.button>
                ))}
              </div>

              {/* Achievements Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileData.achievements
                  .filter((achievement) => !selectedCategory || achievement.category === selectedCategory)
                  .map((achievement, index) => {
                    const categoryConfig = achievementCategories[
                      achievement.category as keyof typeof achievementCategories
                    ] || { icon: Trophy, color: "from-gray-400 to-gray-600" }

                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="group"
                      >
                        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm h-full overflow-hidden hover:border-white/30 transition-all duration-300">
                          <div className={`h-1 bg-gradient-to-r ${categoryConfig.color}`} />

                          <CardHeader className="relative">
                            <motion.div
                              className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${categoryConfig.color} rounded-xl flex items-center justify-center`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <categoryConfig.icon className="w-6 h-6 text-white" />
                            </motion.div>

                            <CardTitle className="text-lg group-hover:text-yellow-400 transition-colors pr-16">
                              {achievement.title}
                            </CardTitle>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Target className="w-4 h-4" />
                              {achievement.category}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar className="w-4 h-4" />
                              {achievement.date}
                            </div>
                          </CardHeader>

                          <CardContent>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">{achievement.description}</p>

                            <div className="flex items-center justify-between">
                              <Badge className={`bg-gradient-to-r ${categoryConfig.color} text-white`}>
                                {achievement.category}
                              </Badge>

                              <motion.div
                                className="flex items-center gap-1 text-yellow-400"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                              >
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-xs font-medium">Achievement</span>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
              </div>
            </motion.div>
          )}

          {/* Timeline View */}
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-orange-500 opacity-30" />

              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={`${item.type}-${index}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className={`relative z-10 w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-8 h-8 text-white" />

                      {/* Pulsing Ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-30`}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                      />
                    </motion.div>

                    {/* Content Card */}
                    <motion.div className="flex-1" whileHover={{ scale: 1.02, x: 10 }} transition={{ duration: 0.2 }}>
                      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all duration-300">
                        <div className={`h-1 bg-gradient-to-r ${item.color}`} />

                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                <Building className="w-4 h-4" />
                                {item.organization}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar className="w-4 h-4" />
                              {item.date}
                            </div>
                          </div>

                          <p className="text-gray-300 leading-relaxed mb-4">{item.description}</p>

                          <div className="flex items-center justify-between">
                            <Badge className={`bg-gradient-to-r ${item.color} text-white capitalize`}>
                              {item.type}
                            </Badge>

                            <motion.div
                              className="flex items-center gap-1 text-cyan-400"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs">Completed</span>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
