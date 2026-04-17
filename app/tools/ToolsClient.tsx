'use client'

// app/tools/ToolsClient.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StoreAuditTool from './tools/StoreAuditTool'
import ShopifyCostCalculator from './tools/ShopifyCostCalculator'
import ProfitCalculator from './tools/ProfitCalculator'
import ProductPageAnalyzer from './tools/ProductPageAnalyzer'
import FakeStoreChecker from './tools/FakeStoreChecker'
import StoreNameGenerator from './tools/StoreNameGenerator'
import SpeedChecker from './tools/SpeedChecker'
import {
  Search,
  Calculator,
  TrendingUp,
  FileText,
  Shield,
  Sparkles,
  Zap,
  X,
} from 'lucide-react'

const tools = [
  {
    id: 'store-audit',
    title: 'Store Audit Tool',
    description: 'Get an instant SEO, speed & trust score for any ecommerce store URL.',
    icon: Search,
    color: '#00d4ff',
    component: StoreAuditTool,
  },
  {
    id: 'shopify-cost',
    title: 'Shopify Cost Calculator',
    description: 'See exactly how much Shopify really costs you per year vs. a one-time build.',
    icon: Calculator,
    color: '#7a5cff',
    component: ShopifyCostCalculator,
  },
  {
    id: 'profit-calculator',
    title: 'Profit Calculator',
    description: 'Calculate your real profit after product cost, ads, and fees.',
    icon: TrendingUp,
    color: '#00ffaa',
    component: ProfitCalculator,
  },
  {
    id: 'product-page-analyzer',
    title: 'Product Page Analyzer',
    description: 'Paste your product description and get an instant conversion score.',
    icon: FileText,
    color: '#ff6b6b',
    component: ProductPageAnalyzer,
  },
  {
    id: 'fake-store-checker',
    title: 'Fake Store Checker',
    description: 'Detect red flags in any online store URL before you buy or partner.',
    icon: Shield,
    color: '#ffd93d',
    component: FakeStoreChecker,
  },
  {
    id: 'store-name-generator',
    title: 'Store Name Generator',
    description: 'Generate brandable, memorable names for your ecommerce store instantly.',
    icon: Sparkles,
    color: '#ff9f43',
    component: StoreNameGenerator,
  },
  {
    id: 'speed-checker',
    title: 'Speed Checker',
    description: 'Simulate a performance audit and see if your store speed is costing you sales.',
    icon: Zap,
    color: '#00d4ff',
    component: SpeedChecker,
  },
]

export default function ToolsClient() {
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const active = tools.find((t) => t.id === activeTool)
  const ActiveComponent = active?.component

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest mb-5"
            style={{
              background: 'linear-gradient(90deg, rgba(0,212,255,0.15), rgba(122,92,255,0.15))',
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#00d4ff',
            }}
          >
            ✦ 7 FREE TOOLS FOR ECOMMERCE OWNERS
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Free Ecommerce Tools
            <br />
            <span className="text-gradient">That Actually Help You Grow</span>
          </h1>

          <p className="text-[#888] text-lg max-w-xl mx-auto">
            No sign-up needed. Run audits, calculate profits, and find out if your store is losing
            money.
          </p>
        </motion.div>
      </section>

      {/* ── Tool Grid ── */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                onClick={() => setActiveTool(tool.id)}
                whileHover={{ scale: 1.025 }}
                className="relative overflow-hidden rounded-2xl p-7 cursor-pointer transition-all duration-300 card-glow"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, ${tool.color}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: tool.color + '22' }}
                >
                  <Icon size={22} color={tool.color} />
                </div>

                <h3
                  className="text-[17px] font-bold mb-2"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {tool.title}
                </h3>
                <p className="text-[#777] text-sm leading-relaxed mb-5">{tool.description}</p>

                <button className="btn-primary w-full text-sm text-center">Use Tool →</button>
              </motion.div>
            )
          })}
        </div>
      </section>

      <Footer />

      {/* ── Tool Modal ── */}
      <AnimatePresence>
        {activeTool && ActiveComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center p-5 overflow-y-auto"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveTool(null)
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl rounded-2xl p-8 mt-16 mb-10"
              style={{
                background: '#0f1523',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <button
                onClick={() => setActiveTool(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#aaa] hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <X size={16} />
              </button>

              <ActiveComponent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
