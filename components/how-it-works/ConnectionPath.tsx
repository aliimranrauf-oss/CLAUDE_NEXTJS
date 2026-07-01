'use client'

import { useMemo, useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { JOURNEY_COLORS } from './nodesData'

const FlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new THREE.Color(JOURNEY_COLORS.CYAN),
    uColorB: new THREE.Color(JOURNEY_COLORS.VIOLET),
  },
  /* vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */ `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    void main() {
      float pulse = sin(vUv.y * 30.0 - uTime * 1.6) * 0.5 + 0.5;
      pulse = pow(pulse, 3.0);
      vec3 base = mix(uColorA, uColorB, vUv.y);
      float rim = smoothstep(0.0, 0.5, 1.0 - abs(vUv.x - 0.5) * 2.0);
      float alpha = (0.12 + pulse * 0.55) * rim;
      gl_FragColor = vec4(base, alpha);
    }
  `
)

extend({ FlowMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    flowMaterial: any
  }
}

export function ConnectionPath({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const materialRef = useRef<any>(null)
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 400, 0.028, 8, false), [curve])

  useFrame((_, dt) => {
    if (materialRef.current) materialRef.current.uTime += dt
  })

  return (
    <mesh geometry={geometry}>
      <flowMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
