'use client'

import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Grid, Trail } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { JOURNEY_NODES, JOURNEY_COLORS } from './nodesData'
import { buildJourneyCurve, getJourneyState } from './journey'
import { NodeMarker } from './NodeMarker'
import { ConnectionPath } from './ConnectionPath'

interface SceneContentsProps {
  onActiveIndexChange: (index: number) => void
  reducedMotion: boolean
}

function SceneContents({ onActiveIndexChange, reducedMotion }: SceneContentsProps) {
  const curve = useMemo(() => buildJourneyCurve(), [])
  const orbRef = useRef<THREE.Mesh>(null)
  const lastActiveRef = useRef(-1)
  const [activeIndex, setActiveIndex] = useState(0)
  const settledRef = useRef(false)

  useFrame(({ clock, camera }) => {
    if (reducedMotion && settledRef.current) return

    const elapsed = reducedMotion ? 0.001 : clock.getElapsedTime()
    const { u, activeIndex: computedActive } = getJourneyState(elapsed)
    const point = curve.getPointAt(THREE.MathUtils.clamp(u, 0, 1))

    if (orbRef.current) orbRef.current.position.copy(point)

    if (computedActive !== lastActiveRef.current) {
      lastActiveRef.current = computedActive
      setActiveIndex(computedActive)
      onActiveIndexChange(computedActive)
    }

    const anchorAngle = elapsed * 0.035
    const camOffset = new THREE.Vector3(Math.sin(anchorAngle) * 1.6, 1.15, 3.6)
    const desired = point.clone().add(camOffset)
    const lerpSpeed = reducedMotion ? 1 : 0.02
    camera.position.lerp(desired, lerpSpeed)
    camera.lookAt(point.x, point.y + 0.1, point.z - 2.2)

    if (reducedMotion) settledRef.current = true
  })

  return (
    <>
      <ConnectionPath curve={curve} />

      {JOURNEY_NODES.map((node, i) => (
        <NodeMarker key={node.id} node={node} active={i === activeIndex} />
      ))}

      <Trail
        width={2.4}
        length={reducedMotion ? 0 : 6}
        color={new THREE.Color(JOURNEY_COLORS.CYAN)}
        attenuation={(t) => t * t}
      >
        <mesh ref={orbRef}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color="#ffffff" emissive="#bff6ff" emissiveIntensity={2.4} toneMapped={false} />
          <pointLight color={JOURNEY_COLORS.CYAN} intensity={5} distance={5} decay={2} />
        </mesh>
      </Trail>
    </>
  )
}

export interface InfrastructureSceneProps {
  onActiveIndexChange?: (index: number) => void
  reducedMotion?: boolean
}

export default function InfrastructureScene({
  onActiveIndexChange = () => {},
  reducedMotion = false,
}: InfrastructureSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.2, 4], fov: 50, near: 0.1, far: 100 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
    >
      <color attach="background" args={['#05070d']} />
      <fog attach="fog" args={['#05070d', 10, 34]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 8, 5]} intensity={0.35} color="#8fb4ff" />

      <Stars radius={60} depth={50} count={2200} factor={3.2} saturation={0} fade speed={0.4} />
      <Grid
        position={[0, -2.6, -16]}
        args={[90, 90]}
        cellSize={1.5}
        cellThickness={0.5}
        cellColor="#132033"
        sectionSize={6}
        sectionThickness={1}
        sectionColor="#1c3a52"
        fadeDistance={38}
        fadeStrength={1.5}
        infiniteGrid
      />

      <SceneContents onActiveIndexChange={onActiveIndexChange} reducedMotion={reducedMotion} />

      <EffectComposer>
        <Bloom intensity={0.85} luminanceThreshold={0.18} luminanceSmoothing={0.35} mipmapBlur radius={0.6} />
      </EffectComposer>
    </Canvas>
  )
}
