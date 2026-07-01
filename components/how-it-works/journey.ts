export type NodeShape =
  | 'consult'
  | 'gate'
  | 'globe'
  | 'portal'
  | 'server'
  | 'factory'
  | 'scan'
  | 'beacon'
  | 'key'

export interface JourneyNode {
  id: string
  index: number
  title: string
  short: string
  detail: string
  shape: NodeShape
  color: string
  position: [number, number, number]
}

// Warm accent reserved for the final "ownership transfer" node — everything
// else stays inside the site's existing cyan / violet system.
const CYAN = '#00d4ff'
const VIOLET = '#7a5cff'
const GOLD = '#ffb86b'

// Positions trace a slow, wide S-curve moving into the screen (-z is deeper),
// with gentle vertical drift so the camera flythrough has real parallax.
export const JOURNEY_NODES: JourneyNode[] = [
  {
    id: 'consultation',
    index: 0,
    title: 'Free Consultation',
    short: 'Consultation',
    detail: 'We map your goals, features, and budget before a line of code is written.',
    shape: 'consult',
    color: CYAN,
    position: [0, 0.4, 0],
  },
  {
    id: 'payment',
    index: 1,
    title: 'Project Approval & Payment',
    short: 'Approval & Payment',
    detail: 'Scope is locked in and the project is confirmed to begin.',
    shape: 'gate',
    color: VIOLET,
    position: [2.6, -0.3, -4.5],
  },
  {
    id: 'domain',
    index: 2,
    title: 'Domain Name',
    short: 'Domain Setup',
    detail: 'Your domain is registered — or connected — always in your name.',
    shape: 'globe',
    color: CYAN,
    position: [1.4, 0.9, -9.2],
  },
  {
    id: 'gmail',
    index: 3,
    title: 'Your Business Google Account',
    short: 'Google Account',
    detail: 'A dedicated Gmail becomes the master key for every service you own.',
    shape: 'portal',
    color: VIOLET,
    position: [-1.6, -0.5, -13.6],
  },
  {
    id: 'setup',
    index: 4,
    title: 'Secure Project Setup',
    short: 'Infrastructure Setup',
    detail: 'GitHub, Vercel, Supabase, Analytics, and Search Console — all under your account.',
    shape: 'server',
    color: CYAN,
    position: [-3.4, 0.6, -18.4],
  },
  {
    id: 'development',
    index: 5,
    title: 'Design & Development',
    short: 'Build',
    detail: 'Your store is built with Next.js, React, Tailwind, and Supabase.',
    shape: 'factory',
    color: VIOLET,
    position: [-1.8, -0.7, -23.2],
  },
  {
    id: 'testing',
    index: 6,
    title: 'Testing & Quality Assurance',
    short: 'QA & Testing',
    detail: 'Every page is checked for speed, security, and mobile responsiveness.',
    shape: 'scan',
    color: CYAN,
    position: [1.2, 0.5, -27.8],
  },
  {
    id: 'launch',
    index: 7,
    title: 'Website Launch',
    short: 'Launch',
    detail: 'Your store goes live, domain connected, analytics running.',
    shape: 'beacon',
    color: VIOLET,
    position: [3.2, -0.2, -32.4],
  },
  {
    id: 'handover',
    index: 8,
    title: 'Final Handover',
    short: 'Full Ownership',
    detail: 'Every account, every credential, every line of code — handed to you.',
    shape: 'key',
    color: GOLD,
    position: [0, 0.6, -37.2],
  },
]

export const JOURNEY_COLORS = { CYAN, VIOLET, GOLD }
