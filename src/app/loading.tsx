import React from 'react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-black">
      <div className="w-32 h-32 relative animate-[spin_6s_linear_infinite]">
        <Image
          src="/mars.png"
          alt="Mars"
          fill
          sizes="(max-width: 768px) 128px, 128px"
          className="object-contain"
        />
      </div>
      <p className="mt-6 text-red-400 text-lg font-semibold animate-pulse">
        Loading Mars...
      </p>
    </div>
  )
}
