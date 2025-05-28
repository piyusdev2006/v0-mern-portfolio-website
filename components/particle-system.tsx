"use client"

import { useRef, useEffect } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

export const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const isMouseMoving = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const particles: Particle[] = []
    let animationId: number

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      isMouseMoving.current = true

      // Add particles on mouse move
      for (let i = 0; i < 2; i++) {
        createParticle(e.clientX, e.clientY)
      }

      // Reset mouse moving after a delay
      let mouseTimeout: NodeJS.Timeout
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        isMouseMoving.current = false
      }, 100)
    }

    const createParticle = (x: number, y: number) => {
      const colors = [
        "rgba(0, 210, 255, 0.8)", // Cyan
        "rgba(0, 120, 255, 0.8)", // Blue
        "rgba(120, 0, 255, 0.8)", // Purple
        "rgba(200, 0, 255, 0.8)", // Magenta
        "rgba(255, 255, 255, 0.8)", // White
      ]

      const particle: Particle = {
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.8,
        life: 0,
        maxLife: Math.random() * 60 + 20,
      }

      particles.push(particle)
    }

    const createRandomParticle = () => {
      // Create particles randomly across the screen
      if (Math.random() < 0.03) {
        const x = Math.random() * width
        const y = Math.random() * height
        createParticle(x, y)
      }
    }

    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.life++
        p.opacity = 1 - p.life / p.maxLife

        p.x += p.speedX
        p.y += p.speedY

        // Slow down
        p.speedX *= 0.99
        p.speedY *= 0.99

        // Fade out
        p.size *= 0.97

        // Remove dead particles
        if (p.life >= p.maxLife || p.size < 0.1) {
          particles.splice(i, 1)
          i--
        }
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections between nearby particles
      ctx.globalAlpha = 0.2
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.globalAlpha = 0.2 * (1 - distance / 100)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
    }

    const animate = () => {
      createRandomParticle()
      updateParticles()
      drawParticles()
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" />
}
