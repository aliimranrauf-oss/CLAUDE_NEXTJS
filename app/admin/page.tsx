'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

// ── Types ─────────────────────────────────────────────────────────────────────
type Order = { id: number; name: string; email: string; domain: string | null; platform: string | null; package: string | null; payment: string | null; message: string | null; created_at: string }
type Lead = { id: string; email: string; tool_used: string; created_at: string }
type Review = { id: number; name: string; rating: number; message: string; date: string; Country: string; order_number: string | null; avatar_url: string | null }
type Blog = { id: string; title: string; slug: string; excerpt: string | null; content: string; image_url: string | null; author_name: string | null; category: string | null; is_live: boolean; published_at: string; updated_at: string }
type PricingPlan = { id: string; name: string; price: number; delivery: string | null; description: string | null; is_popular: boolean; is_active: boolean }
type PaymentLink = { id: string; plan_name: string; payoneer_link: string; is_used: boolean; created_at: string }
type Template = { id: string; name: string | null; category: string | null; description: string | null; is_primary: boolean; created_at: string }
type EmailContact = { contact_email: string; subject: string | null; latest_status: string; latest_event_at: string; message_id: string | null; link_clicked: string | null; followed_up_at: string | null }

type Tab = 'analytics' | 'orders' | 'leads' | 'reviews' | 'blogs' | 'pricing' | 'payments' | 'templates' | 'email_tracking'

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(d: string) { return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }

function Badge({ color, label }: { color: string; label: string }) {
  const bg: Record<string, string> = { green: 'rgba(52,211,153,0.15)', blue: 'rgba(0,212,255,0.15)', yellow: 'rgba(251,191,36,0.15)', red: 'rgba(255,77,109,0.15)', purple: 'rgba(122,92,255,0.15)', gray: 'rgba(255,255,255,0.08)' }
  const tx: Record<string, string> = { green: '#34d399', blue: '#00d4ff', yellow: '#fbbf24', red: '#ff4d6d', purple: '#a78bfa', gray: 'rgba(255,255,255,0.4)' }
  return <span style={{ background: bg[color] || bg.blue, color: tx[color] || tx.blue, borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
}

function Stars({ n }: { n: number }) { return <span style={{ color: '#fbbf24', fontSize: 13 }}>{'★'.repeat(Math.max(0,Math.min(5,n)))}{'☆'.repeat(5 - Math.max(0,Math.min(5,n)))}</span> }

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{ width: 40, height: 22, borderRadius: 11, background: checked ? '#00d4ff' : 'rgba(255,255,255,0.1)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: checked ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
    </div>
  )
}

const cell: React.CSSProperties = { padding: '12px 14px', color: 'rgba(255,255,255,0.8)', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'middle' }
const hcell: React.CSSProperties = { padding: '10px 14px', color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' }
const inp: React.CSSProperties = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none', width: '100%', boxSizing: 'border-box' }
const ta: React.CSSProperties = { ...inp, resize: 'vertical', minHeight: 90, fontFamily: 'inherit' }

function Btn({ onClick, color = 'blue', children, small, disabled }: { onClick: () => void; color?: string; children: React.ReactNode; small?: boolean; disabled?: boolean }) {
  const bg: Record<string, string> = { blue: 'linear-gradient(135deg,#00d4ff,#7a5cff)', red: 'rgba(255,77,109,0.18)', green: 'rgba(52,211,153,0.15)', gray: 'rgba(255,255,255,0.07)' }
  const cl: Record<string, string> = { blue: 'white', red: '#ff4d6d', green: '#34d399', gray: 'rgba(255,255,255,0.5)' }
  return <button onClick={onClick} disabled={disabled} style={{ background: bg[color], color: cl[color], border: 'none', borderRadius: 7, padding: small ? '5px 11px' : '9px 18px', fontWeight: 600, fontSize: small ? 11 : 13, cursor: disabled ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: disabled ? 0.5 : 1 }}>{children}</button>
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '14px 0 5px' }}>{children}</p>
}

function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28, width: '100%', maxWidth: wide ? 720 : 560, maxHeight: '92vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: 17, fontFamily: 'Syne,sans-serif' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ConfirmDelete({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Modal title="Confirm Delete" onClose={onCancel}>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 24 }}>{msg}</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Btn onClick={onCancel} color="gray">Cancel</Btn>
        <Btn onClick={onConfirm} color="red">Yes, Delete</Btn>
      </div>
    </Modal>
  )
}

function Row2({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>
}

const tblWrap: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }

// ══════════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('analytics')
  const [orders, setOrders] = useState<Order[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [pricing, setPricing] = useState<PricingPlan[]>([])
  const [payments, setPayments] = useState<PaymentLink[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [emailContacts, setEmailContacts] = useState<EmailContact[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<number | string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<{ msg: string; onConfirm: () => void } | null>(null)

  // ── Modal states ───────────────────────────────────────────────────────────
  const [orderModal, setOrderModal] = useState(false)
  const [orderEdit, setOrderEdit] = useState<Order | null>(null)
  const [orderForm, setOrderForm] = useState({ name: '', email: '', domain: '', platform: '', package: '', payment: '', message: '' })

  const [leadModal, setLeadModal] = useState(false)
  const [leadEdit, setLeadEdit] = useState<Lead | null>(null)
  const [leadForm, setLeadForm] = useState({ email: '', tool_used: '' })

  const [reviewModal, setReviewModal] = useState(false)
  const [reviewEdit, setReviewEdit] = useState<Review | null>(null)
  const [reviewForm, setReviewForm] = useState({ name: '', rating: '5', message: '', Country: '', order_number: '', avatar_url: '' })

  const [blogModal, setBlogModal] = useState(false)
  const [blogEdit, setBlogEdit] = useState<Blog | null>(null)
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', image_url: '', author_name: 'MakeMyStore Team', category: 'Ecommerce Tips', is_live: false })

  const [planModal, setPlanModal] = useState(false)
  const [planEdit, setPlanEdit] = useState<PricingPlan | null>(null)
  const [planForm, setPlanForm] = useState({ name: '', price: '', delivery: '', description: '', is_popular: false, is_active: true })

  const [payModal, setPayModal] = useState(false)
  const [payEdit, setPayEdit] = useState<PaymentLink | null>(null)
  const [payForm, setPayForm] = useState({ plan_name: '', payoneer_link: '', is_used: false })

  const [tplModal, setTplModal] = useState(false)
  const [tplEdit, setTplEdit] = useState<Template | null>(null)
  const [tplForm, setTplForm] = useState({ name: '', category: '', description: '', is_primary: false })

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)
    const [o, l, r, b, p, py, t, ec] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').order('date', { ascending: false }),
      supabase.from('blogs').select('*').order('published_at', { ascending: false }),
      supabase.from('pricing_plans').select('*').order('price', { ascending: true }),
      supabase.from('payment_links').select('*').order('created_at', { ascending: false }),
      supabase.from('templates').select('*').order('created_at', { ascending: false }),
      supabase.from('email_contact_status').select('*').order('latest_event_at', { ascending: false }),
    ])
    if (o.data) setOrders(o.data)
    if (l.data) setLeads(l.data)
    if (r.data) setReviews(r.data)
    if (b.data) setBlogs(b.data)
    if (p.data) setPricing(p.data)
    if (py.data) setPayments(py.data)
    if (t.data) setTemplates(t.data)
    if (ec.data) setEmailContacts(ec.data)
    setLoading(false)
  }, [])
  useEffect(() => { fetchData() }, [fetchData])

  // ── Analytics ──────────────────────────────────────────────────────────────
  const now = new Date()
  const thisMonth = orders.filter(o => { const d = new Date(o.created_at); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() })
  const pkgCount: Record<string, number> = {}
  orders.forEach(o => { if (o.package) pkgCount[o.package] = (pkgCount[o.package] || 0) + 1 })
  const topPkg = Object.entries(pkgCount).sort((a, b) => b[1] - a[1])[0]
  const platCount: Record<string, number> = {}
  orders.forEach(o => { if (o.platform) platCount[o.platform] = (platCount[o.platform] || 0) + 1 })
  const topPlat = Object.entries(platCount).sort((a, b) => b[1] - a[1])[0]
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—'

  function pkgColor(pkg: string | null) {
    if (!pkg) return 'blue'
    const p = pkg.toLowerCase()
    if (p.includes('starter') || p.includes('basic')) return 'blue'
    if (p.includes('pro') || p.includes('growth')) return 'purple'
    if (p.includes('elite') || p.includes('premium')) return 'yellow'
    return 'green'
  }

  // ── Toggle helpers ─────────────────────────────────────────────────────────
  async function toggleBlogLive(b: Blog) { await supabase.from('blogs').update({ is_live: !b.is_live }).eq('id', b.id); setBlogs(prev => prev.map(x => x.id === b.id ? { ...x, is_live: !x.is_live } : x)) }
  async function togglePlanActive(p: PricingPlan) { await supabase.from('pricing_plans').update({ is_active: !p.is_active }).eq('id', p.id); setPricing(prev => prev.map(x => x.id === p.id ? { ...x, is_active: !x.is_active } : x)) }
  async function togglePlanPopular(p: PricingPlan) { await supabase.from('pricing_plans').update({ is_popular: !p.is_popular }).eq('id', p.id); setPricing(prev => prev.map(x => x.id === p.id ? { ...x, is_popular: !x.is_popular } : x)) }
  async function togglePayUsed(p: PaymentLink) { await supabase.from('payment_links').update({ is_used: !p.is_used }).eq('id', p.id); setPayments(prev => prev.map(x => x.id === p.id ? { ...x, is_used: !x.is_used } : x)) }
  async function toggleTplPrimary(t: Template) { await supabase.from('templates').update({ is_primary: !t.is_primary }).eq('id', t.id); setTemplates(prev => prev.map(x => x.id === t.id ? { ...x, is_primary: !x.is_primary } : x)) }

  // ── Delete helper ──────────────────────────────────────────────────────────
  function askDelete(msg: string, onConfirm: () => void) { setConfirmDelete({ msg, onConfirm }) }

  // ── ORDER CRUD ─────────────────────────────────────────────────────────────
  function openAddOrder() { setOrderEdit(null); setOrderForm({ name: '', email: '', domain: '', platform: '', package: '', payment: '', message: '' }); setOrderModal(true) }
  function openEditOrder(o: Order) { setOrderEdit(o); setOrderForm({ name: o.name, email: o.email, domain: o.domain || '', platform: o.platform || '', package: o.package || '', payment: o.payment || '', message: o.message || '' }); setOrderModal(true) }
  async function saveOrder() {
    setSaving(true)
    if (orderEdit) {
      await supabase.from('orders').update(orderForm).eq('id', orderEdit.id)
      setOrders(prev => prev.map(x => x.id === orderEdit.id ? { ...x, ...orderForm } : x))
    } else {
      const { data } = await supabase.from('orders').insert([{ ...orderForm, created_at: new Date().toISOString() }]).select()
      if (data) setOrders(prev => [data[0], ...prev])
    }
    setOrderModal(false); setSaving(false)
  }
  function deleteOrder(o: Order) { askDelete(`Delete order #${o.id} by "${o.name}"?`, async () => { await supabase.from('orders').delete().eq('id', o.id); setOrders(prev => prev.filter(x => x.id !== o.id)); setConfirmDelete(null) }) }

  // ── LEAD CRUD ──────────────────────────────────────────────────────────────
  function openAddLead() { setLeadEdit(null); setLeadForm({ email: '', tool_used: '' }); setLeadModal(true) }
  function openEditLead(l: Lead) { setLeadEdit(l); setLeadForm({ email: l.email, tool_used: l.tool_used }); setLeadModal(true) }
  async function saveLead() {
    setSaving(true)
    if (leadEdit) {
      await supabase.from('leads').update(leadForm).eq('id', leadEdit.id)
      setLeads(prev => prev.map(x => x.id === leadEdit.id ? { ...x, ...leadForm } : x))
    } else {
      const { data } = await supabase.from('leads').insert([{ ...leadForm, created_at: new Date().toISOString() }]).select()
      if (data) setLeads(prev => [data[0], ...prev])
    }
    setLeadModal(false); setSaving(false)
  }
  function deleteLead(l: Lead) { askDelete(`Delete lead "${l.email}"?`, async () => { await supabase.from('leads').delete().eq('id', l.id); setLeads(prev => prev.filter(x => x.id !== l.id)); setConfirmDelete(null) }) }

  // ── Email tracking ──────────────────────────────────────────────────────────
  async function markFollowedUp(ec: EmailContact) {
    const now = new Date().toISOString()
    // Stamps every logged event for this contact, so the "needs follow-up"
    // query (and the digest cron) stops surfacing them until they open/click
    // again on a future email.
    await supabase.from('email_events').update({ followed_up_at: now }).eq('contact_email', ec.contact_email).is('followed_up_at', null)
    setEmailContacts(prev => prev.map(x => x.contact_email === ec.contact_email ? { ...x, followed_up_at: now } : x))
  }
  function statusColor(s: string) { return s === 'clicked' ? 'green' : s === 'opened' ? 'blue' : s === 'delivered' ? 'gray' : (s === 'hard_bounce' || s === 'spam') ? 'red' : 'yellow' }

  // ── REVIEW CRUD ────────────────────────────────────────────────────────────
  function openAddReview() { setReviewEdit(null); setReviewForm({ name: '', rating: '5', message: '', Country: '', order_number: '', avatar_url: '' }); setReviewModal(true) }
  function openEditReview(r: Review) { setReviewEdit(r); setReviewForm({ name: r.name, rating: String(r.rating), message: r.message, Country: r.Country || '', order_number: r.order_number || '', avatar_url: r.avatar_url || '' }); setReviewModal(true) }
  async function saveReview() {
    setSaving(true)
    const payload = { ...reviewForm, rating: parseInt(reviewForm.rating) || 5 }
    if (reviewEdit) {
      await supabase.from('reviews').update(payload).eq('id', reviewEdit.id)
      setReviews(prev => prev.map(x => x.id === reviewEdit.id ? { ...x, ...payload } : x))
    } else {
      const { data } = await supabase.from('reviews').insert([{ ...payload, date: new Date().toISOString() }]).select()
      if (data) setReviews(prev => [data[0], ...prev])
    }
    setReviewModal(false); setSaving(false)
  }
  function deleteReview(r: Review) { askDelete(`Delete review by "${r.name}"?`, async () => { await supabase.from('reviews').delete().eq('id', r.id); setReviews(prev => prev.filter(x => x.id !== r.id)); setConfirmDelete(null) }) }

  // ── BLOG CRUD ──────────────────────────────────────────────────────────────
  function openAddBlog() { setBlogEdit(null); setBlogForm({ title: '', slug: '', excerpt: '', content: '', image_url: '', author_name: 'MakeMyStore Team', category: 'Ecommerce Tips', is_live: false }); setBlogModal(true) }
  function openEditBlog(b: Blog) { setBlogEdit(b); setBlogForm({ title: b.title, slug: b.slug, excerpt: b.excerpt || '', content: b.content, image_url: b.image_url || '', author_name: b.author_name || '', category: b.category || '', is_live: b.is_live }); setBlogModal(true) }
  async function saveBlog() {
    setSaving(true)
    if (blogEdit) {
      await supabase.from('blogs').update({ ...blogForm, updated_at: new Date().toISOString() }).eq('id', blogEdit.id)
      setBlogs(prev => prev.map(x => x.id === blogEdit.id ? { ...x, ...blogForm } : x))
    } else {
      const now = new Date().toISOString()
      const { data } = await supabase.from('blogs').insert([{ ...blogForm, published_at: now, updated_at: now }]).select()
      if (data) setBlogs(prev => [data[0], ...prev])
    }
    setBlogModal(false); setSaving(false)
  }
  function deleteBlog(b: Blog) { askDelete(`Delete blog "${b.title}"?`, async () => { await supabase.from('blogs').delete().eq('id', b.id); setBlogs(prev => prev.filter(x => x.id !== b.id)); setConfirmDelete(null) }) }

  // ── PRICING CRUD ───────────────────────────────────────────────────────────
  function openAddPlan() { setPlanEdit(null); setPlanForm({ name: '', price: '', delivery: '', description: '', is_popular: false, is_active: true }); setPlanModal(true) }
  function openEditPlan(p: PricingPlan) { setPlanEdit(p); setPlanForm({ name: p.name, price: String(p.price), delivery: p.delivery || '', description: p.description || '', is_popular: p.is_popular, is_active: p.is_active }); setPlanModal(true) }
  async function savePlan() {
    setSaving(true)
    const payload = { ...planForm, price: parseInt(planForm.price) || 0 }
    if (planEdit) {
      await supabase.from('pricing_plans').update(payload).eq('id', planEdit.id)
      setPricing(prev => prev.map(x => x.id === planEdit.id ? { ...x, ...payload } : x))
    } else {
      const { data } = await supabase.from('pricing_plans').insert([{ ...payload, created_at: new Date().toISOString() }]).select()
      if (data) setPricing(prev => [...prev, data[0]].sort((a, b) => a.price - b.price))
    }
    setPlanModal(false); setSaving(false)
  }
  function deletePlan(p: PricingPlan) { askDelete(`Delete plan "${p.name}"?`, async () => { await supabase.from('pricing_plans').delete().eq('id', p.id); setPricing(prev => prev.filter(x => x.id !== p.id)); setConfirmDelete(null) }) }

  // ── PAYMENT LINK CRUD ──────────────────────────────────────────────────────
  function openAddPay() { setPayEdit(null); setPayForm({ plan_name: '', payoneer_link: '', is_used: false }); setPayModal(true) }
  function openEditPay(p: PaymentLink) { setPayEdit(p); setPayForm({ plan_name: p.plan_name, payoneer_link: p.payoneer_link, is_used: p.is_used }); setPayModal(true) }
  async function savePay() {
    setSaving(true)
    if (payEdit) {
      await supabase.from('payment_links').update(payForm).eq('id', payEdit.id)
      setPayments(prev => prev.map(x => x.id === payEdit.id ? { ...x, ...payForm } : x))
    } else {
      const { data } = await supabase.from('payment_links').insert([{ ...payForm, created_at: new Date().toISOString() }]).select()
      if (data) setPayments(prev => [data[0], ...prev])
    }
    setPayModal(false); setSaving(false)
  }
  function deletePay(p: PaymentLink) { askDelete(`Delete payment link for "${p.plan_name}"?`, async () => { await supabase.from('payment_links').delete().eq('id', p.id); setPayments(prev => prev.filter(x => x.id !== p.id)); setConfirmDelete(null) }) }

  // ── TEMPLATE CRUD ──────────────────────────────────────────────────────────
  function openAddTpl() { setTplEdit(null); setTplForm({ name: '', category: '', description: '', is_primary: false }); setTplModal(true) }
  function openEditTpl(t: Template) { setTplEdit(t); setTplForm({ name: t.name || '', category: t.category || '', description: t.description || '', is_primary: t.is_primary }); setTplModal(true) }
  async function saveTpl() {
    setSaving(true)
    if (tplEdit) {
      await supabase.from('templates').update(tplForm).eq('id', tplEdit.id)
      setTemplates(prev => prev.map(x => x.id === tplEdit.id ? { ...x, ...tplForm } : x))
    } else {
      const { data } = await supabase.from('templates').insert([{ ...tplForm, created_at: new Date().toISOString() }]).select()
      if (data) setTemplates(prev => [data[0], ...prev])
    }
    setTplModal(false); setSaving(false)
  }
  function deleteTpl(t: Template) { askDelete(`Delete template "${t.name}"?`, async () => { await supabase.from('templates').delete().eq('id', t.id); setTemplates(prev => prev.filter(x => x.id !== t.id)); setConfirmDelete(null) }) }

  // ── Search filters ─────────────────────────────────────────────────────────
  const s = search.toLowerCase()
  const fOrders = orders.filter(o => [o.name, o.email, o.domain, o.package, o.platform, o.message].join(' ').toLowerCase().includes(s))
  const fLeads = leads.filter(l => [l.email, l.tool_used].join(' ').toLowerCase().includes(s))
  const fReviews = reviews.filter(r => [r.name, r.message, r.Country].join(' ').toLowerCase().includes(s))
  const fBlogs = blogs.filter(b => [b.title, b.slug, b.category, b.author_name].join(' ').toLowerCase().includes(s))
  const fPricing = pricing.filter(p => p.name.toLowerCase().includes(s))
  const fPayments = payments.filter(p => [p.plan_name, p.payoneer_link].join(' ').toLowerCase().includes(s))
  const fTemplates = templates.filter(t => [t.name, t.category, t.description].join(' ').toLowerCase().includes(s))
  const fEmailContacts = emailContacts.filter(ec => [ec.contact_email, ec.subject, ec.latest_status].join(' ').toLowerCase().includes(s))
  const dueFollowUps = emailContacts.filter(ec => ['opened', 'clicked'].includes(ec.latest_status) && !ec.followed_up_at && (Date.now() - new Date(ec.latest_event_at).getTime()) > 24 * 3600 * 1000).length

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'analytics', label: '📊 Analytics' },
    { key: 'orders', label: '🛒 Orders', count: orders.length },
    { key: 'leads', label: '💡 Leads', count: leads.length },
    { key: 'reviews', label: '⭐ Reviews', count: reviews.length },
    { key: 'blogs', label: '📝 Blogs', count: blogs.length },
    { key: 'pricing', label: '💰 Pricing', count: pricing.length },
    { key: 'payments', label: '🔗 Payments', count: payments.length },
    { key: 'templates', label: '🎨 Templates', count: templates.length },
    { key: 'email_tracking', label: dueFollowUps > 0 ? `📬 Email Tracking 🔴 ${dueFollowUps} due` : '📬 Email Tracking', count: emailContacts.length },
  ]
  const tabStyle = (t: Tab): React.CSSProperties => ({ padding: '7px 13px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.2s', whiteSpace: 'nowrap', background: tab === t ? 'linear-gradient(135deg,#00d4ff,#7a5cff)' : 'rgba(255,255,255,0.05)', color: tab === t ? 'white' : 'rgba(255,255,255,0.5)' })
  const empty = (msg: string) => <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>{msg}</div>
  const actionBar = (onAdd: () => void, label: string) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
      <Btn onClick={onAdd}>+ {label}</Btn>
    </div>
  )

  return (
    <div style={{ padding: '20px 16px', maxWidth: 1400, margin: '0 auto' }}>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        {tabs.map(t => <button key={t.key} style={tabStyle(t.key)} onClick={() => { setTab(t.key); setSearch('') }}>{t.label}{t.count !== undefined ? ` (${t.count})` : ''}</button>)}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 13px', color: 'white', fontSize: 12, outline: 'none', width: 180 }} />
          <button onClick={fetchData} style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 8, padding: '7px 12px', color: '#00d4ff', cursor: 'pointer', fontSize: 16 }}>↻</button>
        </div>
      </div>

      {loading ? <div style={{ padding: 80, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading…</div> : <>

        {/* ══ ANALYTICS ══ */}
        {tab === 'analytics' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(165px,1fr))', gap: 14, marginBottom: 20 }}>
              {[{ label: 'Total Orders', val: orders.length, color: '#00d4ff' }, { label: 'This Month', val: thisMonth.length, color: '#fbbf24' }, { label: 'Total Leads', val: leads.length, color: '#a78bfa' }, { label: 'Total Reviews', val: reviews.length, color: '#34d399' }, { label: 'Avg Rating', val: avgRating, color: '#fbbf24' }, { label: 'Live Blogs', val: blogs.filter(b => b.is_live).length, color: '#00d4ff' }].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 20px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
                  <p style={{ color: s.color, fontSize: 32, fontWeight: 700, margin: 0, fontFamily: 'Syne,sans-serif' }}>{s.val}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
              {[
                { label: 'Top Package', main: topPkg?.[0], sub: topPkg ? `${topPkg[1]} orders` : null, color: '#00d4ff' },
                { label: 'Top Platform', main: topPlat?.[0], sub: topPlat ? `${topPlat[1]} orders` : null, color: '#a78bfa' },
              ].map(c => (
                <div key={c.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 18 }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '0 0 10px', textTransform: 'uppercase' }}>{c.label}</p>
                  {c.main ? <><p style={{ color: 'white', fontWeight: 700, fontSize: 17, margin: '0 0 3px' }}>{c.main}</p><p style={{ color: c.color, fontSize: 12, margin: 0 }}>{c.sub}</p></> : <p style={{ color: 'rgba(255,255,255,0.3)', margin: 0, fontSize: 13 }}>No data</p>}
                </div>
              ))}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 18 }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '0 0 10px', textTransform: 'uppercase' }}>Package Breakdown</p>
                {Object.entries(pkgCount).length === 0 ? <p style={{ color: 'rgba(255,255,255,0.3)', margin: 0, fontSize: 13 }}>No data</p> : Object.entries(pkgCount).sort((a, b) => b[1] - a[1]).map(([name, cnt]) => (
                  <div key={name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{name}</span>
                    <span style={{ color: '#00d4ff', fontSize: 12, fontWeight: 600 }}>{cnt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...tblWrap, padding: 18 }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px' }}>Recent 5 Orders</p>
              {orders.slice(0, 5).map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div><span style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{o.name}</span><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginLeft: 8 }}>{o.email}</span></div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {o.package && <Badge color={pkgColor(o.package)} label={o.package} />}
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>{fmt(o.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ORDERS ══ */}
        {tab === 'orders' && <>{actionBar(openAddOrder, 'Add Order')}
          <div style={tblWrap}>{fOrders.length === 0 ? empty('No orders found.') : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <th style={hcell}>ID</th><th style={hcell}>Date</th><th style={hcell}>Name</th><th style={hcell}>Email</th>
                  <th style={hcell}>Package</th><th style={hcell}>Platform</th><th style={hcell}>Payment</th><th style={hcell}>Domain</th><th style={hcell}>Msg</th><th style={hcell}></th>
                </tr></thead>
                <tbody>{fOrders.map(o => (<>
                  <tr key={o.id} onClick={() => setExpanded(expanded === o.id ? null : o.id)} style={{ cursor: 'pointer' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ ...cell, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>#{o.id}</td>
                    <td style={{ ...cell, whiteSpace: 'nowrap', fontSize: 12 }}>{fmt(o.created_at)}</td>
                    <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{o.name}</td>
                    <td style={cell}><a href={`mailto:${o.email}`} style={{ color: '#00d4ff', textDecoration: 'none' }}>{o.email}</a></td>
                    <td style={cell}>{o.package ? <Badge color={pkgColor(o.package)} label={o.package} /> : '—'}</td>
                    <td style={{ ...cell, fontSize: 12 }}>{o.platform || '—'}</td>
                    <td style={{ ...cell, fontSize: 12 }}>{o.payment || '—'}</td>
                    <td style={{ ...cell, fontSize: 12 }}>{o.domain || '—'}</td>
                    <td style={{ ...cell, maxWidth: 150, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{o.message ? (o.message.length > 40 ? o.message.slice(0, 40) + '…' : o.message) : '—'}</td>
                    <td style={cell} onClick={e => e.stopPropagation()}><div style={{ display: 'flex', gap: 5 }}><Btn onClick={() => openEditOrder(o)} color="gray" small>Edit</Btn><Btn onClick={() => deleteOrder(o)} color="red" small>Del</Btn></div></td>
                  </tr>
                  {expanded === o.id && o.message && (<tr key={`exp-${o.id}`}><td colSpan={10} style={{ padding: '0 14px 14px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 8, padding: '12px 16px', color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6 }}>
                      <strong style={{ color: '#00d4ff', fontSize: 11, textTransform: 'uppercase' }}>Full Message</strong>
                      <p style={{ margin: '8px 0 0' }}>{o.message}</p>
                    </div>
                  </td></tr>)}
                </>))}</tbody>
              </table>
            </div>
          )}</div></>}

        {/* ══ LEADS ══ */}
        {tab === 'leads' && <>{actionBar(openAddLead, 'Add Lead')}
          <div style={tblWrap}>{fLeads.length === 0 ? empty('No leads found.') : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}><th style={hcell}>Date</th><th style={hcell}>Email</th><th style={hcell}>Tool Used</th><th style={hcell}></th></tr></thead>
                <tbody>{fLeads.map(l => (<tr key={l.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ ...cell, fontSize: 12, whiteSpace: 'nowrap' }}>{fmt(l.created_at)}</td>
                  <td style={cell}><a href={`mailto:${l.email}`} style={{ color: '#00d4ff', textDecoration: 'none' }}>{l.email}</a></td>
                  <td style={cell}><Badge color="purple" label={l.tool_used} /></td>
                  <td style={cell}><div style={{ display: 'flex', gap: 5 }}><Btn onClick={() => openEditLead(l)} color="gray" small>Edit</Btn><Btn onClick={() => deleteLead(l)} color="red" small>Del</Btn></div></td>
                </tr>))}</tbody>
              </table>
            </div>
          )}</div></>}

        {/* ══ REVIEWS ══ */}
        {tab === 'reviews' && <>{actionBar(openAddReview, 'Add Review')}
          <div style={tblWrap}>{fReviews.length === 0 ? empty('No reviews found.') : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}><th style={hcell}>Date</th><th style={hcell}>Name</th><th style={hcell}>Country</th><th style={hcell}>Rating</th><th style={hcell}>Order #</th><th style={hcell}>Message</th><th style={hcell}></th></tr></thead>
                <tbody>{fReviews.map(r => (<>
                  <tr key={r.id} onClick={() => setExpanded(expanded === `r${r.id}` ? null : `r${r.id}`)} style={{ cursor: 'pointer' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ ...cell, fontSize: 12, whiteSpace: 'nowrap' }}>{r.date ? fmt(r.date) : '—'}</td>
                    <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{r.name}</td>
                    <td style={cell}>{r.Country || '—'}</td>
                    <td style={cell}><Stars n={r.rating} /></td>
                    <td style={{ ...cell, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r.order_number || '—'}</td>
                    <td style={{ ...cell, maxWidth: 200, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{r.message.length > 60 ? r.message.slice(0, 60) + '…' : r.message}</td>
                    <td style={cell} onClick={e => e.stopPropagation()}><div style={{ display: 'flex', gap: 5 }}><Btn onClick={() => openEditReview(r)} color="gray" small>Edit</Btn><Btn onClick={() => deleteReview(r)} color="red" small>Del</Btn></div></td>
                  </tr>
                  {expanded === `r${r.id}` && (<tr key={`rexp-${r.id}`}><td colSpan={7} style={{ padding: '0 14px 14px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 8, padding: '12px 16px', color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6 }}>
                      <Stars n={r.rating} /><p style={{ margin: '8px 0 0' }}>{r.message}</p>
                    </div>
                  </td></tr>)}
                </>))}</tbody>
              </table>
            </div>
          )}</div></>}

        {/* ══ BLOGS ══ */}
        {tab === 'blogs' && <>{actionBar(openAddBlog, 'Add Blog')}
          <div style={tblWrap}>{fBlogs.length === 0 ? empty('No blogs found.') : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}><th style={hcell}>Date</th><th style={hcell}>Title</th><th style={hcell}>Category</th><th style={hcell}>Author</th><th style={hcell}>Live</th><th style={hcell}></th></tr></thead>
                <tbody>{fBlogs.map(b => (<tr key={b.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ ...cell, fontSize: 12, whiteSpace: 'nowrap' }}>{fmt(b.published_at)}</td>
                  <td style={{ ...cell, maxWidth: 260 }}><p style={{ margin: '0 0 2px', fontWeight: 600, color: 'white', fontSize: 13 }}>{b.title}</p><p style={{ margin: 0, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>/{b.slug}</p></td>
                  <td style={cell}>{b.category ? <Badge color="blue" label={b.category} /> : '—'}</td>
                  <td style={{ ...cell, fontSize: 12 }}>{b.author_name || '—'}</td>
                  <td style={cell}><div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Toggle checked={b.is_live} onChange={() => toggleBlogLive(b)} /><span style={{ fontSize: 11, color: b.is_live ? '#34d399' : 'rgba(255,255,255,0.3)' }}>{b.is_live ? 'Live' : 'Draft'}</span></div></td>
                  <td style={cell}><div style={{ display: 'flex', gap: 5 }}><Btn onClick={() => openEditBlog(b)} color="gray" small>Edit</Btn><Btn onClick={() => deleteBlog(b)} color="red" small>Del</Btn></div></td>
                </tr>))}</tbody>
              </table>
            </div>
          )}</div></>}

        {/* ══ PRICING ══ */}
        {tab === 'pricing' && <>{actionBar(openAddPlan, 'Add Plan')}
          <div style={tblWrap}>{fPricing.length === 0 ? empty('No plans found.') : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}><th style={hcell}>Plan</th><th style={hcell}>Price</th><th style={hcell}>Delivery</th><th style={hcell}>Popular</th><th style={hcell}>Active</th><th style={hcell}></th></tr></thead>
                <tbody>{fPricing.map(p => (<tr key={p.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{p.name}</td>
                  <td style={cell}><span style={{ color: '#fbbf24', fontWeight: 700 }}>${p.price}</span></td>
                  <td style={{ ...cell, fontSize: 12 }}>{p.delivery || '—'}</td>
                  <td style={cell}><div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Toggle checked={p.is_popular} onChange={() => togglePlanPopular(p)} /><span style={{ fontSize: 11, color: p.is_popular ? '#fbbf24' : 'rgba(255,255,255,0.3)' }}>{p.is_popular ? 'Yes' : 'No'}</span></div></td>
                  <td style={cell}><div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Toggle checked={p.is_active} onChange={() => togglePlanActive(p)} /><span style={{ fontSize: 11, color: p.is_active ? '#34d399' : 'rgba(255,255,255,0.3)' }}>{p.is_active ? 'Active' : 'Hidden'}</span></div></td>
                  <td style={cell}><div style={{ display: 'flex', gap: 5 }}><Btn onClick={() => openEditPlan(p)} color="gray" small>Edit</Btn><Btn onClick={() => deletePlan(p)} color="red" small>Del</Btn></div></td>
                </tr>))}</tbody>
              </table>
            </div>
          )}</div></>}

        {/* ══ PAYMENTS ══ */}
        {tab === 'payments' && <>{actionBar(openAddPay, 'Add Payment Link')}
          <div style={tblWrap}>{fPayments.length === 0 ? empty('No payment links found.') : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}><th style={hcell}>Date</th><th style={hcell}>Plan</th><th style={hcell}>Link</th><th style={hcell}>Used</th><th style={hcell}></th></tr></thead>
                <tbody>{fPayments.map(p => (<tr key={p.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ ...cell, fontSize: 12, whiteSpace: 'nowrap' }}>{fmt(p.created_at)}</td>
                  <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{p.plan_name}</td>
                  <td style={{ ...cell, maxWidth: 260 }}><a href={p.payoneer_link} target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff', fontSize: 12, textDecoration: 'none', wordBreak: 'break-all' }}>{p.payoneer_link.length > 45 ? p.payoneer_link.slice(0, 45) + '…' : p.payoneer_link}</a></td>
                  <td style={cell}><div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Toggle checked={p.is_used} onChange={() => togglePayUsed(p)} /><span style={{ fontSize: 11, color: p.is_used ? '#ff4d6d' : '#34d399' }}>{p.is_used ? 'Used' : 'Available'}</span></div></td>
                  <td style={cell}><div style={{ display: 'flex', gap: 5 }}><Btn onClick={() => openEditPay(p)} color="gray" small>Edit</Btn><Btn onClick={() => deletePay(p)} color="red" small>Del</Btn></div></td>
                </tr>))}</tbody>
              </table>
            </div>
          )}</div></>}

        {/* ══ TEMPLATES ══ */}
        {tab === 'templates' && <>{actionBar(openAddTpl, 'Add Template')}
          <div style={tblWrap}>{fTemplates.length === 0 ? empty('No templates found.') : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}><th style={hcell}>Name</th><th style={hcell}>Category</th><th style={hcell}>Description</th><th style={hcell}>Primary</th><th style={hcell}></th></tr></thead>
                <tbody>{fTemplates.map(t => (<tr key={t.id} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ ...cell, fontWeight: 600, color: 'white' }}>{t.name || '—'}</td>
                  <td style={cell}>{t.category ? <Badge color="purple" label={t.category} /> : '—'}</td>
                  <td style={{ ...cell, maxWidth: 260, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{t.description ? (t.description.length > 70 ? t.description.slice(0, 70) + '…' : t.description) : '—'}</td>
                  <td style={cell}><div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Toggle checked={t.is_primary} onChange={() => toggleTplPrimary(t)} /><span style={{ fontSize: 11, color: t.is_primary ? '#00d4ff' : 'rgba(255,255,255,0.3)' }}>{t.is_primary ? 'Primary' : 'Secondary'}</span></div></td>
                  <td style={cell}><div style={{ display: 'flex', gap: 5 }}><Btn onClick={() => openEditTpl(t)} color="gray" small>Edit</Btn><Btn onClick={() => deleteTpl(t)} color="red" small>Del</Btn></div></td>
                </tr>))}</tbody>
              </table>
            </div>
          )}</div></>}

        {/* ══ EMAIL TRACKING ══ */}
        {tab === 'email_tracking' && <>
          <div style={tblWrap}>{fEmailContacts.length === 0 ? empty('No email events yet — set up the Brevo webhook to start tracking.') : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: 'rgba(255,255,255,0.02)' }}><th style={hcell}>Last Activity</th><th style={hcell}>Contact</th><th style={hcell}>Subject</th><th style={hcell}>Status</th><th style={hcell}></th></tr></thead>
                <tbody>{fEmailContacts.map(ec => {
                  const overdue = ['opened', 'clicked'].includes(ec.latest_status) && !ec.followed_up_at && (Date.now() - new Date(ec.latest_event_at).getTime()) > 24 * 3600 * 1000
                  return (<tr key={ec.contact_email} style={overdue ? { background: 'rgba(255,77,109,0.06)' } : undefined} onMouseEnter={e => (e.currentTarget.style.background = overdue ? 'rgba(255,77,109,0.1)' : 'rgba(255,255,255,0.03)')} onMouseLeave={e => (e.currentTarget.style.background = overdue ? 'rgba(255,77,109,0.06)' : 'transparent')}>
                    <td style={{ ...cell, fontSize: 12, whiteSpace: 'nowrap' }}>{fmt(ec.latest_event_at)}</td>
                    <td style={cell}><a href={`mailto:${ec.contact_email}`} style={{ color: '#00d4ff', textDecoration: 'none' }}>{ec.contact_email}</a></td>
                    <td style={{ ...cell, maxWidth: 260, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{ec.subject || '—'}</td>
                    <td style={cell}>
                      <Badge color={statusColor(ec.latest_status)} label={ec.latest_status === 'clicked' ? '🔥 Clicked' : ec.latest_status === 'opened' ? '👀 Opened' : ec.latest_status} />
                      {overdue && <span style={{ marginLeft: 8, fontSize: 11, color: '#ff4d6d', fontWeight: 600 }}>Follow up due</span>}
                      {ec.followed_up_at && <span style={{ marginLeft: 8, fontSize: 11, color: '#34d399' }}>✓ Followed up {fmt(ec.followed_up_at)}</span>}
                    </td>
                    <td style={cell}>{!ec.followed_up_at && <Btn onClick={() => markFollowedUp(ec)} color="green" small>Mark followed up</Btn>}</td>
                  </tr>)
                })}</tbody>
              </table>
            </div>
          )}</div>
        </>}
      </>}

      {/* ══ MODALS ══════════════════════════════════════════════════════════ */}

      {/* Order Modal */}
      {orderModal && <Modal title={orderEdit ? 'Edit Order' : 'Add Order'} onClose={() => setOrderModal(false)}>
        <Row2><div><Label>Name</Label><input style={inp} value={orderForm.name} onChange={e => setOrderForm(f => ({ ...f, name: e.target.value }))} placeholder="Client name" /></div>
        <div><Label>Email</Label><input style={inp} value={orderForm.email} onChange={e => setOrderForm(f => ({ ...f, email: e.target.value }))} placeholder="client@email.com" /></div></Row2>
        <Row2><div><Label>Package</Label><input style={inp} value={orderForm.package} onChange={e => setOrderForm(f => ({ ...f, package: e.target.value }))} placeholder="e.g. Pro" /></div>
        <div><Label>Platform</Label><input style={inp} value={orderForm.platform} onChange={e => setOrderForm(f => ({ ...f, platform: e.target.value }))} placeholder="e.g. Shopify" /></div></Row2>
        <Row2><div><Label>Payment Method</Label><input style={inp} value={orderForm.payment} onChange={e => setOrderForm(f => ({ ...f, payment: e.target.value }))} placeholder="e.g. Payoneer" /></div>
        <div><Label>Domain</Label><input style={inp} value={orderForm.domain} onChange={e => setOrderForm(f => ({ ...f, domain: e.target.value }))} placeholder="e.g. mystore.com" /></div></Row2>
        <Label>Message</Label><textarea style={ta} value={orderForm.message} onChange={e => setOrderForm(f => ({ ...f, message: e.target.value }))} placeholder="Client message..." />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <Btn onClick={() => setOrderModal(false)} color="gray">Cancel</Btn>
          <Btn onClick={saveOrder} disabled={saving}>{saving ? 'Saving…' : orderEdit ? 'Save Changes' : 'Add Order'}</Btn>
        </div>
      </Modal>}

      {/* Lead Modal */}
      {leadModal && <Modal title={leadEdit ? 'Edit Lead' : 'Add Lead'} onClose={() => setLeadModal(false)}>
        <Label>Email</Label><input style={inp} value={leadForm.email} onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))} placeholder="lead@email.com" />
        <Label>Tool Used</Label><input style={inp} value={leadForm.tool_used} onChange={e => setLeadForm(f => ({ ...f, tool_used: e.target.value }))} placeholder="e.g. profit-calculator" />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <Btn onClick={() => setLeadModal(false)} color="gray">Cancel</Btn>
          <Btn onClick={saveLead} disabled={saving}>{saving ? 'Saving…' : leadEdit ? 'Save Changes' : 'Add Lead'}</Btn>
        </div>
      </Modal>}

      {/* Review Modal */}
      {reviewModal && <Modal title={reviewEdit ? 'Edit Review' : 'Add Review'} onClose={() => setReviewModal(false)}>
        <Row2><div><Label>Name</Label><input style={inp} value={reviewForm.name} onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))} placeholder="Reviewer name" /></div>
        <div><Label>Rating (1-5)</Label><input style={inp} type="number" min="1" max="5" value={reviewForm.rating} onChange={e => setReviewForm(f => ({ ...f, rating: e.target.value }))} /></div></Row2>
        <Row2><div><Label>Country</Label><input style={inp} value={reviewForm.Country} onChange={e => setReviewForm(f => ({ ...f, Country: e.target.value }))} placeholder="e.g. USA" /></div>
        <div><Label>Order Number</Label><input style={inp} value={reviewForm.order_number} onChange={e => setReviewForm(f => ({ ...f, order_number: e.target.value }))} placeholder="Optional" /></div></Row2>
        <Label>Avatar URL</Label><input style={inp} value={reviewForm.avatar_url} onChange={e => setReviewForm(f => ({ ...f, avatar_url: e.target.value }))} placeholder="https://... (optional)" />
        <Label>Message</Label><textarea style={ta} value={reviewForm.message} onChange={e => setReviewForm(f => ({ ...f, message: e.target.value }))} placeholder="Review message..." />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <Btn onClick={() => setReviewModal(false)} color="gray">Cancel</Btn>
          <Btn onClick={saveReview} disabled={saving}>{saving ? 'Saving…' : reviewEdit ? 'Save Changes' : 'Add Review'}</Btn>
        </div>
      </Modal>}

      {/* Blog Modal */}
      {blogModal && <Modal title={blogEdit ? 'Edit Blog' : 'Add Blog'} onClose={() => setBlogModal(false)} wide>
        <Row2><div><Label>Title</Label><input style={inp} value={blogForm.title} onChange={e => setBlogForm(f => ({ ...f, title: e.target.value }))} placeholder="Blog title" /></div>
        <div><Label>Slug</Label><input style={inp} value={blogForm.slug} onChange={e => setBlogForm(f => ({ ...f, slug: e.target.value }))} placeholder="blog-url-slug" /></div></Row2>
        <Row2><div><Label>Category</Label><input style={inp} value={blogForm.category} onChange={e => setBlogForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Ecommerce Tips" /></div>
        <div><Label>Author Name</Label><input style={inp} value={blogForm.author_name} onChange={e => setBlogForm(f => ({ ...f, author_name: e.target.value }))} placeholder="MakeMyStore Team" /></div></Row2>
        <Label>Image URL</Label><input style={inp} value={blogForm.image_url} onChange={e => setBlogForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://... (optional)" />
        <Label>Excerpt</Label><textarea style={ta} value={blogForm.excerpt} onChange={e => setBlogForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short description shown in blog list..." />
        <Label>Content</Label><textarea style={{ ...ta, minHeight: 180 }} value={blogForm.content} onChange={e => setBlogForm(f => ({ ...f, content: e.target.value }))} placeholder="Full blog content..." />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <Toggle checked={blogForm.is_live} onChange={() => setBlogForm(f => ({ ...f, is_live: !f.is_live }))} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{blogForm.is_live ? '🟢 Live' : '⚪ Draft'}</span>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <Btn onClick={() => setBlogModal(false)} color="gray">Cancel</Btn>
          <Btn onClick={saveBlog} disabled={saving}>{saving ? 'Saving…' : blogEdit ? 'Save Changes' : 'Publish Blog'}</Btn>
        </div>
      </Modal>}

      {/* Pricing Modal */}
      {planModal && <Modal title={planEdit ? 'Edit Plan' : 'Add Plan'} onClose={() => setPlanModal(false)}>
        <Row2><div><Label>Plan Name</Label><input style={inp} value={planForm.name} onChange={e => setPlanForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Pro" /></div>
        <div><Label>Price ($)</Label><input style={inp} type="number" value={planForm.price} onChange={e => setPlanForm(f => ({ ...f, price: e.target.value }))} placeholder="299" /></div></Row2>
        <Label>Delivery Time</Label><input style={inp} value={planForm.delivery} onChange={e => setPlanForm(f => ({ ...f, delivery: e.target.value }))} placeholder="e.g. 3-5 business days" />
        <Label>Description</Label><textarea style={ta} value={planForm.description} onChange={e => setPlanForm(f => ({ ...f, description: e.target.value }))} placeholder="What's included..." />
        <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Toggle checked={planForm.is_popular} onChange={() => setPlanForm(f => ({ ...f, is_popular: !f.is_popular }))} /><span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Popular</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Toggle checked={planForm.is_active} onChange={() => setPlanForm(f => ({ ...f, is_active: !f.is_active }))} /><span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Active</span></div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <Btn onClick={() => setPlanModal(false)} color="gray">Cancel</Btn>
          <Btn onClick={savePlan} disabled={saving}>{saving ? 'Saving…' : planEdit ? 'Save Changes' : 'Add Plan'}</Btn>
        </div>
      </Modal>}

      {/* Payment Modal */}
      {payModal && <Modal title={payEdit ? 'Edit Payment Link' : 'Add Payment Link'} onClose={() => setPayModal(false)}>
        <Label>Plan Name</Label><input style={inp} value={payForm.plan_name} onChange={e => setPayForm(f => ({ ...f, plan_name: e.target.value }))} placeholder="e.g. Pro Plan" />
        <Label>Payoneer Link</Label><input style={inp} value={payForm.payoneer_link} onChange={e => setPayForm(f => ({ ...f, payoneer_link: e.target.value }))} placeholder="https://payoneer.com/..." />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <Toggle checked={payForm.is_used} onChange={() => setPayForm(f => ({ ...f, is_used: !f.is_used }))} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{payForm.is_used ? 'Used' : 'Available'}</span>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <Btn onClick={() => setPayModal(false)} color="gray">Cancel</Btn>
          <Btn onClick={savePay} disabled={saving}>{saving ? 'Saving…' : payEdit ? 'Save Changes' : 'Add Link'}</Btn>
        </div>
      </Modal>}

      {/* Template Modal */}
      {tplModal && <Modal title={tplEdit ? 'Edit Template' : 'Add Template'} onClose={() => setTplModal(false)}>
        <Row2><div><Label>Name</Label><input style={inp} value={tplForm.name} onChange={e => setTplForm(f => ({ ...f, name: e.target.value }))} placeholder="Template name" /></div>
        <div><Label>Category</Label><input style={inp} value={tplForm.category} onChange={e => setTplForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Fashion" /></div></Row2>
        <Label>Description</Label><textarea style={ta} value={tplForm.description} onChange={e => setTplForm(f => ({ ...f, description: e.target.value }))} placeholder="Template description..." />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <Toggle checked={tplForm.is_primary} onChange={() => setTplForm(f => ({ ...f, is_primary: !f.is_primary }))} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Primary Template</span>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <Btn onClick={() => setTplModal(false)} color="gray">Cancel</Btn>
          <Btn onClick={saveTpl} disabled={saving}>{saving ? 'Saving…' : tplEdit ? 'Save Changes' : 'Add Template'}</Btn>
        </div>
      </Modal>}

      {/* Confirm Delete */}
      {confirmDelete && <ConfirmDelete msg={confirmDelete.msg} onConfirm={confirmDelete.onConfirm} onCancel={() => setConfirmDelete(null)} />}

      <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: 11, textAlign: 'center', marginTop: 24 }}>MakeMyStore Admin · Live Supabase data</p>
    </div>
  )
}
