"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { TextureLoader, type Mesh } from "three"

interface MarsGlobeProps {
  width?: number | string
  height?: number | string
  scale?: number
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66fcf1]"></div>
    </div>
  )
}

export default function MarsGlobe({ width = 400, height = 400, scale = 2 }: MarsGlobeProps) {
  return (
    <div style={{ width, height }} className="relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          frameloop="always" 
          camera={{ position: [0, 0, 3], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#66fcf1" />
          <Mars scale={scale} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.8}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

function Mars({ scale }: { scale: number }) {
  const meshRef = useRef<Mesh>(null!)
  
  // Use a fallback color if texture fails to load
  const [colorMap] = useLoader(
    TextureLoader, 
    ["/mars2k_img0.png"],
    (loader) => {
      loader.crossOrigin = "anonymous"
    }
  )

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={colorMap} 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}
