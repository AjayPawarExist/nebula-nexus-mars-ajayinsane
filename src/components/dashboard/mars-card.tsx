import React from 'react'
import { Card, CardContent } from '../ui/card'
import MarsGlobe from './mars-globe'

export default function MarsCard() {
  return (
    <Card className="group relative w-full rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
      {/* Glowing border animation */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />

      <CardContent className="relative flex w-full items-center justify-center p-4 min-h-[300px]">
        <div className="w-full h-full flex items-center justify-center">
          <MarsGlobe width={300} height={300} scale={1} />
        </div>
      </CardContent>
    </Card>
  )
}
