# How It Works page — setup

## What's here

```
app/how-it-works/page.tsx              → the route, wired with your Navbar + Footer
app/sitemap.ts                         → updated, added /how-it-works
components/Navbar.tsx                  → updated, added a "How It Works" nav link
components/how-it-works/
  nodesData.ts          → the 9 process steps: titles, copy, 3D positions, colors
  journey.ts            → curve + timing math (how long the orb holds/travels per node)
  glowTexture.ts         → small helper, generates the glow sprite texture
  NodeMarker.tsx          → the 9 distinct 3D shapes (one per step)
  ConnectionPath.tsx      → the glowing tube connecting all nodes, flowing shader
  InfrastructureScene.tsx → the actual <Canvas>: camera, lights, bloom, starfield, grid
  HowItWorksHero.tsx      → client wrapper: lazy-loads the scene, HUD overlay, fallbacks
  ProcessSteps.tsx        → the 9-step text content below the map (your copy, formatted)
  PricingTransparency.tsx → pricing / future costs / disclaimer + CTA
package.json             → your existing file, with the 3D packages added
```

## Install

New dependencies were added to `package.json`:

```
three, @react-three/fiber, @react-three/drei, @react-three/postprocessing
```

Just run your usual install:

```bash
npm install
```

I tested this exact dependency combination (React 19 + Next 15) end-to-end in an isolated
project — `next build` completes cleanly, types check, and the 3D bundle is code-split
separately from your main page (it only loads when someone visits `/how-it-works`, so it
has zero impact on your homepage's load time).

## How the page works

1. **Full-viewport 3D hero** — a glowing orb travels along a curved path through 9 node
   shapes (one distinct shape per process step: rings for consultation, a gate for payment,
   a globe for domain setup, a server rack for infrastructure, etc.). It loops continuously.
   A glass HUD panel top-left shows the current step name/number as the orb passes each node.
2. **Scrolls into your process copy** — below the map, the same 9 steps appear as normal
   formatted cards (numbered, color-linked back to the map), followed by your pricing/
   transparency/disclaimer content and a CTA back to `/contact`.

## Safety nets already built in

- **No WebGL / very old device** → falls back to a static badge layout instead of a blank
  canvas.
- **`prefers-reduced-motion`** → the camera settles into one still frame instead of looping
  forever.
- **Mobile performance** → device pixel ratio is capped at 1.75, particle/bloom settings are
  conservative, and the whole 3D scene is dynamically imported (`ssr: false`) so it never
  blocks page render — but full WebGL scenes are inherently heavier than a normal page, so
  I'd still recommend spot-checking on a mid-range Android phone before calling it done.

## Things worth double-checking on your end

- I reused your existing `.glass`, `.btn-primary`, and `.card-glow` utility classes from
  `globals.css` — no CSS changes needed.
- The nav link I added ("How It Works") is easy to remove from `Navbar.tsx` if you'd rather
  link to it another way (e.g. from a Hero button instead).
- Bloom intensity/orb speed/hold-time are all single constants (`journey.ts`,
  `InfrastructureScene.tsx`) if you want the pacing faster/slower or the glow stronger/softer.
