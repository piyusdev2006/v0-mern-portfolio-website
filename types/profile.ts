export interface PersonalInfo {
  name: string
  email: string
  phone: string
  bio: string
  location: string
  title: string
  githubUsername: string
  linkedinUsername: string
  leetcodeUsername: string
  profileImage?: string
  resumeUrl?: string
}

export interface Skill {
  id: string
  name: string
  category: "languages" | "frontend" | "backend" | "tools" | "databases" | "cloud"
  proficiency: number // 1-100
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tech: string[]
  date: string
  features: string[]
  status: string
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  category: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  technologies: string[]
  current: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  grade?: string
  description?: string
  current: boolean
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  username: string
  icon: string
}

export interface ProfileData {
  personalInfo: PersonalInfo
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
  achievements: Achievement[]
  socialLinks: SocialLink[]
  lastUpdated: string
}
