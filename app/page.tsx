"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  User,
  Download,
  ArrowRight,
  Terminal,
  Star,
  ChevronDown,
  Sparkles,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { LinearBackground } from "@/components/linear-background"
import { ParticleSystem } from "@/components/particle-system"
import { TypingAnimation } from "@/components/typing-animation"
import { MobileMenu } from "@/components/mobile-menu"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ContactForm } from "@/components/contact-form"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const scaleOnHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: { scale: 0.95 },
}

const skills = {
  languages: ["JavaScript", "C++"],
  frontend: ["HTML", "CSS", "Tailwind CSS", "React.js"],
  backend: ["Express.js", "Node.js", "MongoDB", "MySQL"],
  tools: ["Postman", "Git", "GitHub", "VS Code"],
}

const projects = [
  {
    title: "DevTinder",
    description:
      "A developer networking backend using Node.js, Express.js, and MongoDB with secure JWT authentication and RESTful APIs.",
    tech: ["Express.js", "MongoDB", "Node.js"],
    date: "April 2025",
    features: ["User Authentication", "Profile Management", "Social Connections", "JWT Security"],
    status: "Production Ready",
  },
  {
    title: "Chat Application",
    description:
      "Real-time messaging app built with MERN stack and Socket.io, featuring live user status and instant messaging.",
    tech: ["React.js", "Express.js", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    date: "April 2024",
    features: ["Real-time Messaging", "JWT Authentication", "Live User Status", "Responsive UI"],
    status: "Live Demo",
  },
  {
    title: "Voting System",
    description:
      "Secure backend voting system with Aadhar registration, single-vote casting, and comprehensive admin features.",
    tech: ["Express.js", "MongoDB", "Node.js"],
    date: "Dec 2024",
    features: ["Secure Authentication", "Admin Panel", "Vote Management", "Real-time Data"],
    status: "Open Source",
  },
]

const certifications = [
  "Google AI Study Jam Program - Active Participation",
  "JavaScript Mastery - Namaste JavaScript",
  "GSSoC Open Source Contributions",
  "API Fundamentals - Postman Certified",
  "GitHub Foundation Certified",
]

const achievements = [
  "Ranked 937th in GSSoC for open source contributions",
  "Google Cloud Arcade Facilitator and Gen AI Study Jam Program",
  "Hacktoberfest and DevFest AI open source contributions",
]

export default function Portfolio() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const { scrollYProgress } = useScroll()
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  // Navigation links for mobile menu
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  // Optimized scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollThreshold = 100

    setIsScrollingDown((prevIsScrollingDown) => {
      const shouldBeScrollingDown = currentScrollY > scrollThreshold
      return shouldBeScrollingDown !== prevIsScrollingDown ? shouldBeScrollingDown : prevIsScrollingDown
    })
  }, [])

  useEffect(() => {
    const fetchGithubProfile = async () => {
      try {
        const response = await fetch("https://api.github.com/users/piyusdev2006")
        if (response.ok) {
          const data = await response.json()
          setProfileImage(data.avatar_url)
        }
      } catch (error) {
        console.error("Error fetching GitHub profile:", error)
      }
    }

    fetchGithubProfile()
  }, [])

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false

    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScrollHandler, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler)
    }
  }, [handleScroll])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Linear-inspired Background */}
      <LinearBackground />

      {/* Particle System */}
      <ParticleSystem />

      {/* Navigation - Fixed and thinner */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-black/30 border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <motion.div
              className="w-7 h-7 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-black font-bold text-xs">NS</span>
            </motion.div>
            <span className="text-lg font-bold">Naveen Singh</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors relative group text-sm"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.div {...scaleOnHover} className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-xs px-3 py-1"
              >
                <Download className="w-3 h-3 mr-1" />
                Resume
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Adjusted for thinner header */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 z-10 pt-16">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-12 relative z-[100] mt-16"
          >
            <div className="relative w-40 h-40 mx-auto mb-8">
              {/* Animated rings around profile */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-blue-400/20"
                animate={{ rotate: -360, scale: [1, 0.9, 1] }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Profile image container */}
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative z-[100]">
                  {profileImage ? (
                    <Image
                      src={profileImage || "/placeholder.svg"}
                      alt="Naveen Singh"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
              </motion.div>

              {/* Floating status indicator */}
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center border-2 border-black z-[100]"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.7)",
                    "0 0 0 10px rgba(34, 197, 94, 0)",
                    "0 0 0 0 rgba(34, 197, 94, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="w-4 h-4 text-black" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Make it
              </motion.span>
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <TypingAnimation
                  texts={["work", "happen", "scale", "shine"]}
                  typingSpeed={150}
                  deletingSpeed={100}
                  delayBetweenTexts={2000}
                />
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                with code.
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            A passionate full-stack developer crafting scalable web applications with modern technologies. Specialized
            in MERN stack development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.div {...scaleOnHover}>
              <Link href="#contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400 px-8 py-4 text-lg font-semibold relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <div className="flex items-center gap-4">
              <motion.div {...scaleOnHover}>
                <Link href="https://github.com/piyusdev2006" target="_blank">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/5 hover:bg-white/10">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </Link>
              </motion.div>
              <motion.div {...scaleOnHover}>
                <Link href="https://www.linkedin.com/in/ns51/" target="_blank">
                  <Button variant="outline" size="lg" className="border-white/20 bg-white/5 hover:bg-white/10">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 relative overflow-hidden group"
          >
            <Terminal className="w-5 h-5 text-cyan-400" />
            <code className="text-gray-300 font-mono">npm install naveen-skills</code>
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-5 bg-cyan-400"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="py-32 px-6 relative z-10">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6">Tech Arsenal</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Cutting-edge technologies I use to bring ideas to life
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { name: "React.js", icon: "⚛️", category: "Frontend", color: "from-blue-400 to-cyan-400" },
              { name: "Node.js", icon: "🟢", category: "Backend", color: "from-green-400 to-emerald-400" },
              { name: "MongoDB", icon: "🍃", category: "Database", color: "from-green-500 to-teal-500" },
              { name: "Express.js", icon: "🚀", category: "Framework", color: "from-gray-400 to-gray-600" },
              { name: "JavaScript", icon: "💛", category: "Language", color: "from-cyan-400 to-blue-400" },
              { name: "Tailwind", icon: "🎨", category: "Styling", color: "from-cyan-400 to-blue-500" },
              { name: "Git", icon: "📝", category: "Version Control", color: "from-orange-400 to-red-400" },
              { name: "VS Code", icon: "💙", category: "Editor", color: "from-blue-500 to-purple-500" },
            ].map((tech, index) => (
              <ScrollReveal key={tech.name} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.2 },
                  }}
                  className="group"
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <CardContent className="p-6 text-center relative z-10">
                      <motion.div
                        className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {tech.icon}
                      </motion.div>
                      <h3 className="font-semibold text-lg mb-2">{tech.name}</h3>
                      <p className="text-sm text-gray-400">{tech.category}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6">Featured Work</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Projects that showcase my passion for creating exceptional digital experiences
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }} className="group">
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm h-full overflow-hidden">
                    <div className="relative">
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
                          {project.status}
                        </Badge>
                      </div>
                      <div className="h-48 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8 }}
                        />
                        <div className="absolute bottom-4 left-4">
                          <div className="flex gap-2">
                            {project.tech.slice(0, 3).map((tech, idx) => (
                              <motion.span
                                key={idx}
                                className="text-xs bg-black/50 px-2 py-1 rounded"
                                whileHover={{ scale: 1.1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </CardTitle>
                        <span className="text-sm text-gray-400">{project.date}</span>
                      </div>
                      <CardDescription className="text-gray-300 text-base leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3 text-cyan-400">Key Features</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {project.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-center gap-2 text-sm text-gray-300"
                                whileHover={{ x: 5 }}
                              >
                                <Star className="w-3 h-3 text-cyan-400 fill-current" />
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <motion.div {...scaleOnHover} className="flex-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-white/20 bg-white/5 hover:bg-white/10"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </Button>
                          </motion.div>
                          <motion.div {...scaleOnHover} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6">Expertise</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A comprehensive skill set spanning the full development lifecycle
              </p>
            </div>
          </ScrollReveal>

          {/* LeetCode and GitHub Stats - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* LeetCode Profile Card */}
            <ScrollReveal direction="left">
              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 backdrop-blur-sm h-full">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Code className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl text-orange-400">LeetCode</CardTitle>
                      <p className="text-gray-400 text-sm">Problem Solving</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-xl font-bold text-yellow-400">16</span>
                      </div>
                      <p className="text-gray-400 text-sm">Solved</p>
                    </motion.div>

                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-xl font-bold text-blue-400">3.6M</span>
                      </div>
                      <p className="text-gray-400 text-sm">Rank</p>
                    </motion.div>

                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-xl font-bold text-purple-400">21</span>
                      </div>
                      <p className="text-gray-400 text-sm">Submissions</p>
                    </motion.div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-400">Easy: 14</span>
                      <span className="text-yellow-400">Medium: 2</span>
                      <span className="text-red-400">Hard: 0</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-orange-400 text-sm">Skills</h4>
                    <div className="flex gap-2 flex-wrap">
                      {["Game Theory", "Dynamic Programming"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <motion.div className="text-center" {...scaleOnHover}>
                    <Link href="https://leetcode.com/u/Navi_2006/" target="_blank">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm w-full">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* GitHub Stats Card */}
            <ScrollReveal direction="right">
              <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm h-full">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Github className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl text-purple-400">GitHub</CardTitle>
                      <p className="text-gray-400 text-sm">Open Source</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Code className="w-4 h-4 text-green-400" />
                        <span className="text-xl font-bold text-green-400">15+</span>
                      </div>
                      <p className="text-gray-400 text-sm">Repos</p>
                    </motion.div>

                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-xl font-bold text-yellow-400">25+</span>
                      </div>
                      <p className="text-gray-400 text-sm">Stars</p>
                    </motion.div>

                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-xl font-bold text-blue-400">200+</span>
                      </div>
                      <p className="text-gray-400 text-sm">Contributions</p>
                    </motion.div>

                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-orange-400" />
                        <span className="text-xl font-bold text-orange-400">5+</span>
                      </div>
                      <p className="text-gray-400 text-sm">Languages</p>
                    </motion.div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-purple-400 text-sm">Top Languages</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "JavaScript", percentage: 45 },
                        { name: "C++", percentage: 25 },
                        { name: "HTML", percentage: 15 },
                        { name: "CSS", percentage: 15 },
                      ].map((lang, index) => (
                        <motion.div
                          key={lang.name}
                          className="bg-white/5 p-2 rounded text-center"
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="text-xs font-medium mb-1">{lang.name}</div>
                          <div className="text-xs text-gray-400">{lang.percentage}%</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div className="text-center" {...scaleOnHover}>
                    <Link href="https://github.com/piyusdev2006" target="_blank">
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 text-sm w-full">
                        <Github className="w-3 h-3 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Skills Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: "Languages", skills: skills.languages, color: "from-red-500 to-orange-500" },
              { title: "Frontend", skills: skills.frontend, color: "from-cyan-500 to-blue-500" },
              { title: "Backend", skills: skills.backend, color: "from-green-500 to-emerald-500" },
              { title: "Tools", skills: skills.tools, color: "from-purple-500 to-pink-500" },
            ].map((category, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm h-full group">
                  <CardHeader className="text-center">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Code className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ x: 5, scale: 1.02 }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <motion.div
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: idx * 0.2 }}
                          />
                          <span className="text-gray-300">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6">Recognition</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Certifications and achievements that validate my expertise
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <ScrollReveal direction="left">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Star className="w-6 h-6 text-cyan-400" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 10 }}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                      >
                        <motion.div
                          className="w-3 h-3 bg-cyan-400 rounded-full mt-2 group-hover:scale-125 transition-transform"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors">{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Trophy className="w-6 h-6 text-cyan-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 10 }}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                      >
                        <motion.div
                          className="w-3 h-3 bg-blue-400 rounded-full mt-2 group-hover:scale-125 transition-transform"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-8">Let's Build Something Amazing</h2>
              <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
                Ready to turn your ideas into reality? Let's collaborate and create something extraordinary together.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <div>
                <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6">Get in touch</h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "navinit25@gmail.com",
                      href: "mailto:navinit25@gmail.com",
                      color: "from-cyan-400 to-blue-500",
                    },
                    {
                      icon: Github,
                      label: "GitHub",
                      value: "piyusdev2006",
                      href: "https://github.com/piyusdev2006",
                      color: "from-purple-400 to-pink-500",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      value: "ns51",
                      href: "https://www.linkedin.com/in/ns51/",
                      color: "from-blue-400 to-indigo-500",
                    },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${contact.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <contact.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-lg">{contact.label}</h4>
                        <Link
                          href={contact.href}
                          target="_blank"
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          {contact.value}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="pt-8"
                >
                  <p className="text-gray-400 leading-relaxed">
                    I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                    technology and development. Feel free to reach out!
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-black font-bold text-sm">NS</span>
              </motion.div>
              <span className="text-gray-400">© 2024 Naveen Singh. Crafted with passion.</span>
            </div>

            <div className="flex items-center gap-6">
              {[
                { icon: Github, href: "https://github.com/piyusdev2006" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/ns51/" },
                { icon: Mail, href: "mailto:navinit25@gmail.com" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ scale: 1.2, y: -2 }}>
                  <Link
                    href={social.href}
                    target="_blank"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-[101] origin-left"
        style={{ scaleX: pathLength }}
      />
    </div>
  )
}
