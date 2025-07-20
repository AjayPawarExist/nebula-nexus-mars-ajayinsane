import MarsGlobe from '@/components/mars/mars-globe'
import React from 'react'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Mars Weather Dashboard</h1><MarsGlobe scale={1}/>
    </div>
  )
}
