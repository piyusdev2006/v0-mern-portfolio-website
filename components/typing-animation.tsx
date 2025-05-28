"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingAnimationProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
  className?: string
}

export const TypingAnimation = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1000,
  className = "",
}: TypingAnimationProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isBlinking, setIsBlinking] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentFullText = texts[currentTextIndex]

        if (!isDeleting) {
          // Typing
          if (currentText.length < currentFullText.length) {
            setCurrentText(currentFullText.substring(0, currentText.length + 1))
            setIsBlinking(false)
          } else {
            // Finished typing
            setIsBlinking(true)
            setTimeout(() => {
              setIsDeleting(true)
              setIsBlinking(false)
            }, delayBetweenTexts)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1))
            setIsBlinking(false)
          } else {
            // Finished deleting
            setIsDeleting(false)
            setIsBlinking(true)
            setCurrentTextIndex((currentTextIndex + 1) % texts.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, delayBetweenTexts])

  return (
    <span className={`inline-flex items-center ${className}`}>
      {currentText}
      <motion.span
        animate={{ opacity: isBlinking ? [1, 0, 1] : 1 }}
        transition={{ duration: 0.8, repeat: isBlinking ? Number.POSITIVE_INFINITY : 0 }}
        className="ml-1 inline-block w-[3px] h-[1em] bg-cyan-400"
      />
    </span>
  )
}
