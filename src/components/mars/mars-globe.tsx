"use client"

import { useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { TextureLoader, type Mesh } from "three"

interface MarsGlobeProps {
  width?: number | string
  height?: number | string
  scale?: number
}

export default function MarsGlobe({
  width = 400,
  height = 400,
  scale = 2,
}: MarsGlobeProps) {
  return (
    <div style={{ width, height }}>
      <Canvas frameloop="always" camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Mars scale={scale} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

function Mars({ scale }: { scale: number }) {
  const meshRef = useRef<Mesh>(null!)
  const [colorMap] = useLoader(TextureLoader, ["/mars2k_img0.png"])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  )
}
