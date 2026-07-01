'use client'

import { useMemo, useRef, type JSX } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { getGlowTexture } from './glowTexture'
import type { JourneyNode } from './nodesData'

function ConsultShape({ color }: { color: string }) {
  const ringsRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (ringsRef.current) ringsRef.current.rotation.y += dt * 0.3
  })
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} roughness={0.3} />
      </mesh>
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[0.55, 0.012, 8, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 1.6, Math.PI / 3, 0]}>
          <torusGeometry args={[0.72, 0.01, 8, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  )
}

function GateShape({ color }: { color: string }) {
  const orbitersRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (orbitersRef.current) orbitersRef.current.rotation.z += dt * 0.6
  })
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.4, 0.05, 16, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.25} />
      </mesh>
      <group ref={orbitersRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos((i / 3) * Math.PI * 2) * 0.4, Math.sin((i / 3) * Math.PI * 2) * 0.4, 0]}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function GlobeShape({ color }: { color: string }) {
  const globeRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (globeRef.current) globeRef.current.rotation.y += dt * 0.5
  })
  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>
      {[0.5, -0.4].map((tilt, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + tilt, 0, 0]}>
          <torusGeometry args={[0.5, 0.006, 6, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

function PortalShape({ color }: { color: string }) {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (ringRef.current) ringRef.current.rotation.z += dt * 0.4
  })
  return (
    <group>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.36, 0.045, 16, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} roughness={0.3} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function ServerShape({ color }: { color: string }) {
  return (
    <group>
      {[-0.18, 0, 0.18].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh>
            <boxGeometry args={[0.62, 0.13, 0.36]} />
            <meshStandardMaterial color="#0d1420" roughness={0.6} metalness={0.3} />
          </mesh>
          <mesh position={[0.24, 0, 0.19]}>
            <boxGeometry args={[0.05, 0.05, 0.01]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FactoryShape({ color }: { color: string }) {
  const orbitersRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (orbitersRef.current) orbitersRef.current.rotation.y += dt * 0.5
  })
  return (
    <group>
      <mesh rotation={[0.4, 0.6, 0]}>
        <boxGeometry args={[0.34, 0.34, 0.34]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.35} />
      </mesh>
      <group ref={orbitersRef}>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.62, Math.sin(a) * 0.25, Math.sin(a) * 0.4]}>
              <boxGeometry args={[0.09, 0.09, 0.09]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function ScanShape({ color }: { color: string }) {
  const barRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (barRef.current) barRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.4) * 0.22
  })
  return (
    <group>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.3]} />
        <meshStandardMaterial color="#0d1420" roughness={0.6} />
      </mesh>
      <mesh ref={barRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.52, 0.015, 0.32]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

function BeaconShape({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <coneGeometry args={[0.2, 0.5, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.02, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function KeyShape({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.5
  })
  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.15} metalness={0.4} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

const SHAPES: Record<JourneyNode['shape'], (p: { color: string }) => JSX.Element> = {
  consult: ConsultShape,
  gate: GateShape,
  globe: GlobeShape,
  portal: PortalShape,
  server: ServerShape,
  factory: FactoryShape,
  scan: ScanShape,
  beacon: BeaconShape,
  key: KeyShape,
}

export function NodeMarker({ node, active }: { node: JourneyNode; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Sprite>(null)
  const glowTexture = useMemo(() => (typeof document !== 'undefined' ? getGlowTexture() : null), [])
  const ShapeComponent = SHAPES[node.shape]

  useFrame((_, dt) => {
    const targetScale = active ? 1.35 : 1
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), dt * 4)
      groupRef.current.position.y = node.position[1] + Math.sin(Date.now() * 0.0006 + node.index) * 0.05
    }
    if (glowRef.current) {
      const targetOpacity = active ? 0.9 : 0.35
      const mat = glowRef.current.material as THREE.SpriteMaterial
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, dt * 4)
    }
  })

  return (
    <group position={node.position}>
      <group ref={groupRef}>
        {glowTexture && (
          <sprite ref={glowRef} scale={[1.6, 1.6, 1.6]}>
            <spriteMaterial
              map={glowTexture}
              color={node.color}
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </sprite>
        )}
        <ShapeComponent color={node.color} />
      </group>
      <Text
        position={[0, -0.62, 0]}
        fontSize={0.16}
        color={active ? node.color : '#8a94a6'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {`0${node.index + 1}`}
      </Text>
      {active && (
        <pointLight color={node.color} intensity={6} distance={4} decay={2} />
      )}
    </group>
  )
}
