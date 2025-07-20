"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

export default function ProjectDemoPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 text-white text-center space-y-8">
      <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <div className="space-y-4 max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-400">Project Demo</h1>
        <p className="text-sm text-neutral-400">Here's a quick demo and explanation of how this project works.</p>

        <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="YouTube project demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Button
            variant="secondary"
            asChild
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <Link href="/">Return Home</Link>
          </Button>
          <Button
            variant="destructive"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="mailto:contact@ajaypawar.com">Report Issue</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
