"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  User,
  Download,
  ArrowRight,
  Terminal,
  Star,
  ChevronDown,
  Sparkles,
  Settings,
  TestTube,
  X,
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
import { ProfileManager } from "@/components/profile-manager"
import { TechShowcase } from "@/components/tech-showcase"
import { ExpertiseHub } from "@/components/expertise-hub"
import { RecognitionShowcase } from "@/components/recognition-showcase"
import { useProfile } from "@/hooks/use-profile"
import { PhotoEditorTest } from "@/components/photo-editor-test"

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

export default function Portfolio() {
  const [githubProfileImage, setGithubProfileImage] = useState<string | null>(null)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [isProfileManagerOpen, setIsProfileManagerOpen] = useState(false)
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })
  const { profileData, isLoading } = useProfile()

  // Create a simplified profile object for easier access
  const profile = {
    name: profileData.personalInfo.name,
    title: profileData.personalInfo.title,
    email: profileData.personalInfo.email,
    bio: profileData.personalInfo.bio,
    location: profileData.personalInfo.location,
    profileImage: profileData.personalInfo.profileImage,
    resumeUrl: profileData.personalInfo.resumeUrl,
    githubUsername: profileData.personalInfo.githubUsername,
    linkedinUsername: profileData.personalInfo.linkedinUsername,
    skills: profileData.skills,
    projects: profileData.projects,
  }

  // Use uploaded profile image or fallback to GitHub
  const profileImage = profile.profileImage || githubProfileImage

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
        const response = await fetch(`https://api.github.com/users/${profile.githubUsername}`)
        if (response.ok) {
          const data = await response.json()
          setGithubProfileImage(data.avatar_url)
        }
      } catch (error) {
        console.error("Error fetching GitHub profile:", error)
      }
    }

    if (profile.githubUsername && !profile.profileImage) {
      fetchGithubProfile()
    }
  }, [profile.githubUsername, profile.profileImage])

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

  const skillsByCategory = profile.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill.name)
      return acc
    },
    {} as Record<string, string[]>,
  )

  // Fixed resume download function
  const handleResumeDownload = () => {
    if (profile.resumeUrl) {
      try {
        // Create a temporary link element
        const link = document.createElement("a")
        link.href = profile.resumeUrl
        link.download = `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`
        link.target = "_blank"

        // Append to body, click, and remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error("Error downloading resume:", error)
        // Fallback: open in new tab
        window.open(profile.resumeUrl, "_blank")
      }
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Enhanced Linear-inspired Background */}
      <LinearBackground />

      {/* Enhanced Particle System */}
      <ParticleSystem />

      {/* Navigation - Enhanced with better dynamics */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl bg-black/30 border-b border-white/10"
      >
        {/* Animated nav background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-600/5" />

        <div className="container mx-auto px-6 py-3 flex justify-between items-center relative z-10">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center relative overflow-hidden"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <span className="text-black font-bold text-sm relative z-10">NS</span>
            </motion.div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors relative group text-sm font-medium"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Enhanced Resume Download Button */}
            <motion.div {...scaleOnHover} className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeDownload}
                disabled={!profile.resumeUrl}
                className={`border-white/20 bg-white/5 hover:bg-white/10 text-xs px-4 py-2 rounded-xl transition-all duration-300 ${
                  profile.resumeUrl
                    ? "hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <Download className="w-3 h-3 mr-2" />
                {profile.resumeUrl ? "Resume" : "No Resume"}
              </Button>
            </motion.div>

            {/* Enhanced Profile Manager Toggle Button */}
            <motion.div {...scaleOnHover}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsProfileManagerOpen(true)}
                className="border-white/20 bg-white/5 hover:bg-white/10 text-xs px-4 py-2 rounded-xl hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300"
              >
                <Settings className="w-3 h-3 mr-2" />
                Edit
              </Button>
            </motion.div>

            {/* Photo Editor Test Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTestPanelOpen(!isTestPanelOpen)}
                className="border-white/20 bg-white/5 hover:bg-white/10 text-xs px-4 py-2 rounded-xl hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300"
              >
                <TestTube className="w-3 h-3 mr-2" />
                Test Photo
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 z-10 pt-20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-12 relative z-[100] mt-16"
          >
            <div className="relative w-48 h-48 mx-auto mb-8">
              {/* Enhanced animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                  borderColor: ["rgba(0, 212, 255, 0.3)", "rgba(168, 85, 247, 0.3)", "rgba(0, 212, 255, 0.3)"],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                  borderColor: { duration: 6, repeat: Number.POSITIVE_INFINITY },
                }}
              />
              <motion.div
                className="absolute inset-3 rounded-full border border-blue-400/20"
                animate={{
                  rotate: -360,
                  scale: [1, 0.9, 1],
                  borderColor: ["rgba(59, 130, 246, 0.2)", "rgba(236, 72, 153, 0.2)", "rgba(59, 130, 246, 0.2)"],
                }}
                transition={{
                  rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 6, repeat: Number.POSITIVE_INFINITY },
                  borderColor: { duration: 8, repeat: Number.POSITIVE_INFINITY },
                }}
              />

              {/* Enhanced profile image container */}
              <motion.div
                className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 shadow-2xl shadow-cyan-400/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative z-[100] border-2 border-white/10">
                  {profileImage ? (
                    <motion.div
                      className="w-full h-full relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt={profile.name}
                        fill
                        className="object-cover rounded-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full" />
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center"
                    >
                      <User className="w-10 h-10 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Enhanced floating status indicator */}
              <motion.div
                className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-3 border-black z-[100] shadow-lg shadow-green-400/25"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.7)",
                    "0 0 0 15px rgba(34, 197, 94, 0)",
                    "0 0 0 0 rgba(34, 197, 94, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                whileHover={{ scale: 1.3, rotate: 360 }}
              >
                <Sparkles className="w-5 h-5 text-black" />
              </motion.div>
            </div>
          </motion.div>

          {/* Rest of the hero section remains the same */}
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
            {profile.bio}
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
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400 px-8 py-4 text-lg font-semibold relative overflow-hidden group rounded-xl shadow-lg shadow-cyan-400/25"
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
                <Link href={`https://github.com/${profile.githubUsername}`} target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/5 hover:bg-white/10 rounded-xl hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </Link>
              </motion.div>
              <motion.div {...scaleOnHover}>
                <Link href={`https://www.linkedin.com/in/${profile.linkedinUsername}`} target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/5 hover:bg-white/10 rounded-xl hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced terminal display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 relative overflow-hidden group hover:bg-white/10 transition-all duration-300"
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
              className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
              onClick={() => document.getElementById("tech-showcase")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Replace Tech Stack with Enhanced TechShowcase */}
      <TechShowcase />

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
            {profile.projects.map((project, index) => (
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
                              onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank")}
                            >
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </Button>
                          </motion.div>
                          <motion.div {...scaleOnHover} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400"
                              onClick={() => project.liveUrl && window.open(project.liveUrl, "_blank")}
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

      {/* Replace Skills Section with Enhanced ExpertiseHub */}
      <ExpertiseHub />

      {/* Replace Achievements Section with Enhanced RecognitionShowcase */}
      <RecognitionShowcase />

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
                      value: profile.email,
                      href: `mailto:${profile.email}`,
                      color: "from-cyan-400 to-blue-500",
                    },
                    {
                      icon: Github,
                      label: "GitHub",
                      value: profile.githubUsername,
                      href: `https://github.com/${profile.githubUsername}`,
                      color: "from-purple-400 to-pink-500",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      value: profile.linkedinUsername,
                      href: `https://www.linkedin.com/in/${profile.linkedinUsername}`,
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
              <span className="text-gray-400">© 2024 {profile.name}. Crafted with passion.</span>
            </div>

            <div className="flex items-center gap-6">
              {[
                { icon: Github, href: `https://github.com/${profile.githubUsername}` },
                { icon: Linkedin, href: `https://www.linkedin.com/in/${profile.linkedinUsername}` },
                { icon: Mail, href: `mailto:${profile.email}` },
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

      {/* Profile Manager */}
      <ProfileManager isOpen={isProfileManagerOpen} onClose={() => setIsProfileManagerOpen(false)} />

      {/* Photo Editor Test Panel */}
      <AnimatePresence>
        {isTestPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[250] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Photo Editor Testing Suite</h2>
                  <Button
                    onClick={() => setIsTestPanelOpen(false)}
                    variant="outline"
                    size="sm"
                    className="border-white/20 bg-white/5 hover:bg-white/10 rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <PhotoEditorTest />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
