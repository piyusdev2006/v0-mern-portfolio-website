"use client"

import { useEffect, useRef } from "react"

export const LinearBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // Create gradient mesh points - MOVED UP before any function uses it
    const points = []
    const pointCount = 12
    const colorPalette = [
      [0, 210, 255], // Cyan
      [0, 120, 255], // Blue
      [120, 0, 255], // Purple
      [200, 0, 255], // Magenta
    ]

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 300 + 100,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        xVelocity: (Math.random() - 0.5) * 0.3,
        yVelocity: (Math.random() - 0.5) * 0.3,
      })
    }

    function draw() {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Update point positions
      points.forEach((point) => {
        point.x += point.xVelocity
        point.y += point.yVelocity

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.xVelocity *= -1
        if (point.y < 0 || point.y > height) point.yVelocity *= -1
      })

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "rgba(0, 0, 20, 1)")
      gradient.addColorStop(1, "rgba(10, 10, 30, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw gradient blobs
      points.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        const [r, g, b] = point.color
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add noise texture
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Add subtle noise
        const noise = (Math.random() - 0.5) * 5
        data[i] = Math.min(255, Math.max(0, data[i] + noise))
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise))
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise))
      }

      ctx.putImageData(imageData, 0, 0)

      // Add grid overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 1

      const gridSize = 30
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height

      // Reposition points when canvas is resized
      points.forEach((point) => {
        point.x = Math.random() * width
        point.y = Math.random() * height
      })

      draw()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Animation loop
    let animationId: number
    function animate() {
      draw()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0.8 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
    </div>
  )
}
