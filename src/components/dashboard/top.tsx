'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { RefreshCcw, Wifi } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter, usePathname } from 'next/navigation'

export default function Top() {
  const [currentTime, setCurrentTime] = useState('')
  const [lastTime, setLastTime] = useState('20 Jul 2025, 10:15 AM') // Dummy for now
  const [isRefreshing, setIsRefreshing] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
      })
      setCurrentTime(time)
    }

    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)

    // Force route reload
    router.replace(pathname)

    // Optional delay for smoother UX
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {/* Header Card */}
      <Card className="group relative w-full rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
        <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />

        <CardContent className="relative z-10 flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-[#66fcf1] via-teal-300 to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientMove_6s_ease_infinite]">
              Mars Weather Dashboard
            </h1>
            <Wifi className="h-5 w-5 text-green-400 animate-pulse" aria-label="Live connection" />
          </div>
          <Button
            variant="default"
            className="flex items-center gap-2 bg-[#66fcf1]/20 text-[#66fcf1] hover:bg-[#66fcf1]/30 transition"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </CardContent>
      </Card>

      {/* Time Card */}
      <Card className="group relative w-full rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
        <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />

        <CardContent className="relative z-10 flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#66fcf1] animate-ping" />
            <p className="text-sm font-medium tracking-wide text-[#66fcf1]">
              IST: {currentTime}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#66fcf1] animate-ping" />
            <p className="text-sm font-medium tracking-wide text-[#66fcf1]">
              Last Updated: {lastTime}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
