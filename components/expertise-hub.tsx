"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useProfile } from "@/hooks/use-profile"
import {
  Code,
  Star,
  TrendingUp,
  Target,
  Trophy,
  ExternalLink,
  Brain,
  Globe,
  Database,
  Layers,
  Terminal,
  Settings,
  Activity,
  BarChart3,
  PieChart,
} from "lucide-react"
import Link from "next/link"

const categoryIcons = {
  languages: Code,
  frontend: Globe,
  backend: Terminal,
  tools: Settings,
  databases: Database,
  cloud: Layers,
}

const categoryColors = {
  languages: "from-red-400 to-orange-500",
  frontend: "from-cyan-400 to-blue-500",
  backend: "from-green-400 to-emerald-500",
  tools: "from-purple-400 to-pink-500",
  databases: "from-yellow-400 to-orange-500",
  cloud: "from-blue-400 to-indigo-500",
}

export const ExpertiseHub = () => {
  const { profileData } = useProfile()
  const [activeView, setActiveView] = useState<"skills" | "stats" | "platforms">("skills")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [animatedStats, setAnimatedStats] = useState(false)

  const skillsByCategory = profileData.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof profileData.skills>,
  )

  const stats = {
    totalSkills: profileData.skills.length,
    avgProficiency: Math.round(
      profileData.skills.reduce((acc, skill) => acc + skill.proficiency, 0) / profileData.skills.length,
    ),
    topSkills: profileData.skills.filter((skill) => skill.proficiency >= 85).length,
    categories: Object.keys(skillsByCategory).length,
  }

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const platformStats = [
    {
      name: "LeetCode",
      icon: "🏆",
      color: "from-orange-500 to-yellow-500",
      stats: [
        { label: "Problems Solved", value: "16", icon: Trophy },
        { label: "Global Rank", value: "3.6M", icon: TrendingUp },
        { label: "Submissions", value: "21", icon: Target },
        { label: "Acceptance Rate", value: "76%", icon: Star },
      ],
      skills: ["Game Theory", "Dynamic Programming"],
      url: "https://leetcode.com/u/Navi_2006/",
    },
    {
      name: "GitHub",
      icon: "🐙",
      color: "from-purple-500 to-blue-500",
      stats: [
        { label: "Repositories", value: "15+", icon: Code },
        { label: "Stars Earned", value: "25+", icon: Star },
        { label: "Contributions", value: "200+", icon: Activity },
        { label: "Languages", value: "5+", icon: Globe },
      ],
      skills: ["Open Source", "Version Control", "Collaboration"],
      url: `https://github.com/${profileData.personalInfo.githubUsername}`,
    },
  ]

  return (
    <section id="expertise" className="py-32 px-6 relative z-10">
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
                className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Expertise Hub
              </h2>
            </motion.div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive skill set spanning the full development lifecycle with proven track record
            </p>
          </div>
        </ScrollReveal>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-white/10 rounded-2xl p-2 backdrop-blur-sm border border-white/20">
            {[
              { id: "skills", label: "Skills Matrix", icon: Code },
              { id: "stats", label: "Analytics", icon: BarChart3 },
              { id: "platforms", label: "Platforms", icon: Globe },
            ].map((view) => (
              <motion.button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeView === view.id
                    ? "bg-gradient-to-r from-purple-400 to-pink-500 text-black shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <view.icon className="w-5 h-5" />
                {view.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Skills Matrix View */}
          {activeView === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Category Overview */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {Object.entries(skillsByCategory).map(([category, skills], index) => {
                  const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code
                  const isSelected = selectedCategory === category

                  return (
                    <motion.button
                      key={category}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedCategory(isSelected ? null : category)}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-black shadow-lg`
                          : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium capitalize">{category}</div>
                      <div className="text-xs opacity-75">{skills.length} skills</div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Object.entries(skillsByCategory).map(([category, skills]) => {
                  if (selectedCategory && selectedCategory !== category) return null

                  const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code

                  return (
                    <motion.div
                      key={category}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all duration-300">
                        <div
                          className={`h-1 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]}`}
                        />

                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-3 text-lg">
                            <motion.div
                              className={`w-8 h-8 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-lg flex items-center justify-center`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <IconComponent className="w-4 h-4 text-white" />
                            </motion.div>
                            <span className="capitalize">{category}</span>
                            <Badge variant="secondary" className="ml-auto bg-white/20 text-white text-xs">
                              {skills.length}
                            </Badge>
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          {skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: skillIndex * 0.1 }}
                              whileHover={{ x: 5, scale: 1.02 }}
                              className="group"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                                  {skill.name}
                                </span>
                                <span className="text-sm text-cyan-400 font-medium">{skill.proficiency}%</span>
                              </div>

                              <div className="relative">
                                <div className="w-full bg-white/20 rounded-full h-2">
                                  <motion.div
                                    className={`bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} h-2 rounded-full relative overflow-hidden`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.proficiency}%` }}
                                    transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                  >
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                      animate={{ x: ["-100%", "100%"] }}
                                      transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "linear",
                                        delay: skillIndex * 0.2,
                                      }}
                                    />
                                  </motion.div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Analytics View */}
          {activeView === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Skills",
                    value: stats.totalSkills,
                    icon: Code,
                    color: "from-cyan-400 to-blue-500",
                    description: "Technologies mastered",
                  },
                  {
                    label: "Avg Proficiency",
                    value: `${stats.avgProficiency}%`,
                    icon: TrendingUp,
                    color: "from-green-400 to-emerald-500",
                    description: "Overall skill level",
                  },
                  {
                    label: "Expert Level",
                    value: stats.topSkills,
                    icon: Star,
                    color: "from-purple-400 to-pink-500",
                    description: "Skills above 85%",
                  },
                  {
                    label: "Categories",
                    value: stats.categories,
                    icon: Layers,
                    color: "from-orange-400 to-red-500",
                    description: "Skill categories",
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
                            animatedStats
                              ? {
                                  rotate: [0, 360],
                                  scale: [1, 1.1, 1],
                                }
                              : {}
                          }
                          transition={{
                            rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 },
                          }}
                        >
                          <stat.icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <motion.div
                          className="text-4xl font-bold mb-2"
                          animate={
                            animatedStats
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
              </div>

              {/* Skill Distribution Chart */}
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <PieChart className="w-6 h-6 text-purple-400" />
                    Skill Distribution by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skillsByCategory).map(([category, skills], index) => {
                      const percentage = Math.round((skills.length / stats.totalSkills) * 100)
                      const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code

                      return (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <motion.div
                            className={`w-12 h-12 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-xl flex items-center justify-center`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </motion.div>

                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium capitalize">{category}</span>
                              <span className="text-sm text-cyan-400">{percentage}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <motion.div
                                className={`bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} h-2 rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{skills.length} skills</div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Platforms View */}
          {activeView === "platforms" && (
            <motion.div
              key="platforms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {platformStats.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm h-full overflow-hidden hover:border-white/30 transition-all duration-300">
                    <div className={`h-1 bg-gradient-to-r ${platform.color}`} />

                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center text-2xl`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            {platform.icon}
                          </motion.div>
                          <div>
                            <CardTitle className="text-2xl group-hover:text-cyan-400 transition-colors">
                              {platform.name}
                            </CardTitle>
                            <p className="text-gray-400 text-sm">Coding Platform</p>
                          </div>
                        </div>

                        <Link href={platform.url} target="_blank">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              className={`bg-gradient-to-r ${platform.color} text-white hover:opacity-90`}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Profile
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {platform.stats.map((stat, statIndex) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 + statIndex * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <motion.div
                              className="flex items-center justify-center gap-1 mb-1"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: statIndex * 0.3,
                              }}
                            >
                              <stat.icon className="w-4 h-4 text-cyan-400" />
                              <span className="text-xl font-bold text-cyan-400">{stat.value}</span>
                            </motion.div>
                            <p className="text-gray-400 text-xs">{stat.label}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-300">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {platform.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.2 + skillIndex * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge
                                variant="secondary"
                                className={`bg-gradient-to-r ${platform.color} text-black text-xs`}
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
