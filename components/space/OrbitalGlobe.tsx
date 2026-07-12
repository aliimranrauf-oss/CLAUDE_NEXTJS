// components/space/OrbitalGlobe.tsx
// Server component — no JS runtime cost. Everything below is CSS keyframe
// animation (transform/opacity only) so it's GPU-composited and doesn't
// touch Lighthouse's TBT/CLS scores. No three.js / globe.gl / canvas loop.
//
// Note: each orbiting satellite needs its own keyframe rule (not a shared
// "spin" utility) because the tilt transform must be baked into every frame
// of the animation — otherwise the animation's `rotate()` overwrites the
// static tilt instead of combining with it.

type Satellite = {
  size: number
  duration: string
  delay: string
  tilt: number
  color: string
}

const satellites: Satellite[] = [
  { size: 8, duration: '14s', delay: '0s', tilt: 62, color: '#00d4ff' },
  { size: 6, duration: '19s', delay: '-6s', tilt: 68, color: '#7a5cff' },
  { size: 7, duration: '24s', delay: '-11s', tilt: 55, color: '#00d4ff' },
]

export default function OrbitalGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]" aria-hidden="true">
      <style>{`
        @keyframes globe-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        ${satellites
          .map(
            (sat, i) => `
        @keyframes orbit-${i} {
          from { transform: rotateX(${sat.tilt}deg) rotate(0deg); }
          to   { transform: rotateX(${sat.tilt}deg) rotate(360deg); }
        }`
          )
          .join('\n')}
        @media (prefers-reduced-motion: reduce) {
          .globe-sphere, .orbit-track { animation: none !important; }
        }
      `}</style>

      {/* Ambient glow behind the sphere */}
      <div
        className="absolute inset-[8%] rounded-full blur-3xl opacity-40"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, rgba(0,212,255,0.5), rgba(122,92,255,0.25) 55%, transparent 75%)',
        }}
      />

      {/* Orbit rings (static, tilted ellipses for depth) */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            inset: `${10 + i * 7}%`,
            transform: `rotateX(${58 - i * 6}deg)`,
            borderColor: i === 1 ? 'rgba(122,92,255,0.25)' : 'rgba(0,212,255,0.2)',
          }}
        />
      ))}

      {/* The sphere itself */}
      <div
        className="globe-sphere absolute inset-[16%] rounded-full overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #1a2744 0%, #0b0f1a 55%, #060810 100%)',
          boxShadow:
            'inset -14px -10px 40px rgba(0,0,0,0.55), inset 8px 6px 24px rgba(0,212,255,0.12), 0 0 60px rgba(0,212,255,0.15)',
          animation: 'globe-spin 70s linear infinite',
        }}
      >
        {/* Longitude/latitude wireframe */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-40">
          <ellipse cx="100" cy="100" rx="98" ry="98" fill="none" stroke="#00d4ff" strokeOpacity="0.25" strokeWidth="0.5" />
          <ellipse cx="100" cy="100" rx="60" ry="98" fill="none" stroke="#00d4ff" strokeOpacity="0.3" strokeWidth="0.5" />
          <ellipse cx="100" cy="100" rx="20" ry="98" fill="none" stroke="#00d4ff" strokeOpacity="0.3" strokeWidth="0.5" />
          <ellipse cx="100" cy="100" rx="98" ry="60" fill="none" stroke="#7a5cff" strokeOpacity="0.25" strokeWidth="0.5" />
          <ellipse cx="100" cy="100" rx="98" ry="20" fill="none" stroke="#7a5cff" strokeOpacity="0.2" strokeWidth="0.5" />
        </svg>

        {/* Scattered "night light" dots to read as populated landmasses */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
          {[
            [62, 70], [70, 66], [58, 90], [120, 60], [128, 58], [110, 100],
            [140, 110], [90, 130], [80, 45], [150, 85], [45, 110], [100, 150],
          ].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="1.6" fill="#00d4ff" opacity="0.7" />
          ))}
        </svg>
      </div>

      {/* Orbiting satellites */}
      {satellites.map((sat, i) => (
        <div
          key={i}
          className="orbit-track absolute inset-[10%]"
          style={{
            animation: `orbit-${i} ${sat.duration} linear infinite`,
            animationDelay: sat.delay,
          }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: sat.size,
              height: sat.size,
              background: sat.color,
              boxShadow: `0 0 10px 2px ${sat.color}`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
