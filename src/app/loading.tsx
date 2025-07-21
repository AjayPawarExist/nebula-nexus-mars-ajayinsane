import React from 'react'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="w-36 h-36 aspect-square relative animate-[spin_3s_linear_infinite]">
        <Image
          src="/mars.png"
          alt="Mars"
          fill
          sizes="(max-width: 768px) 128px, 128px"
          className="object-contain"
        />
      </div>
    </div>
  )
}
