'use client'

// app/tools/tools/ProfitCalculator.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

export default function ProfitCalculator() {
  const [price, setPrice] = useState(49)
  const [cost, setCost] = useState(15)
  const [ads, setAds] = useState(10)
  const [fees, setFees] = useState(2.9)
  const [result, setResult] = useState<null | {
    profit: number
    margin: number
    processingFee: number
    monthlyProfit100: number
  }>(null)

  const calculate = () => {
    const processingFee = (price * fees) / 100
    const profit = price - cost - ads - processingFee
    const margin = (profit / price) * 100
    const r = {
      profit: Math.round(profit * 100) / 100,
      margin: Math.round(margin * 10) / 10,
      processingFee: Math.round(processingFee * 100) / 100,
      monthlyProfit100: Math.round(profit * 100),
    }
    setResult(r)
    trackToolUsage('profit-calculator', { price, cost, ads, fees }, r as unknown as Record<string, unknown>)
  }

  const inputClass = "w-full px-3 py-2.5 text-sm text-white rounded-lg outline-none"
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        📊 Profit Calculator
      </h2>
      <p className="text-[#777] text-sm mb-6">
        Find your real profit after product cost, ad spend, and payment fees.
      </p>

      <div className="grid grid-cols-2 gap-3.5 mb-6">
        {[
          { label: 'Selling Price ($)', value: price, set: setPrice, hint: 'What you charge' },
          { label: 'Product Cost ($)', value: cost, set: setCost, hint: 'What you pay' },
          { label: 'Ad Spend Per Sale ($)', value: ads, set: setAds, hint: 'CPC / avg per conversion' },
          { label: 'Payment Fee (%)', value: fees, set: setFees, step: 0.1, hint: 'Stripe = 2.9%' },
        ].map(({ label, value, set, hint, step }) => (
          <div key={label}>
            <label className="block text-xs text-[#888] mb-1">
              {label} <span className="text-[#555]">— {hint}</span>
            </label>
            <input
              type="number" min={0} step={step || 1} value={value}
              onChange={(e) => set(Number(e.target.value))}
              className={inputClass} style={inputStyle}
            />
          </div>
        ))}
      </div>

      <button onClick={calculate} className="btn-primary flex items-center gap-2 mb-6">
        <TrendingUp size={15} /> Calculate Profit
      </button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Profit Per Sale', value: `$${result.profit}`, color: result.profit > 0 ? '#00ffaa' : '#ff6b6b' },
              { label: 'Profit Margin', value: `${result.margin}%`, color: result.margin > 30 ? '#00ffaa' : result.margin > 0 ? '#ffd93d' : '#ff6b6b' },
              { label: 'Processing Fee', value: `$${result.processingFee}`, color: '#aaa' },
              { label: 'Monthly (100 sales)', value: `$${result.monthlyProfit100.toLocaleString()}`, color: result.monthlyProfit100 > 0 ? '#00d4ff' : '#ff6b6b' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-[#777] text-xs mb-1">{item.label}</div>
                <div className="text-[22px] font-extrabold" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>

          {result.profit <= 0 && (
            <div className="rounded-xl p-3.5 flex gap-2.5" style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)' }}>
              <AlertTriangle size={16} color="#ff6b6b" className="shrink-0 mt-0.5" />
              <p className="text-[#ccc] text-[13px] leading-relaxed m-0">
                ⚠️ You&apos;re losing money on each sale! Consider raising your price, finding cheaper
                suppliers, or reducing ad spend.
              </p>
            </div>
          )}

          {result.margin > 0 && result.margin < 20 && (
            <div className="rounded-xl p-3.5 flex gap-2.5 mt-3" style={{ background: 'rgba(255,217,61,0.08)', border: '1px solid rgba(255,217,61,0.2)' }}>
              <AlertTriangle size={16} color="#ffd93d" className="shrink-0 mt-0.5" />
              <p className="text-[#ccc] text-[13px] leading-relaxed m-0">
                Low margin below 20%. Shopify&apos;s transaction fees + monthly plan will eat even more of this.
              </p>
            </div>
          )}

          <ToolCTA toolName="profit-calculator" />
        </motion.div>
      )}
    </div>
  )
}
