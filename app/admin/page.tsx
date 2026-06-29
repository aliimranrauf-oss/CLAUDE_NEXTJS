'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

// ── Types ─────────────────────────────────────────────────────────────────────
type Order = {
  id: number; name: string; email: string; domain: string | null
  platform: string | null; package: string | null; payment: string | null
  message: string | null; created_at: string
}
type Lead = { id: string; email: string; tool_used: string; created_at: string }
type Review = {
  id: number; name: string; rating: number; message: string
  date: string; Country: string; order_number: string | null
}
type Blog = {
  id: string; title: string; slug: string; excerpt: string | null
  category: string | null; author_name: string | null
  is_live: boolean; published_at: string
}
type PricingPlan = {
  id: string; name: string; price: number; delivery: string | null
  description: string | null; is_popular: boolean; is_active: boolean
}
type PaymentLink = {
  id: string; plan_name: string; payoneer_link: string
  is_used: boolean; created_at: string
}
type Template = {
  id: string; name: string | null; category: string | null
  description: string | null; is_primary: boolean; created_at: string
}

type Tab = 'analytics' | 'orders' | 'leads' | 'reviews' | 'blogs' | 'pricing' | 'payments' | 'templates'

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function Badge({ color, label }: { color: string; label: string }) {
  const bg: Record<string, string> = { green: 'rgba(52,211,153,0.15)', blue: 'rgba(0,212,255,0.15)', yellow: 'rgba(251,191,36,0.15)', red: 'rgba(255,77,109,0.15)', purple: 'rgba(122,92,255,0.15)', gray: 'rgba(255,255,255,0.08)' }
  const tx: Record<string, string> = { green: '#34d399', blue: '#00d4ff', yellow: '#fbbf24', red: '#ff4d6d', purple: '#a78bfa', gray: 'rgba(255,255,255,0.4)' }
  return <span style={{ background: bg[color] || bg.blue, color: tx[color] || tx.blue, borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
}

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#fbbf24', fontSize: 13 }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

const cell: React.CSSProperties = { padding: '14px 16px', color: 'rgba(255,255,255,0.8)', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }
const hcell: React.CSSProperties = { padding: '12px 16px', color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' }

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{ width: 40, height: 22, borderRadius: 11, background: checked ? '#00d4ff' : 'rgba(255,255,255,0.1)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: checked ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('analytics')
  const [orders, setOrders] = useState<Order[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [pricing, setPricing] = useState<PricingPlan[]>([])
  const [payments, setPayments] = useState<PaymentLink[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<number | string | null>(null)
  const [editPrice, setEditPrice] = useState<{ id: string; val: string } | null>(null)
  const [saving, setSaving] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const [o, l, r, b, p, py, t] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').order('date', { ascending: false }),
      supabase.from('blogs').select('*').order('published_at', { ascending: false }),
      supabase.from('pricing_plans').select('*').order('price', { ascending: true }),
      supabase.from('payment_links').select('*').order('created_at', { ascending: false }),
      supabase.from('templates').select('*').order('created_at', { ascending: false }),
    ])
    if (o.data) setOrders(o.data)
    if (l.data) setLeads(l.data)
    if (r.data) setReviews(r.data)
    if (b.data) setBlogs(b.data)
    if (p.data) setPricing(p.data)
    if (py.data) setPayments(py.data)
    if (t.data) setTemplates(t.data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  // ── Analytics calculations ─────────────────────────────────────────────────
  const thisMonth = orders.filter(o => new Date(o.created_at).getMonth() === new Date().getMonth() && new Date(o.created_at).getFullYear() === new Date().getFullYear())
  const pkgCount: Record<string, number> = {}
  orders.forEach(o => { if (o.package) pkgCount[o.package] = (pkgCount[o.package] || 0) + 1 })
  const topPkg = Object.entries(pkgCount).sort((a, b) => b[1] - a[1])[0]
  const platCount: Record<string, number> = {}
  orders.forEach(o => { if (o.platform) platCount[o.platform] = (platCount[o.platform] || 0) + 1 })
  const topPlat = Object.entries(platCount).sort((a, b) => b[1] - a[1])[0]
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—'

  // ── Toggle helpers ─────────────────────────────────────────────────────────
  async function toggleBlogLive(blog: Blog) {
    setSaving(blog.id)
    await supabase.from('blogs').update({ is_live: !blog.is_live }).eq('id', blog.id)
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, is_live: !b.is_live } : b))
    setSaving(null)
  }
  async function togglePlanActive(plan: PricingPlan) {
    setSaving(plan.id)
    await supabase.from('pricing_plans').update({ is_active: !plan.is_active }).eq('id', plan.id)
    setPricing(prev => prev.map(p => p.id === plan.id ? { ...p, is_active: !p.is_active } : p))
    setSaving(null)
  }
  async function togglePlanPopular(plan: PricingPlan) {
    setSaving(plan.id + 'pop')
    await supabase.from('pricing_plans').update({ is_popular: !plan.is_popular }).eq('id', plan.id)
    setPricing(prev => prev.map(p => p.id === plan.id ? { ...p, is_popular: !p.is_popular } : p))
    setSaving(null)
  }
  async function savePlanPrice(plan: PricingPlan) {
    if (!editPrice) return
    const newPrice = parseInt(editPrice.val)
    if (isNaN(newPrice)) return
    setSaving(plan.id + 'price')
    await supabase.from('pricing_plans').update({ price: newPrice }).eq('id', plan.id)
    setPricing(prev => prev.map(p => p.id === plan.id ? { ...p, price: newPrice } : p))
    setEditPrice(null)
    setSaving(null)
  }
  async function togglePaymentUsed(link: PaymentLink) {
    setSaving(link.id)
    await supabase.from('payment_links').update({ is_used: !link.is_used }).eq('id', link.id)
    setPayments(prev => prev.map(p => p.id === link.id ? { ...p, is_used: !p.is_used } : p))
    setSaving(null)
  }
  async function toggleTemplatePrimary(tpl: Template) {
    setSaving(tpl.id)
    await supabase.from('templates').update({ is_primary: !tpl.is_primary }).eq('id', tpl.id)
    setTemplates(prev => prev.map(t => t.id === tpl.id ? { ...t, is_primary: !t.is_primary } : t))
    setSaving(null)
  }

  // ── Search filters ─────────────────────────────────────────────────────────
  const fOrders = orders.filter(o => [o.name, o.email, o.domain, o.package, o.platform, o.message].join(' ').toLowerCase().includes(search.toLowerCase()))
  const fLeads = leads.filter(l => [l.email, l.tool_used].join(' ').toLowerCase().includes(search.toLowerCase()))
  const fReviews = reviews.filter(r => [r.name, r.message, r.Country].join(' ').toLowerCase().includes(search.toLowerCase()))
  const fBlogs = blogs.filter(b => [b.title, b.slug, b.category, b.author_name].join(' ').toLowerCase().includes(search.toLowerCase()))
  const fPricing = pricing.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  const fPayments = payments.filter(p => [p.plan_name, p.payoneer_link].join(' ').toLowerCase().includes(search.toLowerCase()))
  const fTemplates = templates.filter(t => [t.name, t.category, t.description].join(' ').toLowerCase().includes(search.toLowerCase()))

  function pkgColor(pkg: string | null) {
    if (!pkg) return 'blue'
    const p = pkg.toLowerCase()
    if (p.includes('starter') || p.includes('basic')) return 'blue'
    if (p.includes('pro') || p.includes('growth')) return 'purple'
    if (p.includes('elite') || p.includes('premium')) return 'yellow'
    return 'green'
  }

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'analytics', label: '📊 Analytics' },
    { key: 'orders', label: '🛒 Orders', count: orders.length },
    { key: 'leads', label: '💡 Leads', count: leads.length },
    { key: 'reviews', label: '⭐ Reviews', count: reviews.length },
    { key: 'blogs', label: '📝 Blogs', count: blogs.length },
    { key: 'pricing', label: '💰 Pricing', count: pricing.length },
    { key: 'payments', label: '🔗 Payment Links', count: payments.length },
    { key: 'templates', label: '🎨 Templates', count: templates.length },
  ]

  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
    fontSize: 12, fontWeight: 600, transition: 'all 0.2s', whiteSpace: 'nowrap',
    background: tab === t ? 'linear-gradient(135deg,#00d4ff,#7a5cff)' : 'rgba(255,255,255,0.05)',
    color: tab === t ? 'white' : 'rgba(255,255,255,0.5)',
  })

  const emptyMsg = (msg: string) => (
    <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>{msg}</div>
  )

  return (
    <div style={{ padding: '24px 20px', maxWidth: 1300, margin: '0 auto' }}>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.key} style={tabStyle(t.key)} onClick={() => { setTab(t.key); setSearch('') }}>
            {t.label}{t.count !== undefined ? ` (${t.count})` : ''}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 14px', color: 'white', fontSize: 12, outline: 'none', width: 200 }} />
          <button onClick={fetchData} style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 8, padding: '7px 12px', color: '#00d4ff', cursor: 'pointer', fontSize: 16 }}>↻</button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 80, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
      ) : (
        <>
          {/* ══════════════════ ANALYTICS TAB ══════════════════ */}
          {tab === 'analytics' && (
            <div>
              {/* Big stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 16, marginBottom: 24 }}>
                {[
                  { label: 'Total Orders', val: orders.length, color: '#00d4ff' },
                  { label: 'This Month', val: thisMonth.length, color: '#fbbf24' },
                  { label: 'Total Leads', val: leads.length, color: '#a78bfa' },
                  { label: 'Total Reviews', val: reviews.length, color: '#34d399' },
                  { label: 'Avg Rating', val: avgRating, color: '#fbbf24' },
                  { label: 'Active Blogs', val: blogs.filter(b => b.is_live).length, color: '#00d4ff' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '20px 24px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
                    <p style={{ color: s.color, fontSize: 34, fontWeight: 700, margin: 0, fontFamily: 'Syne,sans-serif' }}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Top package + platform */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '0 0 12px', textTransform: 'uppercase' }}>Most Popular Package</p>
                  {topPkg ? <><p style={{ color: 'white', fontWeight: 700, fontSize: 18, margin: '0 0 4px' }}>{topPkg[0]}</p><p style={{ color: '#00d4ff', fontSize: 13, margin: 0 }}>{topPkg[1]} orders</p></> : <p style={{ color: 'rgba(255,255,255,0.3)', margin: 0 }}>No data</p>}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '0 0 12px', textTransform: 'uppercase' }}>Most Common Platform</p>
                  {topPlat ? <><p style={{ color: 'white', fontWeight: 700, fontSize: 18, margin: '0 0 4px' }}>{topPlat[0]}</p><p style={{ color: '#a78bfa', fontSize: 13, margin: 0 }}>{topPlat[1]} orders</p></> : <p style={{ color: 'rgba(255,255,255,0.3)', margin: 0 }}>No data</p>}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '0 0 12px', textTransform: 'uppercase' }}>Package Breakdown</p>
                  {Object.entries(pkgCount).length === 0 ? <p style={{ color: 'rgba(255,255,255,0.3)', margin: 0 }}>No data</p> :
                    Object.entries(pkgCount).sort((a, b) => b[1] - a[1]).map(([name, cnt]) => (
                      <div key={name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{name}</span>
                        <span style={{ color: '#00d4ff', fontSize: 12, fontWeight: 600 }}>{cnt}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Recent orders mini */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>Recent 5 Orders</p>
                {orders.slice(0, 5).map(o => (
                  <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <span style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{o.name}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginLeft: 8 }}>{o.email}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {o.package && <Badge color={pkgColor(o.package)} label={o.package} />}
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>{fmt(o.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ ORDERS TAB ══════════════════ */}
          {tab === 'orders' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
              {fOrders.length === 0 ? emptyMsg('No orders found.') : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>ID</th><th style={hcell}>Date</th><th style={hcell}>Name</th>
                      <th style={hcell}>Email</th><th style={hcell}>Package</th><th style={hcell}>Platform</th>
                      <th style={hcell}>Payment</th><th style={hcell}>Domain</th><th style={hcell}>Message</th>
                    </tr></thead>
                    <tbody>
                      {fOrders.map(o => (
                        <>
                          <tr key={o.id} onClick={() => setExpanded(expanded === o.id ? null : o.id)} style={{ cursor: 'pointer' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                            <td style={{ ...cell, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>#{o.id}</td>
                            <td style={{ ...cell, whiteSpace: 'nowrap' }}>{fmt(o.created_at)}</td>
                            <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{o.name}</td>
                            <td style={cell}><a href={`mailto:${o.email}`} style={{ color: '#00d4ff', textDecoration: 'none' }}>{o.email}</a></td>
                            <td style={cell}>{o.package ? <Badge color={pkgColor(o.package)} label={o.package} /> : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}</td>
                            <td style={cell}>{o.platform || <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}</td>
                            <td style={cell}>{o.payment || <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}</td>
                            <td style={{ ...cell, fontSize: 12 }}>{o.domain || <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}</td>
                            <td style={{ ...cell, maxWidth: 200 }}>
                              {o.message ? <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{o.message.length > 60 ? o.message.slice(0, 60) + '…' : o.message}</span> : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
                            </td>
                          </tr>
                          {expanded === o.id && o.message && (
                            <tr key={`exp-${o.id}`}><td colSpan={9} style={{ padding: '0 16px 16px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 8, padding: '12px 16px', color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6 }}>
                                <strong style={{ color: '#00d4ff', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Message</strong>
                                <p style={{ margin: '8px 0 0' }}>{o.message}</p>
                              </div>
                            </td></tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════ LEADS TAB ══════════════════ */}
          {tab === 'leads' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
              {fLeads.length === 0 ? emptyMsg('No leads found.') : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>Date</th><th style={hcell}>Email</th><th style={hcell}>Tool Used</th>
                    </tr></thead>
                    <tbody>
                      {fLeads.map(l => (
                        <tr key={l.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ ...cell, whiteSpace: 'nowrap' }}>{fmt(l.created_at)}</td>
                          <td style={cell}><a href={`mailto:${l.email}`} style={{ color: '#00d4ff', textDecoration: 'none' }}>{l.email}</a></td>
                          <td style={cell}><Badge color="purple" label={l.tool_used} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════ REVIEWS TAB ══════════════════ */}
          {tab === 'reviews' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
              {fReviews.length === 0 ? emptyMsg('No reviews found.') : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>Date</th><th style={hcell}>Name</th><th style={hcell}>Country</th>
                      <th style={hcell}>Rating</th><th style={hcell}>Order #</th><th style={hcell}>Message</th>
                    </tr></thead>
                    <tbody>
                      {fReviews.map(r => (
                        <>
                          <tr key={r.id} onClick={() => setExpanded(expanded === `r${r.id}` ? null : `r${r.id}`)} style={{ cursor: 'pointer' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                            <td style={{ ...cell, whiteSpace: 'nowrap' }}>{r.date ? fmt(r.date) : '—'}</td>
                            <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{r.name}</td>
                            <td style={cell}>{r.Country || '—'}</td>
                            <td style={cell}><Stars n={r.rating} /></td>
                            <td style={{ ...cell, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r.order_number || '—'}</td>
                            <td style={{ ...cell, maxWidth: 240, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{r.message.length > 80 ? r.message.slice(0, 80) + '…' : r.message}</td>
                          </tr>
                          {expanded === `r${r.id}` && (
                            <tr key={`rexp-${r.id}`}><td colSpan={6} style={{ padding: '0 16px 16px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 8, padding: '12px 16px', color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6 }}>
                                <Stars n={r.rating} /><p style={{ margin: '8px 0 0' }}>{r.message}</p>
                              </div>
                            </td></tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════ BLOGS TAB ══════════════════ */}
          {tab === 'blogs' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
              {fBlogs.length === 0 ? emptyMsg('No blogs found.') : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>Published</th><th style={hcell}>Title</th><th style={hcell}>Category</th>
                      <th style={hcell}>Author</th><th style={hcell}>Live</th>
                    </tr></thead>
                    <tbody>
                      {fBlogs.map(b => (
                        <tr key={b.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ ...cell, whiteSpace: 'nowrap', fontSize: 12 }}>{fmt(b.published_at)}</td>
                          <td style={{ ...cell, maxWidth: 280 }}>
                            <p style={{ margin: '0 0 2px', fontWeight: 600, color: 'white', fontSize: 13 }}>{b.title}</p>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>/{b.slug}</p>
                          </td>
                          <td style={cell}>{b.category ? <Badge color="blue" label={b.category} /> : '—'}</td>
                          <td style={{ ...cell, fontSize: 12 }}>{b.author_name || '—'}</td>
                          <td style={cell}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Toggle checked={b.is_live} onChange={() => toggleBlogLive(b)} />
                              <span style={{ fontSize: 11, color: b.is_live ? '#34d399' : 'rgba(255,255,255,0.3)' }}>{saving === b.id ? 'Saving…' : b.is_live ? 'Live' : 'Draft'}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════ PRICING TAB ══════════════════ */}
          {tab === 'pricing' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
              {fPricing.length === 0 ? emptyMsg('No plans found.') : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>Plan</th><th style={hcell}>Price ($)</th><th style={hcell}>Delivery</th>
                      <th style={hcell}>Popular</th><th style={hcell}>Active</th>
                    </tr></thead>
                    <tbody>
                      {fPricing.map(p => (
                        <tr key={p.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{p.name}</td>
                          <td style={cell}>
                            {editPrice?.id === p.id ? (
                              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                <input value={editPrice.val} onChange={e => setEditPrice({ id: p.id, val: e.target.value })}
                                  style={{ width: 80, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 6, padding: '4px 8px', color: 'white', fontSize: 13, outline: 'none' }} />
                                <button onClick={() => savePlanPrice(p)} style={{ background: '#00d4ff', border: 'none', borderRadius: 6, padding: '4px 10px', color: '#0b0f1a', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                                  {saving === p.id + 'price' ? '…' : 'Save'}
                                </button>
                                <button onClick={() => setEditPrice(null)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 6, padding: '4px 8px', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer' }}>✕</button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ color: '#fbbf24', fontWeight: 700 }}>${p.price}</span>
                                <button onClick={() => setEditPrice({ id: p.id, val: String(p.price) })} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 5, padding: '3px 8px', color: 'rgba(255,255,255,0.4)', fontSize: 11, cursor: 'pointer' }}>Edit</button>
                              </div>
                            )}
                          </td>
                          <td style={{ ...cell, fontSize: 12 }}>{p.delivery || '—'}</td>
                          <td style={cell}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Toggle checked={p.is_popular} onChange={() => togglePlanPopular(p)} />
                              <span style={{ fontSize: 11, color: p.is_popular ? '#fbbf24' : 'rgba(255,255,255,0.3)' }}>{saving === p.id + 'pop' ? '…' : p.is_popular ? 'Yes' : 'No'}</span>
                            </div>
                          </td>
                          <td style={cell}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Toggle checked={p.is_active} onChange={() => togglePlanActive(p)} />
                              <span style={{ fontSize: 11, color: p.is_active ? '#34d399' : 'rgba(255,255,255,0.3)' }}>{saving === p.id ? '…' : p.is_active ? 'Active' : 'Hidden'}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════ PAYMENT LINKS TAB ══════════════════ */}
          {tab === 'payments' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
              {fPayments.length === 0 ? emptyMsg('No payment links found.') : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>Date</th><th style={hcell}>Plan</th><th style={hcell}>Link</th><th style={hcell}>Used</th>
                    </tr></thead>
                    <tbody>
                      {fPayments.map(p => (
                        <tr key={p.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ ...cell, whiteSpace: 'nowrap', fontSize: 12 }}>{fmt(p.created_at)}</td>
                          <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{p.plan_name}</td>
                          <td style={{ ...cell, maxWidth: 300 }}>
                            <a href={p.payoneer_link} target="_blank" rel="noopener noreferrer"
                              style={{ color: '#00d4ff', fontSize: 12, textDecoration: 'none', wordBreak: 'break-all' }}>
                              {p.payoneer_link.length > 50 ? p.payoneer_link.slice(0, 50) + '…' : p.payoneer_link}
                            </a>
                          </td>
                          <td style={cell}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Toggle checked={p.is_used} onChange={() => togglePaymentUsed(p)} />
                              <span style={{ fontSize: 11, color: p.is_used ? '#ff4d6d' : '#34d399' }}>{saving === p.id ? '…' : p.is_used ? 'Used' : 'Available'}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════ TEMPLATES TAB ══════════════════ */}
          {tab === 'templates' && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
              {fTemplates.length === 0 ? emptyMsg('No templates found.') : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>Name</th><th style={hcell}>Category</th><th style={hcell}>Description</th><th style={hcell}>Primary</th>
                    </tr></thead>
                    <tbody>
                      {fTemplates.map(t => (
                        <tr key={t.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{t.name || '—'}</td>
                          <td style={cell}>{t.category ? <Badge color="purple" label={t.category} /> : '—'}</td>
                          <td style={{ ...cell, maxWidth: 280, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{t.description ? (t.description.length > 80 ? t.description.slice(0, 80) + '…' : t.description) : '—'}</td>
                          <td style={cell}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Toggle checked={t.is_primary} onChange={() => toggleTemplatePrimary(t)} />
                              <span style={{ fontSize: 11, color: t.is_primary ? '#00d4ff' : 'rgba(255,255,255,0.3)' }}>{saving === t.id ? '…' : t.is_primary ? 'Primary' : 'Secondary'}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: 11, textAlign: 'center', marginTop: 24 }}>
        MakeMyStore Admin · Live Supabase data
      </p>
    </div>
  )
}
