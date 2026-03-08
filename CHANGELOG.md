# 📋 CHANGELOG — Portfolio Website

> All changes are logged here in reverse chronological order.

---

## [2026-03-02 00:49] — Blood Moon Theme & Hero Fix

### Changed
- **Theme**: Replaced "Warm Earth Tones" with **Blood Moon** — `#280905` (deep void bg), `#740A03` (ember dark), `#C3110C` (blood red accent), `#E6501B` (molten orange); solid metallic shimmer via `#B8C0CC` steel chrome on card edges, borders, terminal dots
- **Hero — blank page fix**: Slashed all staggered animation delays from `0.3–3.3s` → `0.1–0.75s`; hero content is now immediately visible on load
- **Hero — Blood Moon colors**: Energy ring uses crimson + ember orbiting dots with red glow shadows; ambient aurora shifted to crimson radial; terminal scanline and blink cursor now blood red; header terminal dots themed to #C3110C / #E6501B / #B8C0CC
- **Grid overlay**: Updated to `rgba(195,17,12,0.03)` blood red grid; added radial vignette at top
- **Glow button**: Now uses `linear-gradient(#E6501B, #C3110C)` with metallic top sheen (`inset 0 1px 0 rgba(255,255,255,0.25)`)
- **ScrollReveal**: Already re-triggers on every scroll in both directions (confirmed from previous session)
- **Preloader / scroll bar / cursor**: All updated to Blood Moon palette
- **New keyframes**: `blood-pulse`, `ember-flicker` added to CSS

---

## [2026-03-01 21:02] — Warm Earth Tones Theme & Animation Enhancements

### Changed
- **Theme**: Replaced "Quantum Terminal" neon green/violet palette with **Warm Earth Tones** — `#D9BF77` (gold), `#A45A3D` (sienna), `#6B4226` (deep brown), `#C4B6A6` (warm grey), `#E8DAB2` (linen); updated all CSS custom properties and component styles to new palette
- **Animations**: Reworked `ScrollReveal.jsx` — animations now **re-trigger on every scroll** (both down and up) instead of firing only once; uses IntersectionObserver with `threshold` and `rootMargin` tuning
- **Layout**: Cleaned up spacing, padding, and section alignment across all components for a sleeker, more professional appearance

---

## [2026-03-01 19:50] — Immersive Intro, Starfield, Social Links & Skills Redesign

### Changed
- **Particles**: Upgraded from 50 static dots to 160 twinkling stars with size/opacity animation, bubble hover effect, click-to-spawn, green constellation links, attract physics
- **Hero immersion**: Added rotating energy ring (conic gradient + orbiting dot), aurora-like shifting gradients, diagonal scan line, blur-in name transition, bio tagline
- **Social links**: Updated to real URLs — GitHub/vatsalyd, LinkedIn/vatsal-yadav, Kaggle/vatsalydd, LeetCode/vatsal_yd + added `SiLeetcode` icon
- **Skills section**: Complete redesign — replaced flip cards with horizontal rows (icon + name + animated progress bar + percentage), added stats panel (24 total / 81% avg / Python top), terminal-style `> category` tabs with layoutId animation, category dot indicators

---

## [2026-03-01 19:15] — Quantum Terminal Theme Redesign

### Changed
- **Theme**: Replaced "Neural Cosmos" with "Quantum Terminal" — true black background, neon green (#39FF14) + holographic violet (#B026FF) accents, Orbitron display font, grid overlay, glitch/scanline/terminal-blink animations
- **Personal info**: Name → Vatsal Yadav, email → vatsal.y.official@gmail.com, phone → +91 7983709173
- **Roles**: Redefined for AI Agent Automation Engineer, LLM Systems Architect, Autonomous Agent Builder
- **Hero section**: Terminal-style agent initialization block, name with glitch distortion, status indicators (ONLINE, 12 AGENTS ACTIVE, 99.97%), code-comment typewriter
- **Projects**: Categories updated to AI/ML/DL, content rewritten for agent/LLM/RAG projects
- **DataShowcase**: Charts themed green/violet, LangChain agent code snippet, token-based syntax highlighting
- **All components**: Updated to new colour palette and typography

### Removed
- Testimonials section (per user request)

### Fixed
- Code snippet showing raw HTML tags — replaced regex cascade with proper React tokenizer
- Terminal block rendering duplicate lines in StrictMode — added ref guard + cleanup

---

### Fixed
- **Critical**: Fixed `SiPowerbi` import from `react-icons/si` (does not exist) → replaced with `TbChartBar` from `react-icons/tb`. This caused a silent runtime crash that showed a blank white screen.
- Added `data-theme="dark"` to `<html>` tag in `index.html` to prevent light theme flash on initial load
- Rewrote `ParticleBackground.jsx` to use `initParticlesEngine` API (correct for `@tsparticles/react` v3+)
- Simplified `Preloader.jsx` to not depend on `AnimatePresence` for reliability

### Verified
- `npx vite build` passes with 0 errors
- All 10 sections render correctly in browser
- Particle background, custom cursor, Ctrl+K palette, and theme toggle all functional
- No JavaScript console errors

---

## [2026-03-01 18:05] — Component Development

### Added
- **Navbar** (`Navbar.jsx`) — Fixed glassmorphic bar with scroll-spy, animated active indicator, mobile hamburger, resume button
- **Hero** (`Hero.jsx`) — Full-viewport landing with Matrix text scramble, typewriter roles, floating gradient orbs, social links
- **About** (`About.jsx`) — Split layout with rotating gradient avatar border, animated stat counters, info grid
- **Skills** (`Skills.jsx`) — Interactive flip cards revealing proficiency bars, category filter tabs
- **DataShowcase** (`DataShowcase.jsx`) — Recharts accuracy curve + feature importance bars, styled code snippet window with syntax highlighting
- **Projects** (`Projects.jsx`) — Filterable tilt-on-hover cards with featured badge, gradient borders, glassmorphic detail modal
- **Experience** (`Experience.jsx`) — Dual animated timeline with alternating sides, glowing node icons
- **Certifications** (`Certifications.jsx`) — Badge grid with color-coded accent bars and shimmer effects
- **Testimonials** (`Testimonials.jsx`) — Auto-rotating carousel with 3D flip transitions and progress dots
- **Contact** (`Contact.jsx`) — Glass form with focus-glow inputs, contact info cards, social links
- **Footer** (`Footer.jsx`) — Logo, social links, back-to-top gradient button
- **CommandPalette** (`CommandPalette.jsx`) — Ctrl+K search palette + Konami code easter egg (hue-rotate party)

---

## [2026-03-01 18:00] — Foundation & Design System

### Added
- **Design System** (`index.css`) — CSS custom properties, Neural Cosmos color palette, glass/glow utilities, animations, responsive breakpoints, light/dark theme vars
- **Portfolio Data** (`portfolioData.js`) — Single source of truth for all content (personal info, skills, projects, experience, certifications, testimonials)
- **Preloader** (`Preloader.jsx`) — Letter-by-letter logo reveal with gradient progress bar
- **ParticleBackground** (`ParticleBackground.jsx`) — tsParticles neural network config with hover-grab
- **CustomCursor** (`CustomCursor.jsx`) — Glowing dot + ring with hover state morphing
- **ScrollProgress** (`ScrollProgress.jsx`) — Gradient scroll progress bar
- **ScrollReveal** (`ScrollReveal.jsx`) — Reusable animation wrapper (fadeUp, fadeLeft, scaleUp, etc.)
- **ThemeToggle** (`ThemeToggle.jsx`) — Dark/light toggle with rotating sun/moon icon

---

## [2026-03-01 17:58] — Project Setup

### Added
- Scaffolded project with `create-vite@latest` (Vite 7.3.1, React 19)
- Installed dependencies: `framer-motion`, `@tsparticles/react`, `@tsparticles/slim`, `react-icons`, `react-type-animation`, `recharts`
- Updated `index.html` with SEO meta tags, Open Graph, Google Fonts, brain emoji favicon
- Created `App.jsx` composing all components

---

## [2026-03-01 17:55] — Planning Phase v2

### Added
- Enhanced implementation plan with **29 features** (up from ~12)
- New sections: Data Showcase, Certifications, Testimonials
- New features: Cinematic Preloader, Command Palette (Ctrl+K), Konami Code Easter Egg, Theme Toggle, Magnetic Buttons, Text Scramble animations
- Created CHANGELOG.md for tracking all changes

---

## [2026-03-01 17:50] — Planning Phase v1

### Added
- Initial implementation plan created
- Task breakdown created (task.md)
- Core concept: "Neural Cosmos" dark theme with neon gradients
- Tech stack selected: Vite 6 + React 19 + Framer Motion + tsParticles
