"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success
      setSubmitStatus("success")
      setFormState({ name: "", email: "", message: "" })

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      setSubmitStatus("error")

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`bg-white/5 border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20 ${
              errors.name ? "border-red-500" : ""
            }`}
            disabled={isSubmitting || submitStatus === "success"}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={`bg-white/5 border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20 ${
              errors.email ? "border-red-500" : ""
            }`}
            disabled={isSubmitting || submitStatus === "success"}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            placeholder="Your message..."
            rows={5}
            className={`bg-white/5 border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20 ${
              errors.message ? "border-red-500" : ""
            }`}
            disabled={isSubmitting || submitStatus === "success"}
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.message}
            </motion.p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400 relative overflow-hidden group"
          disabled={isSubmitting || submitStatus === "success"}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isSubmitting ? "100%" : "-100%" }}
            transition={{ duration: 1, repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0 }}
          />

          {submitStatus === "idle" && (
            <>
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </>
          )}

          {submitStatus === "success" && (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Message Sent!
            </>
          )}

          {submitStatus === "error" && (
            <>
              <AlertCircle className="w-4 h-4 mr-2" />
              Failed to Send
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
