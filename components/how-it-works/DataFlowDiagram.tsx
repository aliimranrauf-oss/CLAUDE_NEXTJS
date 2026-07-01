'use client'

import {
  MessageCircle,
  CreditCard,
  Globe,
  Mail,
  Server,
  Code2,
  ShieldCheck,
  Rocket,
  KeyRound,
  type LucideIcon,
} from 'lucide-react'
import { JOURNEY_NODES } from './nodesData'

const ICONS: Record<string, LucideIcon> = {
  consultation: MessageCircle,
  payment: CreditCard,
  domain: Globe,
  gmail: Mail,
  setup: Server,
  development: Code2,
  testing: ShieldCheck,
  launch: Rocket,
  handover: KeyRound,
}

interface DataFlowDiagramProps {
  activeIndex: number
  reducedMotion: boolean
}

/**
 * Live "current flowing" pipeline diagram.
 * Pure SVG/CSS — no WebGL, no canvas, renders instantly everywhere.
 * A bright gradient sweep + a traveling pulse dot simulate current
 * moving continuously along the connecting line, while the station
 * that's "active" (driven by the parent's cycling HUD) lights up.
 */
export default function DataFlowDiagram({ activeIndex, reducedMotion }: DataFlowDiagramProps) {
  return (
    <div className="absolute inset-x-0 bottom-[14%] sm:bottom-[17%] flex justify-center px-4 sm:px-10 z-10">
      <div className="w-full max-w-6xl overflow-x-auto no-scrollbar">
        <div className="relative min-w-[860px] sm:min-w-0 h-[150px] sm:h-[170px]">
          {/* base line */}
          <div
            className="absolute left-0 right-0 top-[46px] sm:top-[52px] h-[2px]"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />

          {/* flowing current sweep */}
          <div
            className="absolute left-0 right-0 top-[46px] sm:top-[52px] h-[2px] flow-sweep"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #00d4ff 12%, #7a5cff 30%, transparent 48%, transparent 100%)',
              backgroundSize: '260% 100%',
              animationPlayState: reducedMotion ? 'paused' : 'running',
            }}
          />

          {/* traveling pulse */}
          <div
            className="absolute top-[41px] sm:top-[47px] w-[10px] h-[10px] rounded-full flow-pulse"
            style={{
              background: '#bff6ff',
              boxShadow: '0 0 16px 5px rgba(0,212,255,0.65)',
              animationPlayState: reducedMotion ? 'paused' : 'running',
            }}
          />

          {/* stations */}
          <div className="absolute inset-0 flex justify-between items-start">
            {JOURNEY_NODES.map((node, i) => {
              const Icon = ICONS[node.id]
              const active = i === activeIndex
              return (
                <div key={node.id} className="flex flex-col items-center gap-2.5 w-[88px] shrink-0">
                  <div
                    className="relative w-12 h-12 rounded-2xl glass flex items-center justify-center transition-all duration-500"
                    style={{
                      borderColor: active ? `${node.color}80` : undefined,
                      boxShadow: active ? `0 0 22px ${node.color}55` : 'none',
                      transform: active ? 'scale(1.16)' : 'scale(1)',
                    }}
                  >
                    <Icon size={18} color={active ? node.color : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
                    {active && (
                      <span
                        className="absolute -inset-1 rounded-2xl ping-ring"
                        style={{ border: `1px solid ${node.color}`, animationPlayState: reducedMotion ? 'paused' : 'running' }}
                      />
                    )}
                  </div>

                  <span
                    className="text-[10px] font-bold transition-colors duration-500"
                    style={{ color: active ? node.color : 'rgba(255,255,255,0.3)', fontFamily: 'Syne, sans-serif' }}
                  >
                    0{i + 1}
                  </span>

                  <div
                    className="text-[10px] uppercase tracking-wide text-center leading-tight transition-colors duration-500"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      color: active ? node.color : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {node.short}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <p
          className="sm:hidden text-center text-[10px] text-white/30 mt-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          ← swipe to see all steps →
        </p>
      </div>

      <style jsx>{`
        .flow-sweep {
          animation: flowSweep 3.4s linear infinite;
        }
        @keyframes flowSweep {
          0% {
            background-position: 130% 0;
          }
          100% {
            background-position: -160% 0;
          }
        }
        .flow-pulse {
          left: 0%;
          animation: flowPulse 6.8s linear infinite;
        }
        @keyframes flowPulse {
          0% {
            left: 0%;
            opacity: 0;
          }
          6% {
            opacity: 1;
          }
          94% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 10px);
            opacity: 0;
          }
        }
        .ping-ring {
          animation: pingRing 1.6s ease-out infinite;
        }
        @keyframes pingRing {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.4);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
