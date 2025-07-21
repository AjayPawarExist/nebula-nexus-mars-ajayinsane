"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Activity,
  Rocket,
  Globe,
  Thermometer,
  BarChart3,
  Satellite,
  Smartphone,
  Target,
  Brain,
  User,
  Users,
  Phone,
  Trophy,
  University,
  Zap,
  Eye,
  Heart,
  Lightbulb,
  Database,
  Monitor,
} from "lucide-react"

export default function ProjectInfo() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white overflow-auto">
      <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 md:p-8 pb-safe">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="group relative w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
            <div className="pointer-events-none absolute inset-0 z-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
            <CardContent className="relative z-10 flex flex-col sm:flex-row w-full items-start sm:items-center justify-between p-4 sm:p-5 md:p-6 gap-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-[#66fcf1] animate-pulse" />
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide bg-gradient-to-r from-[#66fcf1] via-teal-300 to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientMove_6s_ease_infinite]">
                    About Marsera
                  </h1>
                  <p className="text-sm sm:text-base text-gray-400 mt-1">Interplanetary Weather Intelligence</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="default"
                asChild
                className="border-[#66fcf1]/70 text-[#66fcf1] hover:bg-[#66fcf1]/20 hover:text-white bg-[#66fcf1]/10 font-medium transition-all duration-200 text-base px-4 py-2"
              >
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="hidden sm:inline">Return Home</span>
                  <span className="sm:hidden">Home</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="group relative w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
            <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
            <CardHeader className="relative z-10 p-6 sm:p-8 pb-4">
              <CardTitle className="text-[#66fcf1] flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold">
                <Rocket className="h-6 w-6 sm:h-8 sm:w-8" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-6 sm:p-8 pt-0 space-y-4">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Marsera is a web-based dashboard that visualizes live or simulated Mars weather data — designed to bring
                the awe of interplanetary science closer to everyone. Built as a submission for{" "}
                <span className="text-[#66fcf1] font-semibold">Nebula Nexus</span>, the Cosmos Hackathon at Manipal
                University Jaipur, this project reimagines how we interact with space mission data in real time.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Whether you're a student, researcher, space enthusiast, or just curious about the Red Planet, Marsera
                delivers a calming, futuristic, and data-rich experience to explore Martian climate like never before.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
                <Badge className="bg-[#66fcf1]/20 text-[#66fcf1] border-[#66fcf1]/50 text-sm px-3 py-1">
                  Space Technology
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 text-sm px-3 py-1">
                  Data Visualization
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-sm px-3 py-1">
                  Real-time Analytics
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="group relative w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
            <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
            <CardHeader className="relative z-10 p-6 sm:p-8 pb-4">
              <CardTitle className="text-[#66fcf1] flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold">
                <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8" />
                The Problem We Solved
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-6 sm:p-8 pt-0 space-y-4">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Space data is powerful — but often buried in static reports, scientific repositories, or raw telemetry.
                For missions to Mars, understanding weather patterns like temperature, wind speed, and atmospheric
                pressure is critical for future exploration and research.
              </p>
              <div className="bg-[#66fcf1]/10 border border-[#66fcf1]/30 rounded-lg p-4 sm:p-6">
                <p className="text-lg sm:text-xl font-semibold text-[#66fcf1] mb-2">We asked:</p>
                <p className="text-base sm:text-lg text-white italic">
                  "How can we make Mars data feel alive, beautiful, and accessible?"
                </p>
              </div>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Marsera answers that question by turning raw numbers into an engaging visual journey through the Martian
                atmosphere.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="group relative w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
            <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
            <CardHeader className="relative z-10 p-6 sm:p-8 pb-4">
              <CardTitle className="text-[#66fcf1] flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
                What Marsera Offers
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-6 sm:p-8 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 p-4 rounded-lg bg-white/5 border border-[#66fcf1]/20">
                  <Thermometer className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg mb-2">Real-time Weather Data</h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Live or simulated Mars weather including temperature, wind, and pressure
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 rounded-lg bg-white/5 border border-[#66fcf1]/20">
                  <BarChart3 className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg mb-2">Immersive Dashboard</h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Built using NASA's InSight and MSL datasets for authenticity
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 rounded-lg bg-white/5 border border-[#66fcf1]/20">
                  <Satellite className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg mb-2">Mission-Style Interface</h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Control room feel for an authentic space mission experience
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 rounded-lg bg-white/5 border border-[#66fcf1]/20">
                  <Smartphone className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg mb-2">Mobile-First & PWA</h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Fully responsive design with Progressive Web App capabilities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 rounded-lg bg-white/5 border border-[#66fcf1]/20 md:col-span-2">
                  <Target className="h-6 w-6 text-[#66fcf1] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg mb-2">Multi-Audience Design</h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Crafted for scientists, storytellers, and space enthusiasts alike
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      

        {/* Team & Submission Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="group relative h-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
              <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
              <CardHeader className="relative z-10 p-6 sm:p-8 pb-4">
                <CardTitle className="text-[#66fcf1] flex items-center gap-3 text-xl sm:text-2xl font-bold">
                  <User className="h-6 w-6 sm:h-7 sm:w-7" />
                  Built By
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 p-6 sm:p-8 pt-0 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#66fcf1]" />
                    <span className="text-gray-400">Team Name:</span>
                    <span className="text-white font-semibold">AjayInsane</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-[#66fcf1]" />
                    <span className="text-gray-400">Member:</span>
                    <span className="text-white font-semibold">Ajay Pawar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#66fcf1]" />
                    <span className="text-gray-400">Contact:</span>
                    <span className="text-white font-mono">+91 93025 25332</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submission Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="group relative h-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
              <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
              <CardHeader className="relative z-10 p-6 sm:p-8 pb-4">
                <CardTitle className="text-[#66fcf1] flex items-center gap-3 text-xl sm:text-2xl font-bold">
                  <Trophy className="h-6 w-6 sm:h-7 sm:w-7" />
                  Submitted To
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 p-6 sm:p-8 pt-0 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Rocket className="h-5 w-5 text-[#66fcf1] mt-0.5" />
                    <div>
                      <span className="text-gray-400">Event:</span>
                      <p className="text-white font-semibold">Nebula Nexus – Cosmos Hackathon</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <University className="h-5 w-5 text-[#66fcf1] mt-0.5" />
                    <div>
                      <span className="text-gray-400">Institution:</span>
                      <p className="text-white font-semibold">Manipal University Jaipur (MUJ)</p>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/20 bg-white/5 backdrop-blur-md shadow-md">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 text-sm md:text-base text-[#6dede5]">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#66fcf1] animate-ping" />
                  <span className="font-medium">Project Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span className="font-medium">Marsera Dashboard</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-[#6dede5] tracking-wide font-medium">
                Made by <span className="font-semibold text-white">AjayInsane</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
