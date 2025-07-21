"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  twinkleDelay: number
}

interface ShootingStar {
  id: number
  startX: number
  startY: number
  angle: number
  speed: number
  length: number
  delay: number
}

export default function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const [dustParticles, setDustParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Generate static stars
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 3,
        })
      }
      setStars(newStars)
    }

    // Generate realistic shooting stars
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = []
      for (let i = 0; i < 4; i++) {
        // Start from random edge of screen
        const side = Math.floor(Math.random() * 4)
        let startX, startY, angle

        switch (side) {
          case 0: // Top edge
            startX = Math.random() * 100
            startY = -5
            angle = 45 + Math.random() * 90 // 45-135 degrees
            break
          case 1: // Right edge
            startX = 105
            startY = Math.random() * 50
            angle = 135 + Math.random() * 90 // 135-225 degrees
            break
          case 2: // Left edge
            startX = -5
            startY = Math.random() * 50
            angle = 315 + Math.random() * 90 // 315-45 degrees (wrapping)
            break
          default: // Top-left to bottom-right (classic)
            startX = Math.random() * 30
            startY = Math.random() * 30
            angle = 45 + Math.random() * 30
        }

        newShootingStars.push({
          id: i,
          startX,
          startY,
          angle: angle % 360,
          speed: 800 + Math.random() * 400, // pixels per second
          length: 60 + Math.random() * 40,
          delay: Math.random() * 15,
        })
      }
      setShootingStars(newShootingStars)
    }

    // Generate dust particles
    const generateDustParticles = () => {
      const particles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 3,
      }))
      setDustParticles(particles)
    }

    generateStars()
    generateShootingStars()
    generateDustParticles()
  }, [])

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-radial from-blue-950/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-purple-950/10 via-transparent to-transparent rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-radial from-indigo-950/10 via-transparent to-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Subtle nebula effect */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-950/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-purple-950/10 via-transparent to-transparent rounded-full" />
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-radial from-indigo-950/10 via-transparent to-transparent rounded-full" />

      {/* Static stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: star.opacity }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.twinkleDelay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Realistic shooting stars */}
      {shootingStars.map((shootingStar) => {
        // Use safe window dimensions with fallbacks
        const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1920
        const windowHeight = typeof window !== "undefined" ? window.innerHeight : 1080

        const distance = Math.sqrt(Math.pow(windowWidth, 2) + Math.pow(windowHeight, 2))
        const duration = distance / shootingStar.speed
        const radians = (shootingStar.angle * Math.PI) / 180
        const endX = shootingStar.startX + Math.cos(radians) * ((distance / windowWidth) * 100)
        const endY = shootingStar.startY + Math.sin(radians) * ((distance / windowHeight) * 100)

        return (
          <motion.div
            key={shootingStar.id}
            className="absolute pointer-events-none"
            style={{
              left: `${shootingStar.startX}%`,
              top: `${shootingStar.startY}%`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: `${endX - shootingStar.startX}vw`,
              y: `${endY - shootingStar.startY}vh`,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: shootingStar.delay,
              repeatDelay: 12 + Math.random() * 8,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth motion
            }}
          >
            {/* Shooting star head */}
            <div
              className="relative"
              style={{
                transform: `rotate(${shootingStar.angle}deg)`,
              }}
            >
              {/* Main bright core */}
              <div className="w-2 h-2 bg-white rounded-full shadow-lg shadow-white/80 relative z-10" />

              {/* Outer glow */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white/40 rounded-full blur-sm transform -translate-x-1/2 -translate-y-1/2 -z-10" />

              {/* Long trail */}
              <motion.div
                className="absolute top-1/2 right-full h-0.5 origin-right transform -translate-y-1/2"
                style={{
                  background: `linear-gradient(to left, 
                    rgba(255, 255, 255, 0.9) 0%, 
                    rgba(200, 220, 255, 0.6) 20%, 
                    rgba(150, 200, 255, 0.3) 50%, 
                    rgba(100, 180, 255, 0.1) 80%, 
                    transparent 100%)`,
                  width: `${shootingStar.length}px`,
                  filter: "blur(0.5px)",
                }}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: [0, 1, 1, 0.8, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: shootingStar.delay,
                  repeatDelay: 12 + Math.random() * 8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              {/* Secondary trail for depth */}
              <motion.div
                className="absolute top-1/2 right-full h-1 origin-right transform -translate-y-1/2"
                style={{
                  background: `linear-gradient(to left, 
                    rgba(255, 255, 255, 0.4) 0%, 
                    rgba(180, 200, 255, 0.2) 30%, 
                    transparent 70%)`,
                  width: `${shootingStar.length * 0.6}px`,
                  filter: "blur(1px)",
                }}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: [0, 0.8, 0.8, 0.6, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: shootingStar.delay + 0.1,
                  repeatDelay: 12 + Math.random() * 8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </div>
          </motion.div>
        )
      })}

      {/* Distant galaxy glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/30 rounded-full"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Additional cosmic dust particles */}
      {dustParticles.map((particle) => (
        <motion.div
          key={`dust-${particle.id}`}
          className="absolute w-0.5 h-0.5 bg-white/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
