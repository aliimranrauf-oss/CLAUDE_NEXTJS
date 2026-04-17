'use client'

// app/tools/tools/ShopifyCostCalculator.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingDown, AlertTriangle } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

const PLANS = [
  { label: 'Basic Shopify', monthly: 39 },
  { label: 'Shopify', monthly: 105 },
  { label: 'Advanced Shopify', monthly: 399 },
]

export default function ShopifyCostCalculator() {
  const [planIndex, setPlanIndex] = useState(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000)
  const [years, setYears] = useState(3)
  const [result, setResult] = useState<null | {
    shopifyTotal: number
    transactionFees: number
    appCosts: number
    grandTotal: number
    customSavings: number
  }>(null)

  const calculate = () => {
    const plan = PLANS[planIndex]
    const shopifyFees = plan.monthly * 12 * years
    const txRates = [0.02, 0.01, 0.005]
    const txFees = monthlyRevenue * txRates[planIndex] * 12 * years
    const appCosts = 50 * 12 * years
    const total = shopifyFees + txFees + appCosts
    const customStoreCost = 599

    const r = {
      shopifyTotal: Math.round(shopifyFees),
      transactionFees: Math.round(txFees),
      appCosts: Math.round(appCosts),
      grandTotal: Math.round(total),
      customSavings: Math.round(total - customStoreCost),
    }
    setResult(r)
    trackToolUsage('shopify-cost-calculator', { planIndex, monthlyRevenue, years }, r as unknown as Record<string, unknown>)
  }

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        💸 Shopify Cost Calculator
      </h2>
      <p className="text-[#777] text-sm mb-6">
        See the real cost of Shopify over time — vs. owning your store outright.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Shopify Plan</label>
          <div className="flex gap-2 flex-wrap">
            {PLANS.map((p, i) => (
              <button
                key={i}
                onClick={() => setPlanIndex(i)}
                className="px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all"
                style={{
                  border: '1px solid',
                  borderColor: planIndex === i ? '#00d4ff' : 'rgba(255,255,255,0.1)',
                  background: planIndex === i ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                  color: planIndex === i ? '#00d4ff' : '#888',
                }}
              >
                {p.label} (${p.monthly}/mo)
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">
            Monthly Revenue: <strong className="text-white">${monthlyRevenue.toLocaleString()}</strong>
          </label>
          <input
            type="range" min={500} max={100000} step={500}
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            className="w-full accent-[#00d4ff]"
          />
        </div>

        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">
            Years on Shopify: <strong className="text-white">{years} year{years > 1 ? 's' : ''}</strong>
          </label>
          <input
            type="range" min={1} max={10} step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[#7a5cff]"
          />
        </div>
      </div>

      <button onClick={calculate} className="btn-primary flex items-center gap-2 mb-6">
        <Calculator size={15} /> Calculate
      </button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Shopify Subscription', value: result.shopifyTotal, color: '#ff6b6b' },
              { label: 'Transaction Fees', value: result.transactionFees, color: '#ffd93d' },
              { label: 'App Costs (~$50/mo)', value: result.appCosts, color: '#ff9f43' },
              { label: 'Total Shopify Cost', value: result.grandTotal, color: '#ff6b6b', big: true },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-3.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${item.color}33` }}
              >
                <div className="text-[#888] text-xs mb-1">{item.label}</div>
                <div
                  className="font-extrabold"
                  style={{ color: item.color, fontSize: item.big ? '24px' : '20px' }}
                >
                  ${item.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {result.customSavings > 0 && (
            <div
              className="rounded-xl p-5 text-center mb-3"
              style={{ background: 'rgba(0,255,170,0.08)', border: '1px solid rgba(0,255,170,0.2)' }}
            >
              <TrendingDown size={28} color="#00ffaa" className="mx-auto mb-2" />
              <div className="text-3xl font-black text-[#00ffaa]">${result.customSavings.toLocaleString()}</div>
              <div className="text-[#aaa] text-sm">You could save this by owning your store outright</div>
            </div>
          )}

          <div
            className="rounded-xl p-3.5 flex gap-2.5 mt-3"
            style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)' }}
          >
            <AlertTriangle size={16} color="#ff6b6b" className="shrink-0 mt-0.5" />
            <p className="text-[#ccc] text-[13px] leading-relaxed m-0">
              This doesn&apos;t include Shopify&apos;s theme costs ($300+), premium app upgrades, or migration
              fees if you ever switch platforms.
            </p>
          </div>

          <ToolCTA toolName="shopify-cost-calculator" />
        </motion.div>
      )}
    </div>
  )
}
