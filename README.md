# — Intelligent Electric Hyper-EV

> *"Move Beyond The Expected."*

A premium, single-page marketing website for **HOTSON**, a fictional luxury electric vehicle brand built to demonstrate advanced front-end engineering with modern web technologies. The site showcases cinematic scroll-driven animations, interactive 3D effects, and a high-fidelity design system crafted for a hyper-premium automotive experience.

---

## Purpose

The HOTSON website serves as a **flagship marketing and digital showroom** for a next-generation electric vehicle brand. Its goals are:

- **Convey brand identity** — a cinematic, dark, high-end aesthetic that communicates technological excellence and refined human taste
- **Showcase the vehicle lineup** — three distinct models (GT-ONE, PHANTOM S, TERRA-X) with specifications, pricing, and configuration options
- **Explain the powertrain technology** — through an interactive exploded-view scroll animation that deconstructs the 800V powertrain into its four core subsystems
- **Drive conversions** — private test drive booking, newsletter sign-ups, and atelier commission enquiries
- **Demonstrate front-end craft** — the site itself is a technical showcase of scroll animations, physics-based interactions, accessible design, and performance-first architecture

---

## How It Was Built

### 1. Project Scaffolding

The project was initialised using **Vite** with the React plugin, targeting a modern ESM-only build. The workspace was cleaned of the default Vite starter template and rebuilt from scratch with a custom `index.html`, `tailwind.config.js`, and `postcss.config.js`.

```bash
# Project lives at:
c:\Users\Lawal Sodiq\hotson\

# Key config files created:
index.html          ← semantic HTML shell, SEO meta tags
vite.config.js      ← Vite + React plugin
tailwind.config.js  ← Extended palette & font tokens
postcss.config.js   ← Tailwind + Autoprefixer
.npmrc              ← legacy-peer-deps to resolve transitive conflicts
```

### 2. Design System

All design tokens are defined as **CSS custom properties** in `src/index.css` and mirrored into the Tailwind theme:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0A0A0C` | Obsidian dark background |
| `--surface` | `#15151A` | Elevated card surfaces |
| `--surface-light` | `#1F1F27` | Secondary elevated surfaces |
| `--cream` | `#F3EEE6` | High-contrast editorial contrast section |
| `--accent` | `#FF6A2B` | Kinetic orange — CTAs, glows, headline highlights |
| `--divider` | `rgba(255,255,255,0.08)` | Thin 1px separator lines |

**Typography** pairs **Space Grotesk** (display / headings, monospaced data) with **Sora** (body copy), both self-hosted via `@fontsource` for zero external network dependency.

### 3. Component Architecture

Each section is a focused, single-responsibility React component. Data is fully separated into `/src/data/` files so copy and specs can be edited without touching component logic.

```
src/
├── components/
│   ├── ui/
│   │   └── Button.jsx               ← Reusable pill CTA with arrow animation & glow
│   ├── Navbar.jsx                   ← Sticky translucent header
│   ├── Hero.jsx                     ← Full-viewport opening scene
│   ├── StatsBar.jsx                 ← Animated telemetry count-up bar
│   ├── Models.jsx                   ← Cream contrast model lineup section
│   ├── ModelCard.jsx                ← 3D tilt hover card
│   ├── EngineSection.jsx            ← Pinned exploded powertrain animation
│   ├── StoryInterior.jsx            ← Human craft editorial cards
│   ├── CtaBanner.jsx                ← Full-width sunset highway CTA
│   ├── Footer.jsx                   ← Multi-column footer + newsletter
│   ├── BookDriveModal.jsx           ← Private booking modal
│   ├── InteractiveBackground.jsx    ← Canvas particle field (lazy-loaded)
│   └── CustomCursor.jsx             ← Dual-ring trailing cursor
├── hooks/
│   ├── useLenis.js                  ← Smooth scroll initialisation
│   ├── useMousePosition.js          ← Normalised cursor tracking
│   ├── useReducedMotion.js          ← Accessibility preference hook
│   └── useCountUp.js                ← Exponential easing number counter
├── data/
│   ├── models.js                    ← Vehicle specs, images, pricing
│   ├── stats.js                     ← Telemetry metric definitions
│   └── engineParts.js               ← 3D explode offsets & callout config
└── App.jsx                          ← Root layout and modal state
```

### 4. Sections Walkthrough

#### Navbar
Starts fully transparent over the hero. After scrolling past 50 px, a `scroll` event listener flips it to `bg-[#0A0A0C]/80 backdrop-blur-md` with a 1 px bottom border. Includes a quick-search dialog with pre-linked model results, a mobile slide-in drawer, and an orange "Book a Drive" pill CTA.

#### Hero
Full-viewport dark section. The right column contains a cinematic car photograph with a slow CSS `scale` hover zoom and a glass badge overlay showing the drag coefficient. The left column has a two-line uppercase headline with line two rendered in accent orange (`#FF6A2B`). A "Watch the Film" button opens a full-screen modal with an embedded `<iframe>` player.

#### StatsBar
Five telemetry statistics (`0–60`, range, horsepower, voltage, charge time) rendered with the `useCountUp` hook — an exponential ease-out `requestAnimationFrame` loop triggered by an `IntersectionObserver`. Numbers animate from zero when the bar enters the viewport.

#### Models (Cream Section)
The only light section — `#F3EEE6` cream background — provides intentional contrast against the dark theme. Three `ModelCard` components are mapped from `data/models.js`. Each card uses **Framer Motion**'s `animate` with spring physics to tilt along X and Y axes proportional to mouse position within the card's bounding rectangle. Clicking "Configure Specification" opens a reservation modal.

#### EngineSection (Exploded Scroll Animation)
The most technically complex section. It uses a **GSAP ScrollTrigger pinned timeline** (`pin: true`, `scrub: 1.4`) to hold the viewport fixed while the user scrolls 300% (150% on mobile). The timeline has two phases:

1. **Explode (0–50% progress):** Each of the four powertrain SVG layers (`battery`, `motor`, `thermal`, `drive`) translates along its unique axis using direct DOM refs — no string ID selectors — while the entire group counter-rotates from `rotationY -18°` to `+18°` and scales from `0.88` to `1.12`
2. **Reassemble (50–100% progress):** All parts animate back to `x:0, y:0, z:0` with `power2.inOut` easing

As each part becomes the focal point, its SVG graphic brightens reactively (the `active` prop changes stroke weights, fill colours, and label opacity). Callout info panels draw in sequentially — their SVG connector lines are animated via `strokeDashoffset` using `getTotalLength()` — then dim as the next panel takes focus.

**Mouse parallax** applies a subtle 3D tilt via `gsap.quickTo` refs (created once, applied each frame) for a tactile parallax feel. A left-side vertical scroll progress bar gives the user orientation within the pinned sequence.

#### StoryInterior & CtaBanner
Two editorial image cards with CSS `scale` zoom on hover and gradient overlays. The CTA banner uses a full-width Unsplash sunset highway with layered orange and dark gradient composites.

#### Footer
Multi-column link grid, brand tagline, social links, and a controlled newsletter form. Email input uses regex validation — displaying an error state or a success confirmation via React state.

#### InteractiveBackground
A fixed `<canvas>` element behind all content, **lazy-loaded** via `React.lazy` and `Suspense`. It runs a pure `requestAnimationFrame` loop — zero React state updates per frame — with:
- Repulsive force field around the cursor (particles drift away)
- Ambient radial orange glow following the smoothed mouse position
- Scroll velocity reaction (particles accelerate upward during fast scroll)
- Tab visibility detection (loop pauses when the tab is hidden)
- Particle cap: 110 desktop / 40 mobile, DPR clamped to 1.5

#### CustomCursor
A dual-element cursor — a crisp 10 px orange dot tracking the exact mouse position, and a trailing 36 px ring that lerps toward the cursor at 18% per frame. The ring expands and glows when hovering over `[data-cursor="hover"]`, `button`, or `a` elements. Disabled on touch/coarse-pointer devices.

---

## Tech Stack

| Category | Library / Tool | Version | Purpose |
|---|---|---|---|
| **Framework** | React | 18.3.1 | Component model, hooks, Suspense |
| **Build Tool** | Vite | 5.4.x | Dev server, HMR, ESM bundling |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first CSS with extended theme tokens |
| **Scroll Animation** | GSAP + ScrollTrigger | 3.12.5 | Pinned scroll timelines, scrubbed animations |
| **GSAP React** | @gsap/react | 2.1.1 | `useGSAP` hook for safe scoped cleanup |
| **UI Animation** | Framer Motion | 11.x | Spring-physics card tilt, hover effects |
| **Smooth Scroll** | Lenis | 1.1.18 | Buttery smooth scroll synced to GSAP ticker |
| **Icons** | lucide-react | 0.469 | Consistent SVG icon set |
| **Typography** | @fontsource/space-grotesk | 5.x | Self-hosted display & UI font |
| **Typography** | @fontsource/sora | 5.x | Self-hosted body font |
| **Utilities** | clsx + tailwind-merge | latest | Conditional className composition |
| **Post-processing** | PostCSS + Autoprefixer | 8.x | CSS vendor prefixing |

---

## Key Engineering Decisions

### Why Lenis + GSAP Ticker sync?
Lenis intercepts native scroll and replaces it with a smooth exponential decay. Without syncing it to GSAP's RAF ticker, ScrollTrigger reads stale scroll positions on its own RAF cycle, causing jitter. Connecting `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(time => lenis.raf(time * 1000))` ensures both systems share a single animation frame.

### Why direct refs in EngineSection instead of ID selectors?
GSAP ID selectors (`"#part-battery"`) query the entire document DOM every time the timeline scrubs, which is expensive. Direct element refs (`partRefs.current[id]`) are captured once and held in memory, making each scroll-tick animation call O(1).

### Why `React.lazy` for InteractiveBackground?
The particle canvas and its RAF loop are not needed until after the browser has painted the initial above-the-fold content. Lazy-loading it defers its JavaScript parse and execution, reducing TTI (Time to Interactive) for the hero section.

### Why CSS custom properties alongside Tailwind?
Tailwind utilities are great for spacing, typography, and responsive layout. But brand colour tokens — especially when they appear in `box-shadow`, `filter: drop-shadow`, SVG `fill`, and inline `style` props — are easiest to manage as `var(--accent)` CSS variables rather than duplicated hex strings throughout JSX.

### Accessibility
- All `<section>` elements have semantic roles and `id` anchors
- Icon-only buttons carry `aria-label` attributes
- Forms use `<label>` elements paired with inputs
- Focus states use `focus-visible:ring-2 ring-[#FF6A2B]` for keyboard users
- `useReducedMotion()` watches `prefers-reduced-motion: reduce` — the entire EngineSection falls back to a static grid, the cursor is hidden, the particle canvas is not rendered
- Custom cursor is disabled on `pointer: coarse` (touch) devices

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
# → http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

> **Node requirement:** Node.js v18 or higher recommended. The project was developed on Node v26.

---

## Project Stats

| Metric | Value |
|---|---|
| Total source files | 24 |
| Largest component | `EngineSection.jsx` (27 kB) |
| Production JS bundle | ~473 kB (157 kB gzip) |
| Production CSS bundle | ~55 kB (9 kB gzip) |
| Build time | ~11–13 seconds |
| Lazy-loaded chunk | `InteractiveBackground` (3.1 kB) |

---

## Brand Vehicles Showcased

| Model | Type | 0–60 | Range | Power | From |
|---|---|---|---|---|---|
| **HOTSON GT-ONE** | Hyper GT Aeroback | 1.88 s | 520 mi | 1,420 hp | \$138,500 |
| **HOTSON PHANTOM S** | Executive Sport Sedan | 2.15 s | 480 mi | 1,180 hp | \$104,000 |
| **HOTSON TERRA-X** | All-Terrain Hyper-SUV | 2.40 s | 460 mi | 1,050 hp | \$119,000 |

All vehicle data is fictional and held in `src/data/models.js` for easy modification.

---

*HOTSON Automotive Dynamics Inc. — Zurich · Silicon Valley · Tokyo*
*Built with React 18 + Vite + GSAP + Lenis + Framer Motion + Tailwind CSS*
