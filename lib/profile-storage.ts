import type { ProfileData } from "@/types/profile"

const STORAGE_KEY = "portfolio-profile-data"

// Default profile data
export const defaultProfileData: ProfileData = {
  personalInfo: {
    name: "Naveen Singh",
    email: "navinit25@gmail.com",
    phone: "+91 XXXXXXXXXX",
    bio: "A passionate full-stack developer crafting scalable web applications with modern technologies. Specialized in MERN stack development.",
    location: "India",
    title: "Full Stack Developer",
    githubUsername: "piyusdev2006",
    linkedinUsername: "ns51",
    leetcodeUsername: "Navi_2006",
  },
  skills: [
    { id: "1", name: "JavaScript", category: "languages", proficiency: 90 },
    { id: "2", name: "C++", category: "languages", proficiency: 85 },
    { id: "3", name: "HTML", category: "frontend", proficiency: 95 },
    { id: "4", name: "CSS", category: "frontend", proficiency: 90 },
    { id: "5", name: "Tailwind CSS", category: "frontend", proficiency: 88 },
    { id: "6", name: "React.js", category: "frontend", proficiency: 85 },
    { id: "7", name: "Express.js", category: "backend", proficiency: 80 },
    { id: "8", name: "Node.js", category: "backend", proficiency: 82 },
    { id: "9", name: "MongoDB", category: "databases", proficiency: 78 },
    { id: "10", name: "MySQL", category: "databases", proficiency: 75 },
    { id: "11", name: "Postman", category: "tools", proficiency: 85 },
    { id: "12", name: "Git", category: "tools", proficiency: 88 },
    { id: "13", name: "GitHub", category: "tools", proficiency: 90 },
    { id: "14", name: "VS Code", category: "tools", proficiency: 95 },
  ],
  projects: [
    {
      id: "1",
      title: "DevTinder",
      description:
        "A developer networking backend using Node.js, Express.js, and MongoDB with secure JWT authentication and RESTful APIs.",
      longDescription:
        "DevTinder is a comprehensive backend solution for developer networking, built with modern technologies and best practices. It features secure user authentication, profile management, and social connection capabilities.",
      tech: ["Express.js", "MongoDB", "Node.js", "JWT"],
      date: "April 2025",
      features: ["User Authentication", "Profile Management", "Social Connections", "JWT Security"],
      status: "Production Ready",
      category: "Backend",
      githubUrl: "https://github.com/piyusdev2006/devtinder",
    },
    {
      id: "2",
      title: "Chat Application",
      description:
        "Real-time messaging app built with MERN stack and Socket.io, featuring live user status and instant messaging.",
      longDescription:
        "A full-stack real-time chat application that demonstrates modern web development practices with real-time communication capabilities.",
      tech: ["React.js", "Express.js", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      date: "April 2024",
      features: ["Real-time Messaging", "JWT Authentication", "Live User Status", "Responsive UI"],
      status: "Live Demo",
      category: "Full Stack",
      githubUrl: "https://github.com/piyusdev2006/chat-app",
    },
    {
      id: "3",
      title: "Voting System",
      description:
        "Secure backend voting system with Aadhar registration, single-vote casting, and comprehensive admin features.",
      longDescription:
        "A secure and scalable voting system backend that ensures election integrity with advanced security measures and administrative controls.",
      tech: ["Express.js", "MongoDB", "Node.js"],
      date: "Dec 2024",
      features: ["Secure Authentication", "Admin Panel", "Vote Management", "Real-time Data"],
      status: "Open Source",
      category: "Backend",
      githubUrl: "https://github.com/piyusdev2006/voting-system",
    },
  ],
  experience: [],
  education: [],
  certifications: [
    { id: "1", name: "Google AI Study Jam Program", issuer: "Google", date: "2024" },
    { id: "2", name: "JavaScript Mastery - Namaste JavaScript", issuer: "Namaste Dev", date: "2024" },
    { id: "3", name: "API Fundamentals", issuer: "Postman", date: "2024" },
    { id: "4", name: "GitHub Foundation", issuer: "GitHub", date: "2024" },
  ],
  achievements: [
    {
      id: "1",
      title: "GSSoC Contributor",
      description: "Ranked 937th in GSSoC for open source contributions",
      date: "2024",
      category: "Open Source",
    },
    {
      id: "2",
      title: "Google Cloud Facilitator",
      description: "Google Cloud Arcade Facilitator and Gen AI Study Jam Program",
      date: "2024",
      category: "Community",
    },
    {
      id: "3",
      title: "Open Source Contributor",
      description: "Hacktoberfest and DevFest AI open source contributions",
      date: "2024",
      category: "Open Source",
    },
  ],
  socialLinks: [
    { id: "1", platform: "GitHub", url: "https://github.com/piyusdev2006", username: "piyusdev2006", icon: "Github" },
    { id: "2", platform: "LinkedIn", url: "https://www.linkedin.com/in/ns51/", username: "ns51", icon: "Linkedin" },
    { id: "3", platform: "Email", url: "mailto:navinit25@gmail.com", username: "navinit25@gmail.com", icon: "Mail" },
    { id: "4", platform: "LeetCode", url: "https://leetcode.com/u/Navi_2006/", username: "Navi_2006", icon: "Code" },
  ],
  lastUpdated: new Date().toISOString(),
}

export const saveProfileData = (data: ProfileData): void => {
  try {
    const updatedData = { ...data, lastUpdated: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
  } catch (error) {
    console.error("Error saving profile data:", error)
  }
}

export const loadProfileData = (): ProfileData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Merge with default data to ensure all fields exist
      return { ...defaultProfileData, ...parsed }
    }
  } catch (error) {
    console.error("Error loading profile data:", error)
  }
  return defaultProfileData
}

export const resetProfileData = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}
