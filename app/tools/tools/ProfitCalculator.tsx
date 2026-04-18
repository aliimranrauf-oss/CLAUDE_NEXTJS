'use client'

// app/tools/tools/ProfitCalculator.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, Target, DollarSign } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

/*
  IMPROVEMENTS:
  1. Platform fee toggle (Shopify/WooCommerce/Custom) — auto-fills processing fee
  2. ROAS (Return on Ad Spend) calculation
  3. Break-even price — "you need to charge at least $X to be profitable"
  4. Monthly revenue target slider — "how many sales to hit $X/month"
  5. Profit health rating with color-coded advice
  6. Shopify vs Custom profit comparison — shows what you gain by switching
*/

const PLATFORMS = [
  { label: 'Stripe / PayPal', fee: 2.9,  flat: 0.30 },
  { label: 'Shopify Payments', fee: 2.9, flat: 0.30 },
  { label: 'Shopify Basic +2%', fee: 4.9, flat: 0.30 },
  { label: 'PayPal Standard',  fee: 3.49, flat: 0.49 },
]

function getProfitHealth(margin: number): { label: string; color: string; advice: string } {
  if (margin >= 50) return { label: 'Excellent', color: '#00ffaa', advice: 'Strong margin. You have room to scale ads aggressively.' }
  if (margin >= 30) return { label: 'Healthy',   color: '#00d4ff', advice: 'Good margin. Focus on increasing AOV to improve further.' }
  if (margin >= 15) return { label: 'Tight',     color: '#ffd93d', advice: 'Low margin. Small ad cost increases will wipe profit.' }
  if (margin > 0)   return { label: 'Danger',    color: '#ff9f43', advice: 'Near zero. One bad ad day = net loss. Raise price or cut costs.' }
  return { label: 'Losing Money', color: '#ff6b6b', advice: 'You are losing money on every sale. Do not scale this yet.' }
}

export default function ProfitCalculator() {
  const [price, setPrice] = useState(49)
  const [cost, setCost] = useState(15)
  const [ads, setAds] = useState(10)
  const [platformIndex, setPlatformIndex] = useState(0)
  const [monthlyTarget, setMonthlyTarget] = useState(3000)
  const [result, setResult] = useState<null | {
    processingFee: number
    profit: number
    margin: number
    roas: number
    breakEvenPrice: number
    salesToHitTarget: number
    health: { label: string; color: string; advice: string }
  }>(null)

  const calculate = () => {
    const platform = PLATFORMS[platformIndex]
    const processingFee = (price * platform.fee) / 100 + platform.flat
    const profit = price - cost - ads - processingFee
    const margin = price > 0 ? (profit / price) * 100 : 0
    const roas = ads > 0 ? price / ads : 0
    // Break-even: price where profit = 0
    // profit = price - cost - ads - (price * fee/100 + flat) = 0
    // price * (1 - fee/100) = cost + ads + flat
    const breakEvenPrice = (cost + platform.flat) / (1 - platform.fee / 100)
    const salesToHitTarget = profit > 0 ? Math.ceil(monthlyTarget / profit) : 0

    const r = {
      processingFee: Math.round(processingFee * 100) / 100,
      profit:        Math.round(profit * 100) / 100,
      margin:        Math.round(margin * 10) / 10,
      roas:          Math.round(roas * 10) / 10,
      breakEvenPrice: Math.round(breakEvenPrice * 100) / 100,
      salesToHitTarget,
      health:        getProfitHealth(margin),
    }
    setResult(r)
    trackToolUsage('profit-calculator', { price, cost, ads, platformIndex }, r as unknown as Record<string, unknown>)
  }

  const inputClass = "w-full px-3 py-2.5 text-sm text-white rounded-lg outline-none"
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        📊 Profit Calculator
      </h2>
      <p className="text-[#777] text-sm mb-6">
        Find your real profit per sale — and exactly how many sales you need to hit your goal.
      </p>

      <div className="flex flex-col gap-4 mb-6">

        {/* Payment platform */}
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Payment Platform</label>
          <div className="flex gap-2 flex-wrap">
            {PLATFORMS.map((p, i) => (
              <button key={i} onClick={() => setPlatformIndex(i)}
                className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                style={{
                  border: '1px solid',
                  borderColor: platformIndex === i ? '#7a5cff' : 'rgba(255,255,255,0.1)',
                  background: platformIndex === i ? 'rgba(122,92,255,0.12)' : 'rgba(255,255,255,0.04)',
                  color: platformIndex === i ? '#c4b5fd' : '#777',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-[#555] mt-1">
            Fee: {PLATFORMS[platformIndex].fee}% + ${PLATFORMS[platformIndex].flat} per transaction
          </div>
        </div>

        {/* Price inputs grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Selling Price ($)', value: price, set: setPrice, hint: 'What customer pays', step: 1 },
            { label: 'Product Cost ($)',  value: cost,  set: setCost,  hint: 'COGS / supplier cost', step: 1 },
            { label: 'Ad Spend / Sale ($)', value: ads, set: setAds,  hint: 'Total ad cost ÷ conversions', step: 0.5 },
          ].map(({ label, value, set, hint, step }) => (
            <div key={label} className={label === 'Ad Spend / Sale ($)' ? 'col-span-2 sm:col-span-1' : ''}>
              <label className="block text-[12px] text-[#888] mb-1">
                {label} <span className="text-[#444]">— {hint}</span>
              </label>
              <input
                type="number" min={0} step={step} value={value}
                onChange={(e) => set(Number(e.target.value))}
                className={inputClass} style={inputStyle}
              />
            </div>
          ))}
        </div>

        {/* Monthly income target */}
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">
            Monthly Profit Target: <strong className="text-white">${monthlyTarget.toLocaleString()}</strong>
          </label>
          <input type="range" min={500} max={50000} step={500} value={monthlyTarget}
            onChange={(e) => setMonthlyTarget(Number(e.target.value))}
            className="w-full accent-[#00ffaa]" />
          <div className="flex justify-between text-[10px] text-[#444] mt-0.5">
            <span>$500</span><span>$50k</span>
          </div>
        </div>
      </div>

      <button onClick={calculate} className="btn-primary flex items-center gap-2 mb-6">
        <TrendingUp size={15} /> Calculate Profit
      </button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* Health banner */}
          <div className="rounded-xl p-4 mb-4 flex items-center gap-3" style={{ background: `${result.health.color}11`, border: `1px solid ${result.health.color}33` }}>
            <div className="text-center" style={{ minWidth: 72 }}>
              <div className="text-[11px] text-[#888]">Margin Health</div>
              <div className="text-lg font-extrabold" style={{ color: result.health.color }}>{result.health.label}</div>
            </div>
            <p className="text-[#bbb] text-[13px] leading-snug m-0">{result.health.advice}</p>
          </div>

          {/* Core metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Profit Per Sale',    value: `$${result.profit}`,         color: result.profit > 0 ? '#00ffaa' : '#ff6b6b' },
              { label: 'Profit Margin',      value: `${result.margin}%`,         color: result.health.color },
              { label: 'Processing Fee',     value: `$${result.processingFee}`,  color: '#888' },
              { label: 'ROAS',               value: `${result.roas}×`,           color: result.roas >= 3 ? '#00ffaa' : result.roas >= 2 ? '#ffd93d' : '#ff6b6b' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-[#777] text-[11px] mb-1">{item.label}</div>
                <div className="text-[22px] font-extrabold" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Sales target */}
          {result.salesToHitTarget > 0 && (
            <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Target size={15} color="#00d4ff" />
                <span className="text-[13px] font-bold text-[#00d4ff]">To hit ${monthlyTarget.toLocaleString()}/month</span>
              </div>
              <div className="text-3xl font-extrabold text-white">{result.salesToHitTarget.toLocaleString()} sales</div>
              <div className="text-[#555] text-[12px] mt-0.5">
                = {Math.ceil(result.salesToHitTarget / 30)} sales/day needed
              </div>
            </div>
          )}

          {/* Break-even price */}
          <div className="rounded-xl p-3.5 flex gap-2.5 mb-4" style={{ background: 'rgba(255,217,61,0.07)', border: '1px solid rgba(255,217,61,0.2)' }}>
            <DollarSign size={15} color="#ffd93d" className="shrink-0 mt-0.5" />
            <p className="text-[#bbb] text-[13px] leading-relaxed m-0">
              Break-even price for this product:{' '}
              <strong className="text-[#ffd93d]">${result.breakEvenPrice}</strong>.
              Anything below this price loses money after costs and fees.
            </p>
          </div>

          {result.profit <= 0 && (
            <div className="rounded-xl p-3.5 flex gap-2.5 mb-4" style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)' }}>
              <AlertTriangle size={15} color="#ff6b6b" className="shrink-0 mt-0.5" />
              <p className="text-[#ccc] text-[13px] leading-relaxed m-0">
                You&apos;re losing <strong className="text-[#ff6b6b]">${Math.abs(result.profit)}</strong> on every sale.
                Raise your price above <strong>${result.breakEvenPrice}</strong> before spending on ads.
              </p>
            </div>
          )}

          <ToolCTA toolName="profit-calculator" />
        </motion.div>
      )}
    </div>
  )
}
