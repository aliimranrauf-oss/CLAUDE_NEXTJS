'use client'

// app/tools/tools/ShopifyCostCalculator.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

/*
  IMPROVEMENTS:
  1. Added Shopify Plus as a plan option
  2. Hidden costs section — theme, domain, email, chargebacks
  3. Monthly cost breakdown so users see ongoing burn
  4. Break-even timeline: "You recover the custom store cost in X months"
  5. Cost-per-sale metric — makes it feel personal at any revenue level
  6. Visual cost comparison bar between Shopify total vs custom
*/

const PLANS = [
  { label: 'Basic',    monthly: 39,  txRate: 0.02,  txLabel: '2.0%' },
  { label: 'Shopify',  monthly: 105, txRate: 0.01,  txLabel: '1.0%' },
  { label: 'Advanced', monthly: 399, txRate: 0.005, txLabel: '0.5%' },
  { label: 'Plus',     monthly: 2300, txRate: 0,    txLabel: '0%'   },
]

const CUSTOM_STORE_COST = 599

export default function ShopifyCostCalculator() {
  const [planIndex, setPlanIndex] = useState(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000)
  const [monthlySales, setMonthlySales] = useState(100)
  const [years, setYears] = useState(3)
  const [result, setResult] = useState<null | {
    shopifyFees: number
    txFees: number
    appCosts: number
    hiddenCosts: number
    grandTotal: number
    customSavings: number
    monthlyTotal: number
    costPerSale: number
    breakEvenMonths: number
  }>(null)

  const calculate = () => {
    const plan = PLANS[planIndex]
    const shopifyFees  = plan.monthly * 12 * years
    const txFees       = monthlyRevenue * plan.txRate * 12 * years
    const appCosts     = 55 * 12 * years          // ~$55/mo avg apps
    const hiddenCosts  = (
      180 +                                        // theme: $180 one-time spread over period
      (15 * 12 * years) +                          // email marketing: $15/mo
      (20 * 12 * years)                            // domain + misc: $20/mo
    )
    const grandTotal   = shopifyFees + txFees + appCosts + hiddenCosts
    const monthlyTotal = Math.round(grandTotal / (years * 12))
    const costPerSale  = monthlySales > 0 ? Math.round((monthlyTotal / monthlySales) * 100) / 100 : 0
    const monthlySavingVsCustom = monthlyTotal - 0  // custom has $0/mo
    const breakEvenMonths = monthlySavingVsCustom > 0 ? Math.ceil(CUSTOM_STORE_COST / monthlySavingVsCustom) : 0

    const r = {
      shopifyFees:     Math.round(shopifyFees),
      txFees:          Math.round(txFees),
      appCosts:        Math.round(appCosts),
      hiddenCosts:     Math.round(hiddenCosts),
      grandTotal:      Math.round(grandTotal),
      customSavings:   Math.round(grandTotal - CUSTOM_STORE_COST),
      monthlyTotal,
      costPerSale,
      breakEvenMonths,
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
        See the real total cost of Shopify — including fees most store owners forget.
      </p>

      <div className="flex flex-col gap-4 mb-6">

        {/* Plan selector */}
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Shopify Plan</label>
          <div className="flex gap-2 flex-wrap">
            {PLANS.map((p, i) => (
              <button
                key={i} onClick={() => setPlanIndex(i)}
                className="px-3 py-2 rounded-lg text-[12px] font-semibold transition-all"
                style={{
                  border: '1px solid',
                  borderColor: planIndex === i ? '#00d4ff' : 'rgba(255,255,255,0.1)',
                  background: planIndex === i ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                  color: planIndex === i ? '#00d4ff' : '#888',
                }}
              >
                {p.label} <span style={{ color: planIndex === i ? '#00d4ff' : '#555' }}>${p.monthly}/mo</span>
              </button>
            ))}
          </div>
          <div className="text-[11px] text-[#555] mt-1.5">
            Transaction fee: <span className="text-[#aaa]">{PLANS[planIndex].txLabel}</span> per sale (waived with Shopify Payments)
          </div>
        </div>

        {/* Monthly revenue */}
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">
            Monthly Revenue: <strong className="text-white">${monthlyRevenue.toLocaleString()}</strong>
          </label>
          <input type="range" min={500} max={100000} step={500} value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            className="w-full accent-[#00d4ff]" />
          <div className="flex justify-between text-[10px] text-[#444] mt-0.5">
            <span>$500</span><span>$100k</span>
          </div>
        </div>

        {/* Monthly sales count */}
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">
            Monthly Orders: <strong className="text-white">{monthlySales}</strong>
          </label>
          <input type="range" min={10} max={5000} step={10} value={monthlySales}
            onChange={(e) => setMonthlySales(Number(e.target.value))}
            className="w-full accent-[#7a5cff]" />
        </div>

        {/* Years */}
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">
            How long on Shopify: <strong className="text-white">{years} year{years > 1 ? 's' : ''}</strong>
          </label>
          <input type="range" min={1} max={10} step={1} value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[#ff9f43]" />
          <div className="flex justify-between text-[10px] text-[#444] mt-0.5">
            <span>1 yr</span><span>10 yrs</span>
          </div>
        </div>
      </div>

      <button onClick={calculate} className="btn-primary flex items-center gap-2 mb-6">
        <Calculator size={15} /> Calculate Full Cost
      </button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* Monthly burn + cost per sale — top KPIs */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl p-3.5 text-center" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}>
              <div className="text-[11px] text-[#888] mb-1">You pay Shopify every month</div>
              <div className="text-2xl font-extrabold text-[#ff6b6b]">${result.monthlyTotal.toLocaleString()}</div>
              <div className="text-[10px] text-[#555] mt-0.5">subscription + fees + apps</div>
            </div>
            <div className="rounded-xl p-3.5 text-center" style={{ background: 'rgba(255,159,67,0.08)', border: '1px solid rgba(255,159,67,0.2)' }}>
              <div className="text-[11px] text-[#888] mb-1">Platform cost per order</div>
              <div className="text-2xl font-extrabold text-[#ff9f43]">${result.costPerSale}</div>
              <div className="text-[10px] text-[#555] mt-0.5">profit eaten per sale</div>
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="font-bold text-[13px] text-[#aaa] mb-3">Cost Breakdown over {years} year{years > 1 ? 's' : ''}</div>
            {[
              { label: 'Shopify Subscription',     value: result.shopifyFees,  color: '#ff6b6b' },
              { label: 'Transaction Fees',          value: result.txFees,       color: '#ffd93d' },
              { label: 'Apps (~$55/mo)',             value: result.appCosts,     color: '#ff9f43' },
              { label: 'Hidden Costs (theme, email, domain)', value: result.hiddenCosts, color: '#ff6b6b' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center mb-2">
                <span className="text-[13px] text-[#bbb]">{item.label}</span>
                <span className="text-[13px] font-bold" style={{ color: item.color }}>${item.value.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-white">Total</span>
                <span className="text-[20px] font-extrabold text-[#ff6b6b]">${result.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Savings callout */}
          {result.customSavings > 0 && (
            <div className="rounded-xl p-5 text-center mb-4" style={{ background: 'rgba(0,255,170,0.07)', border: '1px solid rgba(0,255,170,0.2)' }}>
              <TrendingDown size={26} color="#00ffaa" className="mx-auto mb-2" />
              <div className="text-3xl font-black text-[#00ffaa]">${result.customSavings.toLocaleString()}</div>
              <div className="text-[#aaa] text-sm mt-1">saved by owning your store outright</div>
              {result.breakEvenMonths > 0 && (
                <div className="mt-2 text-[12px] text-[#00d4ff]">
                  A custom store (<strong>${CUSTOM_STORE_COST}</strong>) pays for itself in{' '}
                  <strong>{result.breakEvenMonths} month{result.breakEvenMonths > 1 ? 's' : ''}</strong>
                </div>
              )}
            </div>
          )}

          {/* Visual comparison */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[13px] font-bold text-[#aaa] mb-3">Total Cost Comparison</div>
            {[
              { label: `Shopify (${years}yr)`, value: result.grandTotal, color: '#ff6b6b', max: result.grandTotal },
              { label: 'Custom Store',         value: CUSTOM_STORE_COST, color: '#00ffaa', max: result.grandTotal },
            ].map((bar) => (
              <div key={bar.label} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-[12px] text-[#bbb]">{bar.label}</span>
                  <span className="text-[12px] font-bold" style={{ color: bar.color }}>${bar.value.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(bar.value / bar.max) * 100}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3.5 flex gap-2.5 mb-3" style={{ background: 'rgba(255,107,107,0.07)', border: '1px solid rgba(255,107,107,0.15)' }}>
            <AlertTriangle size={15} color="#ff6b6b" className="shrink-0 mt-0.5" />
            <p className="text-[#bbb] text-[13px] leading-relaxed m-0">
              Doesn&apos;t include premium theme upgrades ($300+), chargeback fees, or migration costs if you ever leave Shopify.
            </p>
          </div>

          <ToolCTA toolName="shopify-cost-calculator" />
        </motion.div>
      )}
    </div>
  )
}
