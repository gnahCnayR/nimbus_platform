"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture } from "@react-three/drei"
import type { Mesh } from "three"

type MiniGlobeProps = {
  latitude: number
  longitude: number
}

function Earth({ latitude, longitude }: MiniGlobeProps) {
  const earthRef = useRef<Mesh>(null)

  // Load earth texture
  const earthTexture = useTexture("/assets/3d/texture_earth.jpg")

  // Convert latitude and longitude to 3D position
  const phi = (90 - latitude) * (Math.PI / 180)
  const theta = (longitude + 180) * (Math.PI / 180)

  const x = -(2.1 * Math.sin(phi) * Math.cos(theta))
  const z = 2.1 * Math.sin(phi) * Math.sin(theta)
  const y = 2.1 * Math.cos(phi)

  // Rotate the earth to center on the target coordinates
  useFrame(({ clock }) => {
    if (earthRef.current) {
      // Rotate around Y axis (longitude rotation)
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthTexture} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Highlight marker for the selected region */}
      <mesh position={[x, y, z]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ff5555" emissive="#ff5555" emissiveIntensity={0.5} />
      </mesh>
    </>
  )
}

export default function MiniGlobe({ latitude, longitude }: MiniGlobeProps) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <group>
        <Earth latitude={latitude} longitude={longitude} />
      </group>

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

