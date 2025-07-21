"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Play, ExternalLink, Wifi, Activity } from "lucide-react"

export default function Demo() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white overflow-auto">
      <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 md:p-8 pb-safe">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="group relative w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
            <div className="pointer-events-none absolute inset-0 z-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
            <CardContent className="relative z-10 flex flex-col sm:flex-row w-full items-start sm:items-center justify-between p-4 sm:p-5 md:p-6 gap-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide bg-gradient-to-r from-[#66fcf1] via-teal-300 to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientMove_6s_ease_infinite]">
                  Project Demo
                </h1>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 animate-pulse" />
                  <Badge
                    variant="outline"
                    className="border-[#66fcf1]/50 text-[#66fcf1] bg-[#66fcf1]/10 text-sm md:text-base px-3 py-1"
                  >
                    Live Demo
                  </Badge>
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-4xl space-y-6"
          >
            {/* Description Card */}
            <Card className="group relative w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
              <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
              <CardContent className="relative z-10 p-6 sm:p-8 text-center space-y-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Play className="h-6 w-6 sm:h-8 sm:w-8 text-[#66fcf1]" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#66fcf1]">
                    Mars Weather Dashboard Demo
                  </h2>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Explore the comprehensive Mars weather monitoring system with real-time data visualization,
                  interactive 3D globe, and detailed analytics for multiple Martian regions.
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2">
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs sm:text-sm px-3 py-1">
                    Real-time Data
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs sm:text-sm px-3 py-1">
                    3D Visualization
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs sm:text-sm px-3 py-1">
                    Interactive UI
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 text-xs sm:text-sm px-3 py-1">
                    Responsive Design
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Video Demo Card */}
            <Card className="group relative w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
              <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
              <CardContent className="relative z-10 p-4 sm:p-6 md:p-8">
                <div className="w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-[#66fcf1]/20 shadow-2xl bg-black/20">
                  <iframe
                    src="https://www.youtube.com/embed/U8TzpE6r-rE?si=rsb_fqak96D2i_0r"
                    title="Mars Weather Dashboard - Project Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Video Info */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#66fcf1]">Complete Walkthrough</h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Watch the full demonstration of features and functionality
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="default"
                    asChild
                    className="border-[#66fcf1]/70 text-[#66fcf1] hover:bg-[#66fcf1]/20 hover:text-white bg-[#66fcf1]/10 font-medium transition-all duration-200 text-sm sm:text-base px-4 py-2 w-full sm:w-auto"
                  >
                    <Link
                      href="https://www.youtube.com/watch?v=U8TzpE6r-rE"
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Watch on YouTube
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
            >
              <Button
                variant="default"
                size="lg"
                asChild
                className="bg-[#66fcf1]/20 text-[#66fcf1] hover:bg-[#66fcf1]/30 hover:text-white transition-all duration-200 text-base px-6 py-3 w-full sm:w-auto font-medium"
              >
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Return to Dashboard
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-red-500/70 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-red-500/10 font-medium transition-all duration-200 text-base px-6 py-3 w-full sm:w-auto"
              >
                <Link href="mailto:contact@ajaypawar.com" className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Report Issue
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/20 bg-white/5 backdrop-blur-md shadow-md">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 text-sm md:text-base text-[#6dede5]">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#66fcf1] animate-ping" />
                  <span className="font-medium">Demo Environment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span className="font-medium">Interactive Preview</span>
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
