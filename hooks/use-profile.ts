"use client"

import { useState, useEffect, useCallback } from "react"
import type {
  ProfileData,
  PersonalInfo,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  Achievement,
  SocialLink,
} from "@/types/profile"
import { loadProfileData, saveProfileData, defaultProfileData } from "@/lib/profile-storage"

export const useProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData)
  const [isLoading, setIsLoading] = useState(true)

  // Load data on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const data = loadProfileData()
        setProfileData(data)
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Save data whenever profileData changes
  useEffect(() => {
    if (!isLoading) {
      saveProfileData(profileData)
    }
  }, [profileData, isLoading])

  // Personal Info
  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setProfileData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }))
  }, [])

  // Skills
  const addSkill = useCallback((skill: Omit<Skill, "id">) => {
    const newSkill: Skill = { ...skill, id: Date.now().toString() }
    setProfileData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }, [])

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill)),
    }))
  }, [])

  const removeSkill = useCallback((id: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }, [])

  // Projects
  const addProject = useCallback((project: Omit<Project, "id">) => {
    const newProject: Project = { ...project, id: Date.now().toString() }
    setProfileData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }, [])

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProfileData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => (project.id === id ? { ...project, ...updates } : project)),
    }))
  }, [])

  const removeProject = useCallback((id: string) => {
    setProfileData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }))
  }, [])

  // Experience
  const addExperience = useCallback((experience: Omit<Experience, "id">) => {
    const newExperience: Experience = { ...experience, id: Date.now().toString() }
    setProfileData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }))
  }, [])

  const updateExperience = useCallback((id: string, updates: Partial<Experience>) => {
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    }))
  }, [])

  const removeExperience = useCallback((id: string) => {
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }, [])

  // Education
  const addEducation = useCallback((education: Omit<Education, "id">) => {
    const newEducation: Education = { ...education, id: Date.now().toString() }
    setProfileData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }, [])

  const updateEducation = useCallback((id: string, updates: Partial<Education>) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
    }))
  }, [])

  const removeEducation = useCallback((id: string) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }, [])

  // Certifications
  const addCertification = useCallback((certification: Omit<Certification, "id">) => {
    const newCertification: Certification = { ...certification, id: Date.now().toString() }
    setProfileData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCertification],
    }))
  }, [])

  const updateCertification = useCallback((id: string, updates: Partial<Certification>) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert)),
    }))
  }, [])

  const removeCertification = useCallback((id: string) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }))
  }, [])

  // Achievements
  const addAchievement = useCallback((achievement: Omit<Achievement, "id">) => {
    const newAchievement: Achievement = { ...achievement, id: Date.now().toString() }
    setProfileData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement],
    }))
  }, [])

  const updateAchievement = useCallback((id: string, updates: Partial<Achievement>) => {
    setProfileData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((achievement) =>
        achievement.id === id ? { ...achievement, ...updates } : achievement,
      ),
    }))
  }, [])

  const removeAchievement = useCallback((id: string) => {
    setProfileData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((achievement) => achievement.id !== id),
    }))
  }, [])

  // Social Links
  const addSocialLink = useCallback((socialLink: Omit<SocialLink, "id">) => {
    const newSocialLink: SocialLink = { ...socialLink, id: Date.now().toString() }
    setProfileData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newSocialLink],
    }))
  }, [])

  const updateSocialLink = useCallback((id: string, updates: Partial<SocialLink>) => {
    setProfileData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) => (link.id === id ? { ...link, ...updates } : link)),
    }))
  }, [])

  const removeSocialLink = useCallback((id: string) => {
    setProfileData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }))
  }, [])

  return {
    profileData,
    isLoading,
    // Personal Info
    updatePersonalInfo,
    // Skills
    addSkill,
    updateSkill,
    removeSkill,
    // Projects
    addProject,
    updateProject,
    removeProject,
    // Experience
    addExperience,
    updateExperience,
    removeExperience,
    // Education
    addEducation,
    updateEducation,
    removeEducation,
    // Certifications
    addCertification,
    updateCertification,
    removeCertification,
    // Achievements
    addAchievement,
    updateAchievement,
    removeAchievement,
    // Social Links
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
  }
}
