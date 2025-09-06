"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, Play } from "lucide-react"

export default function Cta() {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4">
      {/* Navigation Buttons - Top Right Corner */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex flex-col gap-3"
      >
        <Button
          variant="outline"
          size="default"
          asChild
          className="border-[#66fcf1]/70 text-[#66fcf1] hover:bg-[#66fcf1]/20 hover:text-white bg-[#0b0f1a]/80 backdrop-blur-md font-medium transition-all duration-200 text-sm px-4 py-2 shadow-lg hover:shadow-[0_0_15px_3px_rgba(102,252,241,0.3)]"
        >
          <Link href="/demo" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            <span className="hidden sm:inline">Demo</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          size="default"
          asChild
          className="border-[#66fcf1]/70 text-[#66fcf1] hover:bg-[#66fcf1]/20 hover:text-white bg-[#0b0f1a]/80 backdrop-blur-md font-medium transition-all duration-200 text-sm px-4 py-2 shadow-lg hover:shadow-[0_0_15px_3px_rgba(102,252,241,0.3)]"
        >
          <Link href="/info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Info</span>
          </Link>
        </Button>
      </motion.div>

      {/* Main CTA Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6 p-8"
      >
        <Image
          src="/mars.png"
          alt="Mars Logo"
          width={100}
          height={100}
          className="mx-auto aspect-square h-18 w-18 mb-4 animate-[spin_3s_linear_infinite]"
        />

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#66fcf1] via-teal-300 to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientMove_6s_ease_infinite]">
          Welcome to BlurCarbon Ledgre
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Your gateway to a decentralized, carbon-neutral future. Manage your carbon credits with ease and transparency.
        </p>

       <motion.div
  whileHover={{ scale: 1.3 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="inline-block"
>
  <Button
    size="lg"
    asChild
    variant={"destructive"}
    className="py-2 text-xl"
  >
    <Link href="/dashboard" className="w-full h-full flex items-center justify-center">
      Launch Dashboard
    </Link>
  </Button>
</motion.div>

      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#66fcf1]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  )
}
