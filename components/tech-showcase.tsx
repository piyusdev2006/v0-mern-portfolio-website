"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  Code,
  Zap,
  Sparkles,
  Star,
  TrendingUp,
  Filter,
  Search,
  Layers,
  Database,
  Globe,
  Terminal,
  Palette,
  Settings,
} from "lucide-react"

interface TechItem {
  name: string
  icon: string
  category: string
  color: string
  description: string
  proficiency: number
  yearsOfExperience: number
  projects: number
}

const techStack: TechItem[] = [
  {
    name: "React.js",
    icon: "⚛️",
    category: "Frontend",
    color: "from-blue-400 to-cyan-400",
    description: "Building interactive UIs with hooks and modern patterns",
    proficiency: 90,
    yearsOfExperience: 2,
    projects: 8,
  },
  {
    name: "Node.js",
    icon: "🟢",
    category: "Backend",
    color: "from-green-400 to-emerald-400",
    description: "Server-side JavaScript with Express and APIs",
    proficiency: 85,
    yearsOfExperience: 2,
    projects: 6,
  },
  {
    name: "MongoDB",
    icon: "🍃",
    category: "Database",
    color: "from-green-500 to-teal-500",
    description: "NoSQL database design and optimization",
    proficiency: 80,
    yearsOfExperience: 1.5,
    projects: 5,
  },
  {
    name: "Express.js",
    icon: "🚀",
    category: "Framework",
    color: "from-gray-400 to-gray-600",
    description: "Fast, unopinionated web framework for Node.js",
    proficiency: 88,
    yearsOfExperience: 2,
    projects: 7,
  },
  {
    name: "JavaScript",
    icon: "💛",
    category: "Language",
    color: "from-yellow-400 to-orange-400",
    description: "Modern ES6+ features and async programming",
    proficiency: 92,
    yearsOfExperience: 3,
    projects: 12,
  },
  {
    name: "TypeScript",
    icon: "🔷",
    category: "Language",
    color: "from-blue-500 to-indigo-500",
    description: "Type-safe JavaScript for scalable applications",
    proficiency: 85,
    yearsOfExperience: 1,
    projects: 4,
  },
  {
    name: "Tailwind CSS",
    icon: "🎨",
    category: "Styling",
    color: "from-cyan-400 to-blue-500",
    description: "Utility-first CSS framework for rapid UI development",
    proficiency: 95,
    yearsOfExperience: 2,
    projects: 10,
  },
  {
    name: "Git",
    icon: "📝",
    category: "Tools",
    color: "from-orange-400 to-red-400",
    description: "Version control and collaborative development",
    proficiency: 90,
    yearsOfExperience: 3,
    projects: 15,
  },
  {
    name: "VS Code",
    icon: "💙",
    category: "Tools",
    color: "from-blue-500 to-purple-500",
    description: "Primary development environment with extensions",
    proficiency: 95,
    yearsOfExperience: 3,
    projects: 15,
  },
  {
    name: "Next.js",
    icon: "▲",
    category: "Framework",
    color: "from-black to-gray-700",
    description: "Full-stack React framework with SSR and SSG",
    proficiency: 82,
    yearsOfExperience: 1,
    projects: 3,
  },
  {
    name: "MySQL",
    icon: "🐬",
    category: "Database",
    color: "from-blue-600 to-blue-800",
    description: "Relational database management and queries",
    proficiency: 75,
    yearsOfExperience: 1,
    projects: 3,
  },
  {
    name: "Postman",
    icon: "📮",
    category: "Tools",
    color: "from-orange-500 to-red-500",
    description: "API testing and development workflow",
    proficiency: 88,
    yearsOfExperience: 2,
    projects: 8,
  },
]

const categories = ["All", "Frontend", "Backend", "Database", "Language", "Framework", "Styling", "Tools"]

const categoryIcons = {
  Frontend: Globe,
  Backend: Terminal,
  Database: Database,
  Language: Code,
  Framework: Layers,
  Styling: Palette,
  Tools: Settings,
}

export const TechShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("proficiency")
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [showStats, setShowStats] = useState(false)

  const filteredTech = techStack
    .filter(
      (tech) =>
        (selectedCategory === "All" || tech.category === selectedCategory) &&
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "proficiency":
          return b.proficiency - a.proficiency
        case "experience":
          return b.yearsOfExperience - a.yearsOfExperience
        case "projects":
          return b.projects - a.projects
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const stats = {
    totalTech: techStack.length,
    avgProficiency: Math.round(techStack.reduce((acc, tech) => acc + tech.proficiency, 0) / techStack.length),
    totalProjects: techStack.reduce((acc, tech) => acc + tech.projects, 0),
    totalExperience: Math.max(...techStack.map((tech) => tech.yearsOfExperience)),
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="tech-showcase" className="py-32 px-6 relative z-10">
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
                className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Tech Mastery Hub
              </h2>
            </motion.div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cutting-edge technologies I wield to craft exceptional digital experiences
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Stats Dashboard */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {[
                { label: "Technologies", value: stats.totalTech, icon: Code, color: "from-cyan-400 to-blue-500" },
                {
                  label: "Avg Proficiency",
                  value: `${stats.avgProficiency}%`,
                  icon: TrendingUp,
                  color: "from-green-400 to-emerald-500",
                },
                {
                  label: "Projects Built",
                  value: stats.totalProjects,
                  icon: Star,
                  color: "from-purple-400 to-pink-500",
                },
                {
                  label: "Years Experience",
                  value: `${stats.totalExperience}+`,
                  icon: Sparkles,
                  color: "from-orange-400 to-red-500",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm overflow-hidden">
                    <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
                    <CardContent className="p-6 text-center relative">
                      <motion.div
                        className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.div
                        className="text-3xl font-bold mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {stat.value}
                      </motion.div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Filters and Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const IconComponent = category !== "All" ? categoryIcons[category as keyof typeof categoryIcons] : Filter
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-400/25"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {category}
                  <Badge variant="secondary" className="ml-1 bg-black/20 text-xs">
                    {category === "All" ? techStack.length : techStack.filter((t) => t.category === category).length}
                  </Badge>
                </motion.button>
              )
            })}
          </div>

          {/* Sort Options */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
              <span className="text-sm text-gray-400 px-3">Sort by:</span>
              {[
                { value: "proficiency", label: "Proficiency" },
                { value: "experience", label: "Experience" },
                { value: "projects", label: "Projects" },
                { value: "name", label: "Name" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                    sortBy === option.value ? "bg-cyan-400 text-black" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tech Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredTech.map((tech, index) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
                className="group relative"
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm h-full overflow-hidden hover:border-white/40 transition-all duration-300">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    animate={hoveredTech === tech.name ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />

                  {/* Proficiency indicator */}
                  <div className={`h-1 bg-gradient-to-r ${tech.color}`} />

                  <CardContent className="p-6 relative z-10">
                    {/* Tech Icon and Name */}
                    <div className="text-center mb-4">
                      <motion.div
                        className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300"
                        animate={
                          hoveredTech === tech.name
                            ? {
                                rotate: [0, -10, 10, 0],
                                scale: [1, 1.1, 1],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {tech.icon}
                      </motion.div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-cyan-400 transition-colors">
                        {tech.name}
                      </h3>
                      <Badge variant="secondary" className={`bg-gradient-to-r ${tech.color} text-black text-xs`}>
                        {tech.category}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">{tech.description}</p>

                    {/* Stats */}
                    <div className="space-y-3">
                      {/* Proficiency Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Proficiency</span>
                          <span className="text-cyan-400 font-medium">{tech.proficiency}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <motion.div
                            className={`bg-gradient-to-r ${tech.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${tech.proficiency}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Additional Stats */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="text-center p-2 bg-white/5 rounded-lg">
                          <div className="font-semibold text-green-400">{tech.yearsOfExperience}y</div>
                          <div className="text-gray-400">Experience</div>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded-lg">
                          <div className="font-semibold text-purple-400">{tech.projects}</div>
                          <div className="text-gray-400">Projects</div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <AnimatePresence>
                      {hoveredTech === tech.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end justify-center p-4"
                        >
                          <motion.div
                            className="flex items-center gap-2 text-white text-sm font-medium"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Sparkles className="w-4 h-4" />
                            Click to explore
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results State */}
        <AnimatePresence>
          {filteredTech.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-16"
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Search className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-gray-300">No technologies found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
