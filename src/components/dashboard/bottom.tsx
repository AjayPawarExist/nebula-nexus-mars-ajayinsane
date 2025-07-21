'use client'

import React from 'react'
import { Card, CardContent } from '../ui/card'

export default function Bottom() {
  return (
    <div className="fixed bottom-4 px-4 z-50 w-full">
      <Card className="w-full p-2 rounded-md border border-[#66fcf1]/20 bg-white/5 backdrop-blur-md shadow-md transition-shadow hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.15)]">
        <CardContent className="flex items-center justify-center">
          <p className="text-xs text-[#6dede5] tracking-wide font-medium animate-fadeIn">
            Made by <span className="font-semibold text-white">AjayInsane</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
