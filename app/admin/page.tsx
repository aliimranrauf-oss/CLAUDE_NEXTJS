'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

// ── Types ────────────────────────────────────────────────────────────────────
type Order = {
  id: number
  name: string
  email: string
  domain: string | null
  platform: string | null
  package: string | null
  payment: string | null
  message: string | null
  created_at: string
  status?: string
}

type Lead = {
  id: string
  email: string
  tool_used: string
  created_at: string
}

type Review = {
  id: number
  name: string
  rating: number
  message: string
  date: string
  Country: string
  order_number: string | null
}

type Tab = 'orders' | 'leads' | 'reviews'

// ── Helpers ──────────────────────────────────────────────────────────────────
function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function Badge({ color, label }: { color: string; label: string }) {
  const colors: Record<string, string> = {
    green: 'rgba(52,211,153,0.15)',
    blue: 'rgba(0,212,255,0.15)',
    yellow: 'rgba(251,191,36,0.15)',
    red: 'rgba(255,77,109,0.15)',
    purple: 'rgba(122,92,255,0.15)',
  }
  const text: Record<string, string> = {
    green: '#34d399', blue: '#00d4ff', yellow: '#fbbf24', red: '#ff4d6d', purple: '#a78bfa',
  }
  return (
    <span style={{
      background: colors[color] || colors.blue,
      color: text[color] || text.blue,
      borderRadius: 6,
      padding: '3px 10px',
      fontSize: 11,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12,
      padding: '20px 24px',
      flex: 1,
      minWidth: 140,
    }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
      <p style={{ color, fontSize: 32, fontWeight: 700, margin: 0, fontFamily: 'Syne,sans-serif' }}>{value}</p>
    </div>
  )
}

// ── Cell styles ──────────────────────────────────────────────────────────────
const cell: React.CSSProperties = {
  padding: '14px 16px',
  color: 'rgba(255,255,255,0.8)',
  fontSize: 13,
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  verticalAlign: 'top',
}
const hcell: React.CSSProperties = {
  padding: '12px 16px',
  color: 'rgba(255,255,255,0.35)',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  whiteSpace: 'nowrap',
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<number | string | null>(null)

  // fetch all data
  const fetchData = useCallback(async () => {
    setLoading(true)
    const [o, l, r] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').order('date', { ascending: false }),
    ])
    if (o.data) setOrders(o.data)
    if (l.data) setLeads(l.data)
    if (r.data) setReviews(r.data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  // search filter
  const filteredOrders = orders.filter(o =>
    [o.name, o.email, o.domain, o.package, o.platform, o.message].join(' ').toLowerCase().includes(search.toLowerCase())
  )
  const filteredLeads = leads.filter(l =>
    [l.email, l.tool_used].join(' ').toLowerCase().includes(search.toLowerCase())
  )
  const filteredReviews = reviews.filter(r =>
    [r.name, r.message, r.Country].join(' ').toLowerCase().includes(search.toLowerCase())
  )

  // package color
  function pkgColor(pkg: string | null) {
    if (!pkg) return 'blue'
    const p = pkg.toLowerCase()
    if (p.includes('starter') || p.includes('basic')) return 'blue'
    if (p.includes('pro') || p.includes('growth')) return 'purple'
    if (p.includes('elite') || p.includes('premium')) return 'yellow'
    return 'green'
  }

  // rating stars
  function Stars({ n }: { n: number }) {
    return <span style={{ color: '#fbbf24', fontSize: 13 }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
  }

  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding: '8px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    transition: 'all 0.2s',
    background: tab === t ? 'linear-gradient(135deg,#00d4ff,#7a5cff)' : 'rgba(255,255,255,0.05)',
    color: tab === t ? 'white' : 'rgba(255,255,255,0.5)',
  })

  return (
    <div style={{ padding: '28px 24px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
        <StatCard label="Total Orders" value={orders.length} color="#00d4ff" />
        <StatCard label="Leads" value={leads.length} color="#a78bfa" />
        <StatCard label="Reviews" value={reviews.length} color="#34d399" />
        <StatCard label="This Month" value={orders.filter(o => new Date(o.created_at).getMonth() === new Date().getMonth()).length} color="#fbbf24" />
      </div>

      {/* Tabs + Search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={tabStyle('orders')} onClick={() => setTab('orders')}>
            Orders ({orders.length})
          </button>
          <button style={tabStyle('leads')} onClick={() => setTab('leads')}>
            Leads ({leads.length})
          </button>
          <button style={tabStyle('reviews')} onClick={() => setTab('reviews')}>
            Reviews ({reviews.length})
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '8px 14px',
              color: 'white',
              fontSize: 13,
              outline: 'none',
              width: 220,
            }}
          />
          <button
            onClick={fetchData}
            title="Refresh"
            style={{
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 8,
              padding: '8px 12px',
              color: '#00d4ff',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >↻</button>
        </div>
      </div>

      {/* Table container */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            Loading...
          </div>
        ) : (

          // ── ORDERS TAB ────────────────────────────────────────────────────
          tab === 'orders' ? (
            <div style={{ overflowX: 'auto' }}>
              {filteredOrders.length === 0 ? (
                <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No orders found.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>ID</th>
                      <th style={hcell}>Date</th>
                      <th style={hcell}>Name</th>
                      <th style={hcell}>Email</th>
                      <th style={hcell}>Package</th>
                      <th style={hcell}>Platform</th>
                      <th style={hcell}>Payment</th>
                      <th style={hcell}>Domain</th>
                      <th style={hcell}>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(o => (
                      <>
                        <tr
                          key={o.id}
                          onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                          style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ ...cell, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>#{o.id}</td>
                          <td style={{ ...cell, whiteSpace: 'nowrap' }}>{fmt(o.created_at)}</td>
                          <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{o.name}</td>
                          <td style={cell}>
                            <a href={`mailto:${o.email}`} style={{ color: '#00d4ff', textDecoration: 'none' }}>{o.email}</a>
                          </td>
                          <td style={cell}>{o.package ? <Badge color={pkgColor(o.package)} label={o.package} /> : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}</td>
                          <td style={cell}>{o.platform || <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}</td>
                          <td style={cell}>{o.payment || <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}</td>
                          <td style={{ ...cell, fontSize: 12 }}>{o.domain || <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}</td>
                          <td style={{ ...cell, maxWidth: 200 }}>
                            {o.message
                              ? <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{o.message.length > 60 ? o.message.slice(0, 60) + '…' : o.message}</span>
                              : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
                          </td>
                        </tr>
                        {/* Expanded message row */}
                        {expanded === o.id && o.message && (
                          <tr key={`exp-${o.id}`}>
                            <td colSpan={9} style={{
                              padding: '0 16px 16px 48px',
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                            }}>
                              <div style={{
                                background: 'rgba(0,212,255,0.05)',
                                border: '1px solid rgba(0,212,255,0.15)',
                                borderRadius: 8,
                                padding: '12px 16px',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 13,
                                lineHeight: 1.6,
                              }}>
                                <strong style={{ color: '#00d4ff', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Message</strong>
                                <p style={{ margin: '8px 0 0' }}>{o.message}</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          // ── LEADS TAB ─────────────────────────────────────────────────────
          ) : tab === 'leads' ? (
            <div style={{ overflowX: 'auto' }}>
              {filteredLeads.length === 0 ? (
                <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No leads found.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>Date</th>
                      <th style={hcell}>Email</th>
                      <th style={hcell}>Tool Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map(l => (
                      <tr key={l.id}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ ...cell, whiteSpace: 'nowrap' }}>{fmt(l.created_at)}</td>
                        <td style={cell}>
                          <a href={`mailto:${l.email}`} style={{ color: '#00d4ff', textDecoration: 'none' }}>{l.email}</a>
                        </td>
                        <td style={cell}>
                          <Badge color="purple" label={l.tool_used} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          // ── REVIEWS TAB ───────────────────────────────────────────────────
          ) : (
            <div style={{ overflowX: 'auto' }}>
              {filteredReviews.length === 0 ? (
                <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No reviews found.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={hcell}>Date</th>
                      <th style={hcell}>Name</th>
                      <th style={hcell}>Country</th>
                      <th style={hcell}>Rating</th>
                      <th style={hcell}>Order #</th>
                      <th style={hcell}>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReviews.map(r => (
                      <>
                        <tr
                          key={r.id}
                          onClick={() => setExpanded(expanded === `r${r.id}` ? null : `r${r.id}`)}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ ...cell, whiteSpace: 'nowrap' }}>{r.date ? fmt(r.date) : '—'}</td>
                          <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{r.name}</td>
                          <td style={cell}>{r.Country || '—'}</td>
                          <td style={cell}><Stars n={r.rating} /></td>
                          <td style={{ ...cell, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r.order_number || '—'}</td>
                          <td style={{ ...cell, maxWidth: 240, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                            {r.message.length > 80 ? r.message.slice(0, 80) + '…' : r.message}
                          </td>
                        </tr>
                        {expanded === `r${r.id}` && (
                          <tr key={`rexp-${r.id}`}>
                            <td colSpan={6} style={{ padding: '0 16px 16px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{
                                background: 'rgba(251,191,36,0.05)',
                                border: '1px solid rgba(251,191,36,0.15)',
                                borderRadius: 8,
                                padding: '12px 16px',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 13,
                                lineHeight: 1.6,
                              }}>
                                <Stars n={r.rating} />
                                <p style={{ margin: '8px 0 0' }}>{r.message}</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )
        )}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11, textAlign: 'center', marginTop: 24 }}>
        MakeMyStore Admin · Showing live Supabase data
      </p>
    </div>
  )
}
