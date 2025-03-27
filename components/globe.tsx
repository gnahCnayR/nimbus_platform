"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useTexture } from "@react-three/drei"
import type { Mesh } from "three"

function Earth() {
  const earthRef = useRef<Mesh>(null)
  const cloudRef = useRef<Mesh>(null)

  // Load earth texture
  const earthTexture = useTexture("/assets/texture_earth.jpg")

  // Rotate the earth
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = clock.getElapsedTime() * 0.07
    }
  })

  return (
    <>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthTexture} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshStandardMaterial color="#4870df" transparent={true} opacity={0.05} />
      </mesh>
    </>
  )
}

// Weather data points visualization
function WeatherDataPoints() {
  // Sample data points for visualization
  const dataPoints = [
    { lat: 40, lon: -74, value: 0.8, type: "temperature" }, // New York
    { lat: 51, lon: 0, value: 0.6, type: "precipitation" }, // London
    { lat: 35, lon: 139, value: 0.9, type: "temperature" }, // Tokyo
    { lat: -33, lon: 151, value: 0.7, type: "precipitation" }, // Sydney
    { lat: 19, lon: 72, value: 0.95, type: "temperature" }, // Mumbai
    { lat: -23, lon: -46, value: 0.85, type: "precipitation" }, // São Paulo
    { lat: 55, lon: 37, value: 0.5, type: "temperature" }, // Moscow
    { lat: 30, lon: 31, value: 0.9, type: "precipitation" }, // Cairo
  ]

  // Convert lat/lon to 3D coordinates on a sphere
  const latLonToVector = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)

    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)

    return [x, y, z]
  }

  return (
    <>
      {dataPoints.map((point, index) => {
        const [x, y, z] = latLonToVector(point.lat, point.lon, 2.1)
        const color = point.type === "temperature" ? "#ff7e67" : "#4da6ff"
        const size = 0.05 + point.value * 0.1

        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        )
      })}
    </>
  )
}

export default function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />

      <group>
        <Earth />
        <WeatherDataPoints />
      </group>

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

