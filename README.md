# HOTSON — Intelligent Electric Hyper-EV Marketing Website

A single-page marketing website for **HOTSON**, a luxury high-performance electric vehicle brand. Engineered with **React 18**, **Vite**, **Tailwind CSS**, **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, and **Framer Motion**.

---

## ⚡ Tech Stack & Architecture

- **Core**: React 18, Vite 5, JavaScript (ESM)
- **Styling**: Tailwind CSS with CSS custom properties:
  - `--bg: #0A0A0C` (Obsidian Dark)
  - `--surface: #15151A` (Card & Elevated Surface)
  - `--cream: #F3EEE6` (High-Contrast Editorial Section)
  - `--accent: #FF6A2B` (Kinetic Hyper-EV Orange)
- **Smooth Scroll**: Lenis integrated with GSAP ScrollTrigger ticker
- **Animation**:
  - **GSAP & ScrollTrigger** via `@gsap/react` (`useGSAP` hook) for the pinned exploded powertrain telemetry deconstruction
  - **Framer Motion** for spring-physics 3D model card tilt on hover
- **Background**: High-performance interactive particle canvas reacting to cursor repulsive physics and scroll velocity, with tab-pause and prefers-reduced-motion support
- **Typography**: `@fontsource/space-grotesk` & `@fontsource/sora`
- **Icons**: `lucide-react`

---

## 📂 Project Structure

```text
hotson/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── ui/
│   │   │   └── Button.jsx               # Pill button with hover arrow glide and pulse glow
│   │   ├── BookDriveModal.jsx           # Private concierge test-drive booking drawer
│   │   ├── CtaBanner.jsx                # Full-width sunset highway with orange gradient
│   │   ├── CustomCursor.jsx             # Dual-ring orange cursor with lerp tracking
│   │   ├── EngineSection.jsx            # Pinned exploded 3D powertrain animation with SVG connectors
│   │   ├── Footer.jsx                   # Multi-column footer with validated newsletter input
│   │   ├── Hero.jsx                     # Full-viewport hero with slow-zoom product showcase
│   │   ├── InteractiveBackground.jsx    # Cursor-reactive particle field (lazy-loaded with Suspense)
│   │   ├── ModelCard.jsx                # 3D hover tilt card with Framer Motion spring physics
│   │   ├── Models.jsx                   # Cream contrast section with 3 vehicle specifications
│   │   ├── Navbar.jsx                   # Translucent backdrop blur header + search modal
│   │   ├── StatsBar.jsx                 # Live count-up telemetry metrics
│   │   └── StoryInterior.jsx            # Two side-by-side human craft & sanctuary cards
│   ├── data/
│   │   ├── engineParts.js               # 3D offsets & callouts for the exploded engine
│   │   ├── models.js                    # Flagship vehicle specs, imagery & pricing
│   │   └── stats.js                     # Telemetry metrics data
│   ├── hooks/
│   │   ├── useCountUp.js                # Exponential easing count-up hook
│   │   ├── useLenis.js                  # Lenis smooth scroll + ScrollTrigger ticker synchronization
│   │   ├── useMousePosition.js          # Normalized mouse coordinates for parallax
│   │   └── useReducedMotion.js          # Accessibility media query hook
│   ├── App.jsx                          # Main single-page application orchestrator
│   ├── index.css                        # CSS variables, fonts, and base styling
│   └── main.jsx                         # React 18 root mounting
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
