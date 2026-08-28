# Portfolio & Systems Showcase

[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)](https://vatsalyd.github.io/Portfolio/)

Production URL: **[https://vatsalyd.github.io/Portfolio/](https://vatsalyd.github.io/Portfolio/)**

Interactive frontend showcasing AI infrastructure, multi-agent pipelines, machine learning systems, and upstream open-source work.

---

## Architecture & Features

- **Map Navigation**: City cartography navigation engine with district teleports, category filtering, and viewport tracking.
- **Terminal Agent**: Terminal emulator (`whoami`, `projects`, `skills`, `contact`, `clear`) with LLM fallback routing.
- **Live Open-Source Feed**: Client-side GitHub API integration rendering upstream pull requests and issue telemetry.
- **Tour Controller**: Automated section tour with progress playback and keyboard shortcuts (`Space`, `Left`, `Right`, `ESC`).
- **Responsive Layout**: Zero layout shift, fluid typography, and dark theme design tokens.

---

## Tech Stack

- **Runtime & Build**: React 19, Vite 7
- **Motion**: Framer Motion 12
- **Icons**: React Icons (Feather)
- **Styling**: Vanilla CSS custom property design system
- **Deployment**: GitHub Pages via GitHub Actions

---

## Setup & Local Development

```bash
# Clone
git clone https://github.com/vatsalyd/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start local server
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview
```

---

## License

MIT © [Vatsal Yadav](https://github.com/vatsalyd)
